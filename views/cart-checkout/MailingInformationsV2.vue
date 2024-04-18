<template>
    <div class="">
        

        <div class="border border-1 rounded-4 mt-3 overflow-hidden">
            <div class="d-flex justify-content-between align-items-center border-bottom border-1 px-3 py-2">
                <h4 class="m-0">1. Shipping address</h4>
            </div>
            
            <form class="mx-2 my-4 px-2">

                <!-- <div class="row form-floating mb-3">
                    <input 
                        type="text" 
                        class="form-control rounded-4" 
                        id="floatingInput" 
                        placeholder="Home / Office"
                        v-model="data.type"
                    >
                    <label for="floatingInput">Address Type</label>
                    <div class="form-text" style="color: red;">{{ errorMessages.type }}</div>
                </div> -->

                <!-- <div class="row form-floating mb-3"> -->
                <div class="row mb-3">
                    <label for="floatingInput">Email</label>
                    <!-- class="form-control rounded-4"  -->
                    <input 
                        type="email" 
                        id="floatingInput" 
                        placeholder="Address"
                        class="form-control rounded-3 py-2" 
                        style="border-radius: 12px !important;"
                        v-model="data.address.email"
                    >
                    
                    <div class="form-text" style="color: red;">{{ errorMessages.email }}</div>
                </div>

                <div class="row">
                    <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                        <div class="row mb-3">
                            <label for="floatingInput">First Name</label>
                            <input 
                                type="text" 
                                id="floatingInput" 
                                placeholder="First Name"
                                class="form-control rounded-3 py-2" 
                                style="border-radius: 12px !important;"
                                v-model="data.address.firstName"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.firstName }}</div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                        <div class="row mb-3">
                            <label for="floatingInput">Last Name</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                style="border-radius: 12px !important;"
                                id="floatingInput" 
                                placeholder="Last Name"
                                v-model="data.address.lastName"
                            >
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                        <div class="row mb-3">
                            <label for="floatingInput">Company</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                style="border-radius: 12px !important;"
                                id="floatingInput" 
                                placeholder="Company"
                                v-model="data.address.company"
                            >
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                        <div class="row mb-3">
                            <label for="floatingInput">Mobile</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                style="border-radius: 12px !important;"
                                id="floatingInput" 
                                placeholder="Mobile"
                                v-model="data.address.mobile"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.mobile }}</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="floatingInput">Street Address</label>
                    <input 
                        type="text" 
                        class="form-control rounded-3 py-2" 
                        style="border-radius: 12px !important;"
                        id="floatingInput" 
                        placeholder="Street Address"
                        v-model="data.address.street"
                    >
                    <div class="form-text" style="color: red;">{{ errorMessages.street }}</div>
                </div>
                
                <div class="row">
                    <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                        <div class="row mb-3">
                            <label for="floatingInput">City</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                style="border-radius: 12px !important;"
                                id="floatingInput" 
                                placeholder="City"
                                v-model="data.address.city"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.city }}</div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                        <div class="row mb-3">
                            <label for="floatingInput">Zip</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                style="border-radius: 12px !important;"
                                id="floatingInput" 
                                placeholder="Zip/Postal Code"
                                v-model="data.address.zip"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.zip }}</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="floatingInput">Country</label>
                    <input 
                        type="text" 
                        class="form-control rounded-3 py-2" 
                        style="border-radius: 12px !important;"
                        id="floatingInput" 
                        placeholder="Country"
                        v-model="data.address.country"
                        disabled="true"
                    >
                    <div class="form-text" style="color: red;">{{ errorMessages.country }}</div>
                </div>

                <div class="row">
                    <label for="">State/Location</label>

                    <div>
                        <BaseRadio :disabled="false" circle label="Dhaka" :id="'DHAKA'" :value="'DHAKA'" v-model="data.address.state"/>
                        <BaseRadio :disabled="false" circle label="Out Side Dhaka" :id="'OUT_SIDE_DHAKA'" :value="'OUT_SIDE_DHAKA'" v-model="data.address.state"/>
                    </div>
                </div>

            </form>
        </div>

        <!-- payment Informations -->
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

const emits = defineEmits(['update:modelValue']);
const data = useVModel(props, emits, 'modelValue');

const editTab = ref('');

const onEditChange = (val) => {
    editTab.value = val;
}

const errorMessages = ref({
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    city: '',
    country: '',
});

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    });
};

const setAllValidationMessage = async() => {
    if(!data.value.address.email.trim().length) {
        errorMessages.value.email = 'Please give your Email'
    }

    if (data.value.address.email && !data.value.address.email.match(/\S+@\S+\.\S+/)) {
        errorMessages.value.email = "Please give a correct Email";
    }

    if(!data.value.address.firstName.length) {
        errorMessages.value.firstName = 'Please give your First Name';
    }

    if(!data.value.address.lastName.length) {
        errorMessages.value['lastName'] = 'Please give your Last Name';
    }

    if(!data.value.address.mobile.length) {
        errorMessages.value['mobile'] = 'Please give your Mobile Number';
    }

    if(!data.value.address.street.length) {
        errorMessages.value['street'] = 'Please give your Address';
    }

    if(!data.value.address.city.length) {
        errorMessages.value['city'] = 'Please give your City';
    }
}


const validate = () => {
    clearValidations();

    setAllValidationMessage();

    let isOk = true;

    Object.keys(errorMessages.value).forEach((key) => {

        if(errorMessages.value[key].trim().length > 0) {
            isOk = false;
            return isOk;
        }

    });

    return isOk;
};

defineExpose({
    validate
})
</script>

<style lang="scss" scoped>
.edit-mode {
    cursor: pointer;
    text-decoration: underline;
}
</style>