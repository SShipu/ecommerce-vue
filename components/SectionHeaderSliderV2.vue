<template>
    <div class="d-flex justify-content-between my-2">
        <div class="d-flex justify-content-center align-items-center">
            <h2 class="">{{title}}</h2>
        </div>
        <div class="d-flex justify-content-between my-2">
            <div class="slider-sec prev-btn rounded-circle d-flex justify-content-center align-items-center mx-1 position-relative">
                <button class="carousel-control-prev" type="button" :data-bs-target="`#${targetCarousel}`" data-bs-slide="prev">
                    <i class="fa fa-chevron-left fa-lg"></i>
                    <span class="visually-hidden">Previous</span>
                </button>
                
            </div>
            <div class="slider-sec next-btn rounded-circle d-flex justify-content-center align-items-center mx-1 position-relative">
                <button class="carousel-control-next" type="button" :data-bs-target="`#${targetCarousel}`" data-bs-slide="next">
                    <i class="fa fa-chevron-right fa-lg"></i>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    targetCarousel: {
        type: String,
        default: "",
    }
})
</script>

<style lang="scss" scoped>

.slider-sec {
    .carousel-control-next, .carousel-control-prev {
        position: relative;
        width: 50%;
        padding: 0;
        i {
            color: #000 !important;
        }
    }
    &:hover {
        background-color: #2277E0;
        color: #fff;
        .carousel-control-next, .carousel-control-prev {
        
            i {
                color: #fff !important;
            }
        }
    }
}
.prev-btn {
    width: 44px;
    height: 44px;
    background-color: #EEEFF5;
}

.next-btn {
    width: 44px;
    height: 44px;
    background-color: #EEEFF5;
}


</style>