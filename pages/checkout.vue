<template>
    <main class="container h-100vh d-flex align-items-center  justify-content-center">

        <div class="row d-flex justify-content-center w-70 w-lg-50" >
            <div class="row" >
                <h3>Sign in or checkout as guest</h3>
        
                <div class="border border-1 rounded-3 overflow-hidden">
                    <div class="d-flex justify-content-start py-2">
                        <BaseRadio 
                            circle 
                            :name="'address'"
                            v-model="selectedType" 
                            :value="'SIGN_IN'" 
                            label=""
                            :id="'SIGN_IN'" 
                        />
    
                        <div class="d-flex flex-column pt-1">
                            <h4 class="m-0">Sign In</h4>
                            <p>Checkout faster with saved details</p>
                        </div>
                    </div>
    
                    <form class="mx-2 my-2" v-if="selectedType == 'SIGN_IN'">
    
                        <div class="row mb-3">
                            <label class="m-0 p-0">User Name</label>
                            <input 
                                type="email" 
                                class="form-control rounded-3" 
                                id="floatingInput" 
                                placeholder="Email/mobile"
                                v-model="userName"
                            >
                            <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.userName }}</div>
                        </div>
    
                        <div class="row mb-3">
                            <label for="floatingInput" class="m-0 p-0">Password</label>
                            <input 
                                :type="!isShownPassword ? 'password' : 'text'" 
                                class="form-control rounded-3" 
                                id="floatingInput" 
                                placeholder="xxxxxxxx"
                                v-model="password"
                            >
    
                            <div class="d-flex justify-content-end">
                                <i class="eye_icon fas" 
                                    id="eye" 
                                    :class="{ 'fa-eye-slash': !isShownPassword, 'fa-eye': isShownPassword }" 
                                    @click.prevent="isShownPassword = !isShownPassword "
                                ></i>
                            </div>
                            <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.password }}</div>
                        </div>
    
    
                        <div class="my-2">
                            <span class="text-decoration-underline fs-4" style="font-weight: 600;">Forgot Password?</span>
                        </div>
    
                        <div class="row">
                            <div 
                                class="rounded-5 py-1 btn c-btn-primary fs-5 py-2" 
                                @click.prevent="onSignin()"
                            >
                                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Sign In
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row mt-3" >
        
                <div class="border border-1 rounded-3 overflow-hidden">
                    <div class="d-flex justify-content-start py-2">
                        <BaseRadio 
                            circle 
                            :name="'address'"
                            v-model="selectedType" 
                            :value="'SIGN_UP'" 
                            label=""
                            :id="'SIGN_UP'" 
                        />
    
                        <div class="d-flex flex-column pt-1">
                            <h4 class="m-0">Create Account</h4>
                            <p>Create Account to become a valid member</p>
                        </div>
                    </div>
    
                </div>
            </div>
    
            <div class="row mt-3" >
                <div class="border border-1 rounded-3 overflow-hidden">
                    <div class="d-flex justify-content-start py-2">
                        <BaseRadio 
                            circle 
                            :name="'address'"
                            v-model="selectedType" 
                            :value="'GUEST_CHECKOUT'" 
                            label=""
                            :id="'GUEST_CHECKOUT'" 
                        />
    
                        <div class="d-flex flex-column pt-1">
                            <h4 class="m-0">Guest Checkout</h4>
                            <p>You can create an account later</p>
                        </div>
                    </div>
    
                    <form class="mx-2 my-2" v-if="selectedType == 'GUEST_CHECKOUT'">
    
                        <!-- <div class="row">
                            <label for="" class="p-0 m-0">Email</label>
                            <input 
                                type="email" 
                                class="form-control rounded-3" 
                                placeholder="Email"
                                v-model="userName"
                            >
                            <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.userName }}</div>
                        </div>

                        <div class="row  mb-3">
                            <BaseCheckBox v-model="isSignup" label="Sign up for style news and offers"/>
                        </div> -->
    
                        <div class="row">
                            <button 
                                type="submit" 
                                class="rounded-5 py-1 btn c-btn-primary fs-5 py-2" 
                                @click.prevent="onSubmit()"
                                :disabled="isLoading"
                            >
                                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Checkout as Guest
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
    <ModalBaseToastr ref="toaster"/> 
</template>

<script setup>
import { useAuthStore } from '~~/stores/auth-store';

const authStore = useAuthStore();
const router = useRouter();

const toaster = ref(null);
const selectedType = ref('');
const userName = ref('');
const password = ref('');

const isShownPassword = ref(false);
const isLoading = ref(false);

const isGuest = ref(false);
const isSignup = ref(false);

const errorMessages = ref({
    userName: '',
    password: '',
});

const onSuccess = () => {
    router.push({name: 'informations'})
    // navigateTo('informations');
};

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    });
};

const setAllValidationMessage = async() => {
    // if(!userName.value.trim().length) {
    //     errorMessages.value.userName = 'Please Give Your Email'
    // }

    if (!password.value.trim().length && !isGuest.value) {
        errorMessages.value.password = "Please Give A Password";
    }
};

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


const onSignin = () => {
    if(validate()) {
        isLoading.value = true;

        let param = {
            userName: userName.value,
            password: password.value,
        }

        authStore.signIn(param).then((res) => {
            if(res) {
                onSuccess();
                toaster.value.success(`Welcome ${authStore.profile.name}`, 1500);
            }
        }).catch((err) => {
            
            if(err == 'auth_error') {
            
                errorMessages.value.userName = 'Wrong Email';
                errorMessages.value.password = 'Wrong Password';
                toaster.value.error(`Error`, 1500);
            
            } else if(err == 'already_logedin') {

                errorMessages.value.userName = 'Already Logedin';
                toaster.value.error(`Already logedin`, 1500);
            
            } else if(err == 'network_error') {
            
                toaster.value.error(`Please Check Your Internate connection`, 1500);
            
            }
        });

        setTimeout(() => {
            isLoading.value = false;

        }, 300)
    }
};


const onSubmit = () => {
    isGuest.value = true;
    
    if(validate()) {
        isLoading.value = true;

        let data = {
            email: userName.value,
            isSignup: isSignup.value,
        }

        localStorage.setItem('guest', JSON.stringify(data));
        router.push('informations');

        isLoading.value = false;
    }
};

watch(()=> selectedType.value, ()=> {
    clearValidations();
    if (selectedType.value == 'SIGN_UP') {
        router.push({name: 'sign-up'})
    }
}, {deep: true});

onMounted(() => {
    if(process.client) {
        window.scrollTo(0, 0);
    }
});

if(process.client) {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 500)
}

</script>

<style lang="scss" scoped>
.eye_icon {
    width: 5%;
    position: relative;
    // bottom: 30px;
    bottom: 27px;
    text-align: end;
    cursor: pointer;
    color: lightgray;
}


.c-btn-primary {
    background-color: #2277E0;
    color: #ffff !important;
    border-radius: 35px !important;
    font-weight: 700 !important;

    &:hover {
        border: 1px solid #2277E0;
        color: #1C1C24 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
}

</style>