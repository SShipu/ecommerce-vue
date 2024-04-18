<template>
    <div class="">
        

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">1. Shipping address</h4>

                <span class="edit-mode" style="height: 38px;" @click.prevent="isShippingAddressModalVisibility = true">Change</span>
                
                <!-- <div class="d-flex" v-if="editTab == 'shippingAddress'">
                    <button type="button" class="btn btn-outline-success rounded-circle me-2"><i class="fa fa-check"></i></button>
                    <button type="button" class="btn btn-outline-danger rounded-circle" @click="editTab = ''"><i class="fa fa-times"></i></button>
                </div> -->
            </div>
            <!-- {{ data.selectedAddress }} -->
            <!-- {{ data.addresses }} -->
            
            <div v-if="data.addresses.length" v-for="(address, i) in data.addresses" :key="i">
                <div class="row d-flex p-3 flex-column">
                    <BaseRadio 
                        circle 
                        :name="'address'"
                        v-model="data.selectedAddress" 
                        :value="address" 
                        :id="address.type" 
                        :label="address.type" 
                        :disabled="!address.address"
                    />
                    <div class="col-3 text-start ps-4">{{ address.mobile }}</div>
                    <div class="col-3 text-start ps-4">{{ address.address }}</div>
                </div>
            </div>

            <div v-else>
                <div class="row d-flex p-3">
                    <BaseRadio 
                        circle 
                        v-model="data.selectedAddress" 
                        :name="'address'"
                        :value="'00'" 
                        :id="'00'" 
                        label="No Address" 
                    />
                    <!-- <div class="col-3 text-start ps-4">{{ address.address }}</div> -->
                </div>
            </div>
        </div>

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">2. Payment Information</h4>
            </div>

            <div class="my-2">
                <!-- {{ selectedPaymentType }} -->
                <div class="row px-3" v-for="(payment, j) in data.payments" :key="payment.name + j">
                    <!-- {{ payment }} -->
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPaymentType"
                        :disabled="payment.isDisabled"
                        :name="'payment'"
                        :value="payment" 
                        :id="payment" 
                        :label="payment.name" 
                    />
                </div>

                <!-- <div class="row px-3">
                    <BaseRadio :disabled="true" circle label="Online" :id="'online'" :value="'online'" v-model="data.selectedPaymentType"/>
                </div> -->

            </div>
        </div>

        <!-- {{ data }} -->
        <ShippingAddressModal 
            v-if="isShippingAddressModalVisibility"
            :show="isShippingAddressModalVisibility"
            v-model="data"
            @close="isShippingAddressModalVisibility = false"
        />
    </div>
</template>

<script setup>
import { useVModel } from '~~/libs/fuel-station/useVModel';
import ShippingAddressModal from "./modals/ShippingAddressModal.vue";

const props = defineProps({
    modelValue: {
        type: Object,
        default: null
    }
});

const emits = defineEmits(['update:modelValue']);
const data = useVModel(props, emits, 'modelValue');

const isShippingAddressModalVisibility = ref(false);
const editTab = ref('');

const onEditChange = (val) => {
    editTab.value = val;
}
</script>

<style lang="scss" scoped>
.edit-mode {
    cursor: pointer;
    text-decoration: underline;
}
</style>