<template>
    <div class="container-fluid h-110vh">
        <main class="container py-2 py-lg-5">
            <section class="m-0 m-xl-5 m-xxl-5">
                <h1>Create Account</h1>

                <form class="mx-2 my-4 px-2">

                    <div class="row form-floating mb-3">
                        <input 
                            type="email" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            v-model="data.email"
                        >
                        <label for="floatingInput">Email</label>
                        <div class="form-text" style="color: red;">{{ errorMessages.email }}</div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                            <div class="row form-floating mb-3">
                                <input 
                                    type="text" 
                                    class="form-control rounded-4" 
                                    id="floatingInput" 
                                    placeholder="first name"
                                    v-model="data.firstName"
                                >
                                <label for="floatingInput">First Name</label>
                                <div  class="form-text" style="color: red;">{{ errorMessages.firstName }}</div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                            <div class="row form-floating mb-3">
                                <input 
                                    type="text" 
                                    class="form-control rounded-4" 
                                    id="floatingInput" 
                                    placeholder="Last Name"
                                    v-model="data.lastName"
                                >
                                <label for="floatingInput">Last Name</label>
                                <div class="form-text" style="color: red;">{{ errorMessages.lastName }}</div>
                            </div>
                        </div>
                    </div>
        
                    <div class="row form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="Mobile number Recomended"
                            v-model="data.mobile"
                        >
                        <label for="floatingInput">Mobile number Recomended</label>
                        <div id="mobileHelp" class="form-text" style="color: red;">{{ errorMessages.mobile }}</div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-lg-6 pe-2 pe-lg-3">
                            <div class="row form-floating mb-3">
                                <input 
                                    :type="!isShownPassword ? 'password' : 'text'" 
                                    class="form-control rounded-4" 
                                    id="floatingInput" 
                                    placeholder="Password"
                                    v-model="data.password"
                                >
                                <label for="floatingInput">Password</label>
                                <div class="d-flex justify-content-end">
                                    <i class="eye_icon fas" 
                                        id="eye" 
                                        :class="{ 'fa-eye-slash': !isShownPassword, 'fa-eye': isShownPassword }" 
                                        @click.prevent="isShownPassword = !isShownPassword "
                                    ></i>
                                </div>
                                <div id="passwordHelp" class="form-text" style="color: red;">{{ errorMessages.password }}</div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 ps-2 ps-lg-3">
                            <div class="row form-floating mb-3">
                                <input 
                                    :type="!isShownConfirmPassword ? 'password' : 'text'" 
                                    class="form-control rounded-4" 
                                    id="floatingInput" 
                                    placeholder="Confirm Password"
                                    v-model="data.confirmPassword"
                                >
                                <label for="floatingInput">Confirm Password</label>
                                <div class="d-flex justify-content-end">
                                    <i class="eye_icon fas" 
                                        id="eye" 
                                        :class="{ 'fa-eye-slash': !isShownConfirmPassword, 'fa-eye': isShownConfirmPassword }" 
                                        @click.prevent="isShownConfirmPassword = !isShownConfirmPassword "
                                    ></i>
                                </div>
                                <div id="confirmPasswordHelp" class="form-text" style="color: red;">{{ errorMessages.confirmPassword }}</div>
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <button 
                            type="submit" 
                            class="rounded-5 py-1 btn c-btn-primary fs-5 py-2" 
                            @click.prevent="onSubmit"
                        >
                            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Create Account
                        </button>
                    </div>

                    <div class="mt-1 text-center">
                        <span class="text-decoration-underline login-text" @click="goTo('sign-in')">Sign In</span>
                    </div>
                </form>
            </section>
        </main>
        <ModalBaseToastr ref="toaster"/> 
    </div>
</template>

<script setup>
import { useAuthStore } from '~~/stores/auth-store';

const authStore = useAuthStore();

const toaster = ref(null);
const isShownPassword = ref(false);
const isShownConfirmPassword = ref(false);
const isLoading = ref(false);
const router = useRouter();

const data = ref({
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
});

const errorMessages = ref({
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
});

const goTo = (name) => {
    router.push({name: name})
}
const onSuccess = () => {
    Object.keys(data.value).forEach((key) => {
        data.value[key] = '';
    });

    goTo('sign-in');
}

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    });
};

const setAllValidationMessage = async() => {
    Object.keys(data.value).forEach((key) => {
        if(key == 'email' && !data.value[key].trim().length) {
            errorMessages.value[key] = 'Please Give Your Email'
        }

        if (key == 'email' && data.value[key] && !data.value[key].match(/\S+@\S+\.\S+/)) {
            errorMessages.value.email = "Please Give a Correct Email";
        }

        if(key == 'firstName' && !data.value[key].length) {
            errorMessages.value[key] = 'Please Give Your First Name';
        }

        if(key == 'lastName' && !data.value[key].length) {
            errorMessages.value[key] = 'Please Give Your Last Name';
        }

        if(key == 'mobile' && !data.value[key].length) {
            errorMessages.value[key] = 'Please Give Your Mobile No';
        }

        if (key == 'password' && !data.value.password.trim().length) {
            errorMessages.value.password = "Please Give A Password";
        }

        if (key == 'password' && data.value.password && data.value.password.trim().length < 6) {
            errorMessages.value.password = "Password Must Be More Than Six Character";
        }

        if (key == 'confirmPassword' && !data.value.confirmPassword.trim().length) {
            errorMessages.value.confirmPassword = "Please Give A Confim Password";
        }

        if (key == 'confirmPassword' && data.value.password.trim() != data.value.confirmPassword.trim()) {
            errorMessages.value.password = "Password and Confirm Password not Match";
            errorMessages.value.confirmPassword = "Password and Confirm Password not Match";
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

const onSubmit = async () => {

    if(validate()) {
        isLoading.value = true;

        let fullName = data.value.firstName + " " + data.value.lastName;
        
        let param = {
            "source":"DEFAULT",
            "type":"DEFAULT",
            email: data.value.email,
            fullName : fullName,
            mobile: data.value.mobile,
            password: data.value.password,
        }

        authStore.signUp(param).then(() => {
            toaster.value.success(`${param.fullName} Profile has been Created`, 1500);
            onSuccess();
        }).catch((err) => {
            if(err == 'auth_error') {
                toaster.value.error(`Authenticaton Error`, 1500);
            } else if(err == 'duplicate_email') {
                errorMessages.value.email = 'This Email already exist';
                toaster.value.error(`Error`, 1500);
            } else if(err == 'network_error') {
                toaster.value.error(`Please Check Your Internate connection`, 1500);
            }
        });

        setTimeout(() => {
            isLoading.value = false;
        },500);
    } else {
        if(process.client) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};

onMounted(() => {
    if(process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
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
.eye_icon {
    width: 5%;
    position: relative;
    bottom: 35px;
    text-align: end;
    cursor: pointer;
    color: lightgray;
}
// .c-btn-primary {
//     background-color: #D1D1D1;
//     color: #6D7482 !important;
//     border-radius: 35px !important;
//     font-weight: 700 !important;

//     &:hover {
//         border: 1px solid #D1D1D1;
//         color: #6D7482 !important;
//         font-weight: 700 !important;
//         background-color: #ffff;
//     }
// }

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

.login-text {
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        color: #2277E0;
    }
}
</style>