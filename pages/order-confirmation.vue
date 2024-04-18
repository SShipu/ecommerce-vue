<template>
    <main class="container-fluid c-cart-review-container h-100vh">
        <section class="mx-xxl-5 mx-sm-2 py-2 d-flex flex-column">
            <div class="card rounded-4">
                <div class="card-body">
                    <div class="d-flex flex-column text-center">
                        <h1 class="primary-color heading">Thank your for your order</h1>
                        <p class="secondary-color para">Please check your inbox as confirmation email is on its way</p>
                        
                        <div class="row flex-column d-flex align-items-center">

                            <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-12 row justify-content-center">
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-5 text-start">
                                    <span class="secondary-color span fw-bold">Order Total:</span>
                                </div>
    
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-7 text-start">
                                    <span class="primary-color span fw-bold">TK. {{ total }}</span>
                                </div>
                            </div>

                            <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-12 row justify-content-center">
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-5 text-start">
                                    <span class="secondary-color span fw-bold">Order Reference:</span>
                                </div>
    
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-7 text-start">
                                    <span class="primary-color span fw-bold">{{ referenceId }}</span>
                                </div>
                            </div>

                            <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-12 row justify-content-center">
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-5 text-start">
                                    <span class="secondary-color span fw-bold">Deliver:</span>
                                </div>
    
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-7 text-start">
                                    <span class="primary-color span fw-bold">{{ deliveryDate }}</span>
                                </div>
                            </div>

                            <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-12 row justify-content-center">
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-5 text-start">
                                    <span class="secondary-color span fw-bold">Order Status:</span>
                                </div>
    
                                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-7 text-start">
                                    <span class="primary-color span fw-bold">Received</span>
                                </div>
                            </div>
                        </div>
                        <p v-if="!authStore.currentUser" class="mt-3 fs-4">You can also <a href="/sign-up" @click.prevent="router.push({name: 'sign-up'})">Create</a> Account</p>
                    </div>
                </div>
            </div>

            <div class="col-12 d-flex justify-content-center mt-5 mt-xl-1 mt-xxl-1">
                <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-8 d-flex btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class=" ms-2 rounded-5 px-2 py-1 btn c-btn-primary fs-5 py-2" @click.prevent="goTo('shop')">Continue Shopping</button>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { DateUtils } from '~~/libs/utils/DateUtils';
import { useAuthStore } from "~~/stores/auth-store";

const authStore = useAuthStore();
const total = ref(0);
const referenceId = ref('');

const route = useRoute();
const router = useRouter();
// const hasAccount = ref(false);

const goTo = (name) => {
    router.push({name: name})
}
const deliveryDate = computed(() => {
    return DateUtils.millisecondsToReadableWeekDay(new Date(new Date().getTime()+(2*24*60*60*1000)));
});

const hasAccount = computed(() => {
    if (route?.query?.account) {
        return route.query.account;
    }
    return "false";
});
watch(()=> route, ()=> {

    if(route.query.total) {
        total.value = route.query.total;
    }
    if(route.query.referenceId) {
        referenceId.value = route.query.referenceId;
    }
    
}, {immediate: true}, {deep: true});
</script>

<style lang="scss" scoped>
.primary-color {
    color: #0a0a0b;
}

.secondary-color {
    color: #6D7482;
}

.heading {
    font-size: 3rem;
}

@media (max-width: 450px) {
    .heading {
        font-size: 1.90rem;
    }   
}

.para {
    font-size: 1.25rem;
}

.span {
    font-size: 1rem;
}

.c-btn-primary {
    background-color: #2277E0;
    color: #ffff !important;
    border-radius: 35px !important;
    font-weight: 700 !important;
}

.c-btn-primary:hover {
    border: 1px solid #2277E0;
    color: #1C1C24 !important;
    font-weight: 700 !important;
    background-color: #ffff;
}

@media (max-width: 550px) {
    .c-btn-primary {
        background-color: #1C1C24;
        color: #ffff !important;
        border-radius: 35px !important;
        font-weight: 700 !important;
    }

    .c-btn-primary:hover {
        border: 1px solid #1C1C24;
        color: #1C1C24 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
}
</style>