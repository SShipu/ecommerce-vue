<template>
    <div class="cart-product-item" >
         <div class="d-flex row">
            <div class="col-sm-8 col-8 col-lg-8 col-md-8">
                <div class="d-flex row">
                    <div class="col-4 col-sm-4 p-0">
                        <div class="thumb">
                            <a href="">
                                <img
                                    :src="productImage"
                                    alt="products"
                                    class="img-thumbnail rounded-6 w-100"
                                    style="height: auto !important; "
                                />

                                
        
                                <!-- <img
                                    src="/images/4.png"
                                    alt="products"
                                    class="rounded-6"
                                    style="height: 10vh !important; width: 100% !important;"
                                /> -->
                            </a>
                        </div>
                    </div>
        
                    <div class="col-7 col-sm-7">
                        <div class="col-12 col-sm-12">
                            <div class="product-content">
                                <!-- <a href="" class="product-title fw-bold">Baby Crocodile T-shirt</a> -->
                                <a href="" class="product-title">{{ name }}</a>
                                <!-- <div class="product-cart-info">{{ itemDto.productQuantity() }} X {{ itemDto.productPrice() }}</div> -->
                            </div>
                        </div>
    
                        <div class="col-12 col-sm-12">
                            <div class="product-price" >
                                <!-- <span class="ml-4">Tk. 1700</span> -->
                                <span class="ml-4">BDT {{ productSubtotal }}</span>
                            </div>
                        </div> 
                        <div class="d-flex flex-column col-12 col-sm-12">
                            <span >Color: {{ productColor }}</span>
                            <span >Size: {{ productSize }}</span>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-sm-4 col-4 col-lg-4 col-md-4" >
                <div class="price-increase-decrese-group d-flex">
                    <span class="decrease-btn">
                        <button
                            @click.prevent="onDecreaseQuantity()"
                            type="button"
                            class="btn quantity-left-minus"
                            data-type="minus"
                            data-field=""
                        >
                        <i class="fas fa-minus"></i>
                        </button>
                    </span>
        
                    <input
                        type="text"
                        name="quantity"
                        class="form-controls input-number"
                        v-model="quantity"
                    />
                    
                    <span class="increase">
                        <button
                            @click.prevent="onIncreaseQuantity()"
                            type="button"
                            class="btn quantity-right-plus"
                            data-type="plus"
                            data-field=""
                        >
                        <i class="fas fa-plus"></i>
                        </button>
                    </span>
                </div>

                <div class="c-remove-section d-flex justify-content-end" 
                    @click.prevent="cartStore.removeCartItem(item)"
                >
                    <i class="c-trash fas fa-trash-alt float-end me-1 pt-1">
                    </i>
                    <span class="c-remove-text sm-fs-1 fw-bold me-2" >Remove</span>
                </div>
            </div>
        </div>
        <ModalBaseToastr ref="toaster"/> 
    </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { useCartItemDto } from "@/composables/cart/useCartItemDto";
import skuUtils from "@/composables/sku-utils";

const cartStore = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});

const toaster = ref(null);

const itemRef = toRef(props, 'item');
const {
    id,
    productImage,
    name,
    productAttributes,
    productSize,
    productColor,
    productPrice,
    productQuantity,
    productSubtotal } = useCartItemDto(itemRef);

const quantity = ref(0);

const selectedTotalQuantity = computed(() => {
    if (props.item) {
        return skuUtils.skuTotalQuantity(
            props.item.product,
            props.item.sku,
            'LOLY2UVD-1HBTY4ZESF7YX--197IBCC0D3AIK'
        );
    }
    return 0;
});

if (productQuantity.value) {
    quantity.value = productQuantity.value;
}

// methods start here
const onIncreaseQuantity = async () => {

    if (Number(selectedTotalQuantity.value) > Number(productQuantity.value)) {

        cartStore.increase(itemRef.value);
        toaster.value.success(`Item added`, 1500);

    } else {
        toaster.value.error(`No more Stock`, 1500);
        // will show toast
    }
};

const onDecreaseQuantity = async () => {
    if (Number(productQuantity.value) > 1) {
        cartStore.decrease(props.item);
        // toaster.value.success(`Item added`, 1500);
        toaster.value.success(`Item remove`, 1500);
    } else {
        toaster.value.error(`Item Not Remove`, 1500);
        // will show toast
    }
    // cartStore.decrease(props.item);
    // toaster.value.success(`Item remove`, 1500);
};

const goToDetailPage = () => {
    router.push({
        name: "products",
        query: {
            id: id.value,
        },
    });
};

watch(
    cartStore,
    () => {
        quantity.value = productQuantity.value;
    },
    { immediate: true },
    { deep: true }
);

</script>

<style lang="scss" scoped>

.c-remove-section {
    cursor: pointer;

    .c-trash {
        font-size: 12px !important;
        color: #2277E0;
        font-weight: 400 !important;

    }
    .c-remove-text {
        font-size: 16px !important;
        color: #2277E0;
    }

    &:hover {
        .c-trash {
            color: red;
        }
        .c-remove-text {
            color: red;
        }
    }
}
</style>