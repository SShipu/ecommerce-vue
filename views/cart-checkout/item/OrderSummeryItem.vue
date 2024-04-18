<template>
    <div class="c-order-review-item d-flex row my-2">
        <!-- <div class="col-2">
            <img src="/images/2.png" class="w-100 rounded float-start" alt="...">
        </div> -->
        <!-- <div class="col-2"> -->
        <!-- <div class="col-2 bg-image" :style="{backgroundImage: `url(${productImage})`}"> -->
            <!-- <img :src="productImage" style="height: 100%;" class="w-100 rounded float-start" alt="..."> -->
        <!-- </div> -->

        <div class="col-12 col-md-8">
            <div class="row d-flex flex-row flex-sm-row">
                <div class="col-4 col-sm-3 col-lg-4">
                    <div class="card-img-top bg-image position-relative">

                        <img :src="productImage" style="height: auto" class="w-100 rounded float-start" alt="...">
                        <div 
                            class="position-absolute card-tag bg-black d-flex justify-content-center align-items-center"
                            style="border-radius: 90px; height: 20px; width: 20px;"
                        >
                            <span style="color: #ffff; font-weight: 600;">
                                {{ quantity }}
                            </span>
                        </div>
                    </div>
                </div>


                <div class="col-8 col-sm-9 col-lg-8">
                    <div class="col-12 col-sm-12">
                        <div class="product-content">
                            <a href="" class="product-title fw-bold fs-4" style="color: #202028;">{{ name }}</a>
                        </div>
                    </div>
    
                    <div class="d-flex flex-column col-12 col-sm-12 mt-sm-2">
                        <!-- <span >Color:  {{ productColor }}</span> -->
                        <span >Size:  {{ productSize }}</span>
                        <!-- <a class="product-title fw-bold fs-4 d-block d-md-none" style="color: #202028;">TK.  {{ productPrice }}</a> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-4 d-none d-md-block">
            <div class="col-12 col-sm-12">
                <div class="product-content float-end">
                    <!-- <a href="" class="product-title fw-bold">Baby Crocodile T-shirt</a> -->
                    <a href="" class="product-title fw-bold fs-4" style="color: #202028;" v-if="globalDiscount">TK.  {{ globalDiscount }}</a>
                    <a href="" class="product-title fw-bold fs-4" style="color: #202028;" v-else>TK.  {{ productPrice }}</a>
                </div>
            </div>
        </div>
        <ModalBaseToastr ref="toaster"/> 
    </div>
</template>

<script setup>
import { useCartItemDto } from '~~/composables/cart/useCartItemDto';
import { useCartStore } from '~~/stores/cart';

import { useGlobalDiscountStore } from "@/stores/global-discount-store";

const globalDiscountStore = useGlobalDiscountStore();
const cartStore = useCartStore();

const props = defineProps({
    item: {
        type: Object,
        default: null
    }
});

const itemRef = toRef(props, 'item');

const toaster = ref(null);
const quantity = ref(1);

const { name,
        productImage,
        productAttributes,
        productSize,
        productColor,
        productPrice,
        productQuantity,
        discountedSalesPrice,
        price,
        productSubtotal 
} = useCartItemDto(itemRef);


if (productQuantity) {
    quantity.value = productQuantity.value;
}

watch(
    cartStore,
    () => {
        quantity.value = productQuantity.value;
    },
    { immediate: true },
    { deep: true }
);

const selectedTotalQuantity = computed(() => {
    if (itemRef.value) {
        return skuUtils.skuTotalQuantity(
            itemRef.value.product,
            itemRef.value.sku,
            "LOLY2UVD-1HBTY4ZESF7YX--197IBCC0D3AIK"
        );
    }
    return 0;
});

// increase quantity selected sku
const onIncreaseQuantity = async () => {
    if (Number(selectedTotalQuantity.value) > Number(productQuantity.value)) {
        cartStore.increase(itemRef.value);
        toaster.value.success(`Item added`, 1500);
    } else {
        toaster.value.error(`No more Stock`, 1500);
        // will show toast
    }
};

// decrease quantity selected sku
const onDecreaseQuantity = async () => {
    if (Number(productQuantity.value) > 1) {
        cartStore.decrease(props.item);
        toaster.value.success(`Item remove`, 1500);
    } else {
        toaster.value.error(`Item Not Remove`, 1500);
    }
};


const globalDiscount = computed(() => {
    
    if (!props.item?.product?.id) {
        return 0;
    }
    if (discountedSalesPrice.value) {
        return discountedSalesPrice.value;
    }

    let categories = props?.item?.product?.categories;
    let collections = props?.item?.product?.collections;
    let discountPrice = 0;
    let salesPrice = Number(price.value);
    // let categoryId = categories[0]?.id.replaceAll("-", "");
    let categoryIds = categories.map(i => i?.id.replaceAll("-", ""));
    let collectionIds = collections.map(i => i?.id.replaceAll("-", ""));
    
    if (globalDiscountStore?.discounts?.length) {
        globalDiscountStore.discounts.forEach(element => {
            let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);
            
            if (element.type === 'FIXED_CATEGORY' && element.valid) {
                // let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId === categoryId);
                let findItem = element?.categories?.length && element.categories.filter(i=> categoryIds.includes(i.categoryId.replaceAll("-", "")));
                if (findItem.length) {
                    discountPrice = discount
                }
            }
    
            if (element.type === 'FIXED_COLLECTION' && element.valid) {
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
</script>


<style lang="scss" scoped>
.c-order-review-item {
    .card-tag {
        top: -2px;
        right: -1px;
    }
    .num_count {
        width: 100%;
        // width: 160px;
        height: 55px;
        -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
        box-shadow: 0px 1px 10px 5px #f4f4f4;
        position: relative;
        border-radius: 15px;
        border: 1px solid #556477;
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
      width: 40%;
      text-align: center;
      margin: 0 auto;
      border: none;
      font-size: 16px;
      font-weight: 700;
    }
    
    .num_count button {
      padding: 0;
    }
    
    .num_count .minus {
      left: 0px;
      display: flex;
      cursor: pointer;
      color: #1f2230;
      position: absolute;
      height: inherit;
      width: 30%;
      text-align: center;
      border-right: 1px solid #556477;
      i {
        font-size: 12px;
      }
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
      width: 30%;
      height: inherit;
      color: #1f2230;
      border-left: 1px solid #556477;
      i {
        font-size: 12px;
      }
    }
    
    .num_count .minus button {
      text-align: center;
    }
    
    .num_count .add button {
      text-align: center;
    }

    .c-remove-section {
        .c-trash {
            font-size: 12px !important;
            color: #2277E0;
            font-weight: 400 !important;
        }

        .c-remove-text {
            font-size: 14px !important;
            color: #2277E0;
        }

        cursor: pointer;
        &:hover {
            .c-trash {
                color: red;
            }
            .c-remove-text {
                color: red;
            }
        }

    }

    @media(max-width: 776px) {
        .c-remove-section {
            .c-trash {
                font-size: 12px !important;
            }

            .c-remove-text {
                font-size: 14px !important;
            }
        }
    }
}
</style>