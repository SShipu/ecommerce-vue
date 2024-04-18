import { computed } from 'vue';
export function useSmaugItemDto(item) {
    const title = computed(() => {
        if (item && item.value) return item.value.title;
        return '';
    });

    const primaryImageUrl = computed(() => {
        if (item.value) {
            if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.skus[0].images && item.value.skus[0].images.length > 0) {
                    if (
                        item.value.skus[0].images[0] &&
                        item.value.skus[0].images[0].url &&
                        item.value.skus[0].images[0].url != ''
                    ) {
                        return item.value.skus[0].images[0].url;
                    } else return item.value.skus[0].images[0];
                }
            }
            if (item.value.images && item.value.images.length > 0) {
                if (
                    item.value.images[0] &&
                    item.value.images[0].url &&
                    item.value.images[0].url != ''
                ) {
                    return item.value.images[0].url;
                } else return item.value.images[0];
            }
        }
        return '';
    });

    const primaryImageUrlV3 = computed(() => {
        if (item.value) {
            if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.skus[0].images && item.value.skus[0].images.length > 0) {
                    return item.value.skus[0].images[0];
                }
            }
            if (item.value.images && item.value.images.length > 0)
                return item.value.images[0];
        }
        return '';
    });

    const primaryImageUrlV2 = computed(() => {
        if (image && image.url && image.url != '') {
            return image.url;
        }
        return '';
    });

    const categoriesLabel = computed(() => {
        if (
            item &&
            item.value &&
            item.value.categories &&
            item.value.categories.length > 0
        ) {
            return item.value.categories.map((c) => c.name).join(',');
        }
        return '';
    });

    const categoryHierarchicalNames = computed(() => {
        let arr = [];
        if (
            item &&
            item.value &&
            item.value.categories &&
            item.value.categories.length > 0
        ) {
            item.value.categories.forEach((c) => {
                let a = [];
                let cc = c;
                while (cc && cc.id != '') {
                    a.push(cc.name);
                    cc = cc.parent;
                }
                arr.push(a);
            });
        }
        return arr;
    });

    const salesUnit = computed(() => {
        if (item.value && item.value.salesUnit && item.value.salesUnit.name.length > 0)
            return item.value.salesUnit.name;
        return 'Unit';
    });

    const purchaseUnit = computed(() => {
        if (
            item.value &&
            item.value.purchaseUnit &&
            item.value.purchaseUnit.name.length > 0
        )
            return item.value.purchaseUnit.name;
        return 'Unit';
    });

    const unit = computed(() => {
        if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value.tags[0] == 'FINISHED_GOODS') return salesUnit.value;
            if (item.value.tags[0] == 'RAW_MATERIALS') return purchaseUnit.value;
            return '';
        }
        return '';
    });

    const formattedItemTag = computed(() => {
        if (item && item.value && item.value.tags && item.value.tags.length > 0) {
            const tag = item.value.tags[0];
            if (tag == 'FINISHED_GOODS') return 'Products';
            if (tag == 'RAW_MATERIALS') return 'Raw Materials';
            if (tag == 'APPLIANCES') return 'Office Supplies';
            if (tag == 'BI_PRODUCTS') return 'Bi-Products';
            if (tag == 'EQUIPMENTS') return 'Mfg. Equipments';
            if (tag == 'FIXED_ASSETS') return 'Fixed Assets';
            return tag;
        }
        return '';
    });

    const primaryCategoryName = computed(() => {
        if (item.value && item.value.categories && item.value.categories.length > 0) {
            return item.value.categories[0].name;
        }
        return '';
    });

    const primaryCategoryImageUrl = computed(() => {
        if (item.value && item.value.categories && item.value.categories.length > 0) {
            if (
                item.value.categories[0].extras &&
                item.value.categories[0].extras['image_url'] &&
                item.value.categories[0].extras['image_url'].length > 0
            )
                return item.value.categories[0].extras['image_url'];
        }
        return '';
    });

    const unitObj = computed(() => {
        if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value.tags[0] == 'FINISHED_GOODS') return item.value.salesUnit;
            if (item.value.tags[0] == 'RAW_MATERIALS') return item.value.purchaseUnit;
            return {};
        }
        return {};
    });

    const price = computed(() => {
        if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.tags[0] == 'FINISHED_GOODS')
                    return item.value.skus[0].salesPrice + '';
                if (item.value.tags[0] == 'RAW_MATERIALS')
                    return item.value.skus[0].purchasePrice + '';
            }
            if (item.value.tags[0] == 'FINISHED_GOODS') return item.value.salesPrice + '';
            if (item.value.tags[0] == 'RAW_MATERIALS')
                return item.value.purchasePrice + '';
        }
        return '';
    });

    const subscriptionPrice = computed(() => {
        if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value && item.value.length > 0) {
                if (item.value.tags[0] == 'FINISHED_GOODS')
                    return item.value.subscribedPrice + '';
            }
            if (item.value.tags[0] == 'FINISHED_GOODS')
                return item.value.subscribedPrice + '';
        }
        return '';
    });

    const effectivePrice = computed(() => {
        if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.tags[0] == 'FINISHED_GOODS') {
                    let salesPrice = item.value.skus[0].salesPrice;
                    let discountedSalesPrice = item.value.skus[0].discountedSalesPrice;
                    if (discountedSalesPrice > 0) return discountedSalesPrice;
                    return salesPrice;
                }
                if (item.value.tags[0] == 'RAW_MATERIALS') {
                    let purchasePrice = item.value.skus[0].purchasePrice;
                    let discountedPurchasePrice =
                        item.value.skus[0].discountedPurchasePrice;
                    if (discountedPurchasePrice > 0) return discountedPurchasePrice;
                    return purchasePrice;
                }
            }

            if (item.value.tags[0] == 'FINISHED_GOODS') {
                let salesPrice = item.value.salesPrice;
                let discountedSalesPrice = item.value.discountedSalesPrice;
                if (discountedSalesPrice > 0) return discountedSalesPrice;
                return salesPrice;
            }

            if (item.value.tags[0] == 'RAW_MATERIALS') {
                let purchasePrice = item.value.purchasePrice;
                let discountedPurchasePrice = item.value.discountedPurchasePrice;
                if (discountedPurchasePrice > 0) return discountedPurchasePrice;
                return purchasePrice;
            }
        }
        return 0;
    });

    const totalStock = computed(() => {
        if (item && item.value) {
            if (!item.value.needsStock) return 'N/A';
            else {
                if (item.value.stocks && item.value.stocks.length > 0)
                    return item.value.stocks
                        .map((s) => s.ok)
                        .reduce((acc, current) => acc + current, 0);
            }
        }
        return '0';
    });

    const hasVariations = computed(() => {
        if (item && item.value) {
            if (item.value.skus.length > 1) return true;
            return !(item.value.skus.length == 1 && item.value.skus[0].code == '<base>');
        }
        return false;
    });

    return {
        title,
        categoriesLabel,
        primaryImageUrl,
        primaryImageUrlV3,
        salesUnit,
        purchaseUnit,
        unit,
        unitObj,
        price,
        subscriptionPrice,
        effectivePrice,
        primaryCategoryName,
        primaryCategoryImageUrl,
        totalStock,
        categoryHierarchicalNames,
        formattedItemTag,
        hasVariations,
    };
}
