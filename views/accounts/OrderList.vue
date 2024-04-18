<template>
<div class="c-order-review ms-2 ms-lg-0">
    <span class="fs-2" style="color: #202028; font-weight: 600;">My Orders</span>
    
    <div class="col-12 row" v-if="orderList.length">
        <OrderListItem class="col-12 col-lg-5 mx-1"  v-for="(order, i) in orderList" :key="i" :item="order"/>
    </div>
    
    <div class="col-12 border border-1 rounded-4 mt-3 py-3" v-else-if="isLoading"  v-for="(item, i) in 3">
        <div class="d-flex flex-column mx-2">
            <div class="d-flex flex-column mx-2">
                <span class="fs-4" style="color: #202028; font-weight: 600;">Orders: <Skeletor width="100%" height="100%" class="" style="border-radius: 10px"/></span>
                <span class="fs-6" style="color: #202028; font-weight: 600;">Order date: <Skeletor width="100%" height="100%" class="" style="border-radius: 10px"/></span>
            </div>
        </div>
        
        <div class="px-1 px-sm-2">
            <div class="d-flex row my-2">
                <div class="col-4 col-md-2 col-xxl-1">
                    <Skeletor width="100%" height="100%" class="" style="border-radius: 10px"/>
                </div>
    
                <div class="col-6">
                    <div class="col-12 col-sm-12">
                        <div class="product-content">
                            <a href="" class="product-title fw-bold fs-4" style="color: #202028;">
                                <Skeletor width="30%" height="15px" class="" style="border-radius: 10px"/>
                            </a>
                        </div>
                    </div>
    
                    <div class="d-flex flex-column col-12 col-sm-12 mt-sm-1">
                        <span > <Skeletor width="20%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                        <span > <Skeletor width="20%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                        <span ><Skeletor width="10%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                        <span ><Skeletor width="10%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 border border-1 rounded-4 mt-3 py-3" v-else  v-for="(item, i) in 1">
        <div class="d-flex flex-column mx-2 align-items-center">
            <span class="fs-4 row ms-1 text-center" style="color: #6D7482; font-weight: 600;">
                You haven’t placed any orders yet. Ready to get shopping?
            </span>

            <div class="my-4 d-flex btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class=" ms-2 rounded-5 px-3 py-1 btn c-btn-primary fs-5 py-2" @click.prevent="goTo('shop')">Continue Shopping</button>
            </div>
        </div>
        
        <!-- <div class="px-1 px-sm-2">
            <div class="d-flex row my-2">
                <div class="col-4 col-md-2 col-xxl-1">
                    <Skeletor width="100%" height="100%" class="" style="border-radius: 10px"/>
                </div>
    
                <div class="col-6">
                    <div class="col-12 col-sm-12">
                        <div class="product-content">
                            <a href="" class="product-title fw-bold fs-4" style="color: #202028;">
                                <Skeletor width="30%" height="15px" class="" style="border-radius: 10px"/>
                            </a>
                        </div>
                    </div>
    
                    <div class="d-flex flex-column col-12 col-sm-12 mt-sm-1">
                        <span > <Skeletor width="20%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                        <span > <Skeletor width="20%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                        <span ><Skeletor width="10%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                        <span ><Skeletor width="10%" height="15px" class="my-1" style="border-radius: 10px"/></span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</div>
</template>

<script setup>
import OrderListItem from './OrderListItem.vue';
import { salesClient } from '~~/libs/gandalf/apis/config';
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const orderList = ref([]);
const isLoading = ref(false);
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
const fetchOrder = async () => {
    isLoading.value = true;

    let req = {
        textParams: [
            // {
            //     field: 'customerMobile',
            //     value: orderId.value,
            //     matchType: "REGEX"
            // }
        ],
        sortParams: [
            {
                field: 'dateCreated',
                type: 'DESCENDING',
            },
        ],
        page: 1,
        size: 10,
    };

    await salesClient.search(req).then((res) => {
        if (res.status == 200 && !res.networkError) {
            if (res.body && res.body.list && res.body.list.length > 0) {
                orderList.value = res.body.list;
            }
        } 
    });

    isLoading.value = false;

};

onMounted(() => {
    fetchOrder();
});

</script>

<style lang="scss" scoped>
.c-btn-primary {
    border: 1px solid #2277E0;
    background-color: #ffff;
    color: #1C1C24 !important;
    border-radius: 35px !important;
    font-weight: 700 !important;
}

.c-btn-primary:hover {
    
    background-color: #2277E0;
    color: #ffff !important;
   
}
</style>