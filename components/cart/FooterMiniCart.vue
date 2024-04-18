<template>
    <div
        id="footer-mini-cart"
        class="footer-mini-cart px-2 px-lg-4"
        :class="showCart && 'open-cart'"
    >
    
        <div class="sc-head d-flex align-items-center justify-content-space-between">
            <div class="cart-count col-9 col-lg-9 col-md-9 col-sm-9 fs-3 d-flex justify-content-start" >
                <span>Added to Cart</span>
            </div>

            <div class="col-3 col-lg-3 col-md-3 col-sm-3  d-flex justify-content-end">
                <div class="close-icon rounded-circle border border-light d-flex justify-content-center align-items-center">
                    <i class="fas fa-times fs-3" @click="$emit('close')"></i>
                </div>
            </div>
        </div>
        <!-- {{ cartStore }} -->
        <div class="row" style="height: 200px;" >
            <div class="col-12 col-lg-10 col-xl-10 overflow-scroll h-100">
                <div v-if="cartStore.items.length" class="d-flex justify-content-start row">
                    <!-- <div v-for="(item, i) in cartStore.items" :key="i" class="h-100 mx-1">
                        <img
                            :src="productImage(item)"
                            alt="products"
                            class="img-fluid rounded-6"
                            style="height: 100px; width: 100px;"
                        />
                    </div> -->
                    <CartFooterMiniCartItem v-for="(item, i) in cartStore.items" :key="i" :item="item"/>
                </div>
                
                <div v-else class="w-100">
                    <div class="empty-image-section">
                        <p
                            style="
                                font-size: 16px;
                                color: #1C1C34;
                                text-align: center;
                                font-weight: 700;
                            "
                        >
                            YOUR CART IS EMPTY
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-2 col-xl-2 col-xxl-2">
                <div v-if="cartStore.items.length" class="d-flex flex-column btn-group my-1 mx-2" role="group" aria-label="Basic outlined example">
                    <span class="c-cart-subtotal-text text-start mx-1">Shipping to Bag ({{ cartStore.items.length }}) Total</span>
                    <p class="fw-bold m-0 m-1"><span class="fs-4 fw-bold">SubTotal:&nbsp;</span> BDT {{ cartStore.total }}/-</p>
                    <button 
                        type="button" 
                        class="mb-2 rounded-5 px-4 btn c-btn-primary py-1" 
                        @click.prevent="$emit('openCart')"
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
      
<script setup>
import { useCartStore } from "@/stores/cart";
import { itemsClient } from '@/libs/gandalf/apis/config';

const cartStore = useCartStore();
const router = useRouter();

const props = defineProps({
    showCart: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(['closeSideCart'])

const items = ref([]);

const goTo = (name) => {
    
    router.push({
        name: name,
    });

    emits('closeSideCart', false);
}

const setLoading = (numberOfShimmer) => {
    let shimmers = [];

    let length = numberOfShimmer ? numberOfShimmer : 4;
    
    for (let index = 0; index < length; index++) {
        shimmers.push({ isLoading: true });
    }

    return shimmers;
};

const fetchNewArrival = async () => {
    items.value = setLoading(2);

    let params = {
        textParams: [{ field: "status", value: "ACTIVE", matchType: "EXACT" }],
        sortParams: [
            { field: "dateCreated", type: "DESCENDING" },
            { field: "totalPopularity", type: "DESCENDING" },
        ],
        fetchCount: "false",
        page: 1,
        size: 18,
        status: "ACTIVE",
    };

    itemsClient.search(params).then((res) => {
        if (!res.networkError) {
            if (res.status == 200) {
                if (res.body && res.body.list && res.body.list.length) {
                    items.value = res.body.list;
                }
            }
        } else {
            console.log("networkProblem");
        }
    });
};

// const productImage = (item) => {
//     if (item?.product?.images?.length) {
//         return item.product.images[0];
//     }
//     return "";
// };

onMounted(() => {
    fetchNewArrival();
});

// watch(()=> props.showCart, ()=> {
//     if (process.client) {
//         const body = document.querySelector("body");
//         if (props.showCart) body.style.setProperty("overflow", "hidden");
//         else body.style.removeProperty("overflow");
//     }
// }, {immediate: true, deep: true});

</script>
      
<style lang="scss">
    
    .empty-image-section {
        height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .empty-img {
            height: auto;
            width: 200px;
        }
    }
    
    
    
    .footer-mini-cart {
        width: 100%;
        position: fixed;
        bottom: -1000px;
        right: 0px;
        z-index: 9999;
        background-color: white;
        height: 250px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    
        @media screen and (max-width: 1650px) {
            overflow-y: hidden;
            overflow-x: hidden;
            height: 30vh;
        }

        @media screen and (max-width: 1500px) {
            overflow-y: auto;
            overflow-x: hidden;
            // height: 85vh;
            height: 30vh;
        }

        @media screen and (max-width: 500px) {
            overflow-y: auto;
            overflow-x: hidden;
            height: 30vh;
            // height: 85vh;
        }
    
        .c-btn-outline-primary {
            border: 1px solid #2277E0;
            border-radius: 35px !important;
            font-weight: 700 !important;
            color: #1C1C24 !important;
            font-size: 16px;
        }
    
        .c-btn-outline-primary:hover {
            background-color: #2277E0;
            color: #ffff !important;
            font-weight: 700 !important;
        }
    
        .c-btn-primary {
            background-color: #2277E0;
            color: #ffff !important;
            border-radius: 35px !important;
            font-weight: 700 !important;
            font-size: 16px;
        }
    
        .c-btn-primary:hover {
            border: 1px solid #2277E0;
            color: #1C1C24 !important;
            font-weight: 700 !important;
            background-color: #ffff;
        }
    
        .c-cart-summary-text {
            font-size: 1.2rem;
            font-weight: 700;
        }
    
        .c-cart-subtotal-text {
            font-size: 1rem;
            font-weight: 700;
        }
    
        .cart_item_section {
            min-height: 15% !important; 
            height: 15% !important; 
            overflow-y: auto !important;
        }
    
        @media screen and (max-width: 1500px) {
            .cart_item_section {
                min-height: 20% !important; 
                height: 32% !important; 
                overflow-y: auto !important;
            }
        }
    
        @media screen and (max-width: 370px) {
            .cart_item_section {
                min-height: 20% !important; 
                height: 20% !important; 
                overflow-y: auto !important;
            }
        }
    }
    .footer-mini-cart.open-cart {
        // right: 0;
        bottom: 0;
    }
    .footer-mini-cart .sc-head {
        background-color: #FFFF;
        padding: 5px;
    }
    .footer-mini-cart .sc-head .cart-count {
        color: #1C1C24;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
    }
    .footer-mini-cart .sc-head .cart-count svg {
        fill: #1C1C24;
    }
    .footer-mini-cart .sc-head .cart-count span {
        margin-left: 6px;
        margin-top: 6px;
    }
    .footer-mini-cart .sc-head .close-icon {
        width: 30px;
        height: 30px;
        color: #1C1C24;
        cursor: pointer;
    }
    .footer-mini-cart .sc-head .close-icon:hover {
         color: #1C1C34;
    }
    .footer-mini-cart .cart-product-container {
        // height: calc(100vh - 350px);
        overflow-y: auto;
    }
    .footer-mini-cart .cart-product-item {
        padding: 5px 20px;
        // border-bottom: 1px solid #dbdbdb;
        position: relative;
    }
    .footer-mini-cart .cart-product-item .close-item {
        position: absolute;
        right: 10px;
        top: 5px;
        color: #1C1C34;
        cursor: pointer;
        z-index: 1;
    }
    .footer-mini-cart .cart-product-item .product-content .product-title {
        font-size: 16px;
        font-weight: 700;
        color: #000;
    }
    .footer-mini-cart .cart-product-item .product-content .product-cart-info {
        font-size: 13px;
        color: #bebebe;
    }
    .footer-mini-cart .product-price {
        font-size: 14px;
        font-weight: 700;
        color: #000;
    }
    .footer-mini-cart .product-price del {
        color: #bebebe;
        font-weight: 400;
    }
    .footer-mini-cart .product-price span {
        color: #363636;    
    }
    .footer-mini-cart .cart-footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    .footer-mini-cart .price-increase-decrese-group {
        background-color: #1C1C24;
        padding: 0px 10px;
        border-radius: 5px;
        width: 100px;
    }
    .footer-mini-cart .price-increase-decrese-group button {
        color: white;
        padding: 5px 5px;
        cursor: pointer;
        outline: none;
        border: none;
        i {
            display: flex;
            &:hover {
                color: red;
            }
        }
        font-size: 12px;
        //   font-weight: 600;
        //   background-color: red;
    }
    .footer-mini-cart .price-increase-decrese-group button:focus {
        outline: none;
        box-shadow: none;
    }
    .footer-mini-cart .price-increase-decrese-group input {
        width: 40px;
        background-color: #1C1C24;
        color: white;
        outline: none;
        border: none;
        padding: 0px 5px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
    }
    
    .product-other-charge {
        padding: 15px 20px;
        display: none;
    }
    .product-other-charge p {
        font-weight: 700;
        margin-bottom: 5px;
    }
    .product-other-charge a {
        color: #1C1C24;
        font-weight: 500;
    }
    
    .cart-total {
        padding: 15px 20px;
        background-color: #f5f5f5;
        position: relative;
        z-index: 2;
    }
    .cart-total .saving {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 5px;
    }
    .cart-total .total-price {
        font-weight: 700;
        font-size: 20px;
        color: #1C1C24;
        margin-bottom: 5px;
    }
    .cart-total .procced-checkout {
        background-color: #1C1C24;
        color: white;
        display: block;
        text-align: center;
        padding: 10px 30px;
        border-radius: 5px;
        margin-top: 10px;
    }
    .cart-total .procced-checkout:hover {
        background-color: #1C1C24;
    }
    
</style>
      