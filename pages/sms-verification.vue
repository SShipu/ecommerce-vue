<template>
    <div class="container-fluid h-100vh">
        <main class="container py-2 py-lg-5">
            <section class="m-0 m-xl-5 m-xxl-5">
                <h1>SMS Verification</h1>
                
                <h4 class="my-2">Enter your code you receive via sms</h4>
                
                <form class="mx-2 my-3">

                    <div class="row form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control rounded-4" 
                            id="floatingInput" 
                            placeholder="Enter your code"
                            v-model="verificationCode"
                        >
                        <label for="floatingInput">Enter your code</label>
                        <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
                    </div>
    
                    <div class="row">
                        <button type="submit" class="rounded-5 py-1 btn c-btn-primary fs-5 py-2" @click="onSubmit">Confirm</button>
                    </div>

                    <div class="mt-3 text-center">
                        <span class="text-decoration-underline code-text fw-bold">Didn’t receive a code?</span>
                    </div>
                </form>
            </section>
        </main>
    </div>
</template>

<script setup>

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const mobile = ref('');
const password = ref('');
const confirmPassword = ref('');

const onSubmit = () => {}
</script>

<style lang="scss" scoped>
.c-btn-primary {
    background-color: #D1D1D1;
    color: #6D7482 !important;
    border-radius: 35px !important;
    font-weight: 700 !important;

    &:hover {
        border: 1px solid #D1D1D1;
        color: #6D7482 !important;
        font-weight: 700 !important;
        background-color: #ffff;
    }
}

.code-text {
    cursor: pointer;
    font-size: 1rem;
    color: #2277E0;

    &:hover {
        color: #6D7482;
    }
}
</style>