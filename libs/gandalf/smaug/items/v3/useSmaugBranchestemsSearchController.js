import { ref } from 'vue';
import { useHedwig } from '@/libs/fuel-station/useHedwig';
import { useFuelController } from '@/libs/fuel-station/useFuelController';
import { useSearchPagination } from '@/libs/fuel-station/useSearchPagination';
import { itemIndicesClient } from '@/libs/gandalf/apis/config';

const smaugBranchestemsSearch = {
    isFetching: ref(false),
    isSending: ref(false),
    isDeleting: ref(false),
    all: ref([]),
    page: ref([]),
    paginator: null,
    paginationParams: ref({}),
    paginationParamsRaw: ref({}),
};

export function useSmaugBranchestemsSearchController(
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
        query: '',
        filters: [],
        nonZeroStockOnly: false,
        page: 1,
        size: 100,
    };

    const base = useFuelController({
        tag: options.tag,
        state: smaugBranchestemsSearch,
        client: itemIndicesClient,
        errorStatusMapping: itemErrorStatusMapping,
        hedwig: hedwig,
        defaultPaginationParams: defaultPaginationParams,
    });

    function constructPaginationParamsV2(params) {
        let obj = JSON.parse(JSON.stringify(defaultPaginationParams));
        if (!params) {
            params = { page: 1 };
        } else {
            if (params.page) {
                obj.page = Number(params.page);
            }

            if (params.query) {
                obj.query = params.query;
            }

            if (params.status) {
                obj.status = params.status;
            }

            if (
                params?.filters?.length
            ) {
                obj.filters = params.filters;
            }
            if (
                params?.nonZeroStockOnly || !params?.nonZeroStockOnly
            ) {
                obj.nonZeroStockOnly = params.nonZeroStockOnly;
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

        return true;
    }

    const create = async (data, image) => {
        if (!validate(data)) return;
        smaugBranchestemsSearch.isSending.value = true;
        let imageUrl = '';
        if (image) {
            imageUrl = await base.uploadAttachment(image, 'item-image', true);
            if (!imageUrl) {
                smaugBranchestemsSearch.isSending.value = false;
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
        smaugBranchestemsSearch.isSending.value = true;
        let imageUrl = '';
        if (image) {
            imageUrl = await base.uploadAttachment(image, 'category-image', true);
            if (!imageUrl) {
                smaugBranchestemsSearch.isSending.value = false;
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
        let page = JSON.parse(JSON.stringify(smaugBranchestemsSearch.page.value));
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
        smaugBranchestemsSearch.page.value = page;
    };

    if (!smaugBranchestemsSearch.paginator || options.fetch || options.refetchIfExists)
        smaugBranchestemsSearch.paginator = useSearchPagination(
            smaugBranchestemsSearch,
            itemIndicesClient.search,
            constructPaginationParamsV2,
            'unit'
        );

    /* TODO: check if duplicate, how to elemenate duplicate if any */
    return {
        ...smaugBranchestemsSearch,
        ...base,
        create,
        update,
        adjustStock,
        ...smaugBranchestemsSearch.paginator,
        ...hedwig,
    };
}
