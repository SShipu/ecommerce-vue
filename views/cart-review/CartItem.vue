<template>
    <section class="pb-3 pb-xl-0">
        <!-- <div class="col-4"> -->
        <!-- <div class="col-2 bg-image" :style="{backgroundImage: `url(${productImage})`}"> -->
            <!-- <img :src="productImage" style="height: auto" class="w-100 rounded float-start" alt="..."> -->
        <!-- </div> -->

        <div class="col-8">
            <div class="row d-flex flex-column flex-sm-row">
                <div class="col-6 col-sm-3">
                    <img :src="productImage" style="height: auto" class="w-100 rounded float-start" alt="...">
                </div>

                <div class="col-12 col-sm-9">
                    <div class="col-12 col-sm-12">
                        <div class="product-content">
                            <a class="product-title fw-bold fs-4" style="color: #202028;">{{ name }}</a>
                        </div>
                    </div>
        
                    <div class="d-flex flex-column col-12 col-sm-12 mt-sm-2">
                        <span >Color: {{ productColor }}</span>
                        <span >Size: {{ productSize }}</span>
                    </div>
        
                    <div class="d-flex flex-column col-12 col-sm-12 mt-0 mt-sm-2">
                        <h5><span class="badge p-2"  style="background-color: #FF7F30;">2-Day Delivary</span></h5>
                    </div> 
        
                    <div class="d-flex flex-column col-12 col-sm-12 mt-0 mt-sm-1">
                        <span class="fs-4" style="color: #556477;">Shipping-Get it by {{ deliveryDate }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-4 col-lg-3 float-end d-flex flex-column" >
            <div class="col-12 col-sm-12">
                <div class="product-content float-end">
                    <!-- <a href="" class="product-title fw-bold">Baby Crocodile T-shirt</a> -->
                    <a href="" class="product-title fw-bold fs-4" style="color: #202028;">TK. {{ productPrice }}</a>
                </div>
            </div>

            <div class="col-12 col-sm-12 my-3">
                <div class="float-end  num_count">
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

            <div class="c-remove-section col-12 col-sm-12 d-flex flex-column flex-sm-column flex-xl-column flex-xxl-row justify-content-end">
                <div class="d-flex justify-content-end c_remove">
                    <i class="c-trash fas fa-trash-alt float-end me-1 pt-1">
                    </i>
                    <span class="c-remove-text sm-fs-1 fw-bold me-2" @click.prevent="cartStore.removeCartItem(item)">Remove</span>
                </div>

                <a @click.prevent="addToWishList()" class="c-save-text fw-bold text-decoration-underline">Save for later</a>
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

const { name,
        productImage,
        productAttributes,
        productSize,
        productColor,
        productPrice,
        productQuantity,
        productSubtotal } = useCartItemDto(itemRef);


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
</script>

<style lang="scss" scoped>
.c-remove-section {
        .c-trash {
            font-size: 16px !important;
            color: #2277E0;
            font-weight: 400 !important;
        }
        cursor: pointer;
        .c_remove{
            &:hover {
                .c-trash {
                    color: red;
                }
                .c-remove-text {
                    color: red;
                }
            }
        }

        .c-remove-text {
            font-size: 18px !important;
            color: #2277E0;
        }

        .c-save-text {
            font-size: 18px;
            color: #2277E0;
            text-align: end;
            &:hover {
                color: #1C1C24;
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
</style>