<template>
    <div class="container-fluid h-100vh">
        <main class="container py-2 py-lg-5">
            <section class="m-xl-5 m-0 m-xxl-5">

                <h1>Sign In</h1>

                <form class="mx-2 my-4">

                    <div class="row form-floating mb-3">
                        <input 
                            type="email" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            v-model="data.userName"
                        >
                        <label for="floatingInput">Email</label>
                        <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.userName }}</div>
                    </div>
        
                    <div class="row form-floating mb-3">
                        <input 
                            :type="!isShownPassword ? 'password' : 'text'" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="xxxxxxxx"
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
                        <div id="emailHelp" class="form-text" style="color: red;">{{ errorMessages.password }}</div>
                    </div>
    
                    <div class="row">
                        <button type="submit" class="rounded-5 py-1 btn c-btn-primary fs-5 py-2" @click.prevent="onSubmit">
                            <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Sign In
                        </button>
                    </div>

                    <div class="mt-2">
                        <span class="text-decoration-underline create-new-text" @click="goTo('sign-up')">Create new account</span>
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
const route = useRoute();
const toaster = ref(null);


const isShownPassword = ref(false);
const isLoading = ref(false);
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
const data = ref({
    userName: '',
    password: '',
});

const errorMessages = ref({
    userName: '',
    password: '',
});

const onSuccess = () => {
    Object.keys(data.value).forEach((key) => {
        data.value[key] = '';
    });


    if(route.name == 'shop') {
        goTo('index');
    } else {
        goTo('shop');
    }
}

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    });
};

const setAllValidationMessage = async() => {
    Object.keys(data.value).forEach((key) => {
        if(key == 'userName' && !data.value[key].trim().length) {
            errorMessages.value[key] = 'Please Give Your Email'
        }

        if (key == 'password' && !data.value.password.trim().length) {
            errorMessages.value.password = "Please Give A Password";
        }
    });
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

const onSubmit = async () => {

    if(validate()) {
        isLoading.value = true;

        let param = {
            userName: data.value.userName,
            password: data.value.password,
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
        },500);
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

.create-new-text {
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        color: #2277E0;
    }
}
</style>