import { ref, watch } from "vue";
import { defineStore } from "pinia";
// import skuUtils from "@/internals/sku-utils";
import skuUtils from "~~/libs/utils/sku-utils";
import { useGlobalDiscountStore } from "@/stores/global-discount-store";
export const useCartStore = defineStore("cartStore", () => {
    const globalDiscountStore = useGlobalDiscountStore();
    const items = ref([]);
    const quantity = ref(0);
    const total = ref(0);
    const discountedTotal = ref(0);
    const coupon = ref(0);
    const totalDiscount = ref(0);
    const shippingCost = ref(70);
    const giftWrapFee = ref(false);
    const packagingInstructions = ref(null);

    const isSideBarShow = ref(false);
    const note = ref("");

    // add to cart item
    function addToCart(payload) {
        isSideBarShow.value = true;

        const cartItem = items.value.find(
            (item) => item.sku.code === payload.sku.code
        );

        if (cartItem) {
            cartItem.quantity += payload.quantity;

            cartItem.subTotal = Number(skuUtils.extractPrice(payload.sku)) * cartItem.quantity;

            total.value += Number(skuUtils.extractPrice(payload.sku)) * payload.quantity;

            cartItem.disCountedSubTotal = globalDiscount(payload.sku, payload.product) * cartItem.quantity;
            discountedTotal.value += globalDiscount(payload.sku, payload.product) * payload.quantity;

            totalDiscount.value += Number(skuUtils.skuTotalDiscount(payload.sku)) * payload.quantity;

            quantity.value += payload.quantity;
        } else {
            let item = {};

            item.product = payload.product;
            item.sku = payload.sku;
            item.quantity = payload.quantity;
            item.packagingInstructions = {};
            item.subTotal =
                Number(skuUtils.extractPrice(payload.sku)) * item.quantity;
            total.value +=
                Number(skuUtils.extractPrice(payload.sku)) * item.quantity;
            // item.subTotal = globalDiscount(payload.sku, payload.product) * item.quantity;
            // total.value += globalDiscount(payload.sku, payload.product) * item.quantity;
            item.disCountedSubTotal = globalDiscount(payload.sku, payload.product) * payload.quantity;
            discountedTotal.value += globalDiscount(payload.sku, payload.product) * payload.quantity;
            totalDiscount.value +=
                Number(skuUtils.skuTotalDiscount(payload.sku)) * item.quantity;

            setTimeout(() => {
                items.value.push(item);
            }, 500);

            quantity.value += payload.quantity;
        }
        
        setTimeout(() => {
            localStorage.setItem(
                "cart",
                JSON.stringify({
                    items: items.value,
                    quantity: quantity.value,
                    total: total.value,
                    discountedTotal: discountedTotal.value,
                    totalDiscount: totalDiscount.value,
                    shippingCost: shippingCost.value,
                    packagingInstructions: packagingInstructions.value,
                    note: note.value,
                })
            );
        }, 1000);
    }

    // increase item quantity
    function increase(payload) {
        isSideBarShow.value = false;

        const index = items.value.indexOf(payload);
        if (index != -1) {
            let cartItem = items.value[index];
            cartItem.quantity++;
            quantity.value++;

            cartItem.subTotal = Number(skuUtils.extractPrice(payload.sku)) * cartItem.quantity;
            total.value += Number(skuUtils.extractPrice(cartItem.sku));

            // cartItem.subTotal = globalDiscount(payload.sku, payload.product) * cartItem.quantity;
            // total.value += globalDiscount(cartItem.sku, payload.product);
            cartItem.disCountedSubTotal = globalDiscount(payload.sku, payload.product) * cartItem.quantity;
            discountedTotal.value += globalDiscount(payload.sku, payload.product) * payload.quantity;

            totalDiscount.value += Number(
                skuUtils.skuTotalDiscount(cartItem.sku)
            );
        }

        localStorage.setItem(
            "cart",
            JSON.stringify({
                items: items.value,
                quantity: quantity.value,
                total: total.value,
                discountedTotal: discountedTotal.value,
                totalDiscount: totalDiscount.value,
                shippingCost: shippingCost.value,
                packagingInstructions: packagingInstructions.value,
                note: note.value,
            })
        );
    }

    // gift wrap package
    function addGiftPackageWrap(packageInfo) {
    // function addGiftPackageWrap(payload, packageInfo) {
    // const cartItem = items.value.findIndex(
    //     (item) => item.sku.code === payload.sku.code
    // );

    // if (cartItem > -1) {
    //     if (packageInfo.isGiftWrap) {
    //         items.value[cartItem].packagingInstructions = packageInfo;
    //         // giftWrapFee.value += Number(packageInfo.fee);
    //     } else {
    //         items.value[cartItem].packagingInstructions = {};
    //         // giftWrapFee.value -= Number(packageInfo.fee);
    //     }
    //     giftWrapFee.value = packageInfo.isGiftWrap;
    // }

        if (packageInfo.isGiftWrap) {
            packagingInstructions.value = packageInfo;
        } else {
            packagingInstructions.value = null;
        }

        giftWrapFee.value = packageInfo.isGiftWrap;

        localStorage.setItem(
            "cart",
            JSON.stringify({
                items: items.value,
                quantity: quantity.value,
                total: total.value,
                discountedTotal: discountedTotal.value,
                totalDiscount: totalDiscount.value,
                shippingCost: shippingCost.value,
                packagingInstructions: packagingInstructions.value,
                note: note.value,
            })
        );
    }

    /* Add Shipping Cost */
    const addShippingCost = (cost) => {
        shippingCost.value = cost;
    }

    /* Add Coupon discount amount */
    const addCoupon = (amount) => {
        coupon.value = amount;
    }

    /* Add Customer Note */
    const addNote = (val) => {
        note.value = val;
    }

    /* Change Sidebar Show */
    const changeSideBarShow = () => {
        isSideBarShow.value = false;
    }
    
    /* In total Gift package wrap fees */
    const totalGiftWrapFee = computed(() => {
        let total = 0;

        // if (items.value?.length) {
        //     items.value.forEach(item => {
        //         if (item?.packagingInstructions?.isGiftWrap) {
        //             let fee = item?.packagingInstructions?.fee;
        //             total += Number(fee);
        //         }
        //     });
        // }

        if (packagingInstructions.value?.isGiftWrap) {
            let fee = packagingInstructions.value?.fee;
            let quantity = packagingInstructions.value?.quantity;
            total = Number(fee) * Number(quantity);
        }

        return total;
    });

    // decrease items quantity
    function decrease(payload) {
        isSideBarShow.value = false;

        const index = items.value.indexOf(payload);
        if (index != -1) {
            let cartItem = items.value[index];
            if (cartItem.quantity > 1) {
                cartItem.quantity--;

                quantity.value--;

                cartItem.subTotal =
                    Number(skuUtils.extractPrice(payload.sku)) *
                    cartItem.quantity;
                total.value -= Number(skuUtils.extractPrice(cartItem.sku));

                // cartItem.subTotal = globalDiscount(payload.sku, payload.product) * cartItem.quantity;
                // total.value -= globalDiscount(cartItem.sku, payload.product);
                cartItem.disCountedSubTotal = globalDiscount(payload.sku, payload.product) * cartItem.quantity;
                discountedTotal.value -= globalDiscount(payload.sku, payload.product) * payload.quantity;


                totalDiscount.value -= Number(
                    skuUtils.skuTotalDiscount(cartItem.sku)
                );
            }
        }

        localStorage.setItem(
            "cart",
            JSON.stringify({
                items: items.value,
                quantity: quantity.value,
                total: total.value,
                discountedTotal: discountedTotal.value,
                totalDiscount: totalDiscount.value,
                shippingCost: shippingCost.value,
                packagingInstructions: packagingInstructions.value,
                note: note.value,
            })
        );
    }

    // remove cart item
    function removeCartItem(payload) {
        isSideBarShow.value = false;

        const index = items.value.indexOf(payload);
        if (index != -1) {
            let cartItem = items.value[index];

            quantity.value -= cartItem.quantity;

            total.value -= Number(skuUtils.extractPrice(payload.sku)) * cartItem.quantity;

            // total.value -= globalDiscount(payload.sku, payload.product) * cartItem.quantity;
            discountedTotal.value -= globalDiscount(payload.sku, payload.product) * payload.quantity;

            totalDiscount.value -=
                Number(skuUtils.skuTotalDiscount(payload.sku)) *
                cartItem.quantity;
        }

        items.value.splice(index, 1);

        localStorage.setItem(
            "cart",
            JSON.stringify({
                items: items.value,
                quantity: quantity.value,
                total: total.value,
                discountedTotal: discountedTotal.value,
                totalDiscount: totalDiscount.value,
                shippingCost: shippingCost.value,
                packagingInstructions: packagingInstructions.value,
                note: note.value,
            })
        );
    }

    // remove all cart items
    function removeAll() {
        isSideBarShow.value = false;

        items.value = [];
        quantity.value = 0;
        total.value = 0;
        discountedTotal.value = 0;
        totalDiscount.value = 0;
        shippingCost.value = 0;
        giftWrapFee.value = false;
        shippingCost.value = 0;
        coupon.value = 0;
        packagingInstructions.value = null;
        note.value = "";

        localStorage.setItem(
            "cart",
            JSON.stringify({
                items: items.value,
                quantity: quantity.value,
                total: total.value,
                discountedTotal: discountedTotal.value,
                totalDiscount: totalDiscount.value,
                shippingCost: shippingCost.value,
                packagingInstructions: packagingInstructions.value,
                note: note.value,
            })
        );
    }

    watch(items, () => {
        if (!items.value?.length) {
            quantity.value = 0;
        }
    })

    function globalDiscount(sku, item) {
        if (!item?.id) {
            return 0;
        }

        if (sku?.discountedSalesPrice > 0) {
            return sku.discountedSalesPrice;
        }

        if (!globalDiscountStore?.discounts?.length) {
            return sku?.salesPrice;
        }

        let discountPrice = 0;
        let salesPrice = Number(sku?.salesPrice);
        // let categoryId = item?.categories[0]?.id;
        let categoryIds = item?.categories.map(i => i?.id.replaceAll("-", ""));
        let collectionIds = item?.collections.map(i => i?.id.replaceAll("-", ""));
        let findSizeSku = sku?.code;

        
        globalDiscountStore.discounts.forEach(element => {
            console.log("element in cart store");
            console.log(element);
            let discount = element.discountType === 'PERCENTAGE' ? Math.floor(salesPrice - salesPrice * Number(element.value) / 100) : salesPrice - Number(element.value);

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
                let findItem = element?.items?.length && element.items.filter(i=> i.itemId === item.id);
                if (findItem.length) {
                    if (findItem[0]?.skuCode?.length && findItem[0].skuCode === findSizeSku) {
                        discountPrice = discount;
                    } else if (findItem[0] && !findItem[0]?.skuCode?.length) {
                        discountPrice = discount;
                    } 
                }
            }
        });
        
        return discountPrice > 0 ? discountPrice : salesPrice;
    }

    // initial read and set items
    function initialize() {
        if (process.client) {
            let cartJson = localStorage.getItem("cart");
            
            if (cartJson != null) {
                let cart = JSON.parse(cartJson);

                items.value = cart.items;

                quantity.value = Number(cart.quantity);

                total.value = Number(cart.total);
                discountedTotal.value = Number(cart.discountedTotal);
                totalDiscount.value = Number(cart.totalDiscount);
                shippingCost.value = Number(cart.shippingCost);
                packagingInstructions.value = cart.packagingInstructions;
                note.value = cart.note;
            }

            let data = JSON.parse(localStorage.getItem("coupon"));
            if (data?.amount) {
                coupon.value = data.amount;
            }
        }
    }

    return {
        items,
        quantity,
        total,
        discountedTotal,
        giftWrapFee,
        totalGiftWrapFee,
        packagingInstructions,
        totalDiscount,
        isSideBarShow,
        changeSideBarShow,
        addToCart,
        increase,
        decrease,
        removeCartItem,
        removeAll,
        addGiftPackageWrap,
        initialize,
        shippingCost,
        addShippingCost,
        addCoupon,
        coupon,
        addNote,
        note,

    };
});
