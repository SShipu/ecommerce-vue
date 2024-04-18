<template>
    <NavNavbar class="d-lg-none d-block" />
    <main class="container-fluid c-cart-review-container">
        <section class="d-flex flex-column">
            <!-- <div class="row">
                 <div class="col-12">
                     <span class="" style="cursor: pointer;"  @click.prevent="$router.back()">
                         <i class="fs-4 fas fa-arrow-left me-2"></i> 
                         <span class="fs-4" style="color: #202028; font-weight: 600;">Back</span>
                     </span>
                 </div>
             </div> -->

            <div class="d-flex row flex-column flex-lg-row">
                <div class="px-2 px-md-5 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <NavBarV2 class="mb-3" :informations="mailingInfo" />

                    <div class="row py-2 px-md-3 d-block d-lg-none" style="background-color: #f0f0f0">
                        <div class="col-12 d-flex">
                            <div class="col-8">
                                <div class="d-flex flex-row">
                                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.6629 16.709C11.855 16.709 12.8086 17.6626 12.8086 18.8547C12.8086 20.0467 11.855 21.0004 10.6629 21.0004C9.47085 21.0004 8.5172 20.0467 8.5172 18.8547C8.5172 17.6924 9.50065 16.709 10.6629 16.709ZM10.6629 19.6891C11.1099 19.6891 11.4675 19.3315 11.4675 18.8845C11.4675 18.4375 11.1099 18.0798 10.6629 18.0798C10.2159 18.0798 9.85826 18.4375 9.85826 18.8845C9.85826 19.3017 10.2457 19.6891 10.6629 19.6891Z"
                                            fill="black" />
                                        <path
                                            d="M16.325 16.709C17.5171 16.709 18.4707 17.6626 18.4707 18.8547C18.4707 20.0467 17.5171 21.0004 16.325 21.0004C15.133 21.0004 14.1793 20.0467 14.1793 18.8547C14.1793 17.6924 15.1628 16.709 16.325 16.709ZM16.325 19.6891C16.772 19.6891 17.1296 19.3315 17.1296 18.8845C17.1296 18.4375 16.772 18.0798 16.325 18.0798C15.878 18.0798 15.5204 18.4375 15.5204 18.8845C15.5204 19.3017 15.878 19.6891 16.325 19.6891Z"
                                            fill="black" />
                                        <path
                                            d="M4.37505 3H5.98432C6.69955 3 7.32538 3.53642 7.41478 4.25166L7.8916 7.67881H19.6631C19.9611 7.67881 20.2591 7.82781 20.4678 8.06623C20.6466 8.30464 20.736 8.63245 20.6466 8.93046C20.6466 8.96027 20.6466 8.96026 20.6466 8.99007L18.7989 14.5629C18.6797 14.9801 18.2923 15.2781 17.8452 15.2781H9.62008C8.51743 15.2781 7.56379 14.4437 7.41478 13.3411L6.16312 4.43046C6.16312 4.37086 6.10352 4.34106 6.04392 4.34106H4.43465C4.07703 4.34106 3.74922 4.04305 3.74922 3.65563C3.74922 3.26821 4.01743 3 4.37505 3ZM8.69624 13.1325C8.75584 13.5795 9.14326 13.9073 9.59028 13.9073H17.577L19.1863 9.01987H8.10021L8.69624 13.1325Z"
                                            fill="black" />
                                    </svg>
                                    <span class="mx-1 pt-1" style="
                                            color: #181f29;
                                            font-size: 18px;
                                            font-weight: 600;
                                            line-height: 140%;
                                        ">Show order Summary</span>
                                </div>
                            </div>
                            <div class="col-4 pe-3 d-flex justify-content-end align-items-center">
                                <span style="font-size: 18px; font-weight: 700">Tk. {{ orderTotal }}</span>
                            </div>
                        </div>
                    </div>

                    <ShippingAddress v-model="data" ref="mailingInfo" />
                    <ShippingMethod v-model="data" />
                    <PaymentMethod v-model="data" />

                    <div class="col-12 my-4 d-flex flex-column-reverse flex-md-row" style="justify-content: space-between">
                        <div>
                            <span @click.prevent="goTo('cart-review')" style="
                                    cursor: pointer;
                                    font-size: 1.25rem;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "><i class="fas fa-chevron-left me-1"></i> Return
                                to cart</span>
                        </div>

                        <div class="mb-3 mb-md-0 px-1 px-md-0">
                            <div class="text-center c-btn-primary" @click="onSubmit">
                                Checkout
                                <!-- Continue to Shipping -->
                            </div>
                        </div>
                    </div>

                    <SiteFooterV2 class="mt-2 border-top d-none d-lg-block" />
                </div>
                <div class="row py-2 px-md-3 d-block d-lg-none" style="background-color: #f0f0f0">
                    <div class="col-12 d-flex">
                        <div class="col-8">
                            <div class="d-flex flex-row">
                                <!-- cart -->
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.6629 16.709C11.855 16.709 12.8086 17.6626 12.8086 18.8547C12.8086 20.0467 11.855 21.0004 10.6629 21.0004C9.47085 21.0004 8.5172 20.0467 8.5172 18.8547C8.5172 17.6924 9.50065 16.709 10.6629 16.709ZM10.6629 19.6891C11.1099 19.6891 11.4675 19.3315 11.4675 18.8845C11.4675 18.4375 11.1099 18.0798 10.6629 18.0798C10.2159 18.0798 9.85826 18.4375 9.85826 18.8845C9.85826 19.3017 10.2457 19.6891 10.6629 19.6891Z"
                                        fill="black" />
                                    <path
                                        d="M16.325 16.709C17.5171 16.709 18.4707 17.6626 18.4707 18.8547C18.4707 20.0467 17.5171 21.0004 16.325 21.0004C15.133 21.0004 14.1793 20.0467 14.1793 18.8547C14.1793 17.6924 15.1628 16.709 16.325 16.709ZM16.325 19.6891C16.772 19.6891 17.1296 19.3315 17.1296 18.8845C17.1296 18.4375 16.772 18.0798 16.325 18.0798C15.878 18.0798 15.5204 18.4375 15.5204 18.8845C15.5204 19.3017 15.878 19.6891 16.325 19.6891Z"
                                        fill="black" />
                                    <path
                                        d="M4.37505 3H5.98432C6.69955 3 7.32538 3.53642 7.41478 4.25166L7.8916 7.67881H19.6631C19.9611 7.67881 20.2591 7.82781 20.4678 8.06623C20.6466 8.30464 20.736 8.63245 20.6466 8.93046C20.6466 8.96027 20.6466 8.96026 20.6466 8.99007L18.7989 14.5629C18.6797 14.9801 18.2923 15.2781 17.8452 15.2781H9.62008C8.51743 15.2781 7.56379 14.4437 7.41478 13.3411L6.16312 4.43046C6.16312 4.37086 6.10352 4.34106 6.04392 4.34106H4.43465C4.07703 4.34106 3.74922 4.04305 3.74922 3.65563C3.74922 3.26821 4.01743 3 4.37505 3ZM8.69624 13.1325C8.75584 13.5795 9.14326 13.9073 9.59028 13.9073H17.577L19.1863 9.01987H8.10021L8.69624 13.1325Z"
                                        fill="black" />
                                </svg>
                                
                                <span class="mx-1 pt-1" style="
                                        color: #181f29;
                                        font-size: 18px;
                                        font-weight: 600;
                                        line-height: 140%;
                                    ">Show order Summary</span>

                                <!-- chevron down -->
                                <svg v-if="isSummeryHide" @click.prevent="
                                    isSummeryHide = !isSummeryHide
                                    " style="margin-top: 15px" width="12" height="7" viewBox="0 0 12 7" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.9949 1.02364C11.9951 1.20035 11.9265 1.37016 11.8036 1.49713L7.41784 6.04543C7.16865 6.30468 6.82462 6.45117 6.4651 6.45117C6.10558 6.45117 5.76155 6.30468 5.51236 6.04543L1.12658 1.49713C0.992943 1.36879 0.917239 1.19153 0.916993 1.00621C0.916751 0.820904 0.991888 0.643465 1.1252 0.514724C1.25844 0.385988 1.43837 0.317038 1.62361 0.323707C1.80884 0.330377 1.98329 0.412185 2.10697 0.550167L6.46518 5.06843L10.8234 0.550166C10.9497 0.418778 11.1235 0.343559 11.3058 0.341317C11.488 0.339075 11.6636 0.410024 11.7932 0.538279C11.9227 0.666534 11.9954 0.841389 11.995 1.02366L11.9949 1.02364Z"
                                        fill="#1C1C24" />
                                </svg>

                                <!-- chevron up -->
                                <svg v-if="!isSummeryHide" @click.prevent="
                                    isSummeryHide = !isSummeryHide
                                    " style="margin-top: 10px" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.00513 8.97636C2.00489 8.79965 2.07351 8.62984 2.19638 8.50287L6.58216 3.95457C6.83135 3.69532 7.17538 3.54883 7.5349 3.54883C7.89442 3.54883 8.23845 3.69532 8.48764 3.95457L12.8734 8.50287C13.0071 8.63121 13.0828 8.80847 13.083 8.99379C13.0832 9.1791 13.0081 9.35654 12.8748 9.48528C12.7416 9.61401 12.5616 9.68296 12.3764 9.67629C12.1912 9.66962 12.0167 9.58781 11.893 9.44983L7.53482 4.93157L3.1766 9.44983C3.05028 9.58122 2.87646 9.65644 2.69421 9.65868C2.51196 9.66092 2.33636 9.58997 2.20683 9.46172C2.07729 9.33346 2.00457 9.15861 2.00497 8.97634L2.00513 8.97636Z"
                                        fill="#1C1C24" />
                                </svg>
                            </div>
                        </div>
                        <div class="col-4 pe-3 d-flex justify-content-end align-items-center">
                            <span style="font-size: 18px; font-weight: 700">Tk. {{ orderTotal }}</span>
                        </div>
                    </div>
                </div>
                <div :class="[{ 'd-none': isSummeryHide }]"
                    class="c-order-summery p-1 p-md-3 mt-0 mt-xl-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6"
                    style="background-color: #f0f0f0">
                    <OrderSummery @order-summery="orderSummery" />
                </div>
                <div class="px-2 px-md-5 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 d-block d-lg-none">
                    <SiteFooterV2 class="mt-2 border-top" />
                </div>
            </div>
        </section>
    </main>

    <ModalBaseToastr ref="toast" />
</template>

<script setup>
import { useAuthStore } from "~~/stores/auth-store";
import { useCartStore } from "~~/stores/cart";
import { cmsClient, ordersPlaceClient } from "~/libs/gandalf/apis/config";

import ShippingAddress from "~~/views/cart-checkout/ShippingAddress.vue";
import OrderSummery from "~~/views/cart-checkout/OrderSummery.vue";

import ShippingMethod from "~~/views/cart-checkout/ShippingMethod.vue";
import PaymentMethod from "~~/views/cart-checkout/PaymentMethod.vue";
import { useGlobalDiscountStore } from "@/stores/global-discount-store";

const globalDiscountStore = useGlobalDiscountStore();

definePageMeta({
    layout: "empty",
});

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const authStore = useAuthStore();

const toast = ref(null);
const mailingInfo = ref(null);
const isSummeryHide = ref(false);
const isLoading = ref(false);
const orderTotal = ref(0);

const data = ref({
    addresses: [],
    address: {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        street: "",
        city: "",
        zip: "",
        country: "Bangladesh",
        mobile: "",
        state: "DHAKA",
        password: "",
        confirmPassword: "",
        emailMe: false,
        saveInfo: false,
        createAccount: false,
    },

    selectedAddress: null,
    selectedPickingLocation: "INSIDE_DHAKA",
    selectedPaymentType: "CASH_ON_DELIVERY",
});

const goTo = (name) => {
    router.push({ name: name });
};

const orderSummery = (total) => {
    orderTotal.value = total;
};

const onSubmit = async () => {
    if (mailingInfo.value.validate()) {
        let info = {
            firstName: data.value.address?.firstName,
            lastName: data.value.address?.lastName,
            fullName:
                data.value.address?.firstName || data.value.address.lastName
                    ? data.value.address.firstName +
                      " " +
                      data.value.address.lastName
                    : "walking",
            mobile: data.value.address?.mobile ? data.value.address.mobile : "",
            email: data.value.address?.email ? data.value.address.email : "",
            street: data.value.address?.street ? data.value.address.street : "",
            city: data.value.address?.city ? data.value.address.city : "",
            zip: data.value.address?.zip ? data.value.address.zip : "",
            country: data.value.address?.country
                ? data.value.address.country
                : "Bangladesh",
            shortAddress:
                data.value.address.street +
                " " +
                data.value.address.city +
                " " +
                data.value.address.zip +
                " " +
                data.value.address.country,
            company: data.value.address.company
                ? data.value.address.company
                : "",
            saveInfo: data.value.address.saveInfo,
            emailMe: data.value.address.emailMe,
            password: data.value.address.password,
            confirmPassword: data.value.address.confirmPassword,
            createAccount: data.value.address.createAccount,
            pickPoint: data.value.selectedPickingLocation,
            paymentType: data.value.selectedPaymentType,
        };

        if (authStore.profile) {
            localStorage.setItem("informations", JSON.stringify(info));
        } else {
            localStorage.setItem("guest", JSON.stringify(info));
        }

        // goTo('shipping-method');
        await paymentSubmit();
    } else if (process.client) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

const onSuccess = (res) => {
    toast.value.success("Your Order has been successfully Placed");

    router.push({
        name: "order-confirmation",
        query: {
            total:
                Number(cartStore.total) -
                (Number(cartStore.total) * Number(cartStore.coupon)) / 100 +
                Number(cartStore.shippingCost) +
                Number(cartStore.totalGiftWrapFee),
            referenceId: res.body.id,
            account: !!res?.body?.authResponse?.user?.authToken?.length,
        },
    });
    cartStore.removeAll();

    if (process.client) {
        // localStorage.removeItem("informations");
        // localStorage.removeItem("guest-address");
        localStorage.removeItem("coupon");
        localStorage.removeItem("globalGiftWrap");
    }
};

const paymentSubmit = async () => {
    isLoading.value = true;

    let info = {
        firstName: data.value.address?.firstName,
        lastName: data.value.address?.lastName,
        fullName:
            data.value.address?.firstName || data.value.address.lastName
                ? data.value.address.firstName +
                  " " +
                  data.value.address.lastName
                : "walking",
        mobile: data.value.address?.mobile ? data.value.address.mobile : "",
        email: data.value.address?.email ? data.value.address.email : "",
        street: data.value.address?.street ? data.value.address.street : "",
        city: data.value.address?.city ? data.value.address.city : "",
        zip: data.value.address?.zip ? data.value.address.zip : "",
        country: data.value.address?.country
            ? data.value.address.country
            : "Bangladesh",
        shortAddress:
            data.value.address.street +
            " " +
            data.value.address.city +
            " " +
            data.value.address.zip +
            " " +
            data.value.address.country,
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
        vatAmount: 0,
        vatType: "PERCENTAGE",
        paymentType: info.paymentType,
        paymentStatus: "PENDING",
        items: [],
        extras: {
            globalGiftWrap: "",
            couponCode: "",
            couponDiscount: "",
            deliveryCharge: cartStore.shippingCost,
            pickupDistrict: info.pickPoint,
            customerNote: cartStore.note,
        },
        packagingInstructions: [],
        shouldCreateAccount: false,
        password: "",
    };

    let couponObj = JSON.parse(localStorage.getItem("coupon"));
    let globalGiftWrapObj = JSON.parse(localStorage.getItem("globalGiftWrap"));
    let hasCoupon = false;
    if (couponObj && couponObj.couponCode) {
        hasCoupon = true;
        req.extras.couponCode = couponObj.couponCode;
        req.extras.couponDiscount = couponObj.amount;
    }


    // if(globalGiftWrapObj && globalGiftWrapObj.amount) {
    //     req.extras.globalGiftWrap = globalGiftWrapObj.amount;
    // }

    if (data.value.address.createAccount) {
        if (
            data.value.address.password &&
            data.value.address.confirmPassword &&
            data.value.address.password == data.value.address.confirmPassword
        ) {
            req.shouldCreateAccount = data.value.address.createAccount;
            req.password = data.value.address.password;
        }
    }

    if (cartStore.totalGiftWrapFee) {
        req.extras.globalGiftWrap = cartStore.totalGiftWrapFee;
    }

    req.items = cartStore.items.map((item) => {
        return {
            itemId: item.product.id,
            itemTitle: item.product.title,
            skuCode: item.sku.code,
            price: Number(item.sku.salesPrice),
            // price: Number(item.sku.discountedSalesPrice) && Number(item.sku.discountedSalesPrice) > 0 ? Number(item.sku.discountedSalesPrice) : Number(item.sku.salesPrice),
            // discountedPrice: Number(item.sku.discountedSalesPrice),
            offerId: !hasCoupon ? globalDiscount(item.sku, item.product).offerId : "",
            offerName: !hasCoupon ? globalDiscount(item.sku, item.product).offerTitle : "",
            discountedPrice: !hasCoupon ? globalDiscount(item.sku, item.product).discountPrice : 0,
            quantity: Number(item.quantity),
        };
    });
    if (cartStore?.packagingInstructions) {
        if (cartStore?.packagingInstructions?.isGiftWrap) {
            req.packagingInstructions.push({
                itemId: cartStore?.items[0]?.product?.id,
                skuCode: cartStore?.items[0]?.sku?.code,
                sender: cartStore?.packagingInstructions?.sender,
                recipient: cartStore?.packagingInstructions?.recipient,
                quantity: cartStore?.packagingInstructions?.quantity,
                message: cartStore?.packagingInstructions?.message,
                instruction: "",
                typeId: "<gift>",
                fee: Number(cartStore?.totalGiftWrapFee),
                // fee: Number(cartStore?.packagingInstructions?.fee),
            });
        }
    }
    console.log("req");
    console.log(req);
    await serverSideUpdate(req);

    isLoading.value = false;
};

// const onSubmit = async () => {
//     // await shipmentSubmit();
//     await paymentSubmit();
// };

const serverSideUpdate = async (req) => {
    ordersPlaceClient.orderPlace(req).then((res) => {
        if (!res.networkError) {
            if (res.status == 201) {
                onSuccess(res);
            }
        }
    });
};

watch(
    () => authStore.profile,
    () => {
        if (process.client) {
            let guestUser = JSON.parse(localStorage.getItem("guest-address"));
            let informations = JSON.parse(localStorage.getItem("informations"));

            if (informations) {
                data.value.address.email = informations.email;
                data.value.address.firstName = informations.firstName
                    ? informations.firstName
                    : "";
                data.value.address.lastName = informations.lastName
                    ? informations.lastName
                    : "";
                data.value.address.street = informations.street
                    ? informations.street
                    : "";
                data.value.address.zip = informations.zip
                    ? informations.zip
                    : "";
                data.value.address.country = informations.country
                    ? informations.country
                    : "";
                data.value.address.city = informations.city
                    ? informations.city
                    : "";
                data.value.address.mobile = informations.mobile
                    ? informations.mobile
                    : "";
                data.value.address.company = informations.company
                    ? informations.company
                    : "";
                data.value.address.saveInfo = informations.saveInfo
                    ? informations.saveInfo
                    : "";
                data.value.address.emailMe = informations.emailMe
                    ? informations.emailMe
                    : "";
                data.value.selectedPickingLocation = informations.pickPoint
                    ? informations.pickPoint
                    : "INSIDE_DHAKA";
                data.value.selectedPaymentType = informations.paymentType
                    ? informations.paymentType
                    : "CASH_ON_DELIVERY";
            } else if (guestUser) {
                data.value.address.email = guestUser.email;
                data.value.address.firstName = guestUser.firstName
                    ? guestUser.firstName
                    : "";
                data.value.address.lastName = guestUser.lastName
                    ? guestUser.lastName
                    : "";
                data.value.address.street = guestUser.street
                    ? guestUser.street
                    : "";
                data.value.address.zip = guestUser.zip ? guestUser.zip : "";
                data.value.address.country = guestUser.country
                    ? guestUser.country
                    : "";
                data.value.address.city = guestUser.city ? guestUser.city : "";
                data.value.address.mobile = guestUser.mobile
                    ? guestUser.mobile
                    : "";
                data.value.address.company = guestUser.company
                    ? guestUser.company
                    : "";
                data.value.address.saveInfo = guestUser.saveInfo
                    ? guestUser.saveInfo
                    : "";
                data.value.address.emailMe = guestUser.emailMe
                    ? guestUser.emailMe
                    : "";
                data.value.selectedPickingLocation = guestUser.pickPoint
                    ? guestUser.pickPoint
                    : "INSIDE_DHAKA";
                data.value.selectedPaymentType = guestUser.paymentType
                    ? guestUser.paymentType
                    : "CASH_ON_DELIVERY";
                data.value.address.password = guestUser.password
                    ? guestUser.password
                    : "";
                data.value.address.confirmPassword = guestUser.confirmPassword
                    ? guestUser.confirmPassword
                    : "";
                data.value.address.createAccount = guestUser.createAccount
                    ? guestUser.createAccount
                    : false;
            }
        } else if (authStore.profile) {
            // name.value = authStore.profile.name;
            let name = authStore.profile.name.split(" ");

            if (name && name.length) {
                data.value.address.firstName = name[0];
                data.value.address.lastName = name.slice(1).join(" ");
            }
            data.value.address.email = authStore.profile.email;

            data.value.address.street = authStore.profile.street
                ? authStore.profile.street
                : "";
            data.value.address.zip = authStore.profile.zip
                ? authStore.profile.zip
                : "";
            data.value.address.country = authStore.profile.country
                ? authStore.profile.country
                : "";
            data.value.address.city = authStore.profile.city
                ? authStore.profile.city
                : "";
            data.value.address.mobile = authStore.profile.mobile
                ? authStore.profile.mobile
                : "";
            data.value.address.company = authStore.profile.company
                ? authStore.profile.company
                : "";
            data.value.address.saveInfo = authStore.profile.saveInfo
                ? authStore.profile.saveInfo
                : "";
            data.value.address.emailMe = authStore.profile.emailMe
                ? authStore.profile.emailMe
                : "";
            data.value.selectedPickingLocation = authStore.profile.pickPoint
                ? authStore.profile.pickPoint
                : "INSIDE_DHAKA";
            data.value.selectedPaymentType = authStore.profile.paymentType
                ? authStore.profile.paymentType
                : "CASH_ON_DELIVERY";
        }
    },
    { immediate: true, deep: true }
);

const fetchAddress = async () => {
    let obj = {
        page: 1,
        size: 100,
        sortParams: [
            {
                field: "dateCreated",
                type: "DESCENDING",
            },
        ],
    };

    await cmsClient.fetchAddress(obj).then((res) => {
        if (res.status == 200 && !res.networkError) {
            if (res.body && res.body.list && res.body.list.length > 0) {
                let shipingAddress = res.body.list.filter(
                    (s) => s.type.toUpperCase() == "SHIPPING"
                )[0];

                if (shipingAddress) {
                    data.value.address.street == shipingAddress.street;
                    data.value.address.zip = shipingAddress.zipCode;
                    data.value.address.city = shipingAddress.city;
                }
            }
        }
    });
};
function globalDiscount(sku, item) {
  if (!item?.id) {
    return 0;
  }
  if (sku?.discountedSalesPrice > 0) {
    return sku.discountedSalesPrice;
  }

  if (!globalDiscountStore?.discounts?.length) {
    return 0;
  }

  let discountPrice = 0;
  let offerId = "";
  let offerTitle = "";
  let salesPrice = Number(sku?.salesPrice);
  let categoryId = item?.categories[0]?.id;
  let findSizeSku = sku?.code;

  globalDiscountStore.discounts.forEach((element) => {
    let discount =
      element.discountType === "PERCENTAGE"
        ? Math.floor((salesPrice * Number(element.value)) / 100)
        : salesPrice - Number(element.value);

    if (element.type === "FIXED_CATEGORY" && element.valid) {
      let findItem =
        element?.categories?.length &&
        element.categories.filter((i) => i.categoryId === categoryId);
      if (findItem.length) {
        discountPrice = salesPrice - discount;
        offerId = element.id;
        offerTitle = element.title;
      }
    }

    if (element.type === "FIXED_PRODUCT" && element.valid) {
      let findItem =
        element?.items?.length &&
        element.items.filter((i) => i.itemId === item.id);
      if (findItem.length) {
        if (
          findItem[0]?.skuCode?.length &&
          findItem[0].skuCode === findSizeSku
        ) {
          discountPrice = salesPrice - discount;
          offerId = element.id;
          offerTitle = element.title;
        } else if (findItem[0] && !findItem[0]?.skuCode?.length) {
          discountPrice = salesPrice - discount;
          offerId = element.id;
          offerTitle = element.title;
        }
      }
    }
  });

  return {
    discountPrice: discountPrice,
    offerId: offerId,
    offerTitle: offerTitle,
  };
}
onMounted(async () => {
    await fetchAddress();
});
</script>

<style lang="scss" scoped>
.c-order-summery {
    // min-height: 100vh;
    max-height: 100%;
    overflow: scroll;

    @media screen and (max-width: 991px) {
        background-color: #fff !important;
        min-height: 20vh !important;
    }
}

.c-btn-primary {
    background-color: #2277e0;
    color: #ffff !important;
    border-radius: 35px !important;
    font-weight: 700 !important;
    padding: 10px 30px;
    font-size: 1.2rem;
    cursor: pointer;
}

.c-btn-primary:hover {
    border: 1px solid #2277e0;
    color: #1c1c24 !important;
    font-weight: 700 !important;
    background-color: #ffff;
}
</style>
