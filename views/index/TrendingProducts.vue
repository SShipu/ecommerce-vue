<template>
    <div class="overflow-hidden new-arrival">
        <div class="row overflow-hidden d-none d-lg-block">
        <!-- <div class="overflow-hidden d-none d-lg-flex"> -->
            <!-- <TrendingSmallImageCard
                :item="items[0]"  
            />
            <TrendingBigImageCard
                :item="items[2]"  
            /> -->
            <carousel
                style="width: 100% !important;"
                ref="myCarousel3"
                :breakpoints="breakpoints"
                :wrap-around="isWrapArround"
                class="tranding-items"
            >
                <template #slides>
                    <!-- class="col-12 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6 col-xl-4" -->
                    <slide 
                        v-for="(item, i) in items" 
                        :key="i"
                    >
                    
                        <ItemShimmer v-if="!item || item.isLoading"  />
                        <NewArrivalItemCard 
                            v-else
                            :item="item"  
                        />
                    </slide>
                </template>

                <template #addons>
                    <Navigation />
                </template>
            </carousel>
        </div>

        <div class="row overflow-hidden d-lg-none">
            <carousel
                style="width: 100% !important;"
                ref="myCarousel3"
                :breakpoints="breakpoints"
                :wrap-around="isWrapArround"
                class="trending-items"
            >
                <template #slides>
                    <!-- class="col-12 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6 col-xl-4" -->
                    <slide 
                        v-for="(item, i) in items" 
                        :key="i"
                    >
                    
                        <ItemShimmer v-if="!item || item.isLoading"  />
                        <NewArrivalItemCard 
                            v-else
                            :item="item"  
                        />
                    </slide>
                </template>

                <template #addons>
                    <Navigation />
                </template>
            </carousel>
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    title: {
        type: String,
        default: ""
    },

    isWrapArround: {
        type: Boolean,
        default: true
    }
});

const myCarousel3 = ref(false);
const breakpoints = ref({
    300: {
        itemsToShow: 1.5,
        snapAlign: "start",
    },

    500: {
        itemsToShow: 2,
        snapAlign: "start",
    },

    1023: {
        itemsToShow: 2.5,
        snapAlign: "start",
    },


    1400: {
        itemsToShow: 3,
        snapAlign: "start",
    },
});

</script>

<style lang="scss">
.trending-items {
    padding: 0px 15px;
    .carousel__slide {
        // width: 100% !important;
    }

    .carousel__prev,
    .carousel__next {
        width: 40px !important;
        height: 40px !important;

        display: none !important;
        @media screen and (max-width: 767px) {
            display: none !important;
        }
    }

    .carousel__prev {
        margin-left: .5px;
    }

    .carousel__next {
        margin-right: .5px;
    }

    .carousel__prev,
    .carousel__next {
        box-shadow: 0 3px 50px rgba(0, 0, 0, 0.16) !important;
        background-color: #fff !important;
        border-radius: 50%;
        z-index: 2;
        top: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        transition: background-color 0.3s ease-in-out;
    }
}

</style>