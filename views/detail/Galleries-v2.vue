<template>
    <div id="carouselExampleIndicators" class="carousel slide">
        <div
            class="d-none d-sm-none d-md-none d-lg-none d-xl-none d-xxl-flex col-12 col-sm-0 col-md-0 col-lg-0 col-xl-2 col-xxl-2  me-3">
            <div class="carousel-indicators d-flex flex-column text-start">
                <a v-for="(imageUrl, i) in images" :key="i" type="button" data-bs-target="#carouselExampleIndicators"
                    :data-bs-slide-to="i"
                    :class="selectedImage === imageUrl ? 'carouselIndicatorsButton px-0 active' : 'carouselIndicatorsButton px-0'"
                    aria-current="true" :aria-label="'Slide ' + (parseInt(i) + 1)"
                    @click.prevent="setImage(imageUrl)"
                >
                    <img 
                        v-if="imageUrl" 
                        alt="Loose-wave Black Lace-front-wigs" 
                        :src="imageUrl"
                        class="img-fluid h-100 w-100"
                    >
                    <Skeletor v-else width="100%" height="100%" class="" />
                </a>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-9">
            <div class="carousel-inner text-center">
                <!-- <div v-for="(imageUrl, i) in images" :key="i" :class="i === 0 ? 'carousel-item active' : 'carousel-item'"> -->
                <div :class="true ? 'carousel-item active' : 'carousel-item'">
                    <!-- <div v-if="imageUrl" class="img-fluid rounded-4 bg-image h-100vh"
                        :style="{ backgroundImage: `url(${imageUrl})` }">
                    </div> -->
                    <!-- <VueImageZoomer
                        v-if="imageUrl"
                        :regular="imageUrl" 
                        :zoom="imageUrl" 
                        :zoom-amount="3"
                        :click-zoom="false"
                        img-class="img-fluid rounded-4 bg-image h-80vh w-auto"
                        alt="Grass" 
                    /> -->
                    <!-- {{ selectedImage }} -->
                    <img v-if="selectedImage"  alt="Loose-wave Black Lace-front-wigs" :src="selectedImage"
                        class="img-fluid h-100 w-100" id="myimage" ref="myImgRef">

                    <Skeletor v-else class="img-fluid rounded-4 bg-image h-100vh" width="100%" height="100%" />

                    <!-- <img 
                        alt="lil stars"
                        :src="imageUrl" 
                        class="img-fluid rounded-4 w-100 h-100vh"
                    > -->
                    <div id="myresult" class="img-zoom-result"></div>
                </div>
            </div>

            <div class="">
                <a class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <!-- <div class="slider-sec prev-btn d-flex justify-content-center align-items-center">
                        <i class="fa fa-chevron-left fa-lg"></i>
                    </div> -->
                    <!-- <span class="carousel-control-prev-icon" aria-hidden="true"> </span>
                    <span class="visually-hidden">Previous</span> -->
                </a>
                <a class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <!-- <div class="slider-sec next-btn d-flex justify-content-center align-items-center">
                        <i class="fa fa-chevron-right fa-lg"></i>
                    </div> -->
                    <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span> -->
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
import { useItemDetailDto } from '~/composables/item-detail/useItemDetailDto';
// import { VueImageZoomer } from 'vue-image-zoomer'
// import 'vue-image-zoomer/dist/style.css';

const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
});

const itemRef = toRef(props, "item");
const selectedImage = ref("");
const screenWidth = ref(process.client && screen.width);

const { images } = useItemDetailDto(
    itemRef,
    []
);

const setImage = async (img) => {
    selectedImage.value = img;
};

watch(images, () => {
    if (images.value?.length) {
        selectedImage.value =
            images.value && images.value.length > 0
            ? images.value[0]
            : "";    
    }
},{deep: true});

function initializeImageZoom() {
    if (screenWidth.value > 991 && selectedImage.value.length) {
        const lens = document.querySelector(".img-zoom-lens");
        if (lens) {
            lens.style.visibility = "visible";
        }

        imageZoom("myimage", "myresult");
    }
}

function imageZoom(imgID, resultID) {
    if (process.client) {
        var img, lens, result, cx, cy;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);
        img.height = 800;

        /*create lens:*/
        lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");
        // lens.offsetHeight = 200;
        // alert(`${img.width} ${img.height}`)
        // img.height = 800
        // console.log({img});
        // console.log(img.width);
        // console.log(img.height);
        // console.log(img.clientHeight);
        /*insert lens:*/
        img.parentElement.insertBefore(lens, img);

        /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;

        // let imgWidth = img.width > 0 ? img.width : 500;
        let imgWidth = img.width < 700 ? 700 : img.width;
        let imgHeight = img.height < 800 ? 800 : img.height;
        // console.log(imgWidth);
        // console.log(imgHeight);
        /*set background properties for the result DIV:*/
        result.style.backgroundImage = "url('" + selectedImage.value + "')";
        result.style.backgroundSize =
            imgWidth * (cx / 2) + "px " + imgHeight * (cy / 2) + "px";
        // result.style.backgroundSize = img.width * (cx / 2) + "px " + img.height * (cy / 2) + "px";
        // result.style.backgroundSize = imgWidth * cx + "px " + img.height * cy + "px";

        /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener("mousemove", moveLens);
        img.addEventListener("mousemove", moveLens);

        /*and also for touch screens:*/
        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);

        lens.addEventListener("mouseover", mouseOver);
        lens.addEventListener("mouseout", mouseOut);

        img.addEventListener("mouseover", mouseOver);
        img.addEventListener("mouseout", mouseOut);

        function mouseOver() {
            lens.style.visibility = "visible";
            result.style.visibility = "visible";
            // alert(img.src);
        }

        function mouseOut() {
            lens.style.visibility = "hidden";
            result.style.visibility = "hidden";
        }

        function moveLens(e) {
            var pos, x, y;
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            /*calculate the position of the lens:*/
            x = pos.x - lens.offsetWidth / 2;
            y = pos.y - lens.offsetHeight / 2;
            /*prevent the lens from being positioned outside the image:*/
            if (x > img.width - lens.offsetWidth) {
                x = img.width - lens.offsetWidth;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > img.height - lens.offsetHeight) {
                y = img.height - lens.offsetHeight;
            }
            if (y < 0) {
                y = 0;
            }
            /*set the position of the lens:*/
            lens.style.left = x + "px";
            lens.style.top = y + "px";
            /*display what the lens "sees":*/
            result.style.backgroundPosition =
                "-" + x * (cx / 2) + "px -" + y * (cy / 2) + "px";
        }
        function getCursorPos(e) {
            if (process.client) {
                var a,
                    x = 0,
                    y = 0;
                e = e || window.event;
                /*get the x and y positions of the image:*/
                a = img.getBoundingClientRect();
                /*calculate the cursor's x and y coordinates, relative to the image:*/
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                /*consider any page scrolling:*/
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return { x: x, y: y };
            }
        }
    }
}

watch(selectedImage, () => {
    if(selectedImage.value) {
        setTimeout(() => {
            initializeImageZoom();
        }, 1000);
    }
}, { deep: true });

onMounted(() => {
    // initializeImageZoom();
});

</script>

<style lang="scss" scoped>
.slider-sec {
    &:hover {
        color: #fff;
        border-radius: 90px !important;
        background-color: #2277E0 !important;
    }
}

.prev-btn {
    color: #000;
    border-radius: 90px;
    width: 44px !important;
    height: 44px !important;
    background-color: #ffff !important;
}

.next-btn {
    width: 44px;
    height: 44px;
    color: #000;
    border-radius: 90px;
    background-color: #ffff;
}

/* Bootstrap carousel' css for product image gallery page start here */

.carousel {
    display: flex;
}

.carousel-control-next {
    height: 44px !important;
    width: 44px !important;
    // margin-top: 620px !important;
    border-radius: 90px;
    background-color: #ffff;
    // background-color: #2277e0;
    position: absolute;
    top: 285px;
    right: 8%;
    // bottom: 300px;
    z-index: 2;
    box-sizing: border-box;
    // border: 1px solid #000000;
}

.carousel-control-next:hover {
    height: 44px !important;
    width: 44px !important;
    // margin-top: 620px !important;
    border-radius: 90px;
    background-color: #2277e0;
    position: absolute;
    // top: 285px;
    // bottom: 300px;
    z-index: 2;
    border: 0px;
}

@media screen and (max-width: 1399px) {
    .carousel-control-next {
        right: 1%;
    }
}


.carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20px' height='20px' fill='%23YOUR_HEX_CODE'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    transform: rotate(270deg) !important;
    // position: absolute;
    // bottom: 300px;
    // margin-left: 14.5px;
    height: 44px;
    width: 44px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    z-index: 1;
}


.carousel-control-next-icon:hover {
    // background-image: url('');
    transform: rotate(270deg) !important;
    // position: absolute;
    // bottom: 300px;
    // margin-left: 14.5px;
    height: 44px;
    width: 44px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    z-index: 1;
}

.carousel-control-prev {
    height: 44px !important;
    width: 44px !important;
    position: absolute;
    top: 285px;
    left: 22%;
    // border-radius: 90px;
    // background-color: #2277e0;
    z-index: 2;
}

@media screen and (max-width: 1399px) {
    .carousel-control-prev {
        left: 1%;
    }
}

.carousel-control-prev-icon {
    // background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20px' height='20px' fill='%23YOUR_HEX_CODE'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    transform: rotate(0deg) !important;
    // position: absolute;
    // top: 285px;
    // right: -545%;
    height: 44px;
    width: 44px;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);

}

.carousel-indicators {
    // bottom: auto;
    // top: 50%;
    // left: auto;
    right: auto;
    margin: 0;
    justify-content: left;
    // -webkit-transform: translateY(-50%);
    // transform: translateY(-50%);
    max-height: 685px !important;
    // background-color: #2277e0;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    position: relative;
    // background-color: #2277e0;

}

.carouselIndicatorsButton {
    width: 140px !important;
    height: 163px !important;
    position: relative !important;
    border-radius: 10px;
    border: 1px solid #D1D1D1;
    margin-top: 3px;
    margin-bottom: 3px;
}


.carouselIndicatorsButton.active {
    // width: 140px !important;
    // height: 163px !important;
    // width: 80px !important;
    // height: 100px !important;
    position: relative !important;
    // top: 0 !important;
    border: 2px solid #2277E0;

}

@media screen and (max-width: 1677px) {
    .carouselIndicatorsButton {
        width: 100px !important;
        height: 123px !important;
        position: relative !important;
        border-radius: 10px;
        border: 1px solid #D1D1D1;
        margin-top: 3px;
        margin-bottom: 3px;
    }
}

.carouselIndicatorsButton img {
    // position: relative !important;
    position: absolute !important;
    // width: 60px !important;
    // height: 80px !important;
    // width: 100%;
    // top: 0 !important;
    left: 0 !important;
    border-radius: 10px;
    object-fit: cover !important;
}

.carousel-indicators::-webkit-scrollbar {
    display: none;
}

.carouselExampleIndicators {
    position: relative;
}





.carousel-inner {
    // padding-right: 30px;

    .c-detail-bg-image {
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
        height: 750px !important;
    }
}

.carousel-item {
    transition-duration: 1s;
    // height: 820px !important;
    // max-height: 750px;
    // min-height: 700px;
}

.carousel-item img {
    height: 100%;
}




@media only screen and (max-width:600px) {}

/* product details page's carousel related css end here */
</style>

<style lang="scss">
.img-zoom-result {
    // border: 1px solid #d4d4d4;
    /*set the size of the result div:*/
    width: 300px;
    height: 300px;

    background-repeat: no-repeat;
    background-color: #fff;
    // display: none;
    visibility: hidden;
    position: absolute;
    // top: 0px;
    // left: -10px;
    bottom: 0px;
    right: 10px;
    transform: translateX(0%);
}

.img-zoom-lens {
    position: absolute;
    border: 1px solid #d4d4d4;
    /*set the size of the lens:*/
    width: 100px;
    height: 100px;
    // background-color: #b61111;
    z-index: 999;
    background-color: hsla(0, 0%, 100%, .5);
    // position: absolute;
    visibility: hidden;
}
</style>