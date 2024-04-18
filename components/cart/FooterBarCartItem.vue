<template>
    <div class="cart-product-item" >
        <!-- {{ itemRef }} -->
        <div class="d-flex row">
            <div class="col-sm-12 col-12 col-lg-12 col-md-12">
                <div class="d-flex row">
                    <div class="col-4 col-sm-4 p-0">
                        <div class="thumb">
                            <a href="">
                                <img
                                    :src="productImage"
                                    alt="products"
                                    class="img-thumbnail rounded-6 w-100 h-20vh"
                                    
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
                                <span class="ml-4" v-if="globalDiscount > 0">TK. {{ globalDiscount }}</span>
                                <span class="ml-4" v-else>TK. {{ productPrice }}</span>
                            </div>
                        </div> 
                        <!-- <div class="d-flex flex-column col-12 col-sm-12">
                            <span >Color: {{ productColor }}</span>
                            <span >Size: {{ productSize }}</span>
                        </div> -->

                        <div class="row d-flex justify-content-space-between mt-2">
                            <div class="col-8 d-flex align-items-center">
                                <div class="num_count">
                                    <div id="minus" class="minus">
                                        <button class="btn" @click.prevent="onDecreaseQuantity()"><i class="fas fa-minus"></i></button>
                                    </div>
        
                                    <!-- :disabled="!selectedHasEnoughQuantity" -->
                                    <input
                                        id="qty1"
                                        v-model="quantity"
                                        :disabled="true"
                                        type="text"
                                        class="qty"
                                    />
        
                                    <div id="add" class="add">
                                        <button class="btn" @click.prevent="onIncreaseQuantity()"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4 d-flex align-items-center">
                                <div class="c-remove-section mb-2" 
                                    @click.prevent="cartStore.removeCartItem(item)"
                                >
                                    <i class="c-trash fas fa-trash-alt float-end me-1 pt-1">
                                    </i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    
            <!-- <div class="col-sm-4 col-4 col-lg-4 col-md-4" >
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
            </div> -->
        </div>

        <ModalBaseToastr ref="toaster"/> 
    </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { useCartItemDto } from "@/composables/cart/useCartItemDto";
import skuUtils from "@/composables/sku-utils";

import { useGlobalDiscountStore } from "@/stores/global-discount-store";

const globalDiscountStore = useGlobalDiscountStore();
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
    discountedSalesPrice,
    price,
    productSubtotal 
} = useCartItemDto(itemRef);

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

const globalDiscount = computed(() => {
    if (!props.item?.id) {
        return 0;
    }
    if (discountedSalesPrice.value) {
        return discountedSalesPrice.value;
    }
    let discountPrice = 0;
    let salesPrice = Number(price.value);
    // let categoryId = props?.item?.categoryIds[0].replaceAll("-", "");
    let categoryIds = props?.item?.categoryIds.map(i => i.replaceAll("-", ""));
    let collectionIds = props?.item?.collectionIds.map(i => i.replaceAll("-", ""));
    
    if (globalDiscountStore?.discounts?.length) {
        globalDiscountStore.discounts.forEach(element => {
            let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);

            if (element.type === 'FIXED_CATEGORY' && element.valid) {
                let findItem = element?.categories?.length && element.categories.filter(i=> categoryIds.includes(i.categoryId.replaceAll("-", "")));
                // let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId.replaceAll("-", "") === categoryId);
                if (findItem.length) {
                    discountPrice = discount;
                }
            }

            if (element.type === 'FIXED_COLLECTION' && element.valid) {
                // let findItem = element?.collections?.length && element.collections.filter(i=> i.collectionId.replaceAll("-", "") === collectionId);
                let findItem = element?.collections?.length && element.collections.filter(i=> collectionIds.includes(i.collectionId.replaceAll("-", "")));
                if (findItem.length) {
                    discountPrice = discount;
                }
            }

            if (element.type === 'FIXED_PRODUCT' && element.valid) {
                let findItem = element?.items?.length && element.items.filter(i=> i.itemId === props.item.id && !i?.skuCode?.length);
                if (findItem.length) {
                    discountPrice = discount;
                }
            }
        });
    }

    return discountPrice;
});

// const globalDiscount = computed(() => {
//     if (!props.item?.product?.id) {
//         return 0;
//     }
//     if (discountedSalesPrice.value) {
//         return discountedSalesPrice.value;
//     }

//     let categories = props?.item?.product?.categories;
//     let discountPrice = 0;
//     let salesPrice = Number(price.value);
//     let categoryId = categories[0]?.id.replaceAll("-", "");

//     if (globalDiscountStore?.discounts?.length) {
//         globalDiscountStore.discounts.forEach(element => {
//             let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);
            
//             if (element.type === 'FIXED_CATEGORY' && element.valid) {
//                 let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId.replaceAll("-", "") === categoryId);
//                 if (findItem.length) {
//                     discountPrice = discount;
//                 }
//             }

//             if (element.type === 'FIXED_PRODUCT' && element.valid) {
//                 let findItem = element?.items?.length && element.items.filter(i=> i.itemId === props.item.id && !i?.skuCode?.length);
//                 if (findItem.length) {
//                     discountPrice = discount;
//                 }
//             }
//         });
//     }

//     return discountPrice;
// });

</script>

<style lang="scss" scoped>

.num_count {
    width: 120px;
    height: 40px;
    -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
    box-shadow: 0px 1px 10px 5px #f4f4f4;
    position: relative;
    border-radius: 35px;
    border: 1px solid #2277E0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
    
.num_count input {
    width: 50px;
    text-align: center;
    margin: 0 auto;
    border: none;
    font-size: 18px;
    font-weight: 700;
}

.num_count button {
    padding: 0;
    i {
        font-size: 14px;
    }
}

.num_count .minus {
    left: 0px;
    display: flex;
    cursor: pointer;
    color: #1f2230;
    position: absolute;
    height: inherit;
    width: 35px;
    text-align: center;
    border-right: 1px solid #2277E0;
}

.num_count button,
.num_count button:focus {
    width: 100%;
    border: none;
    -webkit-box-shadow: none;
            box-shadow: none;
    font-size: 20px;
}

.num_count .add {
    position: absolute;
    display: flex;
    right: 0px;
    cursor: pointer;
    width: 35px;
    height: inherit;
    color: #1f2230;
    border-left: 1px solid #2277E0;
}

.num_count .minus button {
    text-align: center;
}

.num_count .add button {
    text-align: center;
}
.c-remove-section {
    cursor: pointer;

    .c-trash {
        font-size: 18px !important;
        
        color: red;
        font-weight: 400 !important;

    }
    .c-remove-text {
        font-size: 16px !important;
        color: #2277E0;
    }

    &:hover {
        .c-trash {
            color: #2277E0;
        }
        .c-remove-text {
            color: red;
        }
    }
}
</style>