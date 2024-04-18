<template>
    <section class="pb-3 pb-xl-2 border-bottom">
        <!-- <div class="col-4"> -->
        <!-- <div class="col-2 bg-image" :style="{backgroundImage: `url(${productImage})`}"> -->
            <!-- <img :src="productImage" style="height: auto" class="w-100 rounded float-start" alt="..."> -->
        <!-- </div> -->

        <div class="col-12 col-sm-8">
            <div class="row d-flex flex-sm-row">
                <div class="col-4 col-sm-3">
                    <img :src="productImage" style="height: auto" class="w-100 rounded float-start" alt="...">
                </div>

                <div class="col-8 col-sm-9">
                    <div class="col-12 col-sm-12">
                        <div class="product-content">
                            <a class="product-title fw-bold fs-4" style="color: #202028;">{{ name }}</a>
                        </div>
                    </div>
        
                    <div class="d-flex flex-column col-12 col-sm-12 mt-sm-2">
                        <!-- <span v-if="productColor">Color: {{ productColor }}</span> -->
                        <span v-if="productSize">Size: {{ productSize }}</span>
                        <span class="d-block d-sm-none" style="color: #000; font-weight: 700;" v-if="globalDiscount > 0">Tk. {{ globalDiscount }}</span>
                        <span class="d-block d-sm-none" style="color: #000; font-weight: 700;" v-else>Tk. {{ productPrice }}</span>
                    </div>

        
                    <div class="d-flex col-12 col-sm-12 mt-0 mt-sm-2" >
                        <div class="col-8 d-flex align-items-center">
                            <div class="num_count">
                                <div id="minus" class="minus">
                                    <button class="btn" @click.prevent="onDecreaseQuantity()"><i class="fas fa-minus"></i></button>
                                </div>

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

                        <div class="col-4 d-flex align-items-start justify-content-start">
                            <div class="c-remove-section mb-2" 
                                @click.prevent="cartStore.removeCartItem(item)"
                            >
                                <i class="c-trash fas fa-trash-alt float-end me-1 pt-1">
                                </i>
                            </div>
                        </div>
                    </div> 
                    <!-- {{ item }} -->
                    <!-- {{ packagingInstructions }} -->
                    <!-- <div>
                        <BaseCheckBox 
                            v-model="packagingInstructions.isGiftWrap" 
                            label="🎁 Gift Wrap this item?"
                            class="d-flex justify-content-start my-2"
                        />
                        <div class="row px-2" v-if="packagingInstructions.isGiftWrap">
                            <div class="col-6">
                                <div class="row mb-3 me-1">
                                    <label for="floatingInput" class="ps-0 text-davys-grey">Sender</label>
                                    <input 
                                        type="text" 
                                        class="form-control rounded-3 text-black" 
                                        id="floatingInput" 
                                        placeholder="Sender"
                                        v-model="packagingInstructions.sender"
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row mb-3">
                                    <label for="floatingInput" class="ps-0 text-davys-grey">Recipient</label>
                                    <input 
                                        type="text" 
                                        class="form-control rounded-3 text-black" 
                                        id="floatingInput" 
                                        placeholder="Recipient"
                                        v-model="packagingInstructions.recipient"
                                    >
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row mb-3">
                                    <label for="floatingInput" class="ps-0 text-davys-grey">Message</label>
                                    <textarea 
                                        class="rounded-3 border border-light outline-none text-black" 
                                        name="" 
                                        id="" 
                                        cols="6" 
                                        rows="4"
                                        placeholder="Message"
                                        v-model="packagingInstructions.message"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="d-none d-sm-block col-12 col-sm-4 col-lg-3 float-end d-flex flex-column" >
            <div class="col-12 col-sm-12">
                <div class="product-content float-end">
                    <!-- <a href="" class="product-title fw-bold">Baby Crocodile T-shirt</a> -->
                    <a href="" class="product-title fw-bold fs-4" style="color: #202028;" v-if="globalDiscount > 0">TK. {{ globalDiscount }}</a>
                    <a href="" class="product-title fw-bold fs-4" style="color: #202028;" v-else>TK. {{ productPrice }}</a>
                </div>
            </div>
        </div>


        <ModalBaseToastr ref="toaster"/>
    </section>
</template>

<script setup>
import { useCartItemDto } from '~~/composables/cart/useCartItemDto';
import { useCartStore } from '~~/stores/cart';
import { useWishlistStore } from '~~/stores/wishlist-store';
import { cmsClient } from '~~/libs/gandalf/apis/config';
import { useAuthStore } from '~~/stores/auth-store';
import { DateUtils } from '~~/libs/utils/DateUtils';

import { useGlobalDiscountStore } from "@/stores/global-discount-store";

const globalDiscountStore = useGlobalDiscountStore();

const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
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
const isGiftWrap = ref(false);

const packagingInstructions = ref({
    isGiftWrap: false,
    sender: "",
    recipient: "",
    message: "",
    fee: 120
})

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

const deliveryDate = computed(() => {
    return DateUtils.millisecondsToReadableWeekDay(new Date(new Date().getTime()+(2*24*60*60*1000)));
});

watch(
    cartStore,
    () => {
        quantity.value = productQuantity.value;
    },
    { immediate: true },
    { deep: true }
);

watch(() => props.item, () => {
    if (props.item?.packagingInstructions?.isGiftWrap) {
        packagingInstructions.value = props.item.packagingInstructions;
    }
    quantity.value = productQuantity.value;
},
{ immediate: true, deep: true });

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


const addToWishList = async () => {
    let title = props.item.product.title;

    let data = {
        itemId: props.item.product.id,
        skuCode: props.item.product.code,
        wishlistId: ""
    }

    if(authStore && authStore.currentUser) {
        if(!isActive.value) {
            cmsClient.addToWishlist(data).then((res)=> {
                
                if(!res.networkError) {
                    if (res.status == 201) {
                        toaster.value.success(`${title} Successfully added to Wishlist`, 1500);
                        wishlistStore.updateList(data);
                    } else {
                        toaster.value.error(`${title} Failed to add Wishlist`, 1500);
                    }
                } else {
                    toaster.value.error(`Please Check your Internate Connection`, 1500);
                }
            }).catch((err) => {
                toaster.value.error(`Failed to add Wishlist`, 1500);
            });
        }
    
        cartStore.removeCartItem(itemRef.value);
    } else {
        toaster.value.error(`Login First`, 1500);
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

const isActive = computed(() => {
    let active = false;

    if (props.item.product && props.item.product.id) {
        let isExists = wishlistStore.isExists(props.item.product.id, props.item.product.code);

        if (isExists) {
            active = true;
        }
    }
    return active;
});
const addGiftPackageWrap = (val) => {
    if (props.item) {
        cartStore.addGiftPackageWrap(props.item, val)
    }
}
const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const debounced = debounce(addGiftPackageWrap, 500);

watch(packagingInstructions, () => {
    debounced(packagingInstructions.value);
}, {deep: true})
</script>

<style lang="scss" scoped>
.c-remove-section {
    cursor: pointer;

    .c-trash {
        font-size: 14px !important;
        
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

@media(max-width: 776px) {
    .c-remove-section {
        .c-trash {
            font-size: 12px !important;
        }

        .c-remove-text {
            font-size: 14px !important;
        }

        .c-save-text {
            font-size: 14px;
        }
    }
}
    .input-wrapper {
        position: relative;
        input {
            // border: 1px solid gray;
            // border-radius: 6px;
            position: relative;
            width: 100%;
            margin: 10px;
            line-height: 7ex;

            border-radius: 10px;
            border: 1px solid #D1D1D1;
            background: #fff; 
            padding-left: 20px;
        }
    
        label {
            position: absolute;
            top: 0.2ex;
            z-index: 1;
            left: 2em;
            background-color: white;
            padding: 0 5px;
            color: #1C1C24;
        }
    }


.num_count {
    width: 120px;
    height: 33px;
    -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
    box-shadow: 0px 1px 10px 5px #f4f4f4;
    position: relative;
    border-radius: 35px;
    border: 1px solid gray;
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
</style>