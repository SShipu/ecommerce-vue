<template>
  <div
      id="topbar-cart"
      class="topbar-cart w-100"
      :class="showCart && 'open-cart'"
  >

      <div class="sc-head d-flex align-items-center border-bottom">
              <div class="close-icon col-lg-3 col-md-3 col-sm-3 rounded-circle border border-light d-flex justify-content-center align-items-center">
                  <i class="fas fa-times fs-3" @click="$emit('closeSideCart', false)"></i>
              </div>
              
              <!-- <div class="cart-count col-lg-9 col-md-9 col-sm-9 fs-3 d-flex justify-content-center " >
                  <span>Added to Cart</span>
              </div> -->

              <div class="input-group border-0 me-2" style="width: 85%">
                <!-- <span class=" p-3 border-0 w-5" id="basic-addon3">Search For</span> -->
                <input 
					style="font-weight: 700;"
					type="text" 
					class="w-20 form-control p-3 border-0 fs-5" 
					id="basic-url" 
					aria-describedby="basic-addon3"
					placeholder="Search For"
					v-model="query"
					v-on:keyup.enter="goToShopPage"
				>
            </div>
			<a class="mt-1" @click.prevent="goToShopPage"
				style="cursor: pointer;"
			>
				<img src="/images/search.png" style="width: 25px;" alt="">
				<span style="font-weight: 700; color: black;" class="fs-4">search</span>
			</a>
      </div>

	  <div class="col-12 px-1 px-xl-5 py-3">
		<div class="row">
			<div class="col-12 col-lg-6 col-md-12 col-sm-12 col-xxl-6 col-xl-6">
				<span class="fs-4">Recent Search</span>

				<div class="row">
					<div 
						class=" col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-xl-6 my-1 px-2"
						v-for="(item, i) in items.slice(4, 10)" 
						:key="i"
					>
						<TopBarRecentSearchItem :item="item" @close="$emit('closeSideCart')"/>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6 col-md-12 col-sm-12 col-xxl-6 col-xl-6">
				<span class="fs-4">Product</span>

				<div class="row">
					<div 
						class=" col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-xl-6 my-1 px-2"
						v-for="(item, i) in items.slice(0, 4)" 
						:key="i"
					>
						<TopBarProductItem :item="item"  @close="$emit('closeSideCart')" />
					</div>
				</div>

			</div>
		</div>
	  </div>
  </div>
</template>
  
<script setup>
import { itemsClient } from '@/libs/gandalf/apis/config';
import TopBarProductItem from './TopBarProductItem.vue';
import TopBarRecentSearchItem from './TopBarRecentSearchItem.vue';

const props = defineProps({
    showCart: {
        type: Boolean,
        default: false,
    },
	nonScroll: {
        type: Boolean,
        default: true,
    },
});

const query = ref('');

const emits = defineEmits(['closeSideCart']);

const items = ref([
]);

const goToShopPage = () => {
	navigateTo({
		path: '/shop',
		query: {
			query: query.value,
			routeBehavior: true,
			isWatcher: true,
		}
	});

	// query.value = '';
	emits('closeSideCart');
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
    items.value = setLoading(20);

	// return

    let params = {
        textParams: [{ field: "status", value: "ACTIVE", matchType: "EXACT" }],
        sortParams: [
            { field: "dateCreated", type: "DESCENDING" },
            { field: "totalPopularity", type: "DESCENDING" },
        ],
        fetchCount: "false",
        page: 1,
        size: 10,
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


const checkScroll = () => {
    if (process.client) {
        const body = document.querySelector("body");
        if (props.nonScroll && props.show) {
            body.style.setProperty("overflow", "hidden")
        } else if (props.nonScroll && !props.show) {
            body.style.removeProperty("overflow")
        }
    }
};

watchEffect(checkScroll);

onUnmounted(() => {
    if (process.client) {
        const body = document.querySelector("body");
        body.style.removeProperty("overflow")
    }
});


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


.topbar-cart {
	// width: 400px;
	position: fixed;
	top: -1000px;
	// right: -450px;
	left: 0;
	z-index: 9999;
	background-color: white;
	height: 450px;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
	transition: all 0.3s ease;
	
	@media screen and (max-width: 993px) {
		overflow-y: auto;
		overflow-x: hidden;
		height: 80vh;
	}

    .c-btn-outline-primary {
        border: 1px solid #2277E0;
        border-radius: 35px !important;
        font-weight: 700 !important;
        color: #1C1C24 !important;
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
}
.topbar-cart.open-cart {
  // right: 0;
  top: 0;
}
.topbar-cart .sc-head {
  background-color: #FFFF;
  padding: 15px 20px;
}
.topbar-cart .sc-head .cart-count {
  color: #1C1C24;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.topbar-cart .sc-head .cart-count svg {
  fill: #1C1C24;
}
.topbar-cart .sc-head .cart-count span {
  margin-left: 6px;
  margin-top: 6px;
}
.topbar-cart .sc-head .close-icon {
    width: 30px;
    height: 30px;
  color: #1C1C24;
  cursor: pointer;
}
.topbar-cart .sc-head .close-icon:hover {
  color: #1C1C34;
}
.topbar-cart .cart-product-container {
  height: calc(100vh - 150px);
  overflow-y: auto;
}
.topbar-cart .cart-product-item {
  padding: 5px 20px;
  border-bottom: 1px solid #dbdbdb;
  position: relative;
}
.topbar-cart .cart-product-item .close-item {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #1C1C34;
  cursor: pointer;
  z-index: 1;
}
.topbar-cart .cart-product-item .product-content .product-title {
  font-size: 15px;
  color: #363636;
}
.topbar-cart .cart-product-item .product-content .product-cart-info {
  font-size: 13px;
  color: #bebebe;
}
.topbar-cart .product-price {
  font-size: 15px;
}
.topbar-cart .product-price del {
  color: #bebebe;
  font-weight: 400;
}
.topbar-cart .product-price span {
  color: #363636;
}
.topbar-cart .cart-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.topbar-cart .price-increase-decrese-group {
  background-color: #1C1C24;
  padding: 0px 10px;
  border-radius: 5px;
  width: 100px;
}
.topbar-cart .price-increase-decrese-group button {
  color: white;
  padding: 3px 5px;
  cursor: pointer;
  outline: none;
  border: none;
}
.topbar-cart .price-increase-decrese-group button:focus {
  outline: none;
  box-shadow: none;
}
.topbar-cart .price-increase-decrese-group input {
  width: 40px;
  background-color: #1C1C24;
  color: white;
  outline: none;
  border: none;
  padding: 0px 5px;
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
  