<template>
    <!-- <div class="w-100 h-80vh bg-image position-relative d-flex justify-content-center align-items-center banner-container">
        <div class="banner-text-container d-flex flex-column align-items-center">
            <span class="fw-bold text-white shadow bg-text">Ready To Wear</span>
            <button 
                class="btn btn-light bg-btn rounded-pill fs-4 fw-bold mt-3 px-3 py-2" 
                @click.prevent="goTo('shop')"
            >Shop LS Kids</button>
        </div>
    </div> -->

    <div class="position-relative banner-container">
        <!-- <img 
            :src="'/images/home/banner.png'" 
            alt="banner-image" 
            class="w-100 img-fluid banner_image" 
        /> -->
        <!-- {{ bannerData }} -->
        <div v-if="isLoading || !bannerData.length">
            <Skeletor
                class="label" style="margin-bottom: 0.5rem; width: 100%; height: 80vh; border-radius: 0;"
            />
        </div>
        <carousel
            style="width: 100%;"
            ref="myCarousel"
            :breakpoints="breakpoints"
            :settings="settings"
            :wrap-around="true"
            v-else
		>

			<template #slides>
				<slide 
                    v-for="(banner, j) in bannerData" 
                    :key="j" 
                >
                    <img 
                        :src="banner.url" 
                        alt="banner-image" 
                        class="w-100 img-fluid banner_image h-80vh" 
                    />
                    <div 
                        class="w-100 banner-text-container d-flex flex-column align-items-center justify-content-center position-absolute" 
                        style="top: 40%;">
                        <span class="fw-bold text-white bg-text" :class="{'no-title': !banner?.title?.length}">{{banner.title}}</span>
                        <button 
                            class="btn btn-light bg-btn rounded-pill fs-4 fw-bold mt-3 px-3 py-2 shop-button" 
                            @click.prevent="goTo('shop')"
                        >Shop LS Kids</button>
                    </div>
				</slide>
			</template>

			<template #addons>
                <Pagination />
			</template>

        </carousel>
        <!-- <video-background 
            src="/video/lil-star.mp4"
            poster="/images/mainfoto.jpg"
            :sources="[
                {src: '/video/lil-star.mp4', res: 900, autoplay: true}, 
                {src: '/video/lil-star.mp4', res: 638, autoplay: true, poster: '/video/lil-star.mp4'}
            ]"
            style="height: 70vh;"
            :loop="true"
            overlay="linear-gradient(45deg,#00000030,#0000006b)" 
        >
        </video-background> -->
        
    </div>
</template>

<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { cmsClient } from "~/libs/gandalf/apis/config";
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const bannerData = ref([]);
const isLoading = ref(false);

const settings = ref({
	itemsToShow: 1,
	snapAlign: "center",
    autoplay: 3500,
    loop: true
});

const router = useRouter();
const goTo = (name) => {
    router.push({name: name})
}

const videoSources = [
  {
    src: 'https://www.youtube.com/embed/FPy8oPXaKe4',
    res: 900,
    autoplay: true
  },
  {
    src: 'https://www.youtube.com/embed/FPy8oPXaKe4',
    res: 638,
    autoplay: true,
    poster: 'https://www.youtube.com/embed/FPy8oPXaKe4'
  }
];

const fetchSliderImages = async () => {
    isLoading.value = true;
    cmsClient.fetchSliderImages({size: 10}).then((res)=> {
        if (res.status == 200 && !res.networkError) {
            if (res.body && res.body.list && res.body.list.length > 0) {
                let list = res.body.list;
                bannerData.value = list.sort((x,y)=> x.sortOrder - y.sortOrder);
            }
        }
    })
    isLoading.value = false;
}

onMounted(async () => {
  await fetchSliderImages();
});
</script>

<style lang="scss" scoped>

.banner-container {
    // height: 50vh;
    position: relative;
}

.banner_image {
    // height: 750px;
    object-fit: cover;
}
.bg-image {
    background-image: url('/images/home/banner.png');
}
.bg-text {
    text-shadow: 0px 2px #2277E0; 
    font-weight: 800; 
    font-family: 'Roboto' sans-serif; 
    font-size: 65px;
}

.shop-button {
    color: #2277E0;
}

.bg-btn {
    box-shadow: 0px 3px #2277E0; 
    color: #2277E0;
    &:hover {
        color: #fff;
        box-shadow: none;
        background-color: #2277E0;
        border: none;
    }
}

@media screen and (max-width: 993px){
    .banner-container {
        .bg-text {
            font-size: 35px;
        }

        .banner_image {
            height: 400px;
        }
    }
    
}
</style>
<style lang="scss">
.carousel__pagination {
    width: 100%;
    margin: 0 !important;
    position: absolute !important;
    bottom: 2% !important;
}
@media screen and (max-width: 700px){
    .carousel__pagination {
        left: -6% !important;
    }
}
// .carousel__pagination-button {
//   display: block;
//   border: 0;
//   margin: 0;
//   cursor: pointer;
//   padding: var(--vc-pgn-margin);
// //   background: red;
//   color: red;
// }
.carousel__pagination-button::after {
  display: block;
  content: "";
  width: var(--vc-pgn-width);
  height: var(--vc-pgn-height);
  border-radius: var(--vc-pgn-border-radius);
  background-color: white;
}
.carousel__pagination-button:hover::after, .carousel__pagination-button--active::after {
  background-color: #2277E0;
}

.no-title {
    height: 97.5px;
}
</style>