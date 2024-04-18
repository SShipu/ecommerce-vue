<template>
    <div class="px-1 px-sm-2">
        <div class="card-img-top bg-image position-relative my-2">

            <img :src="imageUrl" style="height: auto" class="w-100 rounded float-start" alt="...">
            <div 
                class="card-tag position-absolute d-flex justify-content-center align-items-center"
                style="border-radius: 90px; height: 18px; width: 18px;"
            >
                <span style="color: #ffff; font-weight: 700;">
                    {{ quantity }}
                </span>
            </div>
        </div>

        <!-- <div class="d-flex row my-2">
            <div class="col-4 col-md-2 col-xxl-1">
                <img :src="imageUrl" class="rounded-3 w-100 rounded float-start" alt="...">
            </div>

            <div class="col-6">
                <div class="col-12 col-sm-12">
                    <div class="product-content">
                        <a href="" class="product-title fw-bold fs-4" style="color: #202028;">{{ name }}</a>
                    </div>
                </div>

                <div class="d-flex flex-column col-12 col-sm-12 mt-sm-1">
                    <span >TK. {{ price }}</span>
                    <span >Quantity: {{ quantity }}</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>

const props = defineProps({
    item: {
        type: Object,
        default: null,
    }
});

const itemRef = toRef(props, 'item');

const imageUrl = computed(() => {
    if(itemRef.value?.imageUrl) {
        return itemRef.value.imageUrl;
    }

    return ''
});

const name = computed(() => {
    if(itemRef.value?.itemTitle) {
        return itemRef.value.itemTitle;
    }

    return ''
});

const price = computed(() => {
    if(itemRef.value?.discountedPrice) {
        return itemRef.value.discountedPrice;
    } else if(itemRef.value?.price) {
        return itemRef.value.price;
    }

    return ''
});

const quantity = computed(() => {
    if(itemRef.value?.quantity) {
        return itemRef.value.quantity;
    }

    return ''
})

</script>

<style lang="scss" scoped>
.card-tag {
    top: -5px;
    right: -4px;
    background-color: #2277e0;
}
</style>