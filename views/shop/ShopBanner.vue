<template>
    <div class="w-100 h-50vh bg-image position-relative d-flex justify-content-start align-items-center banner-container position-relative"
        :style="{backgroundImage: `url('${image}')`}"
    >
        <!-- <img 
            :src="'/images/home/banner.png'" 
            alt="banner-image" 
            class="img-fluid banner_image" 
        /> -->
        <div class="banner-text-container position-absolute p-2 p-lg-5 p-md-5 ">
            <span class="fw-bold text-white bg-text">{{ selectedCategoryName.toUpperCase() }}</span>
            <p class="bg-para text-white ">{{description}}</p>
            <!-- <div class="btn-group">
                <button 
                    class="btn btn-light bg-btn rounded-pill fs-4 fw-bold mt-2 px-3 py-2 py-lg-2 py-md-2 mx-1"
                    v-for="(cat, ind) in babiesCategory" :key="ind"
                    @click.prevent="router.push({
                        path: '/shop',
                        query: {
                            categories: [cat.name],
                            routeBehavior: true,
                            isWatcher: true,
                        }
                    })"
                >
                    {{ cat.name }}
                </button>

            </div> -->
        </div>
    </div>
</template>

<script setup>
import { useCategoryStore } from '~~/stores/category-store';
import { kvpsClient } from '~/libs/gandalf/apis/config';

const route = useRoute();
const router = useRouter();

const categoryStore = useCategoryStore();
const images = ref([]);
const image = ref("");
const description = ref("");

const babiesCategory = computed(() => {
    if(categoryStore.parentCategories) {
        let babyParentCategory = categoryStore.parentCategories.filter((b) => b.name.toUpperCase() == 'BABIES' && !b.parentId);

        if(babyParentCategory) {
            let babiesCategory = categoryStore.categories.filter((bc) => bc.parentId == babyParentCategory[0].id);
            return babiesCategory.length ? babiesCategory : [];
        }

    }

    return [];
});
const goTo = (name) => {
    router.push({name: name})
}
const selectedCategoryName = ref('');

watch(() => route.query, ()=> {
    if(route?.query?.category?.length) {
        // selectedCategoryName.value = typeof(route.query.categories) == 'object' ? route.query.categories[0] : route.query.categories;
        selectedCategoryName.value = route.query.category ? route.query.category : route.query.category;
    } else if(route?.query?.collection?.length) {
        selectedCategoryName.value = `${route.query.collection} Collections`;
    } else {
        selectedCategoryName.value = "Shop";
    }
}, {immediate: true}, {deep: true});

const fetchKidsVibe = async () => {
    let params = {
        textParams: [{
            field: 'type',
            value: 'shop-banner',
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
        image.value = images.value[0]?.fields?.image;
        description.value = images.value[0]?.fields?.description;
    }
}

onMounted(async () => {
    await fetchKidsVibe();
})
</script>

<style lang="scss" scoped>

.banner-container {
    // height: 50vh;
    .banner-text-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
}
.bg-image {
    // background-image: url('/images/home/banner-2.png');
    background-position: center !important;
}
.banner_image {
    // height: 750px;
    object-fit: cover;
    width: 100%;
    height: 50vh;
}
.bg-text {
    text-shadow: 0px 2px #2277E0; 
    font-weight: 800; 
    font-family: 'Roboto'; 
    font-size: 35px;
}

.bg-para {
    font-weight: 500;
    font-size: 18px;
    width: 50%;
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

@media screen and (max-width: 1023px){
    .banner-container {
        height: 80vh !important;
        .banner-text-container {
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                text-align: center;
            }
            .btn-group {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                button {
                    width: 100%;
                }
            }
        }
        .bg-para {
            width: 100%;
        }
        .banner_image {
            width: auto;
            height: 80vh;
        }
    }
    
}

@media screen and (max-width: 500px){
    .banner-container {
        .bg-text {
            font-size: 30px;
        }
        .bg-para {
            font-weight: 500;
            font-size: 15px;
        }
    }
    
}
</style>