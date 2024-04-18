
import { ref } from 'vue';
import { useHedwig } from '@/libs/fuel-station/useHedwig';
import { useFuelController } from '@/libs/fuel-station/useFuelController';
import { useSearchPagination } from '@/libs/fuel-station/useSearchPagination';
import { productsClient } from '@/libs/gandalf/apis/config';

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

export function useSmaugSearchIndicesController(
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
        query: "",
        categoryIds: [],
        categories: [],
        // attributes: {
        //     Color: [],
        //     Size: []
        // },
        // lookups: {
        //     bands: [],
        //     brands: []
        // },
        sortParams: [
            {
                field: 'title',
                type: 'ASCENDING',
            },
            // {
            //     field: 'dateCreated',
            //     type: 'DESCENDING'
            // }
        ],
        minPrice: 0,
        maxPrice: 1000000,
        page: 1,
        size: 20,
        status: 'ACTIVE',
    }

    const base = useFuelController({
        tag: options.tag,
        state: smaugItemsState,
        client: productsClient,
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
                if (params.query == "emptyQuery") obj.query = "";
                else obj.query = params.query;
            }
            if (params.branchId && params.branchId.length > 0) {
                obj.branchId = params.branchId;
            }
            if (
                params.categories &&
                params.categories.length > 0 &&
                params.categories != '<all>'
            ) {
                for (let i = 0; i < params.categories.length; i++) {
                    let element = params.categories[i];
                    if (element && element.length > 0) {
                        obj.categories.push(element);
                    }
                }
            }

            if (
                params.categoryIds &&
                params.categoryIds.length > 0
            ) {
                for (let i = 0; i < params.categoryIds.length; i++) {
                    let element = params.categoryIds[i];
                    if (element && element.length > 0) {
                        obj.categoryIds.push(element);
                    }
                }
            }
            
            if (params.attributes) {
                if (params.attributes.Color && params.attributes.Color.length > 0) {
                    for (let i = 0; i < params.attributes.Color.length; i++) {
                        let color = params.attributes.Color[i];
                        if (color && color.length > 0) {
                            obj.attributes.Color.push(color);
                        }
                    }
                }
                if (params.attributes.Size && params.attributes.Size.length > 0) {
                    for (let i = 0; i < params.attributes.Size.length; i++) {
                        let size = params.attributes.Size[i];
                        if (size && size.length > 0) {
                            obj.attributes.Size.push(size);
                        }
                    }
                }
            }
            if (params.lookups) {
                if (params.lookups.bands && params.lookups.bands.length > 0) {
                    for (let i = 0; i < params.lookups.bands.length; i++) {
                        let band = params.lookups.bands[i];
                        if (band && band.length > 0) {
                            obj.lookups.bands.push(band);
                        }
                    }
                }
                if (params.lookups.brands && params.lookups.brands.length > 0) {
                    for (let i = 0; i < params.lookups.brands.length; i++) {
                        let brand = params.lookups.brands[i];
                        if (brand && brand.length > 0) {
                            obj.lookups.brands.push(brand);
                        }
                    }
                }
            }
            if (params.sortParams && params.sortParams.length > 0) {
                obj.sortParams = [];
                for (let i = 0; i < params.sortParams.length; i++) {
                    let el = params.sortParams[i];
                    if (el.field && el.field.length > 0) {
                        obj.sortParams.push(el);
                    }
                }
            }
            if (params.minPrice && params.minPrice > 0) {
                obj.minPrice = params.minPrice;
            }
            if (params.maxPrice && params.maxPrice > 0) {
                obj.maxPrice = params.maxPrice;
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
            productsClient.search,
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
