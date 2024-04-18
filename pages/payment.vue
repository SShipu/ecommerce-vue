<template>
    <div>
        <PaymentMethod v-model="data"/>
    </div>
     <ModalBaseToastr ref="toast"/> 
 </template>
 
<script setup>
import { ordersPlaceClient } from "~/libs/gandalf/apis/config";
import { useCartStore } from '~~/stores/cart';
import { useAuthStore } from '~~/stores/auth-store';

import PaymentMethod from "~~/views/cart-checkout/PaymentMethod.vue";
import OrderSummery from "~~/views/cart-checkout/OrderSummery.vue";
 
definePageMeta({
    layout: "empty",
});
 
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const toast = ref(null);
const isLoading = ref(false);
const referenceId = ref('');

const goTo = (name) => {
    router.push({name: name})
}
const data = ref({
    address: {
         email: '',
         firstName: '',
         lastName: '',
         company: '',
         street: '',
         city: '',
         zip: '',
         country: 'Bangladesh',
         mobile: '',
         state: 'DHAKA',
         emailMe: false,
         saveInfo: false,
     },
     selectedPickingLocation: 'DHAKA',
     selectedPaymentType: 'CASH_ON_DELIVERY',
 });

const onSuccess = (res) => {
    toast.value.success('Your Order has been successfully Placed');
    
    router.push({
        name: 'order-confirmation',
        query: {
            total: cartStore.total,
            referenceId: res.body.id,
        }
    });
    cartStore.removeAll();

    if(process.client) {
        localStorage.removeItem('informations');
        localStorage.removeItem('guest');
        localStorage.removeItem('coupon');
        localStorage.removeItem('globalGiftWrap');
    }
}

const onSubmit = async () => {

    isLoading.value = true;

    let info= {
        firstName: data.value.address?.firstName,
        lastName: data.value.address?.lastName, 
        fullName: data.value.address?.firstName || data.value.address.lastName ? data.value.address.firstName + ' ' + data.value.address.lastName : "walking",
        mobile: data.value.address?.mobile ? data.value.address.mobile : "",
        email: data.value.address?.email ? data.value.address.email : "",
        street: data.value.address?.street ? data.value.address.street : "",
        city: data.value.address?.city ? data.value.address.city : "",
        zip: data.value.address?.zip ? data.value.address.zip : "",
        country: data.value.address?.country ? data.value.address.country : "Bangladesh",
        shortAddress: data.value.address.street + ' ' + data.value.address.city + ' ' + data.value.address.zip + ' ' + data.value.address.country,
        company: data.value.address.company ? data.value.address.company : "",
        saveInfo: data.value.address.saveInfo,
        emailMe: data.value.address.emailMe,
        pickPoint: data.value.selectedPickingLocation,
        paymentType: data.value.selectedPaymentType,
    };

    let req = {
        info: {
            fullName: info.fullName,
            mobile: info.mobile,
            email: info.email,
            shortAddress: info.shortAddress,
            contactNumber: info.mobile,
            type: "INDIVIDUAL",
            deviceId: "",
            deviceName: "",
        },

        source: "ECOMMERCE",
        couponId: "",
        locationType: "SHOWROOM_STOCK",
        locationId: "LKFARBY2-194KK79ZUS3EK-KQCX2CETEIOQ",
        customerId: "",
        discountType: "PERCENTAGE",
        discountAmount: 0,
        vatAmount: 15,
        vatType: "PERCENTAGE",
        paymentType: info.paymentType,
        paymentStatus: "PENDING",
        items: [],
        extras: {
            globalGiftWrap: '',
            couponCode: '',
            couponDiscount: '',
        },
        packagingInstructions: [],
    };

    let couponObj = JSON.parse(localStorage.getItem('coupon'));
    let globalGiftWrapObj = JSON.parse(localStorage.getItem('globalGiftWrap'));

    if(couponObj && couponObj.couponCode) {
        req.extras.couponCode = couponObj.couponCode;
        req.extras.couponDiscount = couponObj.amount;
    }

    // if(globalGiftWrapObj && globalGiftWrapObj.amount) {
    //     req.extras.globalGiftWrap = globalGiftWrapObj.amount;
    // }

    if(cartStore.totalGiftWrapFee) {
        req.extras.globalGiftWrap = cartStore.totalGiftWrapFee;
    }

    req.items = cartStore.items.map((item) => {
        return {
            itemId: item.product.id,
            itemTitle: item.product.title,
            skuCode: item.sku.code,
            price: Number(item.sku.salesPrice),
            // price: Number(item.sku.discountedSalesPrice) && Number(item.sku.discountedSalesPrice) > 0 ? Number(item.sku.discountedSalesPrice) : Number(item.sku.salesPrice),
            discountedPrice: Number(item.sku.discountedSalesPrice),
            quantity: Number(item.quantity),
        };
    });
    if (cartStore?.items?.length) {
        cartStore.items.forEach(item => {
            if (item?.packagingInstructions?.isGiftWrap) {
                req.packagingInstructions.push({
                    itemId: item.product.id,
                    skuCode: item.sku.code,
                    sender: item?.packagingInstructions?.sender,
                    recipient: item?.packagingInstructions?.recipient,
                    message: item?.packagingInstructions?.message,
                    instruction: "",
                    typeId: "<gift>",
                    fee: Number(item?.packagingInstructions?.fee),
                });
            };
        });
    }

    await serverSideUpdate(req)

    isLoading.value = false;
};

const serverSideUpdate = async (req) => {
    
    ordersPlaceClient.orderPlace(req).then((res) => {
        if (!res.networkError) {
            if (res.status == 201) {
                onSuccess(res);
            }
        }
    });
}

watch(()=> authStore.profile, ()=> {
     if(process.client) {

        let guestUser = JSON.parse(localStorage.getItem("guest"));
        let informations = JSON.parse(localStorage.getItem('informations'));

        if(informations) {
            data.value.address.email = informations.email;
            data.value.address.firstName = informations.firstName ? informations.firstName : '';
            data.value.address.lastName = informations.lastName ? informations.lastName : '';
            data.value.address.street = informations.street ? informations.street : '';
            data.value.address.zip = informations.zip ? informations.zip : '';
            data.value.address.country = informations.country ? informations.country : '';
            data.value.address.city = informations.city ? informations.city : '';
            data.value.address.mobile = informations.mobile ? informations.mobile : '';
            data.value.address.company = informations.company ? informations.company : '';
            data.value.address.saveInfo = informations.saveInfo ? informations.saveInfo : '';
            data.value.address.emailMe = informations.emailMe ? informations.emailMe : '';
            data.value.selectedPickingLocation = informations.pickPoint ? informations.pickPoint : '';
            data.value.selectedPaymentType = informations.paymentType ? informations.paymentType : 'CASH_ON_DELIVERY';
        } else if(guestUser) {
            data.value.address.email = guestUser.email;
            data.value.address.firstName = guestUser.firstName ? guestUser.firstName : '';
            data.value.address.lastName = guestUser.lastName ? guestUser.lastName : '';
            data.value.address.street = guestUser.street ? guestUser.street : '';
            data.value.address.zip = guestUser.zip ? guestUser.zip : '';
            data.value.address.country = guestUser.country ? guestUser.country : '';
            data.value.address.city = guestUser.city ? guestUser.city : '';
            data.value.address.mobile = guestUser.mobile ? guestUser.mobile : '';
            data.value.address.company = guestUser.company ? guestUser.company : '';
            data.value.address.saveInfo = guestUser.saveInfo ? guestUser.saveInfo : '';
            data.value.address.emailMe = guestUser.emailMe ? guestUser.emailMe : '';
            data.value.selectedPickingLocation = guestUser.pickPoint ? guestUser.pickPoint : '';
            data.value.selectedPaymentType = guestUser.paymentType ? guestUser.paymentType : 'CASH_ON_DELIVERY';
        }
     } else if(authStore.profile) {
         // name.value = authStore.profile.name;
         let name = authStore.profile.name.split(" ");
 
         if(name && name.length) {
             data.value.address.firstName = name[0];
             data.value.address.lastName = name.slice(1).join(' ');
         }
         data.value.address.mobile = authStore.profile.mobile;
         data.value.address.email = authStore.profile.email;

     }
 
 },{immediate: true}, {deep: true});
 
 </script>
 
 <style lang="scss" scoped>
 .c-btn-primary {
    background-color: #2277E0;
    color: #ffff !important;
    border-radius: 35px !important;
    font-weight: 700 !important;
    padding: 10px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow:none;
    border: 1px solid #2277E0;
}

.c-btn-primary:hover {
    border: 1px solid #2277E0;
    color: #1C1C24 !important;
    font-weight: 700 !important;
    background-color: #ffff;
}
 </style>