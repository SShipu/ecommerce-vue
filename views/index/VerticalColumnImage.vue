<template>
    <div class="d-none d-lg-block">
        <div class="swiper-container ">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="container-general w-100 mx-2 mx-lg-5 mx-md-5">
                    <!-- {{ !loading && images.length > 0}} -->
                    <!-- {{images}} -->
                        <div class="gallery-wrap wrap-effect-1" v-if="!loading && images.length">
                            <div 
                                class="item position-relative" 
                                v-for="(item, i) in images" 
                                :key="i" 
                                :style="{backgroundImage: `url('${item?.fields?.image}')`}"
                            >
                                <div class="position-absolute bottom-0 mb-4 mx-auto w-100 button-container fade-in">
                                    <!-- <div class="">
                                        <button 
                                            class="btn btn-light bg-btn shadow-none rounded-pill fs-4 fw-bold mt-3 px-1 px-lg-5 px-md-3 py-1 py-lg-2 py-md-2 bg-dark fs-2 fw-bolder" 
                                            @click.prevent="goTo('shop')"
                                        >
                                            Kids Vibe Statement
                                        </button>
                                    </div> -->

                                    <div class="">
                                        
                                        <!-- @click.prevent="goTo('shop')" -->
                                        <button 
                                            class="btn btn-light bg-btn shadow-none rounded-pill fs-4 fw-bold mt-1 px-1 px-lg-4 px-md-3 py-1 py-lg-2 py-md-2 text-dark" 
                                            @click.prevent="router.push({name: 'collections', query: {
                                                collection: item?.fields?.collectionTitle, collectionId: item?.fields?.url
                                            }})"
                                        >   
                                            {{ item.title }}
                                            <!-- Shop the Collections -->
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="gallery-wrap wrap-effect-1" v-if="loading">
                                <div 
                                    class="item position-relative" 
                                    v-for="(item, i) in 4" 
                                    :key="i" 
                                    :style="{backgroundImage: `url('${item?.fields?.image}')`}"
                                >
                                    <!-- <div class="position-absolute bottom-0 mb-4 mx-auto w-100 button-container fade-in">
                                        <div class="">
                                            <button 
                                                class="btn btn-light bg-btn shadow-none rounded-pill fs-4 fw-bold mt-3 px-1 px-lg-5 px-md-3 py-1 py-lg-2 py-md-2 bg-dark fs-2 fw-bolder" 
                                                @click.prevent="goTo('shop')"
                                            >
                                                Kids Vibe Statement
                                            </button>
                                        </div>
    
                                        <div class="">
                                            
                                            <button 
                                                class="btn btn-light bg-btn shadow-none rounded-pill fs-4 fw-bold mt-1 px-1 px-lg-4 px-md-3 py-1 py-lg-2 py-md-2 text-dark" 
                                                @click.prevent="goTo('shop')"
                                            >
                                                Shop the Collections
                                            </button>
                                        </div>
                                    </div> -->
                                    <Skeletor width="100%" height="100%" class="" />
                                </div>
                            </div>
                            <div class="gallery-wrap wrap-effect-1 d-flex justify-content-center align-items-center" v-else>
                                <p class="my-2 fs-4 fw-bold">
                                    No Items Found
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row overflow-hidden d-lg-none" v-if="!loading && images.length > 0">
        <carousel
            style="width: 100% !important;"
            ref="myCarousel3"
            :breakpoints="breakpoints"
            :wrap-around="true"
            class="kid-vibes"
        >
            <template #slides>
                <slide 
                    v-for="(item, i) in images" 
                    :key="i"
                >
                    <VibeImageCard 
                        :item="item"
                    />
                </slide>
            </template>

            <template #addons>
                <Navigation />
            </template>
        </carousel>
    </div>
    <div class="row overflow-hidden d-lg-none" v-else>
        <div v-if="loading">
            <carousel
                style="width: 100% !important;"
                ref="myCarousel3"
                :breakpoints="breakpoints"
                :wrap-around="true"
                class="kid-vibes"
            >
                <template #slides>
                    <slide 
                        v-for="(item, i) in 4" 
                        :key="i"
                    >
                        <VibeImageCardShimmer />
                    </slide>
                </template>
            </carousel>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center h-60vh">
            <p class="my-2 fs-4 fw-bold">
                No Items Found
            </p>
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
// import { useSmaugAccessoriesController } from '~/libs/gandalf/smaug/accessories/useSmaugAccessoriesController';
import { kvpsClient } from '~/libs/gandalf/apis/config';
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const myCarousel3 = ref(false);
const breakpoints = ref({
    300: {
        itemsToShow: 1.3,
        snapAlign: "end",
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

const images = ref([
    {
        fields: {
            image: "/images/home/1.png"
        }
    },
    {
        fields: {
            image: "/images/home/2.png"
        }
    },
    {
        fields: {
            image: "/images/home/3.png"
        }
    },
    {
        fields: {
            image: "/images/home/4.png"
        }
    },
]);

const router = useRouter();
const loading = ref(true);
const goTo = (name) => {
    router.push({name: name})
}

// const {
//     page,
//     totalPages,
//     totalItems,
//     isFetchingPage,
//     updatePaginationParam,
//     currentPage,
//     fetchPageError,
// } = useSmaugAccessoriesController({
//     tag: 'kids-vibe',
//     fetch: true,
//     refetchIfExists: true,
//     extras: { type: 'kids-vibe' },
//     callbacks: null,
//     size: 100
// });

const fetchKidsVibe = async () => {
    loading.value = true;
    let params = {
        textParams: [{
            field: 'type',
            value: 'kids-vibe',
            matchType: 'EXACT',
        }],
        nestedParams: [],
        sortParams: [
            {
                field: 'title',
                type: 'ASCENDING',
            },
        ],
        page: 1,
        size: 100,
    };

    let res = await kvpsClient.search(params);

    if (res.status == 200 && !res.networkError && res?.body?.list) {
        images.value = res?.body?.list.sort((x,y) => x.sortOrder - y.sortOrder);
    }
    loading.value = false;
}

onMounted(async () => {
    await fetchKidsVibe();
})
</script>

<style lang="scss" scoped>
.swiper-slide {
    text-align: center;
    background: #fff;
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

// Image Accordions General
.container-general {
    padding: 75px 0;
    margin: 0 auto;

    .gallery-wrap {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70vh;

        .item {
            flex: 1;
            height: 100%;
            background-position: center;
            background-size: cover;
            background-repeat: none;
            transition: all 0.8s ease;
            .button-container {
                display: none;
                button {
                    color: black;
                    &:first-child {
                        color: white;
                    }
                    &:hover {
                        color: black !important;
                        background-color: #fff !important;
                    }
                }
            }
            &:hover {
                .button-container {
                    display: block;
                }
                flex: 3;
            }
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg) translate3d(0, 0, 0);
    }

    25% {
        transform: rotate(10deg) translate3d(0, 0, 0);
    }

    50% {
        transform: rotate(-10deg) translate3d(0, 0, 0);
    }

    75% {
        transform: rotate(5deg) translate3d(0, 0, 0);
    }

    100% {
        transform: rotate(0deg) translate3d(0, 0, 0)
    }
}
</style>
<style lang="scss">
.kid-vibes {
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