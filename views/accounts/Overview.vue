<template>
    <div class="">
        <div class="ms-1 ms-lg-5 d-flex flex-column flex-lg-row c_name_section">
            <div 
                class="c_circle d-flex justify-content-center align-items-center rounded-circle border border-1" 
            >
                <h2>
                    {{ firstLetter }}
                </h2>
            </div>

            <div class="ms-0 ms-lg-4 text-center text-lg-start">
                <h2>Hey {{ name }}</h2>
                <p class="text-secondary">Thanks for being a Level 1 Real Rewards member.</p>
                
                <div class="d-flex d-none d-lg-block">
                    <button 
                        type="button" 
                        class="btn btn-light px-4 py-2 rounded-pill" 
                        style="background: var(--heading-text, #1C1C24); color: #fff;"
                    >
                        Your Park
                    </button>
                    
                    <button 
                        type="button" 
                        class="btn btn-light px-4 py-2 mx-2 rounded-pill" 
                        style="background: var(--primary-color, #2277E0); color: #fff;"
                    >
                        Your Park
                    </button>
                </div>
            </div>
        </div>
        
        <div class="row mt-5 d-flex">
            <div class="px-4 text-center text-lg-start col-12 col-lg-4 d-flex flex-column justify-content-center justify-content-lg-start align-items-center align-items-lg-start rounded-circle">
                <h1 class="" style="line-height: 150%; word-spacing: 5px;">You're 1,250 points away from a Tk. 200 reward.</h1>
                <p class="text-secondary">Thanks for being a Level 1 Real Rewards member.</p>
            </div>

            <div class="col-12 col-lg-7 d-flex justify-content-center justify-content-lg-start align-items-center rounded-circle">
                <div 
                    class="c_point d-flex justify-content-center align-items-center rounded-circle" 
                >
                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <span class="" style="font-weight: 700; font-size: 4rem;">
                            0
                        </span>
                        <span>Points</span>
                    </div>
                </div>
            </div>

            <div class="c_work_button mt-3 mt-lg-0">
                <button 
                    type="button" 
                    class="btn btn-light px-4 py-1 rounded-pill" 
                    style="background: var(--heading-text, #1C1C24); color: #fff;"
                >
                    How It Works
                </button>
            </div>
            
        </div>

    </div>
</template>

<script setup>
import { useAuthStore } from "~~/stores/auth-store";

const authStore = useAuthStore();

const name = computed(() => {
    if(authStore.profile) {
        return authStore.profile.name;
    } else if(authStore.currentUser) {
        return authStore.currentUser.fullName;
    }

    return '';
});

const firstLetter = computed(() => {
    if(name.value) {
        return name.value[0];
    }

    return '';
});
</script>

<style lang="scss" scoped>
.c_name_section {
    @media screen and (max-width: 991px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.c_circle {
    height: 100px;
    width: 100px;

    @media screen and (max-width: 991px) {
        height: 80px;
        width: 80px;

        background-color: #2277E0;
        color: #fff;
        // border: 4px solid #2277E0;
    }
}

.c_point {
    width: 200px; 
    height: 200px; 
    border: 25px solid #D1D1D1 !important;

    @media screen and (max-width: 991px) {
        width: 150px;
        height: 150px;
        border: 20px solid #D1D1D1 !important;
    }
}

.c_work_button {
    @media screen and (max-width: 991px) {
        display: flex;
        justify-content: center;
    }
}
</style>