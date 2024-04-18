<template>
    <a :href="itemLink" class="card rounded-6 w-100 me-3 shadow-none bg-transparent" style="cursor: pointer;" @click.prevent="goToDetail">
        <div class="card-img-top bg-image position-relative" :style="{backgroundImage: `url('${primaryImageUrl}')`}">
            <!-- :style="{backgroundImage: `url('${primaryImageUrl}')`}" -->
            <!-- <div class="overflow-hidden h-100">
                <img :src="primaryImageUrl" class="w-100 h-100 rounded-0 img-fluid" alt="">
            </div> -->

            <div v-if="isNewBadge" class="border border-0 position-absolute rounded-3 py-0 card-tag px-1 text-white bg-dark fs-4 fw-bold">
                New
            </div>

            <!-- <div class="wish-link" style="position: absolute; top: 25px; right: 2%; " :class="isActive && 'active'"
                v-if="authStore.isAuthenticated && isWishIconVisible" @click.prevent="addToWishList">
                <i class="far fa-heart far-heart" style="font-size: 20px;"></i>
                <i class="fa fa-heart far-heart-2" style="font-size: 20px;"></i>
            </div> -->

            <div class="w-100 h-100 position-absolute justify-content-center align-items-center overview-container overlay">
                <div class="fs-2 fw-bolder d-flex">
                    <i class="far fa-eye mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="showOverviewModal = true"></i>
                    <i class="fas fa-shopping-cart mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="goToDetail"></i>
                </div>
                
            </div>
        </div>

        <div class="card-body d-flex flex-column align-items-start p-2 p-lg-2 p-md-2" @click.prevent="goToDetail">
            <span class="card-text m-0 my-1">{{ category }}</span>
            <h5 class="card-title text-black fs-5 text-center m-0">{{ title }}</h5>
            <!-- <span class="card-text text-black my-1" v-if="discountedSalesPrice > 0">
                Tk. <del style="color: #ea1a21">
                    <span style="color: #212529">
                        {{ price }}
                    </span> 
                </del>&nbsp;
                {{ discountedSalesPrice }}/-
            </span> -->
            <span class="card-text text-black my-1 mt-lg-2 mt-md-2" v-if="globalDiscount > 0">
                Tk. <del style="color: #ea1a21">
                    <span style="color: #212529">
                        {{ price }}
                    </span> 
                </del>&nbsp;
                {{ globalDiscount }}/-
            </span>
            <span class="card-text text-black mt-lg-2 mt-md-2" v-else>TK. {{ price }}</span>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>

    </a>
    <ModalBaseModal 
        v-if="showOverviewModal"
        title="Overview" 
        :show="showOverviewModal" 
        @close="showOverviewModal = false" 
        maxWidth="90%" 
        :modalFooter="false"
        body-style="padding: 0"
    >
        <DetailsMain :item-id="id"/>
    </ModalBaseModal>
    <ModalBaseToastr ref="toaster" />
</template>

<script setup>
import { useItemDto } from '~/composables/useItemDto';
import { useAuthStore } from '~~/stores/auth-store';
import { useWishlistStore } from '~~/stores/wishlist-store';
import { cmsClient } from '~~/libs/gandalf/apis/config';
import DetailsMain from '@/views/detail/DetailsMain.vue';
import { useGlobalDiscountStore } from "@/stores/global-discount-store";

const globalDiscountStore = useGlobalDiscountStore();
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
const { id, primaryImageUrl, title, price, discountedSalesPrice, category, subscriptionPrice } = useItemDto(itemRef);

const activeWishListLocale = ref(false);
const currentScreenHeight = ref(process.client ? window.screen.height : 0);
const showOverviewModal = ref(false);

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
    if (showOverviewModal.value) {
        return;
    }
    router.push({
        name: 'detail',
        query: {id: id.value}
    });
    scrollToTop();
};

const scrollToTop = () => {
    if (process.client) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

const globalDiscount = computed(() => {
    if (!props.item?.id) {
        return 0;
    }
    if (discountedSalesPrice.value) {
        return discountedSalesPrice.value;
    }
    let discountPrice = 0;
    let salesPrice = Number(price.value);
    let categoryId = props?.item?.categoryIds[0].replaceAll("-", "");
    // console.log("props.item?.id");
    // console.log(props.item);
    if (globalDiscountStore?.discounts?.length) {
        globalDiscountStore.discounts.forEach(element => {
            let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);

            if (element.type === 'FIXED_CATEGORY' && element.valid) {
                let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId.replaceAll("-", "") === categoryId);
                if (findItem.length) {
                    discountPrice = discount;
                }
            }

            if (element.type === 'FIXED_PRODUCT' && element.valid) {
                let findItem = element?.items?.length && element.items.filter(i=> i.itemId === props.item.id && !i?.skuCode?.length);
                if (findItem.length) {
                    discountPrice = discount;
                }
            }
        });
    }

    return discountPrice;
});
</script>

<style lang="scss" scoped>
.heightOfImg {
    max-height: 420px !important;
    min-height: 420px !important;
}

.card-img-top {
    height: 50vh;

    .overview-container {
        display: none;

    }
    &:hover {
        .overview-container {
            display: flex !important;
            div {
                color : white;
                .circle-color {
                    border-color: rgb(34, 119, 224) !important;
                    background-color: rgb(34, 119, 224);
                    &:hover {
                        border-color: white !important;
                        background-color: white;
                    }
                }
                i {
                    &:hover {
                        color: rgb(34, 119, 224);
                    }
                }
            }
        }
    }
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