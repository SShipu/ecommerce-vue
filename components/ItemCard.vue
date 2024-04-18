<template>
    <a :href="itemLink" class="card rounded-6 w-100 me-3 shadow-none bg-transparent" style="cursor: pointer;" @click.prevent="goToDetail">
        <div
            class="product-bg-img"
            v-if="primaryImages.length > 1"
        >
            <div
                class="bg-img-contain even-first card-img-top bg-image position-relative" :style="{backgroundImage: `url('${primaryImages[0]}')`}"
            >
                <div v-if="newBadge.length" class="border border-0 position-absolute rounded-3 py-0 card-tag px-1 text-white bg-dark fs-4 fw-bold">
                    {{newBadge}}
                </div>
                <div class="w-100 h-100 position-absolute justify-content-center align-items-center overview-container overlay">
                    <div class="fs-2 fw-bolder d-flex">
                        <i class="far fa-eye mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="showOverviewModal = true"></i>
                        <i class="fas fa-shopping-cart mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="goToDetail"></i>
                    </div>
                </div> 
            </div>
            <div
                class="bg-img-contain odd-last card-img-top bg-image position-relative" :style="{backgroundImage: `url('${primaryImages[1]}')`}"
            >
                <div v-if="newBadge.length" class="border border-0 position-absolute rounded-3 py-0 card-tag px-1 text-white bg-dark fs-4 fw-bold">
                    {{newBadge}}
                </div>
                <div class="w-100 h-100 position-absolute justify-content-center align-items-center overview-container overlay">
                    <div class="fs-2 fw-bolder d-flex">
                        <i class="far fa-eye mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="showOverviewModal = true"></i>
                        <i class="fas fa-shopping-cart mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="goToDetail"></i>
                    </div>
                </div> 
            </div>
        </div>
        <div class="product-bg-img" v-else>
            <div
                class="bg-img-contain card-img-top bg-image position-relative" :style="{backgroundImage: `url('${primaryImageUrl}')`}"
            >
                <div v-if="newBadge.length" class="border border-0 position-absolute rounded-3 py-0 card-tag px-1 text-white bg-dark fs-4 fw-bold">
                    {{newBadge}}
                </div>
                <div class="w-100 h-100 position-absolute justify-content-center align-items-center overview-container overlay">
                    <div class="fs-2 fw-bolder d-flex">
                        <i class="far fa-eye mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="showOverviewModal = true"></i>
                        <i class="fas fa-shopping-cart mx-1 p-2 border border-3 rounded-circle circle-color" style="font-size: 20px;" @click.prevent="goToDetail"></i>
                    </div>
                </div> 
            </div>
        </div>

        <div class="card-body d-flex flex-column align-items-start p-2 p-lg-2 p-md-2" @click.prevent="goToDetail">
            <span class="card-text m-0 my-1">{{ category }}</span>
            <h5 class="card-title text-black fs-5 text-center m-0">{{ title }}</h5>
           
            <span class="card-text text-black my-1 mt-lg-2 mt-md-2" v-if="globalDiscount > 0">
                Tk. <del style="color: #ea1a21">
                    <span style="color: #212529">
                        {{ price }}
                    </span> 
                </del>&nbsp;
                {{ globalDiscount }}/-
            </span>
            <span class="card-text text-black mt-lg-2 mt-md-2" v-else>TK. {{ price }}</span>
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
        default: false
    },
    isWishIconVisible: {
        type: Boolean,
        default: true
    }
});

const itemRef = toRef(props, 'item');
const { id, primaryImageUrl, primaryImages, title, price, discountedSalesPrice, category, subscriptionPrice } = useItemDto(itemRef);

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
    // let categoryId = props?.item?.categoryIds[0].replaceAll("-", "");
    let categoryIds = props?.item?.categoryIds.map(i => i.replaceAll("-", ""));
    let collectionIds = props?.item?.collectionIds.map(i => i.replaceAll("-", ""));
    
    if (globalDiscountStore?.discounts?.length) {
        globalDiscountStore.discounts.forEach(element => {
            let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);

            if (element.type === 'FIXED_CATEGORY' && element.valid) {
                let findItem = element?.categories?.length && element.categories.filter(i=> categoryIds.includes(i.categoryId.replaceAll("-", "")));
                // let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId.replaceAll("-", "") === categoryId);
                if (findItem.length) {
                    discountPrice = discount;
                }
            }

            if (element.type === 'FIXED_COLLECTION' && element.valid) {
                // let findItem = element?.collections?.length && element.collections.filter(i=> i.collectionId.replaceAll("-", "") === collectionId);
                let findItem = element?.collections?.length && element.collections.filter(i=> collectionIds.includes(i.collectionId.replaceAll("-", "")));
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

const discountPercent = computed(() => {
    let salesPrice = Number(price.value);
    let discount = Number(salesPrice - globalDiscount.value);
    let percent = 0;
    if (globalDiscount.value > 0) {
        percent = Math.ceil((discount / salesPrice) * 100);
    }

    return percent;
});

const newBadge = computed(() => {
    let badge = "";
    if (discountPercent.value > 0) badge = discountPercent.value + '%';
    else if (props.isNewBadge)  badge = "New";

    return badge;
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
.product-bg-img {
    transition: all 0.1s ease-out;

    .even-first {
        display: block;
    }

    .odd-last {
        display: none;
    }

    &:hover {
        transition: all 0.1s ease-in-out;

        .even-first {
            display: none;
        }

        .odd-last {
            display: block;
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