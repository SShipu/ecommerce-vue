<template>
    <div class="container-xl my-5 contact-container">
        <div class="accordion accordion-flush" v-if="items?.length">
            <div class="accordion-item" v-for="(item, index) in items" :key="index">
                <h2 class="accordion-header" :id="`flush-heading${index}`">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#flush-collapseOne${index}`" aria-expanded="false" :aria-controls="`flush-collapseOne${index}`">
                       <h3>{{item?.title}}</h3>
                    </button>
                </h2>
                <div :id="`flush-collapseOne${index}`" class="accordion-collapse collapse" :aria-labelledby="`flush-heading${index}`"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body" v-html="item?.text"></div>
                </div>
            </div>
        </div>
        <div class="accordion accordion-flush" v-else>
            <div class="accordion accordion-flush" v-if="!items?.length">
                <div class="accordion-item" v-for="(item, index) in 4" :key="index">
                    <h2 class="accordion-header" :id="`flush-heading${index}`">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="`#flush-collapseOne${index}`" aria-expanded="false" :aria-controls="`flush-collapseOne${index}`">
                        <!-- <h3> -->
                                <Skeletor width="100%" height="30px" class="" style="border-radius: 10px;"/>
                            <!-- </h3> -->
                        </button>
                    </h2>
                    <div :id="`flush-collapseOne${index}`" class="accordion-collapse collapse" :aria-labelledby="`flush-heading${index}`"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <Skeletor width="100%" height="120px" class="" style="border-radius: 10px;"/>
                        </div>
                        <!-- <div class="accordion-body">
                            <p class="m-0">Our dedicated customer care team are available Monday – Friday 10am to 6pm (BD time)</p>
                            <p class="m-0">Here’s how to reach us:</p>
                            <p class="m-0">Phone – +8801700711441</p>
                            <p class="m-0">lilstar.customercare@gmail.com</p>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="accordion accordion-flush d-flex justify-content-center" v-else>
                No Data Found
            </div>
        </div>
        <!-- <div class="accordion accordion-flush">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                       <h3>Customer Care Details</h3>
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body" v-html="contactDetails?.customerCare"></div>
                    <div class="accordion-body">
                        <p class="m-0">Our dedicated customer care team are available Monday – Friday 10am to 6pm (BD time)</p>
                        <p class="m-0">Here’s how to reach us:</p>
                        <p class="m-0">Phone – +8801700711441</p>
                        <p class="m-0">lilstar.customercare@gmail.com</p>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        <h3>Payment Details</h3>
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Payment Details</p>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        <h3>Delivery Information</h3>
                    </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Delivery Information</p>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        <h3>Returns Policy</h3>
                    </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Returns Policy</p>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const contactDetails = computed(() => {
    let obj = {
        customerCare: "",
        payment: "",
        delivery: "",
        returnPolicy: "",
    }
    if (props.items?.length) {
        props.items.forEach(item => {
            if (item?.title == "Customer Care Details") obj.customerCare = item.text;
            if (item?.title == "Delivery Information") obj.delivery = item.text;
            if (item?.title == "Payment Details") obj.payment = item.text;
            if (item?.title == "Returns Policy") obj.returnPolicy = props.items.text;
        });
    }

    return obj;
})

</script>

<style lang="scss" scoped>
.contact-container {
    font-size: 1.225rem !important;
    color: #181F29 !important;
    .accordion{
        padding: 0 15%;
    } 
    .accordion-body {
        div {
            cursor: pointer;
        }
    }
    .accordion-item {
        background-color: transparent !important;
        color: #181F29 !important;
    }
    .accordion-button {
        background-color: transparent !important;
        color: #181F29 !important;
    }
    .accordion-body {
        background-color: transparent !important;
        color: #181F29 !important;
    }
    @media screen and (max-width: 700px) {
        .accordion{
            padding: 0;
        } 
    }
}
</style>