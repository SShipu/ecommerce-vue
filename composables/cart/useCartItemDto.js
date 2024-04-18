export function useCartItemDto(item) {

    const id = computed(() => {
        if(item.value && item.value.product && item.value.product.id) {
            return item.value.product.id;
        }

        return '';
    });

    const productImage = computed(() => {
        if (item.value?.product?.images?.length && item.value?.product?.images[0]?.url?.length) {
            return item.value.product.images[0].url;
        }
        return "/images/no-image.png";
    });

    const name = computed(() => {
        if(item.value && item.value.product && item.value.product.title) {
            return item.value.product.title;
        }
        return "";
    });

    const productAttributes = computed(() => {

        if(item.value && item.value.sku && item.value.sku.optionValues && item.value.sku.optionValues.length > 0) {
            let attributes = item.value.sku.optionValues.map(a => a.displayLabel).join(", ");
            return attributes;
        }
        return "";
    });

    const productSize = computed(() => {
        console.log("item.value.sku");
        console.log(item.value.sku);
        if(item.value && item.value.sku && item.value.sku.optionValues && item.value.sku.optionValues.length > 0) {
            console.log("item.value.sku.optionValues");
            console.log(item.value.sku.optionValues);
            let size = item.value.sku.optionValues.find(a => a.option && a.option.displayLabel && (a.option.displayLabel.toUpperCase() == "SIZE" || a.option.displayLabel.toUpperCase() != 'COLOR'));
            return size.displayLabel;
        }
        return "";
    });

    const productColor = computed(() => {
        if(item.value?.sku?.optionValues?.length) {
            let color = item.value.sku.optionValues.find(a => a.option.displayLabel.toLowerCase() == "color");
            return color.displayLabel;
        }
        return "";
    });

    const productPrice = computed(() => {
        if(item.value.sku.discountedSalesPrice && Number(item.value.sku.discountedSalesPrice) > 0){
            return (Number(item.value.sku.discountedSalesPrice));
        }else{
            return (Number(item.value.sku.salesPrice));
        }
    });

    const discountedSalesPrice = computed(() => {
        if(item.value.sku.discountedSalesPrice && Number(item.value.sku.discountedSalesPrice) > 0){
            return (Number(item.value.sku.discountedSalesPrice));
        }
        return 0
    });

    const price = computed(() => {
        if(item.value.sku.salesPrice && Number(item.value.sku.salesPrice) > 0){
            return (Number(item.value.sku.salesPrice));
        }
        return 0
    });

    const productQuantity = computed(() => {
        if(item.value && item.value.quantity) {
            return item.value.quantity;
        }
        return 0;
    });

    const productSubtotal = computed(() =>  {
        let subTotal = Number(productPrice.value) * Number(productQuantity.value);
        return (Number(subTotal));
    });

    return {
        id,
        name,
        productImage,
        productAttributes,
        productSize,
        productColor,
        productPrice,
        productQuantity,
        productSubtotal,
        discountedSalesPrice,
        price,
    };
}
