<template>
    <div>
        <Banner title="Return & Exchange" />

        <div v-if="data?.text?.length" class="container-xl my-5 exchange-container" v-html="data?.text"></div>
        <div v-else class="container-xl my-5 privacy-container">
            <p class="pt-2 text-center">
                Currently No Content Given
            </p>
        </div>
        <!-- <div class="container-xl my-5 exchange-container">
            <h3>RETURN AND EXCHANGE POLICY</h3>
            <p class="pt-2">
                Thank you for your purchase. We hope you are happy with your
                purchase. However, if you are not completely satisfied with your
                purchase for any reason, you may return it to us for a full
                refund or an exchange. Please see below for more information on
                our return policy.
            </p>

            <h3 class="pt-3">RETURNS</h3>
            <p class="pt-2">
                You MUST inform us about any return or exchange requests within
                2 DAYS of receiving your package. All returned items must be in
                new and unused condition, with all original tags and labels
                attached. All return and refund requests must be made following
                Lilstar’s official customer support channel and Lilstar holds
                the right to replace, refund or not to replace, refund customers
                based on its investigation as per company policy.
            </p>

            <h3 class="pt-3">Damaged products</h3>
            <ol>
                <li>
                    The buyer has to provide with images showing clearly the
                    damage, and after all the verification we will arrange the
                    product pick up. The labels must be intact for the
                    refund/return to be processed. If that product is not
                    available in our stock, customers can choose any product
                    worth the same value and get the replacement within the
                    standard delivery time.
                </li>
                <li>
                    In case of missing pieces, through the regular complaint
                    lodging process and upon successful verification Lilstar
                    will arrange to send the missing pieces following the
                    standard delivery process.
                </li>
                <li>
                    Customer must provide images of the items & after
                    verifications, the specific items will be picked up via
                    courier, given, we have all the necessary information to do
                    so, provided by the customer. A replacement will be given
                    following our replacement policy.
                </li>
            </ol>

            <h3 class="pt-3">REFUNDS</h3>

            <p class="pt-2">
                After receiving your return and inspecting the condition of your
                item, we will process your return or exchange. Please allow at
                least three (3) days from the receipt of your item to process
                your return or exchange.
            </p>

            <h3 class="pt-3">ORDER CANCELLATION</h3>
            <p class="pt-2">
                Orders can be canceled if it has NOT been sent out for delivery.
                If a customer chooses to return the product after delivery, then
                you will have to bear the delivery fee (refer to the return
                section for further details).
            </p>
            <h3 class="pt-3">ORDER CANCELLATION</h3>
            <p class="pt-2">
                If you have any questions concerning our return policy, please
                contact us at:
            </p>
            <p class="pt-2">
                0172432694 <br />
                care@lilstar.com
            </p>
        </div> -->
    </div>
</template>

<script setup>
import Banner from "@/views/commons/Banner.vue";
import { usePagesContentStore } from "@/stores/pages-content-store";

const pagesContentStore = usePagesContentStore();

const data = computed(() =>{
    if (pagesContentStore?.pagesContents?.length) {
        return pagesContentStore?.pagesContents.find(i => i.title == 'Make a Return');
    }
    return null;
});
</script>

<style lang="scss" scoped>
.exchange-container {
    font-size: 1.225rem !important;
}
</style>
