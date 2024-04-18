<template>
   <main class="container-fluid c-cart-review-container">
        <section class="mx-xxl-5 mx-sm-2 py-2 d-flex flex-column">
            <div class="row">
                <div class="col-12">
                    <span class="" style="cursor: pointer;"  @click.prevent="$router.back()">
                        <i class="fs-4 fas fa-arrow-left me-2"></i> 
                        <span class="fs-4" style="color: #202028; font-weight: 600;">Back</span>
                    </span>
                </div>
            </div>

            <div class="d-flex row mt-xl-4 mt-3">
                <h3>Checkout</h3>
                <!-- {{ data.address }} -->
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7 me-0 me-xxl-5">
                    <MailingInformationsV2 v-model="data" ref="mailingInfo"/>
                    <OrderReview />
                </div>
    
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-4 mt-4 mt-xl-0 ms-0 ms-xxl-2">
                    <OrderPlaceCard :info="data" :methods="mailingInfo"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { useAuthStore } from '~~/stores/auth-store';
import MailingInformationsV2 from "~~/views/cart-checkout/MailingInformationsV2.vue";
import OrderReview from "~~/views/cart-checkout/OrderReview.vue";
import OrderPlaceCard from "~~/views/cart-checkout/OrderPlaceCard.vue";
import { cmsClient } from "~~/libs/gandalf/apis/config";

const authStore = useAuthStore();

const mailingInfo = ref(null);

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
                // res.body.list.forEach((a) => {
                //     data.value.addresses.push({
                //         type: a.type,
                //         mobile: a.mobile,
                //         address: `${a.area}, ${a.street},  ${a.zipCode}, ${a.city}, ${a.country}`,
                //         detail: {
                //             address: a.area,
                //             street: a.street,
                //             area: a.zipCode,
                //             division: a.city,
                //             country: a.country,
                //             mobile: a.mobile,
                //         },
                //     });
                // });

                let shipingAddress = res.body.list.filter((s) => s.type.toUpperCase() == 'SHIPING')[0];

                if(shipingAddress) {
                    data.value.address.street == shipingAddress.street;
                    data.value.address.zip = shipingAddress.zipCode;
                    data.value.address.city = shipingAddress.city;
                }
            }
        }
    })

    // await cmsClient.fetchAddress(obj).then((res)=> {
    //     if (res.status == 200 && !res.networkError) {
    //         if (res.body && res.body.list && res.body.list.length > 0) {
    //             res.body.list.forEach((a) => {
    //                 data.value.addresses.push({
    //                     type: a.type,
    //                     mobile: a.mobile,
    //                     address: `${a.area}, ${a.street},  ${a.zipCode}, ${a.city}, ${a.country}`,
    //                     detail: {
    //                         address: a.area,
    //                         street: a.street,
    //                         area: a.zipCode,
    //                         division: a.city,
    //                         country: a.country,
    //                         mobile: a.mobile,
    //                     },
    //                 });
    //             });

    //             data.value.selectedAddress = data.value.addresses[0];
    //         } else {
    //             data.value.addresses[0] = {
    //                 type: "No Address Saved",
    //                 address: '',
    //                 detail:  {},
    //             }

    //             data.value.selectedAddress = data.value.addresses[0]
    //         }
    //     }
    // })
}

onMounted(async() => {
    await fetchAddress();
})
</script>

<style lang="scss" scoped>

</style>