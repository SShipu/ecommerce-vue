<template>
    <a :href="itemLink" class="card rounded-6 w-100 mx-2" style="cursor: pointer;">  
        <!-- {{ itemRef }} -->
        <div 
            class="card-img-top bg-image position-relative" 
        >
            <!-- :style="{backgroundImage: `url('${primaryImageUrl}')`}"   -->
            <!-- style="height: 20vh;" -->

            <!-- <div style="height: 18vh;" class="overflow-hidden heightOfImg">
                <img :src="primaryImageUrl" class="card-img-top rounded-0" alt="" style="height: inherit !important;" >
            </div> -->

            <div class="overflow-hidden" style="height: 22vh;">
                <img :src="primaryImageUrl" class="w-100 rounded-0 img-fluid" alt="">
            </div>

            <!-- <div class="overflow-hidden heightOfImg">
                <img :src="primaryImageUrl" class="rounded-0 img-fluid w-100" style="height: 15vh;" alt="">
            </div> -->

            <div v-if="isNewBadge" class="border border-0 position-absolute rounded-3 py-0 card-tag px-1 text-white bg-dark fs-4 fw-bold">New</div>
        
            <div 
                class="wish-link" 
                style="position: absolute; top: 25px; right: 2%; " 
                :class="isActive && 'active'" 
                v-if="authStore.isAuthenticated && isWishIconVisible" 
                @click.prevent="addToWishList"
            >
                <i class="far fa-heart far-heart" style="font-size: 20px;"></i>
                <i class="fa fa-heart far-heart-2" style="font-size: 20px;"></i>
            </div>
        </div>

        <div class="card-body d-flex flex-column align-items-center"  @click.prevent="goToDetail">

            <!-- <div v-if="isColor" class="colors-container d-flex justify-content-center align-items-center">
                <div class="each-color rounded-circle bg-image mx-0 mx-0-5 mx-lg-1 mx-md-1" v-for="(color, i) in colors" :key="i"
                    :style="{ backgroundColor: color }">

                </div>
            </div> -->

            <h5 class="card-title text-black fs-5 text-center m-0 mt-1 mt-lg-3 mt-md-3">{{ title }}</h5>
            <!-- <span v-if="isColor" class="card-text m-0 my-1">Multicolor</span> -->
            <span class="card-text text-black" v-if="discountedSalesPrice > 0">
                Tk. <del style="color: #ea1a21">
                    <span style="color: #212529">
                        {{ price }}
                    </span> 
                </del>&nbsp;
                {{ discountedSalesPrice }}/-
            </span>
            <span class="card-text text-black" v-else>TK. {{ price }}</span>
        </div>

    </a>
    <ModalBaseToastr ref="toaster"/> 
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
    // i {
    //     color: #0000;
    //     .fa-heart-o {
    //         display: block !important;
    //         background-color: #f55050;
    //     }
    //     .fa-heart {
    //         display: none;
    //     }
    // }
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
</style>