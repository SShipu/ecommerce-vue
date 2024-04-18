<template>
    <div class="my-5">
        <div class="mx- mx-lg-5 mx-md-5 my-5">
            <!-- {{ items }} -->
            <SectionParaHeader :title="title" :subTitle="subTitle"/>
            <div class="row" v-if="items.length && !loading">
                <carousel
                    style="width: 100% !important;"
                    ref="myCarousel3"
                    :breakpoints="breakpoints"
                    :wrap-around="true"
                    class="accessories-carousel"
                >
                    <template #slides>
                        <slide 
                            class="col-4 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6"
                            v-for="(item, i) in items" 
                            :key="i"
                        >
                            <ItemImageCard :item="item"/>
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
                        :wrap-around="true"
                        class="accessories-carousel"
                    >
                        <template #slides>
                            <slide 
                                class="col-4 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6"
                                v-for="(item, i) in 44" 
                                :key="i"
                            >
                                <Skeletor width="100%" height="100%" class="" />
                            </slide>
                        </template>
                    </carousel>
                </div>
                <div v-else class="d-flex justify-content-center align-items-center h-25vh">
                    <p class="my-2 fs-4 fw-bold">
                        No Collections Found
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { collectionsClient } from '~/libs/gandalf/apis/config';
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

const props = defineProps({
    // items: {
    //     type: Array,
    //     default: () => []
    // },
    title: {
        type: String,
        default: ""
    },
    subTitle: {
        type: String,
        default: "",
    }
})


const myCarousel3 = ref(false);
const loading = ref(false);
const breakpoints = ref({
    309: {
        itemsToShow: 1.5,
        snapAlign: "start",
    },

    600: {
        itemsToShow: 2.5,
        snapAlign: "center",
    },

    1023: {
        itemsToShow: 3,
        snapAlign: "start",
    },


    1400: {
        itemsToShow: 4.05,
        snapAlign: "start",
    },
});

const items = ref([
    {
        title: 'Babies',
        image: '/images/home/ac-1.png',
    },
    {
        title: 'Boys',
        image: '/images/home/ac-2.png',
    },
    {
        title: 'Girls',
        image: '/images/home/ac-3.png',
    },
    {
        title: 'Accessories',
        image: '/images/home/ac-4.png',
    },
]);

const fetchSeason = async () => {
    loading.value = true;
    let params = {
    //     textParams: [{
    //         field: 'type',
    //         value: 'shop-the-season',
    //         matchType: 'EXACT',
    //     }],
    //     nestedParams: [],
    //     sortParams: [
    //         {
    //             field: 'title',
    //             type: 'ASCENDING',
    //         },
    //     ],
    //     page: 1,
    //     size: 100,
    // };
    // const defaultPaginationParams = {
        textParams: [],
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

    let res = await collectionsClient.search(params);
    console.log("collectionsClient res");
    console.log(res);
    if (res.status == 200 && !res.networkError && res?.body?.list) {
        console.log({res});
        items.value = res?.body?.list.filter(i => i?.extras?.active == "true").sort((x,y) => x?.extras?.sortOrder - y?.extras?.sortOrder);
    }
    loading.value = false;
}

onMounted(async () => {
    await fetchSeason();
})
</script>

<style lang="scss">
.accessories-carousel {
    .carousel__slide {
        // width: 100% !important;
    }

    .carousel__prev,
    .carousel__next {
        width: 40px !important;
        height: 40px !important;

        // display: none !important;
        @media screen and (max-width: 767px) {
            display: none !important;
        }
    }

    .carousel__prev {
        margin-left: -1px;
    }

    .carousel__next {
        margin-right: -1px;
    }

    .carousel__prev,
    .carousel__next {
        box-shadow: 0 3px 50px rgba(0, 0, 0, 0.16) !important;
        background-color: #fff !important;
        border-radius: 50%;
        z-index: 2;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        transition: background-color 0.3s ease-in-out;
    }
}
</style>

<style lang="scss" scoped>
.bg-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

</style>