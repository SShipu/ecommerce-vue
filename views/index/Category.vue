<template>
    <div class="my-3">
        <div class="ms-2 mx-lg-5 mx-md-5">
        
            <SectionHeaderSlider :title="title" @prev="myCarousel3.prev()" @next="myCarousel3.next()"/>
            
            <div class="row" v-if="!loading && items.length">
                
                <carousel
                    style="width: 100% !important;"
                    ref="myCarousel3"
                    :breakpoints="breakpoints"
                    :wrap-around="isWrapArround"
                    
                >
                    <slide 
                        class="my-2 col-6 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-sm-6 col-xs-6 d-flex justify-content-center align-items-end"
                        v-for="(item, i) in items" :key="i"
                        
                    >
                        <CategoryImageCard v-if="item && !item.isLoading"  :item="item" />
                        <Skeletor v-else width="100%" height="100%" class="" />
                    </slide>
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
                        <slide 
                            class="col-12 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6 bg-image px-1 h-40vh d-flex justify-content-center align-items-end"
                            v-for="(item, i) in 4" :key="i"
                            
                        >
                            <Skeletor width="100%" height="100%" class="" />
                        </slide>
                    </carousel>
                </div>

                <div v-else class="d-flex justify-content-center align-items-center h-25vh">
                    <p class="my-2 fs-4 fw-bold">
                        No Categories Found
                    </p>
                </div>
            </div>
            <div class="row"></div>
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    title: {
        type: String,
        default: ""
    },
    loading: {
        type: Boolean,
        default: true
    },
    isWrapArround: {
        type: Boolean,
        default: true
    }
});

const myCarousel3 = ref(false);
const breakpoints = ref({
    309: {
        itemsToShow: 1.95,
        snapAlign: "start",
    },

    600: {
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

const categoryImage = (item) => {
    if(item.extras.image_url) {
        return item?.extras?.image_url;
    }

    return '/images/home/c-1.png';
};

const handlePan = (e) => {
      // Check the direction of the swipe
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;
    console.log("e");
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    // Handle horizontal swipe behavior
} else {
        e.stopPropagation(); // Prevent vertical swiping
    // Vertical swipe
    }
};

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

<style lang="scss">

// .carousel-container {
//   width: 100%;
//   overflow: hidden !important;
// }
// .carousel__track {
//   touch-action: pan-y !important;
// }

</style>