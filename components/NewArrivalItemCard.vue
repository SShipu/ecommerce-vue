<template>
    <a :href="itemLink" class="card rounded-3 shadow-none w-100 me-2 bg-transparent" style="cursor: pointer;">
        <div class="card-img-top bg-image position-relative">
            <!-- :style="{backgroundImage: `url('${primaryImageUrl}')`}" -->
            <div class="overflow-hidden h-100 rounded-3">
                <img :src="primaryImageUrl" class="w-100 h-100 rounded-0 img-fluid" alt="">
            </div>

            <div v-if="isNewBadge" class="border border-0 position-absolute rounded-3 py-0 card-tag text-white px-1 bg-dark fs-4 fw-bold">
                New
            </div>

            <!-- <div class="wish-link" style="position: absolute; top: 25px; right: 2%; " :class="isActive && 'active'"
                v-if="authStore.isAuthenticated && isWishIconVisible" @click.prevent="addToWishList">
                <i class="far fa-heart far-heart" style="font-size: 20px;"></i>
                <i class="fa fa-heart far-heart-2" style="font-size: 20px;"></i>
            </div> -->
        </div>

        <div class="card-body d-flex flex-column align-items-center p-2 p-lg-2 p-md-2" @click.prevent="goToDetail">
            <!-- <div v-if="isColor" class="colors-container d-flex justify-content-center align-items-center">
                <div class="each-color rounded-circle bg-image mx-0 mx-0-5 mx-lg-1 mx-md-1" v-for="(color, i) in colors" :key="i"
                    :style="{ backgroundColor: color }">
                </div>
            </div> -->
            
            <h5 class="card-title text-black fs-5 text-center m-0 my-1 my-lg-2 my-md-2 ">{{ title }}</h5>
            <!-- <span v-if="isColor" class="card-text m-0 my-1">Multicolor</span> -->
            <!-- <span class="card-text text-black" v-if="discountedSalesPrice > 0">
                Tk. <del style="color: #ea1a21">
                    <span style="color: #212529">
                        {{ price }}
                    </span> 
                </del>&nbsp;
                {{ discountedSalesPrice }}/-
            </span>
            <span class="card-text text-black" v-else>TK. {{ price }}</span> -->
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>
    </a>
    
    <ModalBaseToastr ref="toaster" />
</template>

<script setup>
import { useItemDto } from '~/composables/useItemDto';
import { useAuthStore } from '~~/stores/auth-store';
import { useWishlistStore } from '~~/stores/wishlist-store';
import { cmsClient } from '~~/libs/gandalf/apis/config';

const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const router = useRouter();

const toaster = ref(null);

const props = defineProps({
    item: {
        type: Object,
        default: null
    },
    isColor: {
        type: Boolean,
        default: true
    },
    isNewBadge: {
        type: Boolean,
        default: true
    },
    isWishIconVisible: {
        type: Boolean,
        default: true
    }
});

const itemRef = toRef(props, 'item');
const { id, primaryImageUrl, title, price, discountedSalesPrice, subscriptionPrice } = useItemDto(itemRef);

const activeWishListLocale = ref(false);
const currentScreenHeight = ref(process.client ? window.screen.height : 0);

const colors = ref([
    "#A58282",
    "#F7F9B7",
    "#9ED484",
    "#9FE0E4",
    "#7A8FD8"
]);

const itemLink = computed(() => {
    
    let link = "#";
    // let name = props.type ? props.type : "";
    let ids = id.value ? id.value : "";
    if (ids) {
        link = `/detail?id=${id.value}`;
    }
    return link;
});

const goToDetail = () => {
    router.push({
        name: 'detail',
        query: {id: id.value}
    })
};

const addToWishList = async () => {
    let title = props.item.title;
    let data = {
        itemId: props.item.id,
        skuCode: props.item.code,
        wishlistId: ""
    }

    cmsClient.addToWishlist(data).then((res)=> {
        
        if (res.status == 201 && !res.networkError) {
            toaster.value.success(`${title} Successfully added to Wishlist`, { duration: 1500});
            wishlistStore.updateList(data);
            activeWishListLocale.value = true;
        } else {
            toaster.value.error(`${title} Failed to add Wishlist`, { duration: 1500});
        }
    })
}

const isActive = computed(() => {
    let active = false;

    if(activeWishListLocale.value) {
        active = true;
    }else if (props.item && props.item.id) {
        let isExists = wishlistStore.isExists(props.item.id, props.item.code);
        if (isExists) {
            active = true;
        }
    }
    return active;
});
</script>

<style lang="scss" scoped>
.heightOfImg {
    max-height: 389px !important;
    min-height: 389px !important;
}

.card-img-top {
    height: 40vh;
}



.wish-link {
    width: 40px;
    height: 40px;
    //   background-color: #f6f8fa;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    margin-left: 15px;
    // visibility: hidden;
    display: inline-block;
    
    .far-heart {
        display: block;
        color: #f55050;
    }
    .far-heart-2 {
        display: none;
    }

    &:hover {
        .far-heart {
            display: none;
        }
        .far-heart-2 {
            display: block;
            color: #f55050;
        }
    }
}

.active{
    i {
        color: #f55050;
    }
    .far-heart {
        display: none !important;
    }
    .far-heart-2 {
        display: block !important;
    }
    svg {
        path {
            fill: #f55050;
            stroke: #f55050;
        }
    }
}

.card-tag {
    top: 20px;
    left: 20px;
}

.colors-container {
    .each-color {
        width: 20px;
        height: 20px;
    }
}

@media screen and (max-width: 550px) {
    .card-img-top {
        height: 30vh;
    }
    .colors-container {
        .each-color {
            width: 15px;
            height: 15px;
        }
    }
}
</style>