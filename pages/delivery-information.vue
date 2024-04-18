<template>
    <div>
        <Banner title="Delivery Information" />
        <div v-if="data?.text?.length" class="container-xl my-5 terms-container" v-html="data?.text"></div>
        <div v-else class="container-xl my-5 privacy-container">
            <p class="pt-2 text-center">
                Currently No Content Given
            </p>
        </div>
        <!-- <div class="container-xl my-5 terms-container">
            <h3>Delivery Information</h3>
            <p class="pt-2">
                Welcome and Thanks for your interest in Lil Star. Before assessing the terms & conditions please note that
                Delivery Information might change at anytime. Therefore, please check the terms & conditions every time you place an
                order.
            </p>
            <p class="m-0">
                Order Policy:
            </p>
            <ol>
                <li>Order is possible for available items only.</li>
                <li>
                    Paid orders can be canceled or refunded, for both Cash on Delivery (COD) & Online Payments - However,
                    this
                    is only possible if you inform us about return/exchange 2 days after receiving your order. (Please refer
                    to
                    our Return & Exchange Policy for more info).
                </li>
                <li>Please contact our Customer Care for any kind of order related issues.</li>
            </ol>

            <h3 class="pt-3">Delivery Time Frame</h3>
            <p class="pt-2">
                INSIDE DHAKA:Once your order is confirmed, we start the processing by 24 hours and the delivery process will
                be completed within 1-3 days.
            </p>
            <p class="pt-2">
                OUTSIDE DHAKA:Once your order is confirmed, we start the processing by 24 hours and the delivery process
                will be completed within 3-5 days.
            </p>

            <h3 class="pt-3">Delivery Charge</h3>
            <p class="pt-2">
                INSIDE DHAKA: Once your order is confirmed, we start the processing by 24 hours and the delivery process
                will be completed within 1-3 days.
            </p>
            <p class="pt-2">
                OUTSIDE DHAKA: Once your order is confirmed, we start the processing by 24 hours and the delivery process
                will be completed within 3-5 days.
            </p>

            <h3 class="pt-3">Additional packing cost</h3>
            <p class="pt-2">
                BDT 25 for small box <br>
                BDT 30 for medium box <br>
                BDT 40 for large box. <br>
            </p>
            <p class="pt-2">
                Please note that we are associated with a third party shipping company to deliver orders. Hence, the
                delivery process is not completely in our control.
            </p>

            <h3 class="pt-3">Information Inconsistency Disclaimers:</h3>
            <p class="pt-2">
                The website might display inaccurate information regarding product price, availability, pictures, size &
                color at times due to technical malfunctions. Lil Star reserves the authority to correct & update that
                information from time to time.
            </p>
        </div> -->
    </div>
    
</template>

<script setup>
import Banner from '@/views/commons/Banner.vue';
import { usePagesContentStore } from "@/stores/pages-content-store";

const pagesContentStore = usePagesContentStore();

const data = computed(() =>{
    if (pagesContentStore?.pagesContents?.length) {
        return pagesContentStore?.pagesContents.find(i => i.title == 'Delivery Information');
    }
    return null;
});
</script>

<style lang="scss" scoped>.terms-container {
    font-size: 1.225rem !important;
}</style>