<template>
    <!-- <MetaHead :meta="metaTags"/> -->
    <section class="description_section">
        <!-- {{ itemRef }} -->
        <!-- {{globalDiscountStore}} -->
        <h2 class="proximaNovaBlack" style="font-size: 2rem;">
            {{ title }}
        </h2>

        <div class="d-flex justify-content-start my-2 fw-bolder">
            <span class="fs-5 m-0" style="font-size: 18px; font-weight: 700;">
                SKU: &nbsp;
            </span>
            {{ code }}
        </div>
        
        <div class="d-flex justify-content-between my-2" v-if="globalDiscount > 0">
            <span class="proximaNovaRegular" style="font-size: 18px; font-weight: 700;">
                Tk. <del style="color: #ea1a21">
                    <span style="color: #212529">
                        {{ price.salesPrice }}
                    </span> 
                </del>&nbsp;
                {{ globalDiscount }}/-
            </span>
        </div>
        <div class="d-flex justify-content-between my-2" v-else>
            <span class="proximaNovaRegular" style="font-size: 18px; font-weight: 700;">
                Tk. {{ price.salesPrice }}/-
            </span>
        </div>

        <div v-if="attributes.length" class="border-top m-0"></div>
        <!-- v-if="attributes.length && hasVariation "  -->
        <!-- {{ selectedAttributeValues }} -->
        <PickingAttribute 
            v-if="attributes.length " 
            class="border-top mt-3 py-3" 
            v-for="(attribute, i) in attributes"
            :key="i" 
            :index="i" 
            :attribute="attributes[i]" 
            v-model="selectedAttributeValues"
            :stocks="itemRef.stocks ? itemRef.stocks : []" 
            :selectedLocation="''" 
            :error="errorMessages.options" 
        /> 
        <!-- {{ selectedSku }} -->
        <div class="d-flex justify-content-start my-2 cursor-pointer" v-if="selectedAttributeValues.length > 1">
            <p class="fs-4 fw-bolder m-0" v-if="hasStock">
                <i class="fas fa-check-circle" style="color: #2277E0"></i> In Stock
            </p>
            <p class="fs-4 fw-bolder m-0" v-else style="color: red">
                <i class="fas fa-times-circle"></i> Out of Stock
            </p>
        </div>

        <!-- buttons -->
        <div class="mt-2 pb-3 border-top border-bottom">
            <div class="d-flex justify-content-start my-2 cursor-pointer">
                <p class="fs-5 fw-bolder m-0 text-decoration-underline" @click.prevent="showSizeGuideModal = true">
                    Size & Fit Guide
                </p>
            </div>
            <!-- <div class="d-flex justify-content-start">
                <span class="proximaNovaRegular text-black">
                    Size & Fit Guide
                </span>
            </div> -->

            <div class="mt-2 d-flex">
                <div class="num_count rounded-pill">
                    <div id="minus" class="minus">
                        <button class="btn" @click.prevent="onDecrease()"><i class="fas fa-minus"></i></button>
                    </div>

                    <!-- :disabled="!selectedHasEnoughQuantity" -->
                    <input id="qty1" v-model="quantity" :disabled="true" type="text" class="qty" />

                    <div id="add" class="add">
                        <button class="btn" @click.prevent="onIncrease()"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <!-- {{ quantity }} -->
                <div class="btn-group ms-2" role="group" aria-label="Basic outlined example">
                    <button :class="isActive && 'active'" type="button" class="btn c-btn-outline-wish text-black py-0 fs-3"
                        @click.prevent="addToWishList()">
                        <i class="far fa-heart far-heart" style="font-size: 20px;"></i>
                        <i class="fa fa-heart far-heart-2" style="font-size: 20px;"></i>
                    </button>
                    <!-- <button type="button" class=" ms-2 rounded-5 px-2 px-lg-4 py-1 btn c-btn-add-cart"
                        :disabled="!selectedHasEnoughQuantity"
                        @click.prevent="addToCart($event)">Add to Cart</button>
                    <button type="button" class=" ms-2 rounded-5 px-2 px-lg-4 py-1 btn c-btn-add-cart"
                        :disabled="!selectedHasEnoughQuantity"
                        @click.prevent="buyNow($event)">Buy Now</button> -->
                    <button type="button" class=" ms-2 rounded-5 px-2 px-lg-4 py-1 btn c-btn-add-cart"
                        :disabled="!selectedHasEnoughQuantity"
                        @click.prevent="addToCart($event)">Add to Cart</button>
                    <button type="button" class=" ms-2 rounded-5 px-2 px-lg-4 py-1 btn c-btn-add-cart"
                        :disabled="!selectedHasEnoughQuantity"
                        @click.prevent="buyNow($event)">Buy Now</button>
                </div>
            </div>
        </div>

        <!-- others -->
        <div 
            class="accordion accordion-flush border-bottom mt-4 description-container" 
            id="accordionFlushExample" 
            v-if="overviewDetails.length && overviewDetails[0]?.title?.length"
        >
            <div class="accordion-item" v-for="(acc, ind) in overviewDetails" :key="ind">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button style="color: #1C1C24;" class="accordion-button collapsed px-0" type="button"
                        data-bs-toggle="collapse" :data-bs-target="`#detail_${ind}`" aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        <h4>
                            {{ acc.title }}
                        </h4>
                    </button>
                </h2>
                <div :id="`detail_${ind}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body px-0" v-html="acc.content" style="color: #1C1C24;"></div>
                </div>
            </div>
        </div>
        <div 
            class="accordion accordion-flush border-bottom mt-4 description-container" 
            id="accordionFlushExample"
            v-else
        >
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button style="color: #1C1C24;" class="accordion-button collapsed px-0" type="button"
                        data-bs-toggle="collapse" data-bs-target="#product_overview" aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        <h4>
                            Product Overview
                        </h4>
                    </button>
                </h2>
                <div id="product_overview" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body px-0" style="color: #1C1C24;">
                        <h5>Product Overview</h5>
                        <p>Warm, windproof, water-resistant—the Nano Puff® Jacket uses incredibly lightweight and highly compressible 
                        60-g PrimaLoft® Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E.™ 
                        (Produced Using Reduced Emissions) technology, wrapped in a 100% recycled polyester shell and lining. 
                        Fair Trade Certified™ sewn.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button style="color: #1C1C24;" class="accordion-button collapsed px-0" type="button"
                        data-bs-toggle="collapse" data-bs-target="#materials_details" aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        <h4>
                            Materials Details
                        </h4>
                    </button>
                </h2>
                <div id="materials_details" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body px-0" style="color: #1C1C24;">
                        <h5>Baby Crocodile stuff</h5>
                        <p>Lightweight 100% recycled polyester ripstop shell with a PFC-free DWR finish (durable water repellent coating that does not contain perfluorinated chemicals)</p>
                        <h5>100% Recycled Inslation</h5>
                        <p>60-g PrimaLoft® Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E.™ (Produced Using Reduced Emissions) technology provides excellent warmth for its weight, stays warm when wet and reduces carbon emissions as compared to conventional production methods</p>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

    <SizeGuide 
        v-if="showSizeGuideModal" 
        :show="showSizeGuideModal" 
        @close="showSizeGuideModal = false" 
        :type="category"
        :sizeCharts="sizeCharts"
        :title="title"
    />

    <ModalBaseToastr 
        ref="toast" 
    />
</template>

<script setup>
import { useCartStore } from "~~/stores/cart";
import skuUtils from "~~/libs/utils/sku-utils";
import { useAuthStore } from '~~/stores/auth-store';
import { cmsClient, kvpsClient } from '~~/libs/gandalf/apis/config';
import { useWishlistStore } from '~~/stores/wishlist-store';

import PickingAttribute from "./PickingAttribute.vue";
import SizeGuide from "@/views/commons/SizeGuide.vue";

import { useItemDetailDto } from "~/composables/item-detail/useItemDetailDto";

import { useGlobalDiscountStore } from "@/stores/global-discount-store";

// import { useMetaTagStore } from "~/stores/meta-tag-store";
// import MetaHead from '@/views/commons/MetaHead.vue';

// const metaTagStore = useMetaTagStore();
const globalDiscountStore = useGlobalDiscountStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const showSizeGuideModal = ref(false);

const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
    overviewDetails: {
        type: Array,
        default: [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    sizeCharts: {
        type: Object,
        default: null,
    },
});
const emit = defineEmits(['handleButtonClick'])
const toast = ref(null);
const itemRef = toRef(props, "item");
const router = useRouter();
const errorMessages = ref({
    options: '',
});

const activeWishListLocale = ref(false);
const selectedAttributeValues = ref([]);

const { title, hasVariation, price, attributes, selectedSku, code } = useItemDetailDto(
    itemRef,
    selectedAttributeValues
);

const quantity = ref(1);

const selectedTotalQuantity = computed(() => {

    let cartItems = cartStore.items;

    if (itemRef.value && itemRef.value.skus && itemRef.value.skus.length >= 0) {
        if (selectedSku.value) {
            let cartItem = cartItems.find(
                (item) => item.sku.code === selectedSku.value.code
            );

            if (cartItem)
                return (
                    skuUtils.skuTotalQuantity(
                        itemRef.value,
                        selectedSku.value,
                        "LOLY2UVD-1HBTY4ZESF7YX--197IBCC0D3AIK"
                    ) - cartItem.quantity
                );

            return skuUtils.skuTotalQuantity(
                itemRef.value,
                selectedSku.value,
                "LOLY2UVD-1HBTY4ZESF7YX--197IBCC0D3AIK"
            );
        }
    }

    return 0;
});

const selectedHasEnoughQuantity = computed(() => {
    return (
        selectedTotalQuantity.value > 0 &&
        selectedTotalQuantity.value >= Number(quantity.value)
    );
});

const hasStock = computed(() => {
    if (selectedTotalQuantity.value > 0) {
        return true;
    }
    return false
});

const onDecrease = async () => {
    if (Number(quantity.value) > 1) quantity.value -= 1;
};

const onIncrease = async () => {
    if (
        selectedTotalQuantity.value &&
        Number(selectedTotalQuantity.value) > Number(quantity.value)
    ) {
        quantity.value += 1;
    } else {
        toast.value.error('Please Select Color and Size');
    }
};

const clearValidations = () => {
    Object.keys(errorMessages.value).forEach((key) => {
        errorMessages.value[key] = '';
    })
};

const validate = () => {
    clearValidations();

    if (selectedSku.value == null) {
        errorMessages.value.options = 'Please select an options'
        toast.value.error(`Please select an options`, 1500);
        return false;
    }

    // if (!selectedHasEnoughQuantity.value) {
    //     toast.value.error(`Sorry No more Product Available`, 1500);
    //     return false;
    // }

    return true
};

watch(selectedSku, () => {
    if (selectedSku.value) {
        clearValidations();
    }
});

const addToCart = async (e) => {

    if (validate()) {
        let submitData = {
            product: JSON.parse(JSON.stringify(props.item)),
            quantity: Number(quantity.value),
            sku: null,
        };

        if (selectedSku.value != null) {
            submitData.sku = selectedSku.value;
            toast.value.success(`Added to Your Cart`, 1500);

            cartStore.addToCart(submitData);
        } else {
            toast.value.error(`Please select an options`, 1500);
        }
        emit('handleButtonClick', e);
    }
};

const buyNow = async (e) => {
    if (validate()) {
        let submitData = {
            product: JSON.parse(JSON.stringify(props.item)),
            quantity: Number(quantity.value),
            sku: null,
        };

        if (selectedSku.value != null) {
            submitData.sku = selectedSku.value;
            toast.value.success(`Added to Your Cart`, 1500);

            cartStore.addToCart(submitData);
        } else {
            toast.value.error(`Please select an options`, 1500);
        }
        emit('handleButtonClick', e);

        setTimeout(() => {
            router.push({name: 'cart-review'});
        }, 500);
    }
};

const addToWishList = async () => {
    let title = props.item.title;
    let data = {
        itemId: props.item.id,
        skuCode: props.item.code,
        wishlistId: ""
    }

    if(authStore && authStore.currentUser) {

        cmsClient.addToWishlist(data).then((res)=> {
            
            if(!res.networkError) {
                if (res.status == 201) {
                    toast.value.success(`${title} Successfully added to Wishlist`, 1500);
                    wishlistStore.updateList(data);
                    activeWishListLocale.value = true;
                } else {
                    toast.value.error(`${title} Failed to add Wishlist`, 1500);
                }
            } else {
                toast.value.error(`Please Check your Internate Connection`, 1500);
            }
        }).catch((err) => {
            toast.value.error(`Failed to add Wishlist`, 1500);
        });
    } else {
        toast.value.error(`Login First`, 1500);
    }
};

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

const category = computed(() => {
    let cate = "shirts";
    let cloths = ['shirts', 'pants', 'kurta', 'joggers']
    if(itemRef.value?.categories?.length) {
        let hasCloth = itemRef.value?.categories.filter(i => cloths.includes(i.name.toLowerCase()));
        if (hasCloth.length) {
            cate = hasCloth[0].name.toLowerCase();
        }
    }
    return cate;
});

const globalDiscount = computed(() => {
    if (!props.item?.id) {
        return 0;
    }
    if (price.value.discountedPrice > 0) {
        return price.value.discountedPrice;
    }

    let discountPrice = 0;
    let salesPrice = Number(price.value.salesPrice);
    // let categoryId = props?.item?.categories[0]?.id;
    let categoryIds = props?.item?.categories.map(i => i?.id.replaceAll("-", ""));
    let collectionIds = props?.item?.collections.map(i => i?.id.replaceAll("-", ""));
    
    let findSizeSku = selectedAttributeValues.value.filter(i => i.optionName.toLowerCase() == 'size')[0]?.code;

    if (globalDiscountStore?.discounts?.length) {
        globalDiscountStore.discounts.forEach(element => {

            let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);

            // if (element.type === 'FIXED_CATEGORY' && element.valid) {
            //     let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId === categoryId);
            //     if (findItem.length) {
            //         discountPrice = discount
            //     }
            // }
            if (element.type === 'FIXED_CATEGORY' && element.valid) {
                // let findItem = element?.categories?.length && element.categories.filter(i=> i.categoryId === categoryId);
                let findItem = element?.categories?.length && element.categories.filter(i=> categoryIds.includes(i.categoryId.replaceAll("-", "")));
                if (findItem.length) {
                    discountPrice = discount
                }
            }
    
            if (element.type === 'FIXED_COLLECTION' && element.valid) {
                let findItem = element?.collections?.length && element.collections.filter(i=> collectionIds.includes(i.collectionId.replaceAll("-", "")));
                if (findItem.length) {
                    discountPrice = discount;
                }
            }

            if (element.type === 'FIXED_PRODUCT' && element.valid) {
                let findItem = element?.items?.length && element.items.filter(i=> i.itemId === props.item.id);
                if (findItem.length) {
                    if (findItem[0]?.skuCode?.length && findItem[0].skuCode === findSizeSku) {
                        discountPrice = discount;
                    } else if (findItem[0] && !findItem[0]?.skuCode?.length) {
                        discountPrice = discount;
                    } 
                }
            }
        });
    }

    return discountPrice;
});

</script>

<style lang="scss">
.description_section {

    .c-btn-add-cart {
        background-color: #2277E0;
        color: #ffff;
        font-weight: 700;
        font-size: 1rem;
    }

    .c-btn-add-cart:hover {
        border: 1px solid #2277E0;
        background-color: transparent;
        color: #000 !important;

    }

    .c-btn-outline-wish {
        border: 1px solid #2277E0;
        border-radius: 10px !important;
        font-weight: 700 !important;
        // color: #000 !important;
        // color: transparent !important;

        // width: 40px;
        // height: 40px;
        //   background-color: #f6f8fa;
        border-radius: 50%;
        text-align: center;
        line-height: 35px;
        margin-left: 15px;
        // visibility: hidden;
        display: inline-block;

        .far-heart {
            display: block;
            // color: #f55050;
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

        // i {
        //     .fa-heart-o {
        //         border: 1px solid #2277E0 !important;
        //         display: block !important;
        //         color: #2277E0 !important;
        //     }
        //     .fa-heart {
        //         display: none;
        //     }
        // }
        // i:hover {
        //     color: #f55050;
        // }
        // .fa-heart-o {
        //     display: block;
        //     color: rebeccapurple;
        // }
        // .fa-heart {
        //     display: block;
        // }

        // &:hover {
        //     .fa-heart-o {
        //         display: none;
        //     }
        //     .fa-heart {
        //         display: block;
        //         color: #f55050;
        //     }
        // }
    }

    .c-btn-outline-wish:hover {
        background-color: #2277E0;
        color: #ffff !important;
        font-weight: 700 !important;
        border-radius: 10px !important;
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

    .num_count {
        width: 120px;
        height: 45px;
        -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
        box-shadow: 0px 1px 10px 5px #f4f4f4;
        position: relative;
        // border-radius: 35px;
        border: 1px solid #2277E0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .num_count input {
        width: 50px;
        text-align: center;
        margin: 0 auto;
        border: none;
        font-size: 18px;
        font-weight: 700;
    }

    .num_count button {
        padding: 0;

        i {
            font-size: 14px;
        }
    }

    .num_count .minus {
        left: 0px;
        display: flex;
        cursor: pointer;
        color: #1f2230;
        position: absolute;
        height: inherit;
        width: 35px;
        text-align: center;
        border-right: 1px solid #2277E0;
    }

    .num_count button,
    .num_count button:focus {
        width: 100%;
        border: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 20px;
    }

    .num_count .add {
        position: absolute;
        display: flex;
        right: 0px;
        cursor: pointer;
        width: 35px;
        height: inherit;
        color: #1f2230;
        border-left: 1px solid #2277E0;
    }

    .num_count .minus button {
        text-align: center;
    }

    .num_count .add button {
        text-align: center;
    }

    .attribute-body {
        width: 100px;
        height: 48px;
    }
}


.zoom {
    position: absolute;
    width: 40px;
    opacity: 0;
    animation: zoom 1s linear forwards;
}

@keyframes zoom {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        top: 40px;
        right: 40px;
    }
}

.description-container {
    .accordion-header {
        font-size: 20px !important;
        font-weight: 700 !important;
        div {
            cursor: pointer;
        }
    }
    .accordion-body {
        font-size: 16px !important;
        font-weight: 600 !important;
        div {
            cursor: pointer;
        }
    }
    .accordion-item {
        background-color: transparent !important;
        color: #fff;
    }
    .accordion-button {
        background-color: transparent !important;
        color: #fff;
    }
    // .accordion-button:not(.collapsed)::after {
    //     background-image: none !important;
    // }
    // .accordion-button::after {
    //     background-image: none !important;
    // }
}
</style>