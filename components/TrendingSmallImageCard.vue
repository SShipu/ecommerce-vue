<template>
    <a :href="itemLink" class="rounded-6 w-75 me-3" style="cursor: pointer;">
        <!-- <div class="card-img-top bg-image position-relative" :style="{ backgroundImage: `url('${primaryImageUrl}')` }"></div> -->
        <div class="card-img-top bg-image position-relative" :style="{ backgroundImage: `url('/images/home/t-1.png')` }"></div>

        <div class="d-flex flex-column align-items-start p-0 py-1" @click.prevent="goToDetail">

            <h5 class="card-title text-black fs-3 m-0 mt-1 mt-lg-2 mt-md-2">Recent Fashion Show Only For Kids 2023</h5>
            <p class="card-text text-start text-black py-2">Placeholder text commonly used in the graphic, print, and publishing industries
                for previewing layouts and visual mockups.
            </p>
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
    max-height: 420px !important;
    min-height: 420px !important;
}

.card-img-top {
    height: 55vh;
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

.active {
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
}</style>