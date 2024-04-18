<template>
<div class="col-12 border border-1 rounded-4 mt-3 py-2">

    <div class="d-flex flex-column mx-1 pb-2">
        <span class="fs-4" style="color: #202028; font-weight: 600;">Orders: {{ id }}</span>
        <span v-if="isShowStatusBar" class="fs-6" style="color: #202028; font-weight: 600;">Order date: {{ date }}</span>
    </div>

    <div v-if="isShowStatusBar" class="d-flex row border-bottom pb-3" style="scrollbar-width: none; height: 200px; overflow-y: scroll;">
        <OrderListSubItem  class="col-4 col-xxl-3 " v-for="(product, j) in item.items" :item="product"/>
    </div>

    <div class="row px-1 mx-2 mx-lg-5 px-sm-2 py-3" v-if="isShowStatusBar">
        <StatusHorizontalBar :item="item" />
        <div class="col-12 d-flex justify-content-center">
            <span>Arriving Today before 16:32</span>
        </div>
    </div>

    <div class="row border-top pt-3 mb-2">
        <div class="d-flex align-items-center" style="justify-content: space-between;">
            <span v-show="isShowStatusBar" style="color: #202028;font-weight: 700;">VIEW ORDER DETAILS</span>
            <span v-show="!isShowStatusBar" style="color: #202028;font-weight: 700;">Shipment details</span>
    
            <svg v-if="isShowStatusBar" @click.prevent="isShowStatusBar = false" style="cursor: pointer;" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5364 3.00818C10.8015 3.00782 11.0562 3.11076 11.2467 3.29506L18.0691 9.87373C18.458 10.2475 18.6777 10.7636 18.6777 11.3028C18.6777 11.8421 18.458 12.3582 18.0691 12.7319L11.2467 19.3106C11.0542 19.5111 10.7883 19.6246 10.5103 19.625C10.2323 19.6254 9.96617 19.5127 9.77306 19.3127C9.57996 19.1128 9.47653 18.8429 9.48654 18.5651C9.49654 18.2872 9.61925 18.0256 9.82623 17.84L16.6036 11.3027L9.82622 4.7654C9.62914 4.57591 9.51632 4.31518 9.51295 4.0418C9.50959 3.76843 9.61601 3.50502 9.80839 3.31074C10.0008 3.11643 10.2631 3.00734 10.5365 3.00794L10.5364 3.00818Z" fill="black"/>
            </svg> 

            <div v-if="!isShowStatusBar">
                <svg @click.prevent="isShowStatusBar = true" style="cursor: pointer;margin-bottom: 5px;" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9939 7.02364C13.9941 7.20035 13.9255 7.37016 13.8026 7.49713L9.41686 12.0454C9.16767 12.3047 8.82364 12.4512 8.46412 12.4512C8.1046 12.4512 7.76058 12.3047 7.51138 12.0454L3.12561 7.49713C2.99197 7.36879 2.91626 7.19153 2.91602 7.00621C2.91577 6.8209 2.99091 6.64346 3.12423 6.51472C3.25746 6.38599 3.4374 6.31704 3.62263 6.32371C3.80786 6.33038 3.98231 6.41219 4.10599 6.55017L8.46421 11.0684L12.8224 6.55017C12.9487 6.41878 13.1226 6.34356 13.3048 6.34132C13.4871 6.33907 13.6627 6.41002 13.7922 6.53828C13.9217 6.66653 13.9945 6.84139 13.9941 7.02366L13.9939 7.02364Z" fill="black"/>
                </svg> 
            </div>

        </div>
    </div>
    <div class="row border-top pt-4" v-if="!isShowStatusBar">
        <ShipmentDetailsBar :item="item" />
    </div>

    <!-- <div class="px-1 px-sm-2">
        <div class="d-flex row my-2">
            <div class="col-4 col-md-2 col-xxl-1">
                <img src="/images/2.png" class="w-100 rounded float-start" alt="...">
            </div>

            <div class="col-6">
                <div class="col-12 col-sm-12">
                    <div class="product-content">
                        <a href="" class="product-title fw-bold fs-4" style="color: #202028;">Baby Crocodile T-shirt</a>
                    </div>
                </div>

                <div class="d-flex flex-column col-12 col-sm-12 mt-sm-1">
                    <span >Color: Green</span>
                    <span >Size: Small</span>
                    <span >TK. 2500</span>
                    <span >Quantity: 1</span>
                </div>
            </div>
        </div>
    </div> -->
</div>
</template>

<script setup>
import { DateUtils } from '~~/libs/utils/DateUtils';
import OrderListSubItem from "./OrderListSubItem.vue"
import StatusHorizontalBar from "./progress-bars/StatusHorizontalBar.vue";
import ShipmentDetailsBar from "./progress-bars/ShipmentDetailsBar.vue";

const props = defineProps({
    item: {
        type: Object,
        default: null,
    }
});

const itemRef = toRef(props, 'item');
const isShowStatusBar = ref(true);

const id = computed(() => {
    if(itemRef.value?.id) {
        return itemRef.value.id;
    }

    return ''
});

const date = computed(() => {
    if(itemRef.value?.dateCreated) {
        return DateUtils.formatDateMonthYearAndTime(itemRef.value.dateCreated);
    }

    return '00-00-0000';
});


</script>

<style lang="scss" scoped>

</style>