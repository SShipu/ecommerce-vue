<template>
    <MetaHead :meta="metaTags"/>
    <div class="">

        <Banner />

        <Category 
            :items="categoryStore.categories" 
            title="Categories" 
            :loading="categoryStore.isLoading"
        />

        <div class="row mx-lg-5 mx-md-5 my-5">

            <div class="px-4 px-lg-0 col-12 col-lg-4 col-xl-3 col-xxl-2 pt-xl-5 pt-0 text-lg-start text-center">
                <h2>New Arrivals</h2>
                <p>Shop our latest collection for the lil super Star</p>
            
                <button 
                    class="d-none d-lg-block rounded-5 px-4 btn c-new-arrivals-shop-now-btn py-1"
                    @click.prevent="goTo('shop')"
                >
                    Shop Now
                </button>
            </div>

            <div class="ms-2 ms-lg-0 col-12 col-lg-8 col-xl-9 col-xxl-10">
                <NewArival 
                    :items="NewArrivalItems" 
                    title="New Arrivals" 
                />
            </div>

            <div class="col-12 d-block d-lg-none px-4">
                <button 
                    class="w-100 rounded-5 btn c-new-arrivals-shop-now-btn py-1"
                    @click.prevent="goTo('shop')"
                >
                    See all
                </button>
            </div>
        </div>

        <div class="row mx-lg-5 mx-md-5 my-5">

            <div class="px-4 px-lg-0 col-12 col-lg-4 col-xl-3 col-xxl-2 pt-xl-5 pt-0 text-lg-start text-center">
                <h2>Trending Looks</h2>
                <p>Now Now, let's not get out of the trend. Keep your lil one up-to-date with our new collections.</p>
            </div>

            <div class="ms-2 ms-lg-0 col-12 col-lg-8 col-xl-9 col-xxl-10">
                <NewArival 
                    :items="trendingProducts" 
                    title="Trending Looks" 
                />
            </div>
        </div>

        <VerticalColumnImage />

        <Accessories 
            title="Shop The Season"
            subTitle="We invite you to explore our collection of luxury children's fashion and discover what sets us apart as the ultimate destination for high-end kids' style." 
        />
    </div>
</template>

<script setup>
import Banner from '@/views/index/Banner.vue';
import Category from '@/views/index/Category.vue';
import NewArival from '~~/views/index/NewArival.vue';
import TrendingProducts from '~~/views/index/TrendingProducts.vue';
import VideoSection from '@/views/index/VideoSection.vue';
import Accessories from '@/views/index/Accessories.vue';
import { useCategoryStore } from "~/stores/category-store";
import { useMetaTagStore } from "~/stores/meta-tag-store";
import { itemsV3Client, itemIndicesClient } from '@/libs/gandalf/apis/config';
import VerticalColumnImage from '@/views/index/VerticalColumnImage.vue';
import MetaHead from '@/views/commons/MetaHead.vue';

const categoryStore = useCategoryStore();
const metaTagStore = useMetaTagStore();

const categories = ref([]);

const NewArrivalItems = ref([]);
const trendingProducts = ref([]);

const accessoryItems = ref([
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
const router = useRouter();

const metaTags = computed(() => {
    let title = "";
    let description = "";
    let image = "";

    if (metaTagStore.metaTags?.length) {
        let homesMeta = metaTagStore.metaTags.filter(i => i?.fields?.page && i?.fields?.page == 'home');
        if (homesMeta.length) {
            title = homesMeta[0]?.title;
            description = homesMeta[0]?.fields?.description;
            image = homesMeta[0]?.fields?.image;
        }
    }

    return {
        title: title,
        description: description,
        image: image,
    };
});

useSeoMeta({
    title: metaTags.value?.title,
    ogTitle: metaTags.value?.title,
    description: metaTags.value?.description,
    ogDescription: metaTags.value?.description,
    ogImage: metaTags.value?.image,
})
const goTo = (name) => {
    router.push({name: name})
}
const setLoading = (numberOfShimmer) => {
    let shimmers = [];

    let length = numberOfShimmer ? numberOfShimmer : 4;
    
    for (let index = 0; index < length; index++) {
        shimmers.push({ isLoading: true });
    }

    return shimmers;
};


watch(() => categoryStore.categories, () => {
    if(categoryStore?.categories?.length) {
        if (categoryStore.parentCategories && categoryStore.parentCategories.length > 0) {
            categories.value = categoryStore.parentCategories;
        }
    }
    // else {
    //     categories.value = setLoading(10);
    // }
}, { immediate: true }, {deep: true});



const fetchNewArrival = async () => {

    let params = {
        sortType: 'DESC',
        sortField: 'dateCreated',
        page: 1,
        size: 18,
    };

    itemIndicesClient.search(params).then((res) => {
        if (!res.networkError) {
            if (res.status == 200) {
                if (res.body && res.body.list && res.body.list.length) {
                    NewArrivalItems.value = res.body.list;
                }
            }
        } else {
            console.log("networkProblem");
        }
    });
};

const fetchFeaturedProducts = async () => {
    let params = {
        fields: [
            {
                field: 'collectionIds',
                values: ['1172088177934864384']
            }
        ],
        page: 1,
        size: 10,
    };
    
    itemIndicesClient.search(params).then((res) => {
        if (!res.networkError) {
            if (res.status == 200 && res.body.list && res.body.list.length > 1) {
                trendingProducts.value = res.body.list;
            }
        } else {
            trendingProducts.value = setLoading();
        }
    })
    .catch(async () => {
        trendingProducts.value =  setLoading();
    });
};

onMounted(() => {
    fetchNewArrival();
    fetchFeaturedProducts();
})

</script>

<style lang="scss" scoped>
.c-new-arrivals-shop-now-btn {
    background-color: #2277E0;
    border-radius: 35px !important;
    font-weight: 700 !important;
    color: #fff !important;
    font-size: 1.2rem;

    &:hover {
        background-color: transparent;
        border: 1px solid #2277E0;
        color: #1C1C24 !important;
    }
}


.c-btn-outline-primary {
    border: 1px solid #2277E0;
    border-radius: 35px !important;
    font-weight: 700 !important;
    color: #1C1C24 !important;
}

.c-btn-outline-primary:hover {
    background-color: #2277E0;
    color: #ffff !important;
    font-weight: 700 !important;
}
</style>