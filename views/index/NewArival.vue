<template>
    <div class="overflow-hidden new-arrival">
        <div class="row overflow-hidden" v-if="!loading && items.length">
            <carousel
                style="width: 100% !important;"
                ref="myCarousel3"
                :breakpoints="breakpoints"
                :wrap-around="isWrapArround"
            >
                <template #slides>
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
        <div class="row" v-else>
            <div v-if="loading">
                <carousel
                    style="width: 100% !important;"
                    ref="myCarousel3"
                    :breakpoints="breakpoints"
                    :wrap-around="isWrapArround"
                >
                    <template #slides>
                        <slide 
                            v-for="(item, i) in 4" 
                            :key="i"
                        >
                            <ItemShimmer />
                        </slide>
                    </template>
                </carousel>
            </div>

            <div v-else class="d-flex justify-content-center align-items-center h-50vh">
                <p class="my-2 fs-4 fw-bold">
                    No Products Found
                </p>
            </div>
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
        itemsToShow: 4,
        snapAlign: "start",
    },
});

</script>

<style lang="scss">
.new-arrival {
    padding: 0px 15px;
    .carousel__slide {
        // width: 100% !important;
    }

    .carousel__prev,
    .carousel__next {
        width: 40px !important;
        height: 40px !important;

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
        &:hover {
            background-color: #2277E0 !important;
            color: #fff !important;
        }
    }
}

</style>