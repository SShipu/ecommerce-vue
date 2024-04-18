<template>
    <div class="">
        <div class="mt-3 overflow-hidden">
            <!-- <div class="d-flex justify-content-between align-items-center my-2">
                <h4 class="m-0">Shipping address</h4>
            </div> -->
                
            <form class="px-2">

                <!-- <div class="row form-floating mb-3">
                    <input 
                        type="text" 
                        class="form-control rounded-4" 
                        id="floatingInput" 
                        placeholder="Home / Office"
                        v-model="data.type"
                    >
                    <label for="floatingInput" class="ps-0">Address Type</label>
                    <div class="form-text" style="color: red;">{{ errorMessages.type }}</div>
                </div> -->

                <div class="d-flex justify-content-between align-items-center my-1">
                    <h3 class="m-0">Contact</h3>

                    <span class="hav_account" v-if="!authStore.isAuthenticated">Have an account? <a  @click.prevent="goTo('sign-in')">Log in</a></span>
                </div>
                <div class="row">
                    <label for="floatingInput" class="ps-0">Email</label>
                    <input 
                        type="email" 
                        class="form-control rounded-3 py-2" 
                        id="floatingInput" 
                        placeholder="Address"
                        v-model="data.address.email"
                    >
                    <div class="form-text" style="color: red;">{{ errorMessages.email }}</div>
                </div>
                <div class="row ps-1">
                    <BaseCheckBox v-model="data.address.emailMe" label="Email me with news and offrs"/>
                </div>
                <!-- {{ data }} -->

                <div class="d-flex justify-content-start my-3">
                    <h3 class="m-0">Shipping address</h3>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                        <div class="row mb-1">
                            <label for="floatingInput" class="ps-0">First Name<span class="required text-red">*</span></label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                id="floatingInput" 
                                placeholder="First Name"
                                v-model="data.address.firstName"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.firstName }}</div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                        <div class="row mb-1">
                            <label for="floatingInput" class="ps-0">Last Name</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                id="floatingInput" 
                                placeholder="Last Name"
                                v-model="data.address.lastName"
                            >
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                        <div class="row mb-1">
                            <label for="floatingInput" class="ps-0">Company</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                id="floatingInput" 
                                placeholder="Company"
                                v-model="data.address.company"
                            >
                        </div>
                    </div> -->

                    <div class="col-12 col-lg-12">
                        <div class="row mb-1">
                            <label for="floatingInput" class="ps-0">Mobile<span class="required text-red">*</span></label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                id="floatingInput" 
                                placeholder="Mobile"
                                v-model="data.address.mobile"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.mobile }}</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-1">
                    <label for="floatingInput" class="ps-0">Street Address<span class="required text-red">*</span></label>
                    <input 
                        type="text" 
                        class="form-control rounded-3 py-2" 
                        id="floatingInput" 
                        placeholder="Street Address"
                        v-model="data.address.street"
                    >
                    <div class="form-text" style="color: red;">{{ errorMessages.street }}</div>
                </div>
                
                <div class="row">
                    <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                        <div class="row mb-1">
                            <label for="floatingInput" class="ps-0">City<span class="required text-red">*</span></label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                id="floatingInput" 
                                placeholder="City"
                                v-model="data.address.city"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.city }}</div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                        <div class="row mb-1">
                            <label for="floatingInput" class="ps-0">Zip</label>
                            <input 
                                type="text" 
                                class="form-control rounded-3 py-2" 
                                id="floatingInput" 
                                placeholder="Zip/Postal Code"
                                v-model="data.address.zip"
                            >
                            <div class="form-text" style="color: red;">{{ errorMessages.zip }}</div>
                        </div>
                    </div>
                </div>

                <div class="row ">
                    <label for="floatingInput" class="ps-0">Country<span class="required text-red">*</span></label>
                    <input 
                        type="text" 
                        class="form-control rounded-3 py-2" 
                        id="floatingInput" 
                        placeholder="Country"
                        v-model="data.address.country"
                    >
                        <!-- disabled="true" -->
                    <div class="form-text" style="color: red;">{{ errorMessages.country }}</div>
                </div>
                <!-- <div class="row ps-1">
                    <BaseCheckBox v-model="data.address.saveInfo" label="Save this information for next time"/>
                </div> -->
                <div class="row ps-1" v-if="!authStore?.profile">
                    <BaseCheckBox v-model="data.address.createAccount" label="Create Account"/>
                </div>
                <div v-if="data.address.createAccount">
                    <div class="form-group">
                        <label for="forPassword">Password</label>
                        <input
                            type="password"
                            class="form-control rounded-3 py-2"
                            v-model="data.address.password"
                            name="forPassword"
                            placeholder="********"
                            id="forPassword"
                        />
                        <pre style="color: red">{{ errorMessages.password }}</pre>
                    </div>

                    <div class="form-group">
                        <label for="forConfirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            class="form-control rounded-3 py-2"
                            v-model="data.address.confirmPassword"
                            name="forConfirmPassword"
                            placeholder="********"
                            id="forConfirmPassword"
                        />
                        <pre style="color: red">{{ errorMessages.confirmPassword }}</pre>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { useVModel } from '~~/libs/fuel-station/useVModel';
import { useAuthStore } from '~~/stores/auth-store';

const authStore = useAuthStore();

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

const editTab = ref('');
const guestAddress = ref('');

const onEditChange = (val) => {
    editTab.value = val;
};

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
    // if(!data.value.address.email.trim().length) {
    //     errorMessages.value.email = 'Please give your Email'
    // }

    if (data.value.address.email && !data.value.address.email.match(/\S+@\S+\.\S+/)) {
        errorMessages.value.email = "Please give a correct Email";
    }

    if(!data.value.address.firstName.length) {
        errorMessages.value.firstName = 'Please give your First Name';
    }

    // if(!data.value.address.lastName.length) {
    //     errorMessages.value.lastName = 'Please give your Last Name';
    // }

    if(!data.value.address.mobile.length) {
        errorMessages.value.mobile = 'Please give your Mobile Number';
    }

    if (
        !data.value.address.mobile.match(
        /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/
        )
    ) {
        errorMessages.value.mobile = "Please Input a Correct Mobile Number";
    }

    if(!data.value.address.street.length) {
        errorMessages.value.street = 'Please give your Address';
    }

    if(!data.value.address.city.length) {
        errorMessages.value.city = 'Please give your City';
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
});

const addAddress = (val) => {
    if (!authStore?.profile?.id) {
        localStorage.setItem('guest-address', JSON.stringify(val));
    } else {
        localStorage.setItem('informations', JSON.stringify(val));
    }
}

const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const debounced = debounce(addAddress, 500);

watch(()=> guestAddress.value, () => {
    if (guestAddress.value != null) {
        Object.keys(guestAddress.value).forEach((key) => {
            data.value.address[key] = guestAddress.value[key];
        });
    }
}, {deep: true});

watch(()=> data.value.address, () => {
    debounced(data.value.address);
}, {deep: true});

onMounted(() => {
    let localGuestAddress = localStorage.getItem('guest-address');
    if (localGuestAddress != "undefined") {
        guestAddress.value = JSON.parse(localGuestAddress);
    }
});
</script>

<style lang="scss" scoped>

label {
    color: black !important;
    font-weight: 700 !important;
}
.form-floating > label {
    color: gray;
}
.form-floating > .form-control-plaintext:focus, .form-floating > .form-control-plaintext:not(:placeholder-shown), .form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown) {
    padding-top: 2.325rem !important;
    color: black;
    font-weight: 600;
}
.form-control {
    color: black !important;
    font-weight: 600 !important;
}
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