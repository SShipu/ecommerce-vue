<template>
    <NavNavbar class="d-lg-none d-block"/>
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

             <div class="row  py-2 px-md-3 d-block d-lg-none" style="background-color: #F0F0F0;">
                <div class="col-12 d-flex ">
                    <div class="col-8">
                        <div class="d-flex flex-row">
                            <!-- cart -->
                            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6629 16.709C11.855 16.709 12.8086 17.6626 12.8086 18.8547C12.8086 20.0467 11.855 21.0004 10.6629 21.0004C9.47085 21.0004 8.5172 20.0467 8.5172 18.8547C8.5172 17.6924 9.50065 16.709 10.6629 16.709ZM10.6629 19.6891C11.1099 19.6891 11.4675 19.3315 11.4675 18.8845C11.4675 18.4375 11.1099 18.0798 10.6629 18.0798C10.2159 18.0798 9.85826 18.4375 9.85826 18.8845C9.85826 19.3017 10.2457 19.6891 10.6629 19.6891Z" fill="black"/>
                                <path d="M16.325 16.709C17.5171 16.709 18.4707 17.6626 18.4707 18.8547C18.4707 20.0467 17.5171 21.0004 16.325 21.0004C15.133 21.0004 14.1793 20.0467 14.1793 18.8547C14.1793 17.6924 15.1628 16.709 16.325 16.709ZM16.325 19.6891C16.772 19.6891 17.1296 19.3315 17.1296 18.8845C17.1296 18.4375 16.772 18.0798 16.325 18.0798C15.878 18.0798 15.5204 18.4375 15.5204 18.8845C15.5204 19.3017 15.878 19.6891 16.325 19.6891Z" fill="black"/>
                                <path d="M4.37505 3H5.98432C6.69955 3 7.32538 3.53642 7.41478 4.25166L7.8916 7.67881H19.6631C19.9611 7.67881 20.2591 7.82781 20.4678 8.06623C20.6466 8.30464 20.736 8.63245 20.6466 8.93046C20.6466 8.96027 20.6466 8.96026 20.6466 8.99007L18.7989 14.5629C18.6797 14.9801 18.2923 15.2781 17.8452 15.2781H9.62008C8.51743 15.2781 7.56379 14.4437 7.41478 13.3411L6.16312 4.43046C6.16312 4.37086 6.10352 4.34106 6.04392 4.34106H4.43465C4.07703 4.34106 3.74922 4.04305 3.74922 3.65563C3.74922 3.26821 4.01743 3 4.37505 3ZM8.69624 13.1325C8.75584 13.5795 9.14326 13.9073 9.59028 13.9073H17.577L19.1863 9.01987H8.10021L8.69624 13.1325Z" fill="black"/>
                            </svg> 
                            <!-- <i class="fas fa-shopping-cart"></i> -->
                            <span class="mx-1 pt-1" style="color: #181F29; font-size: 18px; font-weight: 600; line-height: 140%;">Show order Summary</span>
                            
                            <!-- chevron down -->
                            <svg v-if="isSummeryHide" @click.prevent="isSummeryHide = !isSummeryHide" style="margin-top: 15px;" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9949 1.02364C11.9951 1.20035 11.9265 1.37016 11.8036 1.49713L7.41784 6.04543C7.16865 6.30468 6.82462 6.45117 6.4651 6.45117C6.10558 6.45117 5.76155 6.30468 5.51236 6.04543L1.12658 1.49713C0.992943 1.36879 0.917239 1.19153 0.916993 1.00621C0.916751 0.820904 0.991888 0.643465 1.1252 0.514724C1.25844 0.385988 1.43837 0.317038 1.62361 0.323707C1.80884 0.330377 1.98329 0.412185 2.10697 0.550167L6.46518 5.06843L10.8234 0.550166C10.9497 0.418778 11.1235 0.343559 11.3058 0.341317C11.488 0.339075 11.6636 0.410024 11.7932 0.538279C11.9227 0.666534 11.9954 0.841389 11.995 1.02366L11.9949 1.02364Z" fill="#1C1C24"/>
                            </svg> 

                            <!-- chevron up -->
                            <svg v-if="!isSummeryHide" @click.prevent="isSummeryHide = !isSummeryHide" style="margin-top: 10px;" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00513 8.97636C2.00489 8.79965 2.07351 8.62984 2.19638 8.50287L6.58216 3.95457C6.83135 3.69532 7.17538 3.54883 7.5349 3.54883C7.89442 3.54883 8.23845 3.69532 8.48764 3.95457L12.8734 8.50287C13.0071 8.63121 13.0828 8.80847 13.083 8.99379C13.0832 9.1791 13.0081 9.35654 12.8748 9.48528C12.7416 9.61401 12.5616 9.68296 12.3764 9.67629C12.1912 9.66962 12.0167 9.58781 11.893 9.44983L7.53482 4.93157L3.1766 9.44983C3.05028 9.58122 2.87646 9.65644 2.69421 9.65868C2.51196 9.66092 2.33636 9.58997 2.20683 9.46172C2.07729 9.33346 2.00457 9.15861 2.00497 8.97634L2.00513 8.97636Z" fill="#1C1C24"/>
                            </svg> 
                        </div>
                    </div>
                    <div class="col-4 pe-3 d-flex justify-content-end align-items-center">
                        <span style="font-size: 18px; font-weight: 700;">Tk. {{ cartStore.total }}</span>
                    </div>
                </div>
             </div>
 
             <div class="d-flex row flex-column-reverse flex-lg-row">
                 <!-- {{ data.address }} -->
                 <div class="px-2 px-md-5 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                     <!-- <h3>Checkout</h3> -->
                     <NavBarV2 class="mb-3" :informations="mailingInfo"/>

                     <ShippingAddress v-model="data" ref="mailingInfo"/>
                     
                     <div class="col-12 my-4 d-flex flex-column-reverse flex-md-row" style="justify-content: space-between;">
                        <div>
                            <span @click.prevent="goTo('cart-review')" style=" cursor: pointer;font-size: 1.25rem;display: flex; justify-content: center; align-items: center;"><i class="fas fa-chevron-left me-1"></i> Return to cart</span>
                        </div>

                        <div class="mb-3 mb-md-0 px-1 px-md-0">
                            <div class="text-center c-btn-primary" @click="onSubmit">Continue to Shipping</div>
                        </div>
                    </div>

                    <SiteFooterV2 class=" mt-2 border-top"/>
                 </div>
     
                 <div :class="[{'d-none': isSummeryHide }]" class="c-order-summery p-1 p-md-5 mt-0 mt-xl-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" style="background-color: #F0F0F0;">
                    <OrderSummery />
                 </div>
             </div>
         </section>
     </main>
 </template>
 
 <script setup>
 import { useAuthStore } from '~~/stores/auth-store';
 import { cmsClient } from "~~/libs/gandalf/apis/config";
 import { useCartStore } from '~~/stores/cart';

 import ShippingAddress from "~~/views/cart-checkout/ShippingAddress.vue";
 import OrderSummery from "~~/views/cart-checkout/OrderSummery.vue";
 
definePageMeta({
    layout: "empty",
});

const cartStore = useCartStore();
const authStore = useAuthStore();
 
 const mailingInfo = ref(null);
 const isSummeryHide = ref(false);
 
 const data = ref({
     addresses: [
         // {
         //     // id: '1',
         //     type: 'Home',
         //     mobile: '01304343986',
         //     address: 'Nikunjo-1, Road- 15, Block: D, Police Station: Khilkhet Dhaka-1230.',
         //     detail: {},
         // },
     ],
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
         password: '',
         confirmPassword: '',
         emailMe: false,
         saveInfo: false,
         createAccount: false,
     },
 
     selectedAddress: null,
     payments: [
         {
             id: 'CASH_ON_DELIVERY',
             name: 'Cash On Delivery',
             isDisabled: false,
         }, 
         {
             id: 'ONLINE',
             name: 'Online',
             isDisabled: true,
         },
     ],
     selectedPaymentType: {
             id: 'CASH_ON_DELIVERY',
             name: 'Cash On Delivery',
             isDisabled: false,
         },
 });
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
 const onSubmit = async () => {

    if(mailingInfo.value.validate()) {

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
            password: data.value.address.password,
            confirmPassword: data.value.address.confirmPassword,
            createAccount: data.value.address.createAccount,
        };

        if(authStore.profile) {
            localStorage.setItem('informations', JSON.stringify(info));
        } else {
            localStorage.setItem('guest', JSON.stringify(info));
        }

        goTo('shipping-method');


    } else if(process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
 
 watch(()=> authStore.profile, ()=> {
     if(authStore.profile) {
         // name.value = authStore.profile.name;
         let name = authStore.profile.name.split(" ");
 
         if(name && name.length) {
             data.value.address.firstName = name[0];
             data.value.address.lastName = name.slice(1).join(' ');
         }
         data.value.address.mobile = authStore.profile.mobile;
         data.value.address.email = authStore.profile.email;

     } else if(process.client) {

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
            data.value.address.password = guestUser.password ? guestUser.password : '';
            data.value.address.confirmPassword = guestUser.confirmPassword ? guestUser.confirmPassword : '';
            data.value.address.createAccount = guestUser.createAccount ? guestUser.createAccount : false;
        }
     }
 
 },{immediate: true}, {deep: true});
 
 const fetchAddress = async () => {
     let obj = {
         page: 1,
         size: 100,
         sortParams: [
             {
                 field: "dateCreated",
                 type: "DESCENDING",
             }
         ]
     }
 
     await cmsClient.fetchAddress(obj).then((res)=> {
         if (res.status == 200 && !res.networkError) {
             if (res.body && res.body.list && res.body.list.length > 0) {

                 let shipingAddress = res.body.list.filter((s) => s.type.toUpperCase() == 'SHIPPING')[0];
 
                 if(shipingAddress) {
                     data.value.address.street == shipingAddress.street;
                     data.value.address.zip = shipingAddress.zipCode;
                     data.value.address.city = shipingAddress.city;
                 }
             }
         }
     });
 }
 
 onMounted(async() => {
     await fetchAddress();
 })
 </script>
 
 <style lang="scss" scoped>
.c-order-summery {
    // min-height: 100vh; 
    max-height: 100vh;
    overflow: scroll;

    @media screen and (max-width: 991px) {
        background-color: #fff !important;
        min-height: 20vh !important;
    }
}
 .c-btn-primary {
    background-color: #2277E0;
    color: #ffff !important;
    border-radius: 35px !important;
    font-weight: 700 !important;
    padding: 10px 30px;
    font-size: 1.2rem;
    cursor: pointer;
}

.c-btn-primary:hover {
    border: 1px solid #2277E0;
    color: #1C1C24 !important;
    font-weight: 700 !important;
    background-color: #ffff;
}
 </style>