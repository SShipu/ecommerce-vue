import { ref } from 'vue';
import { useHedwig } from '../../../fuel-station/useHedwig';
import { useFuelController } from '../../../fuel-station/useFuelController';
import { useSearchPagination } from '../../../fuel-station/useSearchPagination';
import { itemsClient } from '../../../../apis/config';

const smaugItemsState = {
    isFetching: ref(false),
    isSending: ref(false),
    isDeleting: ref(false),
    all: ref([]),
    page: ref([]),
    paginator: null,
    paginationParams: ref({}),
    paginationParamsRaw: ref({}),
};

export function useSmaugItemsController(
    options = {
        tag: 'item',
        fetch: false,
        refetchIfExists: false,
        extras: {},
        callbacks: {
            successCallback: null,
            errorCallback: null,
            warningCallback: null,
        },
        size: 0,
    }
) {
    const hedwig = useHedwig({
        tag: 'items',
        fields: ['title', 'unit', 'price'],
        callbacks: options.callbacks,
    });

    const itemErrorStatusMapping = {
        409: {
            validationErrors: [
                {
                    field: 'name',
                    errorCode: 'conflict',
                },
            ],
        },
    };

    const defaultPaginationParams = {
        textParams: [],
        nestedParams: [],
        sortParams: [
            {
                field: 'title',
                type: 'ASCENDING',
            },
        ],
        page: 1,
        size: (options.size && options.size) > 0 ? options.size : 18,
    };

    if (options.extras && options.extras.itemTag && options.extras.itemTag.length > 0) {
        defaultPaginationParams.nestedParams = [
            {
                field: 'tags',
                value: options.extras.itemTag,
                matchType: 'COLLECTION_CONTAINS_EXACT',
                isRelational: true,
            },
        ];
    }

    const base = useFuelController({
        tag: options.tag,
        state: smaugItemsState,
        client: itemsClient,
        errorStatusMapping: itemErrorStatusMapping,
        hedwig: hedwig,
        defaultPaginationParams: defaultPaginationParams,
    });

    function constructPaginationParams(params) {
        let obj = JSON.parse(JSON.stringify(defaultPaginationParams));
        if (!params) {
            params = { page: 1 };
        } else {
            if (params.page) {
                obj.page = Number(params.page);
            }
            if (params.query) {
                obj.textParams.push({
                    field: 'title',
                    value: params.query,
                    matchType: 'REGEX',
                });
            }
            if (
                params.categories &&
                params.categories.length > 0 &&
                params.categories != '<all>'
            ) {
                obj.nestedParams.push({
                    field: 'categories.id',
                    value: params.categories,
                    matchType: 'COLLECTION_CONTAINS_EXACT',
                    isRelational: true,
                });
            }
            if (params.categoryId && params.categoryId.length > 0) {
                obj.nestedParams.push({
                    field: 'categories.id',
                    value: params.categoryId,
                    matchType: 'COLLECTION_CONTAINS_EXACT',
                    isRelational: true,
                });
            }
            // if (params.status && params.status != '') {
            //     obj.status = params.status;
            // }
            if (params.textParams && params.textParams.length > 0) {
                // params.textParams.forEach((element) => {
                for (let i = 0; i < params.textParams.length; i++) {
                    let element = params.textParams[i];
                    if (element.field && element.field != '') {
                        obj.textParams.push(element);
                    }
                }
                // });
            }
            if (params.andOrNestedClauses && params.andOrNestedClauses.length > 0) {
                obj.andOrNestedClauses = params.andOrNestedClauses;
            }
        }
        return obj;
    }

    function validate(data) {
        if (!data.title || data.title.length == 0) {
            hedwig.setValidationError('title', 'missing_title_item');
            return false;
        }

        if (data.title.length < 3 || data.title.length > 200) {
            hedwig.setValidationError('title', 'length_mismatch_title_item');
            return false;
        }

        // if (isNaN(data.salesPrice)) {
        //     hedwig.setValidationError('price', 'nan_price_item');
        //     return false;
        // }

        // if (isNaN(data.purchasePrice)) {
        //     hedwig.setValidationError('price', 'nan_price_item');
        //     return false;
        // }

        // if (!data.salesUnitId || data.salesUnitId.length == 0) {

        //     hedwig.setValidationError('unit', 'missing_unit_item');
        //     return false;
        // }

        // if (!data.purchaseUnitId || data.purchaseUnitId.length == 0) {

        //     hedwig.setValidationError('unit', 'missing_unit_item');
        //     return false;
        // }

        // if (!data.defaultUnitId || data.defaultUnitId.length == 0) {

        //     hedwig.setValidationError('unit', 'missing_unit_item');
        //     return false;
        // }

        return true;
    }

    const create = async (data, image) => {
        if (!validate(data)) return;
        smaugItemsState.isSending.value = true;
        let imageUrl = '';
        if (image) {
            imageUrl = await base.uploadAttachment(image, 'item-image', true);
            if (!imageUrl) {
                smaugItemsState.isSending.value = false;
                return;
            }
        }

        if (!data.images) data.images = [];
        if (imageUrl.length > 0) {
            data.images.push({
                sortOrder: 0,
                width: 0,
                height: 0,
                tag: '',
                mimeType: '',
                url: imageUrl,
            });
        }

        return base.create(data);
    };

    const update = async (data, image) => {
        if (!validate(data)) return;
        smaugItemsState.isSending.value = true;
        let imageUrl = '';
        if (image) {
            imageUrl = await base.uploadAttachment(image, 'category-image', true);
            if (!imageUrl) {
                smaugItemsState.isSending.value = false;
                return;
            }
        }
        if (!data.images) data.images = [];
        if (imageUrl.length > 0) {
            data.images.push({
                sortOrder: 0,
                width: 0,
                height: 0,
                tag: '',
                mimeType: '',
                url: imageUrl,
            });
        }
        return base.update(data);
    };

    const adjustStock = (data) => {
        let page = JSON.parse(JSON.stringify(smaugItemsState.page.value));
        data.items.forEach((item) => {
            let index = page.findIndex((i) => i.id == item.itemId);
            if (index > -1) {
                if (page[index].needsStock) {
                    if (page[index].stocks && page[index].stocks.length > 0) {
                        page[index].stocks[0].ok -= item.quantity;
                    }
                }
            }
        });
        smaugItemsState.page.value = page;
    };

    if (!smaugItemsState.paginator || options.fetch || options.refetchIfExists)
        smaugItemsState.paginator = useSearchPagination(
            smaugItemsState,
            itemsClient.search,
            constructPaginationParams,
            'unit'
        );

    /* TODO: check if duplicate, how to elemenate duplicate if any */
    return {
        ...smaugItemsState,
        ...base,
        create,
        update,
        adjustStock,
        ...smaugItemsState.paginator,
        ...hedwig,
    };
}
