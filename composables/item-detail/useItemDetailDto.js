/* eslint-disable prettier/prettier */
import skuUtils from "../sku-utils";
import lookupUtils from "../lookup-utils";

export function useItemDetailDto(item, selectedAttributeValues) {

    const title = computed(() => {
        if (item && item.value) return item.value.title;
        return '';
    });

    const hasVariation = computed(() => {
        if(item.value && item.value.hasVariation) {
            return item.value.hasVariation
        }

        return false;
    });

    const categoryName = computed(() => {
        if(item.value && item.value.categories?.length) {
            return item.value.categories[0].name;
        }

        return '';
    });

    const primaryImageUrl = computed(() => {
        let img = '/images/no-image.png';
        if (item.value) {
            if (item.value.images && item.value.images.length > 0) {
                if (item.value?.images[0]?.url?.length && item.value?.images[0]?.tag != '3D_MODEL') {
                    img =  item.value.images[0].url
                }
            }else if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.skus[0].images && item.value.skus[0].images.length > 0) {
                    if (
                        item.value.skus[0].images[0] &&
                        item.value.skus[0].images[0].url &&
                        item.value.skus[0].images[0].url != ''
                    ) {
                        img = item.value.skus[0].images[0].url;
                    } else img = item.value.skus[0].images[0];
                }
            }
            
        }
        return img;
    });

    const images = computed(() => {
        let images = [];
        // console.log("item.value");
        // console.log(item.value.images);
        if(item.value?.images?.length) {
            let imagesArr = item.value.images.sort((x,y) => x.sortOrder - y.sortOrder);
            imagesArr.forEach(img => {
                if(img?.url?.length && img.tag != '3D_MODEL') {
                    images.push(img.url);
                }
            });
            return [...new Set(images)];
        } else if(item.value && item.value.skus && item.value.skus.length > 0) {
            item.value.skus.forEach(sku => {
                if(sku.images && sku.images.length > 0) {
                    sku.images.forEach(img => {
                        images.push(img);
                    });
                }
            });
            return [...new Set(images)];
        }
        return [primaryImageUrl.value];
    });

    const minPrice = computed(() => {
        if (item.value && item.value) {
            let minSkusPrice = 0;
            let minSkusDiscount = 0;
            
            if (item.value && item.value.skus && item.value.skus.length > 0) {

                let priceArray = [];
                let discountArray = [];

                let minPrice = 0;
                let minDiscount = 0;

                item.value.skus.forEach(sku => {
                    priceArray.push(sku.salesPrice)
                    discountArray.push(sku.discountedSalesPrice)
                });

                if (Math.min(...priceArray) > 0) {
                    minPrice = Math.min(...priceArray);
                }

                if (Math.min(...discountArray) > 0) {
                    minDiscount = Math.min(...discountArray);
                }

                if (minPrice > 0) {
                    minSkusPrice = minPrice ;
                }

                if (minDiscount > 0) {
                    minSkusDiscount = minDiscount ;
                }
            }
            
            return {
                salesPrice: Number(item.value && item.value.minPrice ? item.value.minPrice : minSkusPrice),
                discountPrice: Number(item.value && item.value.minDiscountedPrice ? item.value.minDiscountedPrice : minSkusDiscount),
                isDiscountedPriceAvailable: Number(item.value.minDiscountedPrice) > 0 ? true : false,
            };
        }
    });

    const  price = computed(() => {
        if (selectedSku.value) {
            return {
              salesPrice: selectedSku.value.salesPrice,
              discountedPrice: selectedSku.value.discountedSalesPrice,
            };
          }

        return {
            salesPrice:  minPrice.value && minPrice.value.salesPrice ? minPrice.value.salesPrice : 0,
            discountedPrice: minPrice.value && minPrice.value.discountPrice ? minPrice.value.discountPrice : 0,
        };
    });

    const selectedSku = computed(() => {
        if(selectedAttributeValues.value?.length) { // for skus variation
            if (item.value && item.value.skus) {
                let selectedSku = skuUtils.findSkuByAttributeValues(item.value.skus, selectedAttributeValues.value);

                if (selectedSku) {
                    return selectedSku;
                }
            }
            return null;

        } else if(!hasVariation.value 
            && item.value 
            && item.value.skus 
            && item.value.skus.length == 1
        ) { //for default sku
            let selectedSku = item.value.skus[0];

            return selectedSku;
        } else {

            return null;
        }
    });

    const attributes = computed(() =>  {
        let attributes = skuUtils.extractAttributes(item.value);
        attributes = attributes.sort((a, b) => a.values[0].seq - b.values[0].seq)
        return attributes;
    });

    const lookupGroups = computed(() => {
        if (item.value && item.value.lookups) {
            return lookupUtils.groupLookupsByType(item.value.lookups);
        }
        return {};
    });

    const brands = computed(() => {
        if (lookupGroups.value && lookupGroups.value.brands) {
          return lookupGroups.value.brands.map((b) => b.name);
        }
        return "";
    });

    const  categories = computed(() => {
        if (item.value && item.value.categories) {
          return item.value.categories.map((b) => b.name).join(",");
        }
        return "";
    });

    const bands = computed(() => {
        if (lookupGroups.value && lookupGroups.value.bands) {
          return lookupGroups.value.bands.map((b) => b.name).join(",");
        }
        return "";
    });

    const tags = computed(() => {
        if (item.value && item.value.tags && item.value.tags.length > 0) {
          let tags = item.value.tags;
          return tags;
        }
        return [];
    });

    const keywords = computed(() => {
        if (item.value && item.value.keywords && item.value.keywords.length > 0) {
            let keywords = item.value.keywords;
            return keywords;
        }
        return [];
    });

    const code = computed(() => {
        if (item.value?.model?.length) {
          let tags = item.value.model;
          return tags;
        } else {
            return item.value?.code
        }
        return [];
    });

    return {
        title,
        hasVariation,
        code,
        categoryName,
        primaryImageUrl,
        images,
        minPrice,
        price,
        selectedSku,
        attributes,
        lookupGroups,
        brands,
        categories,
        bands,
        tags,
        keywords
    };
}
