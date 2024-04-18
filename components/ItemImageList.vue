<template>
    <div>
        <div class="d-flex justify-content-between my-2">
            <div class="d-flex justify-content-center align-items-center">
                <h2 class="">{{title}}</h2>
            </div>
            <div class="slider-sec d-flex justify-content-between my-2">
                <div @click="myCarousel3.prev()" class="prev-btn rounded-circle d-flex justify-content-center align-items-center mx-1">
                    <i class="fa fa-chevron-left fa-lg"></i>
                </div>
                <div @click="myCarousel3.next()" class="next-btn rounded-circle d-flex justify-content-center align-items-center mx-1">
                    <i class="fa fa-chevron-right fa-lg"></i>
                </div>
            </div>
        </div>

        <div class="row">
            <carousel
                style="width: 100% !important;"
                ref="myCarousel3"
                :breakpoints="breakpoints"
                :wrap-around="isWrapArround"
            >
                <slide 
                    class="col-12 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6 col-xl-4"
                    v-for="(item, i) in items" 
                    :key="i"
                >
                    <ItemImageCard :item="item" />
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide } from "vue3-carousel";
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
    309: {
        itemsToShow: 1,
        snapAlign: "start",
    },

    500: {
        itemsToShow: 2,
        snapAlign: "start",
    },

    1023: {
        itemsToShow: 3,
        snapAlign: "start",
    },


    1400: {
        itemsToShow: 4,
        snapAlign: "start",
    },
});

</script>

<style lang="scss" scoped>
.slider-sec {

    .prev-btn, 
    .next-btn {
        width: 44px;
        height: 44px;
        background-color: #EEEFF5;

        &:hover {
            background-color: #2277E0;
            color: #fff;
        }
    }
    
}


</style>