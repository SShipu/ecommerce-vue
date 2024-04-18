<template>
    <div id="hamburger-nav" class="hamburger-nav" :class="show && 'open-nav'">
        <div
            class="sc-head d-flex justify-content-between align-items-center border-bottom"
        >
            <div v-if="authStore.isAuthenticated" class="nav-top" @click.prevent="navigateTo('/')">
                <a class="navbar-brand" style="display: flex; align-items: baseline;font-size: 1rem; font-weight: 700;">
                    <span class="me-2" style="height: 24px; width: 24px;border-radius: 180px; padding: 2px; display: flex; justify-content: center;background-color: #2277E0; color: #fff;">{{ firstLetter }}</span> Hi, {{ name }}
                </a>
            </div>

            <div v-else class="nav-top" @click.prevent="navigateTo('/')">
                <a class="navbar-brand">
                    <img src="/images/logo/logo.svg" alt="" />
                </a>
            </div>

            <div
                class="close-icon rounded-circle border border-light d-flex justify-content-center align-items-center"
                @click="$emit('closeSideNav', false)"
            >
                <i class="fas fa-times fa-lg"></i>
            </div>
        </div>
        
        <div class="overflow-auto h-75">
            <div>
                <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" href="/new-arrival" @click.prevent="goto('new-arrival')">New Arrival</a>
                </div>
                <div class="px-3 py-2"
                     v-for="(cat, i) in categoryStore.parentCategories"
                    :key="i"
                >
                    <a class="fs-4 fw-bold nav-link" @click.prevent="goToShopPage(cat)">{{ cat.name.toUpperCase()[0] + cat.name.toLowerCase().slice(1) }}</a>
                </div>
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Eid Collection</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Matching Family Sets</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Babies</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Boys</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Girls</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Accessories</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="goToPage('shop')">Sale</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Hot</a>
                </div> -->
                <!-- <div class="px-3 py-2">
                    <a class="fs-4 fw-bold nav-link" @click.prevent="navigateTo('shop')">Collections</a>
                </div> -->
            </div>
            <div class="border-top mt-1 pt-3" v-if="authStore.isAuthenticated">
                <span class="px-3" style="color: #000; font-weight: 600;">Account</span>

                <div class="my-3 px-3">
                    <a class="fs-5 fw-bold nav-link" 
                        @click.prevent="goToAccount('overview')"
                    >
                        Overview
                    </a>
                </div>

                <div class="px-3 my-3">
                    <a class="fs-5 fw-bold nav-link" @click.prevent="goToAccount('order')">My Order</a>
                </div>

                <div class="px-3 my-3">
                    <a class="fs-5 fw-bold nav-link" @click.prevent="goToAccount('wishlist')">My Wishlist</a>
                </div>

                <div class="px-3 my-3">
                    <a class="fs-5 fw-bold nav-link" @click.prevent="goToAccount('settings')">Account Settings</a>
                </div>
            </div>

            <div class="border-top mt-1 pt-3">
                <div class="px-3 py-1" v-if="!authStore.currentUser">
                    <a class="fs-5 fw-bold nav-link" @click.prevent="goToPage('sign-in')">Login</a>
                </div>
                <!-- <div class="px-3 py-1">
                    <a class="fs-5 fw-bold nav-link" @click.prevent>Sustainability</a>
                </div> -->
                <!-- <div class="px-3 py-1">
                    <a class="fs-5 fw-bold nav-link" @click.prevent>Stores</a>
                </div> -->
                <div class="px-3 py-1">
                    <a class="fs-5 fw-bold nav-link" @click.prevent="goToPage('contacts')">Customer Care</a>
                </div>

                <div class="px-3 py-1" v-if="authStore.currentUser">
                    <a class="fs-5 fw-bold nav-link" @click.prevent="onSignOut()">LogOut</a>
                </div>
                <!-- <div class="px-3 py-1">
                    <a class="fs-5 fw-bold nav-link" @click.prevent>Language: English</a>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCategoryStore } from "~~/stores/category-store";
import { useAuthStore } from "~~/stores/auth-store";

const router = useRouter();
const authStore = useAuthStore();
const categoryStore = useCategoryStore();

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['closeSideNav']);

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

const closeBar = () => {
    emits('closeSideNav', false);
}

const goto = (name) => {
    router.push({name: name});
    closeBar();
}

const goToShopPage = (cat) => {
    navigateTo({
                path: '/shop',
                query: {
                    categories: [cat.name],
                    routeBehavior: true,
                    isWatcher: true,
                }
            });
    
    closeBar();
};

const goToAccount = (params) => {
    router.push({
        name: 'account',
        query: {
            tab: params,
        },
    });

    closeBar();
}

const goToPage = (path) => {
    navigateTo(path);
    closeBar();
};

const onSignOut = () => {
    authStore.signOut();

    if(process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("profile");
    }

    navigateTo("sign-in");
    closeBar();
};

watch(()=> props.show, ()=> {
    if (process.client) {
        const body = document.querySelector("body");
        if (props.show) body.style.setProperty("overflow", "hidden");
        else body.style.removeProperty("overflow");
    }
}, {immediate: true, deep: true});

onUnmounted(() => {
    if (process.client) {
        const body = document.querySelector("body");
        body.style.removeProperty("overflow")
    }
});
</script>

<style lang="scss">
a {
    cursor: pointer;
}
.hamburger-nav {
    width: 400px;
    position: fixed;
    top: 0;
    left: -450px;
    z-index: 9999;
    background-color: white;
    height: 100vh;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

@media screen and (min-width: 501px) and (max-width: 1023px){
    .hamburger-nav {
        width: 60%;
        left: -60%;
    }
}
@media (max-width: 500px) {
    .hamburger-nav {
        width: 80%;
        left: -80%;
    }
}

.hamburger-nav.open-nav {
    left: 0;
}

.hamburger-nav .sc-head {
    background-color: #ffff;
    padding: 1.8rem 20px;
}
.hamburger-nav .sc-head .nav-top {
    color: #1c1c24;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
}
.hamburger-nav .sc-head .nav-top svg {
    fill: #1c1c24;
}
.hamburger-nav .sc-head .nav-top span {
    margin-left: 6px;
    margin-top: 6px;
}
.hamburger-nav .sc-head .close-icon {
    width: 30px;
    height: 30px;
    color: #1c1c24;
    cursor: pointer;
}
.hamburger-nav .sc-head .close-icon:hover {
    color: #1c1c34;
}
</style>
