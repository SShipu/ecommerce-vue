<template>
<div
    id="sidebar-cart"
    class="sidebar-cart"
    :class="showCart && 'open-cart'"
>

    <div class="sc-head d-flex align-items-center">
        <div class="close-icon col-lg-3 col-md-3 col-sm-3 rounded-circle border border-light d-flex justify-content-center align-items-center">
            <i class="fas fa-times fs-3" @click="$emit('closeSideCart', false)"></i>
        </div>
        
        <div class="cart-count col-lg-9 col-md-9 col-sm-9 fs-3 d-flex justify-content-center " >
            <span>Added to Cart</span>
        </div>
    </div>

    <div v-if="cartStore.items.length" class="d-flex btn-group my-1 mx-2" role="group" aria-label="Basic outlined example">
        <button type="button" 
          class=" ms-2 rounded-5 px-4  btn c-btn-outline-primary py-2" 
          @click.prevent="goTo('cart-review')"
		>
              Review Cart
        </button>
        <button type="button" class=" ms-2 rounded-5 px-4  btn c-btn-primary py-2" @click="goTo('cart-checkout')">Check out now</button>
    </div>
    
    <div class="border-bottom d-flex justify-content-between px-3 pt-2 pb-3">
        <span class="c-cart-summary-text">Cart Summary</span>

        <span class="c-cart-subtotal-text">Subtotal: Tk. {{ cartStore.total }}</span>
    </div>
    
	<section class="w-100 cart_item_section">
		<div v-if="cartStore.items.length" class="cart-product-container">
			<CartSideBarCartItem 
				v-for="(item, i) in cartStore.items"
				:key="i"
				:item="item"
			/>
		</div>
	
		<!-- <div  class="cart-product-container"> -->
		<div v-else class="w-100 h-40vh">
				<div class="empty-image-section">
					<!-- <img class="empty-img" src="/images/cart.gif" alt="" /> -->
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
	</section>

	<section class="w-100" >
		<!-- <ItemList :items="items" title="Similar to this Product"/> -->

		<div class="mx-2">
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-center align-items-center">
                    <h4 class="">We Also Recommend</h4>
                </div>
                <!-- <div class="slider-sec d-flex justify-content-between my-2">
                    <div class="prev-btn rounded-circle d-flex justify-content-center align-items-center mx-1">
                        <i class="fa fa-chevron-left fa-lg"></i>
                    </div>
                    <div class="next-btn rounded-circle d-flex justify-content-center align-items-center mx-1">
                        <i class="fa fa-chevron-right fa-lg"></i>
                    </div>
                </div> -->
            </div>

            <div class="mx-0 row flex-nowrap w-100" style="overflow-x: scroll !important; scrollbar-width: none !important">
                <div 
                    class="col-6 col-lg-6 col-md-6 col-sm-6 col-sm-6 col-xs-6"
                    v-for="(item, i) in items" 
                    :key="i"
                >
                    <ItemCardNew 
						:item="item" 
						:is-color="false" 
						:is-new-badge="false"
					/>
                </div>
            </div>
        </div>
	</section>
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
        default: false,
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

onMounted(() => {
	fetchNewArrival();
});

watch(()=> props.showCart, ()=> {
    if (process.client) {
        const body = document.querySelector("body");
        if (props.showCart) body.style.setProperty("overflow", "hidden");
        else body.style.removeProperty("overflow");
    }
}, {immediate: true, deep: true});

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



.sidebar-cart {
    width: 400px;
    position: fixed;
    top: 0;
    right: -450px;
    z-index: 9999;
    background-color: white;
    height: 100vh;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;

    @media screen and (max-width: 500px) {
      width: 370px;
      right: -420px;
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
        min-height: 20% !important; 
        height: 40% !important; 
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
.sidebar-cart.open-cart {
  right: 0;
}
.sidebar-cart .sc-head {
  background-color: #FFFF;
  padding: 15px 20px;
}
.sidebar-cart .sc-head .cart-count {
  color: #1C1C24;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.sidebar-cart .sc-head .cart-count svg {
  fill: #1C1C24;
}
.sidebar-cart .sc-head .cart-count span {
  margin-left: 6px;
  margin-top: 6px;
}
.sidebar-cart .sc-head .close-icon {
    width: 30px;
    height: 30px;
  color: #1C1C24;
  cursor: pointer;
}
.sidebar-cart .sc-head .close-icon:hover {
  color: #1C1C34;
}
.sidebar-cart .cart-product-container {
  // height: calc(100vh - 150px);
  overflow-y: auto;
}
.sidebar-cart .cart-product-item {
  padding: 5px 20px;
  border-bottom: 1px solid #dbdbdb;
  position: relative;
}
.sidebar-cart .cart-product-item .close-item {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #1C1C34;
  cursor: pointer;
  z-index: 1;
}
.sidebar-cart .cart-product-item .product-content .product-title {
  font-size: 15px;
  color: #363636;
}
.sidebar-cart .cart-product-item .product-content .product-cart-info {
  font-size: 13px;
  color: #bebebe;
}
.sidebar-cart .product-price {
  font-size: 15px;
}
.sidebar-cart .product-price del {
  color: #bebebe;
  font-weight: 400;
}
.sidebar-cart .product-price span {
  color: #363636;
}
.sidebar-cart .cart-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sidebar-cart .price-increase-decrese-group {
  background-color: #1C1C24;
  padding: 0px 10px;
  border-radius: 5px;
  width: 100px;
}
.sidebar-cart .price-increase-decrese-group button {
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
.sidebar-cart .price-increase-decrese-group button:focus {
  outline: none;
  box-shadow: none;
}
.sidebar-cart .price-increase-decrese-group input {
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
  