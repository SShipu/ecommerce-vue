<template>
    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 pt-2 mt-2 mt-lg-5">
        <h3 >Wishlist</h3>
        <div class="mx-2">
            <div v-if="(isFetchingPage) && !all && !all.length"
                class="d-flex flex-column justify-content-center align-items-center">
                <NotFound :caption="'ITEMS'"/>
            </div>

            <GridSection 
                v-else 
                :items="all" 
                style="border-top: 1px solid transparent !important;" 
            />
        </div>
    </div>
</template>

<script setup>
import NotFound from "~~/views/404/NotFound.vue";
import GridSection from "~~/views/accounts/grids/GridSection.vue";
import { useWishlistStore } from "~~/stores/wishlist-store";

const wishlistStore = useWishlistStore();

// const all = ref([]);

// watch(()=> wishlistStore, ()=> {
//     if(wishlistStore.wishList.length) {
//         all.value = wishlistStore.wishList;
//     }
// }, {deep: true});


const all = computed(()=> {
    let list = [];
    if (wishlistStore.wishList && wishlistStore.wishList.length > 0 ) {
        list = wishlistStore.wishList;
    }
    return list;
});

</script>

<style lang="scss" scoped>

</style>