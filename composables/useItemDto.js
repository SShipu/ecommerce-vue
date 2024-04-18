import { computed } from 'vue';

export function useItemDto(item) {

    const id = computed(() => {
        if (item.value && item.value.id && item.value.id.length > 0) {
            return item.value.id;
        }
        return '';
    });

    const primaryImageUrl = computed(() => {
        let url = '/images/no-image.png';

        // console.log("~~~~~~~~~~~item.value");
        // console.log(item.value);
        
        if (item.value && item.value.images && item.value.images.length > 0) {
            url = item.value.images[0].url ? item.value.images[0].url : item.value.images[0] ;

        } else if (item.value && item.value.image && item.value.image != '') {

            url = item.value.image;

        } else if (item.value?.fields?.image.length) {
            url = item.value.fields.image;
        } else if (item.value?.attachment?.length) {
            url = item.value.attachment;
        } 

        return url;
    });



    const primaryImages = computed(() => {
        let url = ['/images/no-image.jpg'];
        if (item.value && item.value.images && item.value.images.length > 0) {
            if (item.value.images.length > 1) url = [item.value.images[0].url, item.value.images[1].url];
            else url = [item.value.images[0].url];
        } else if (item.value && item.value.attachments && item.value.attachments.length > 0) {
            if (item.value.attachments.length > 1) url = [item.value.attachments[0].url, item.value.attachments[1].url];
            else url = [item.value.attachments[0].url];
        }

        return url;
    });

    const title = computed(() => {
        if (item.value && item.value.title) {
            return item.value.title;
        }
        return '';
    });

    const category = computed(() => {
        if (item.value?.categories?.length) {
            return item.value.categories.join(", ");
        }
        return '';
    });

    const price = computed(() => {
        
        if(item.value && item.value.minPrice) {
            return item.value.minPrice + '';
        } else if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.tags[0] == 'FINISHED_GOODS') return item.value.skus[0].salesPrice + '';
            }

            if (item.value.tags[0] == 'FINISHED_GOODS') return item.value.salesPrice + '';
            
            if (item.value && item.value.fee) return item.value.fee + '';

        } else if(item.value && item.value.price) {

            return item.value.price;
        } else if(item.value && item.value.fee) {

            return item.value.fee + '';
        } else if(item.value && item.value.minFee) {
            return item.value.minFee;
        }
        return '';
    });

    const discountedSalesPrice = computed(() => {
        if(item.value && item.value.discountedSalesPrice) {
            return item.value.discountedSalesPrice;
        } else if (item.value?.minDiscountedPrice > 0) {
            return item.value.minDiscountedPrice;
        } else if (item.value && item.value.tags && item.value.tags.length > 0) {
            if (item.value.skus && item.value.skus.length > 0) {
                if (item.value.tags[0] == 'FINISHED_GOODS')
                    return item.value.skus[0].discountedSalesPrice + '';
            }
            if (item.value.tags[0] == 'FINISHED_GOODS') return item.value.discountedSalesPrice + '';
        }
        return 0;
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

    return {
        id,
        primaryImageUrl,
        primaryImages,
        title,
        price,
        category,
        discountedSalesPrice,
        subscriptionPrice,
    };
}
