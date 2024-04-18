<template>
    <ModalBaseModal 
        title="Shipping Address" 
        :show="show" 
        @close="$emit('close')" 
        maxWidth="60%" 
        :modalFooter="false"
        body-style="padding: 0"
    >
        <form class="mx-2 my-4 px-2">

            <div class="row form-floating mb-3">
                <input 
                    type="text" 
                    class="form-control rounded-4" 
                    id="floatingInput" 
                    placeholder="Home / Office"
                    v-model="data.type"
                    disabled="true"
                >
                <label for="floatingInput">Address Type</label>
                <div class="form-text" style="color: red;">{{ errorMessages.type }}</div>
            </div>

            <div class="row form-floating mb-3">
                <input 
                    type="text" 
                    class="form-control rounded-4" 
                    id="floatingInput" 
                    placeholder="Address"
                    v-model="data.address"
                >
                <label for="floatingInput">Address</label>
                <div class="form-text" style="color: red;">{{ errorMessages.address }}</div>
            </div>

            <div class="row form-floating mb-3">
                <input 
                    type="text" 
                    class="form-control rounded-4" 
                    id="floatingInput" 
                    placeholder="Street"
                    v-model="data.street"
                >
                <label for="floatingInput">Street</label>
            </div>

            <div class="row">
                <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                    <div class="row form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="Division"
                            v-model="data.division"
                        >
                        <label for="floatingInput">Division</label>
                        <div class="form-text" style="color: red;">{{ errorMessages.division }}</div>
                    </div>
                </div>

                <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                    <div class="row form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="Area"
                            v-model="data.area"
                        >
                        <label for="floatingInput">Area</label>
                    </div>
                </div>
            </div>

            <div class="row form-floating mb-3">
                <input 
                    type="text" 
                    class="form-control rounded-4" 
                    id="floatingInput" 
                    placeholder="Country"
                    v-model="data.country"
                >
                <label for="floatingInput">Country</label>
                <div class="form-text" style="color: red;">{{ errorMessages.country }}</div>
            </div>

            <div class="row form-floating mb-3">
                <input 
                    type="text" 
                    class="form-control rounded-4" 
                    id="floatingInput" 
                    placeholder="Mobile Number"
                    v-model="data.mobile"
                >
                <label for="floatingInput">Mobile Number</label>
                <div class="form-text" style="color: red;">{{ errorMessages.mobile }}</div>
            </div>
            

            <div class="row">
                <button :disabled="isSending" type="submit" class="rounded-5 py-1 btn c-btn-primary fs-5 py-2" @click.prevent="onSubmit()">
                    <span v-if="isSending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Save
                </button>
            </div>
        </form>
    </ModalBaseModal>
    <ModalBaseToastr ref="toaster"/> 
</template>

<script setup>
import { useVModel } from '~~/libs/fuel-station/useVModel';
import { cmsClient } from '~~/libs/gandalf/apis/config';
import { useAuthStore } from '~~/stores/auth-store';

const authStore = useAuthStore();

const props = defineProps({
    modelValue: {
        type: Object,
        default: null
    },
    show: {
        type: Boolean,
        default: false,
    }
});

const emits = defineEmits(['update:modelValue', 'close']);
const modelValueRef = useVModel(props, emits, 'modelValue');
const isSending = ref(false);
const toaster = ref(null);

const data = ref({
    type: 'Shipping',
    address: '',
    street: '',
    division: '',
    area: '',
    country: '',
    mobile: '',
});

watch(()=> modelValueRef.value.selectedAddress, ()=>{

    if(modelValueRef.value.selectedAddress) {
        data.value.type = modelValueRef.value.selectedAddress.type;
        data.value.address = modelValueRef.value.selectedAddress.detail.address ? modelValueRef.value.selectedAddress.detail.address : '';
        data.value.street = modelValueRef.value.selectedAddress.detail.street ? modelValueRef.value.selectedAddress.detail.street : '';
        data.value.division = modelValueRef.value.selectedAddress.detail.division ? modelValueRef.value.selectedAddress.detail.division : '';
        data.value.area = modelValueRef.value.selectedAddress.detail.area ? modelValueRef.value.selectedAddress.detail.area : '';
        data.value.country = modelValueRef.value.selectedAddress.detail.country ? modelValueRef.value.selectedAddress.detail.country : '';
        data.value.mobile = modelValueRef.value.selectedAddress.mobile ? modelValueRef.value.selectedAddress.mobile : '';
    }
}, {immediate: true}, {deep: true});

const errorMessages = ref({
    type: '',
    address: '',
    street: '',
    division: '',
    area: '',
    country: '',
    mobile: '',
});

const onSuccess = () => {

    let index = modelValueRef.value.addresses.findIndex((add) => add.type === data.value.type);

    if(index < 0) {
        modelValueRef.value.addresses.push({
            type: data.value.type ? data.value.type : 'Other',
            mobile: data.value.mobile,
            address: `${data.value.address}, ${data.value.street}, ${data.value.area}, ${data.value.division}`,
            detail: {
                address: data.value.address,
                street: data.value.street,
                division: data.value.division,
                area: data.value.area,
                country: data.value.country,
                mobile: data.value.mobile,
            },
        });

    } else {
        modelValueRef.value.addresses[index] = {
            type: data.value.type ? data.value.type : 'Other',
            mobile: data.value.mobile,
            address: `${data.value.address}, ${data.value.street}, ${data.value.area}, ${data.value.division}`,
            detail: {
                address: data.value.address,
                street: data.value.street,
                division: data.value.division,
                area: data.value.area,
                country: data.value.country,
                mobile: data.value.mobile,
            },
        };
    }

    modelValueRef.value.selectedAddress = {
        type: data.value.type ? data.value.type : 'Other',
        mobile: data.value.mobile,
        address: `${data.value.address}, ${data.value.street}, ${data.value.area}, ${data.value.division}`,
        detail: {
            address: data.value.address,
            street: data.value.street,
            division: data.value.division,
            area: data.value.area,
            country: data.value.country,
            mobile: data.value.mobile,
        },
    }

    emits('close');
    Object.keys(data.value).forEach((key) => {
        data.value[key] = '';
    });

}

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    });
};

const setAllValidationMessage = async() => {
    Object.keys(data.value).forEach((key) => {
        if(key == 'address' && !data.value[key].length) {
            errorMessages.value[key] = 'Please give your address';
        }

        if(key == 'division' && !data.value[key].length) {
            errorMessages.value[key] = 'Please give your Division';
        }

        if (key == 'country' && !data.value.country.trim().length) {
            errorMessages.value.country = "Please give your";
        }

        if (key == 'mobile' && !data.value.mobile.trim().length) {
            errorMessages.value.mobile = "Please give a mobile number";
        }
    });
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

const onSubmit = async() => {
    if(validate()) {
        isSending.value = true;
        let obj = {
            area: data.value.address,
            zipCode: data.value.area,
            city: data.value.division,
            street: data.value.street,

            type: data.value.type ? data.value.type : 'Other',
            mobile: data.value.mobile,
            mobileNumber: data.value.mobile,
            address: `${data.value.address}, ${data.value.street}, ${data.value.area}, ${data.value.division}`,
            // detail: {
            //     address: data.value.address,
            //     street: data.value.street,
            //     division: data.value.division,
            //     area: data.value.area,
            //     country: data.value.country,
            //     mobile: data.value.mobile,
            // },
        };

        if(authStore.currentUser){
        
            await cmsClient.addAddress(obj).then((res)=> {
                if (res.status == 201 && !res.networkError) {
                    onSuccess();
                    toaster.value.success("Address Successfully Saved", 1500);
    
                } else toaster.value.error("Failed to Save Address", 1500);
            });
        } else {
            onSuccess();
            toaster.value.success("Address Successfully Saved", 1500);
        }

        isSending.value = false;

    }
}
</script>

<style lang="scss" scoped>
.form-floating > label {
    color: gray;
}
.form-floating > .form-control-plaintext:focus, .form-floating > .form-control-plaintext:not(:placeholder-shown), .form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown) {
    padding-top: 2.325rem !important;
    color: black;
    font-weight: 600;
}
.c-btn-primary {
    background-color: #2277E0;
    color: #fff !important;
    border-radius: 35px !important;
    font-weight: 700 !important;

    &:hover {
        border: 1px solid #2277E0;
        color: #6D7482 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
}
</style>