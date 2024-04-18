<template>
    <main class="container-fluid c-cart-review-container">
        <section class="mx-xxl-5 mx-sm-2 py-2 d-flex flex-column">
            <div class="row">
                <div class="col-12">
                    <span class="" style="cursor: pointer;"  @click.prevent="$router.back()">
                        <i class="fs-4 fas fa-arrow-left me-2"></i> 
                        <span 
                            class="fs-4" 
                            style="color: #202028; 
                            font-weight: 600;"
                           
                        >
                            Back
                        </span>
                    </span>
                </div>
            </div>
            
            <MyCart />
            <div class="bg-white w-100 h-100">
                
                <div class="row">
                    <div class="card mt-2 rounded-3" style="background-color: #FAFAFA; border: 1px solid #d1d1d1">
                        <div class="card-body">
                            <div class="d-flex flex-column flex-lg-row">
                                <div class="col-12 col-lg-4">
                                    <div class="d-flex">
                                        <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M61.0591 49.9254C59.9445 50.1219 59.2003 51.1848 59.3969 52.2993C59.5934 53.4138 60.6562 54.158 61.7707 53.9615L67.1522 53.0126C68.2667 52.8161 69.0109 51.7533 68.8144 50.6387C68.6179 49.5242 67.555 48.78 66.4405 48.9765L61.0591 49.9254Z" fill="#2277E0"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.69 31.2044C18.718 31.7285 16.7334 34.5627 17.2575 37.5348L22.002 64.4421C22.526 67.4142 25.3603 69.3988 28.3323 68.8747L71.3841 61.2835C74.3562 60.7595 76.3407 57.9253 75.8166 54.9531L71.0721 28.0459C70.548 25.0737 67.7139 23.0892 64.7418 23.6132L21.69 31.2044ZM65.4534 27.6493L22.4017 35.2405C21.6587 35.3715 21.1626 36.0801 21.2936 36.8232L21.8867 40.1865L67.6291 32.1209L67.036 28.7575C66.905 28.0145 66.1965 27.5183 65.4534 27.6493ZM26.0381 63.7304L22.5983 44.2226L68.3407 36.157L71.7805 55.6648C71.9115 56.4078 71.4154 57.1164 70.6724 57.2474L27.6207 64.8386C26.8776 64.9696 26.1691 64.4735 26.0381 63.7304Z" fill="#2277E0"/>
                                        </svg> 
                                        
                                        <div class="felx-column">
                                            <span class="fs-4 fw-bold" style="color:#181F29">Secured Shopping</span>
                                            <p>Our checkout meets the credit card industry's rigorous PCI security standards.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-12 col-lg-4">
                                    <div class="d-flex">
                                        <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M66.1195 20.5119L65.9588 19.2111L41.1552 10.194L40.7845 10.0654H40.0281L14.8731 19.2111L14.7124 20.5119C14.6674 20.8697 10.5638 56.5097 39.5095 69.8683L39.9359 70.0654H40.8917L41.3202 69.8683C70.2509 56.5097 66.1645 20.8697 66.1195 20.5119ZM40.4138 65.5526C17.886 54.4847 18.3874 28.4983 18.8438 22.329L40.4138 14.4861L61.986 22.329C62.4402 28.5004 62.931 54.4847 40.4138 65.5526ZM51.1217 35.7797H48.9831V31.494C48.9831 25.2047 43.8552 22.9226 40.4117 22.9226V24.0647L40.4074 22.9226C36.9617 22.9226 31.836 25.2047 31.836 31.494V35.7797H29.6931C28.5102 35.7797 27.5502 36.7397 27.5502 37.9226V50.7797C27.5502 51.9647 28.5102 52.9226 29.6931 52.9226H51.1217C52.3067 52.9226 53.2645 51.9647 53.2645 50.7797V37.9226C53.2645 36.7397 52.3067 35.7797 51.1217 35.7797ZM36.1217 31.494C36.1217 27.5854 39.4045 27.2254 40.4181 27.2083C41.1445 27.2083 44.6974 27.4226 44.6974 31.494V35.7797H36.1217V31.494ZM48.9788 48.6369H31.836V40.0654H48.9788V48.6369Z" fill="#2277E0"/>
                                        </svg> 
                                        
                                        <div class="felx-column">
                                            <span class="fs-4 fw-bold" style="color:#181F29">Privacy Protection</span>
                                            <p>Our checkout meets the credit card industry's rigorous PCI security standards.</p>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="col-12 col-lg-4">
                                    <div class="d-flex">
                                        <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.2345 46.5386C29.6821 57.4675 30.787 66.9616 38.4114 70.8255C30.1793 70.108 22.8314 65.7473 16.7539 56.3087C25.0412 55.8122 26.4225 37.7071 31.2292 28.3787C35.9254 19.2712 59.0747 17.8358 64.5441 28.3787C70.2345 36.5478 69.848 55.7011 76.7539 57.7436C70.1241 66.5749 62.1129 71.1016 52.6652 71.2115C55.3724 69.0588 57.4166 66.6854 58.9637 64.036C56.6985 64.9744 53.936 65.8576 50.6211 66.2991C49.8476 67.4583 48.1902 68.2311 46.2564 68.2311C43.6045 68.2311 41.505 66.6854 41.505 64.7535C41.505 62.8768 43.6045 61.3313 46.2564 61.3313C48.3559 61.3313 50.1239 62.2697 50.7869 63.5944C54.7096 63.1531 57.8586 62.2145 60.4555 60.945C63.0522 54.4317 62.8312 46.6492 60.4555 37.983C53.2733 46.0416 42.8861 48.3048 30.2345 46.5386Z" fill="#2277E0"/>
                                        </svg>  
                                        
                                        <div class="felx-column">
                                            <span class="fs-4 fw-bold" style="color:#181F29">Exceptional Customer Service</span>
                                            <p>Our checkout meets the credit card industry's rigorous PCI security standards.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ItemList :items="newArrivalItems" title="You may also like" />

            </div>
        </section>
    </main>
</template>

<script setup>
import MyCart from "~~/views/cart-review/MyCart.vue";
import { itemsClient } from '@/libs/gandalf/apis/config';

const newArrivalItems = ref([]);

const setLoading = (numberOfShimmer) => {
    let shimmers = [];

    let length = numberOfShimmer ? numberOfShimmer : 4;
    
    for (let index = 0; index < length; index++) {
        shimmers.push({ isLoading: true });
    }

    return shimmers;
};


const fetchNewArrival = async () => {
    newArrivalItems.value = setLoading(2);

    let params = {
        textParams: [{ field: "status", value: "ACTIVE", matchType: "EXACT" }],
        sortParams: [
            { field: "dateCreated", type: "DESCENDING" },
            { field: "totalPopularity", type: "DESCENDING" },
        ],
        fetchCount: "false",
        page: 1,
        size: 18,
        status: "ACTIVE",
    };

    itemsClient.search(params).then((res) => {
        if (!res.networkError) {
            if (res.status == 200) {
                if (res.body && res.body.list && res.body.list.length) {
                    newArrivalItems.value = res.body.list;
                }
            }
        } else {
            console.log("networkProblem");
        }
    });
};

fetchNewArrival();

</script>

<style lang="scss" scoped>
.c-cart-review-container {
    
}
</style>