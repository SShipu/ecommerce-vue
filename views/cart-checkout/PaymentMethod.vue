<template>
    <div>
        <!-- payment Informations -->
        <div class="d-flex flex-column align-items-start mt-3 mb-1">
            <h4 class="m-0">Payment</h4>
            <p>All transactions are secure and encrypted.</p>
        </div>
        <div class="border border-1 rounded-3 overflow-hidden">
            <div class="my-0">
                <div class="border-bottom px-2 py-1 d-flex justify-content-between">
                    
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :name="'method'"
                        :value="'ONLINE'" 
                        :id="'ONLINE'" 
                        label="Online" 
                    />
                        <!-- :disabled="true" -->
                    <div class="d-flex flex-wrap justify-content-center align-items-center">
                        <img src="/images/payments/master.png" class="img-fluid mx-1" alt="Master Card" style="height: 15px;">
                        <img src="/images/payments/visa.png" class="img-fluid mx-1" alt="Visa" style="height: 15px;">
                        <img src="/images/payments/amarecan.png" class="img-fluid mx-1" alt="american express" style="height: 15px;">
                        <img src="/images/payments/bkash.png" class="img-fluid mx-1" alt="bKash" style="height: 15px;">
                        <img src="/images/payments/rocket.png" class="img-fluid mx-1" alt="Rocket" style="height: 15px;">
                        <img src="/images/payments/nogod.png" class="img-fluid mx-1" alt="Nogod" style="height: 15px;">
                    </div>
                </div>
                <div class="px-2 py-1 ">
                    
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :name="'method'"
                        :value="'CASH_ON_DELIVERY'" 
                        :id="'CASH_ON_DELIVERY'" 
                        label="Cash On Delivery" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVModel } from '~~/libs/fuel-station/useVModel';

const props = defineProps({
    modelValue: {
        type: Object,
        default: null
    }
});
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
const emits = defineEmits(['update:modelValue']);
const data = useVModel(props, emits, 'modelValue');

const shortAddress = computed(() => {
    if(data.value.address) {
        return data.value.address.street + ', ' + data.value.address.city + ', ' + data.value.address.zip + ', ' + data.value.address.country;
    }

    return ''
});

const pickPoint = computed(() => {
    if(data.value.selectedPickingLocation && data.value.selectedPickingLocation == 'DHAKA') {
        return 'Dhaka'
    } else if(data.value.selectedPickingLocation && data.value.selectedPickingLocation == 'OUT_SIDE_DHAKA') {
        return 'Out side Dhaka'
    }

    return ''
})

</script>

<style lang="scss" scoped>
.edit-mode {
    cursor: pointer;
    text-decoration: underline;
}

.hav_account {
    font-size: 16px;
    font-weight: 700;

    a {
        cursor: pointer;
        &:hover {
            color: #2277e0;
        }
    }
}
</style>