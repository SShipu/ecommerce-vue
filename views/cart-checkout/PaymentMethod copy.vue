<template>
    <div class="">
        <div class="border border-1 rounded-3 mt-3 overflow-hidden">
            <div class="px-4">
                <div class="row py-2 border-bottom">
                    <div class="col-2">Email</div>
                    <div class="col-8 text-center">{{ data.address.email }}</div>
                    <div class="col-2 text-end" style="cursor: pointer;" @click.prevent="goTo('informations')">Change</div>
                </div>
                <div class="row py-2 border-bottom">
                    <div class="col-2">Ship to</div>
                    <div class="col-8 text-center">{{ shortAddress }}</div>
                    <div class="col-2 text-end" style="cursor: pointer;" @click.prevent="goTo('informations')">Change</div>
                </div>
                <div class="row py-2">
                    <div class="col-2">Method</div>
                    <div class="col-8 text-center">{{ pickPoint }}</div>
                    <div class="col-2 text-end" style="cursor: pointer;" @click.prevent="goTo('shipping-method')">Change</div>
                </div>
            </div>
        </div>

        <!-- payment Informations -->
        <div class="d-flex flex-column align-items-start mt-3 mb-1">
            <h4 class="m-0">Payment</h4>
            <p>All transactions are secure and encrypted.</p>
        </div>
        <div class="border border-1 rounded-3 overflow-hidden">

            <div class="my-2">
                <!-- {{ data.selectedPickingLocation }} -->
                <div class="border-bottom px-0 d-flex justify-content-between">
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :name="'method'"
                        :value="'QUICK_PAY'" 
                        :id="'QUICK_PAY'" 
                        label="Quick Pay" 
                        :disabled="true"
                    />
                    <div class="d-flex flex-wrap justify-content-center mb-2">
                        <img src="/images/payments/master.png" class="img-fluid mx-1" alt="Master Card" style="height: 25px;">
                        <img src="/images/payments/visa.png" class="img-fluid mx-1" alt="Visa" style="height: 25px;">
                        <img src="/images/payments/amarecan.png" class="img-fluid mx-1" alt="american express" style="height: 25px;">
                    </div>
                </div>
                <div class="border-bottom px-0 d-flex justify-content-between">
                    
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :name="'method'"
                        :value="'MOBILE_BANKING'" 
                        :id="'MOBILE_BANKING'" 
                        label="Mobile Banking" 
                        :disabled="true"
                    />
                    <div class="d-flex flex-wrap justify-content-center mb-2">
                        <img src="/images/payments/bkash.png" class="img-fluid mx-1" alt="bKash" style="height: 25px;">
                        <img src="/images/payments/rocket.png" class="img-fluid mx-1" alt="Rocket" style="height: 25px;">
                        <img src="/images/payments/nogod.png" class="img-fluid mx-1" alt="Nogod" style="height: 25px;">
                    </div>
                </div>
                <div class="px-0">
                    
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :name="'method'"
                        :value="'CASH_ON_DELIVERY'" 
                        :id="'CASH_ON_DELIVERY'" 
                        label="Cash On Delivery" 
                    />
                </div>

                <!-- <div class="row px-3">
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :name="'method'"
                        :value="'ONLINE'" 
                        :id="'ONLINE'" 
                        label="Online" 
                        :disabled="true"
                    />
                </div> -->
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