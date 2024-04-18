<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <ModalBaseModal 
        title="" 
        :show="showModal" 
        @close="showModal = false" 
        maxWidth="60%" 
        :bgImgStyle="{backgroundImage: `url('/images/home/banner.png')`, height: '60vh'}"
        :modalFooter="false"
        body-style="padding: 0"
    >
        <div class="w-100 h-100 position-relative overflow-auto">
            <div 
                class="w-100 h-100 text-white position-absolute d-flex justify-content-center align-items-center flex-column" 
                style="z-index: 99;"
            >
                <p class="display-1 fw-bolder">GET 10% OFF</p> <br>
                <p class="display-4">
                    Here is your discount code 
                </p> <br>
                <p class="display-1 fw-bolder">CBR10</p>
                <button 
                    class="btn btn-light bg-btn rounded-pill shadow-none fs-4 fw-bold mt-3 px-3 py-2 c-btn-primary" 
                    @click.prevent="router.push({name: 'shop'}), showModal = false"
                >Shop Now</button>
            </div>
        </div>
    </ModalBaseModal>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
import { useCategoryStore } from "~/stores/category-store";
import { useMenuStore } from "~/stores/menu-store";
import { useLookupsStore } from "~/stores/lookups-store";
import { useAttributesStore } from "~/stores/attributes-store";
import { useAuthStore } from "~/stores/auth-store";
import { useWishlistStore } from "~~/stores/wishlist-store";
import { useGlobalDiscountStore } from "@/stores/global-discount-store";
import { useMetaTagStore } from "@/stores/meta-tag-store";
import { usePagesContentStore } from "@/stores/pages-content-store";

const globalDiscountStore = useGlobalDiscountStore();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const menuStore = useMenuStore();
const metaTagStore = useMetaTagStore();
const pagesContentStore = usePagesContentStore();
const route = useRoute();
const router = useRouter();
const lookupsStore = useLookupsStore();
const attributesStore = useAttributesStore();
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
const isHome = ref(route.name == 'index' ? true : false)
const showModal = ref(false);
watch(()=> authStore.currentUser, ()=> {
    if(authStore.currentUser) {
        wishlistStore.initialize();
    }   
}, {deep: true});

onMounted(() => {
  	authStore.init();
    cartStore.initialize();
    categoryStore.initialize();
    menuStore.initialize();
    lookupsStore.initialize();
    attributesStore.initialize();
    globalDiscountStore.initialize();
    metaTagStore.initialize();
    pagesContentStore.initialize();
    
    if(authStore.currentUser) {
        wishlistStore.initialize();
    }

    if (process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });  
});
const preventScroll = (event) => {
    event.preventDefault();
};
watch(isHome, ()=> {
    if (!isHome.value) {
        showModal.value = false;
    } else {
        if (process.client) {
            // const body = document.querySelector("body");
            // body.style.overflow = (showModal.value && isHome.value) ? "hidden" : "auto";
            window.addEventListener('scroll', preventScroll);
        }
    }
}, {deep: true, immediate: true});

if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll',()=> {
        window.onscroll = function(ev) {
            let defaultHeader = document.getElementById('header');
            
            if (defaultHeader != null) {
                if (window.scrollY >= 110) {
                    defaultHeader.classList.add("position-fixed", "top-0");
                } else {
                    defaultHeader.classList.remove("position-fixed", "top-0");
                };
            }
        };
    })
}
</script>