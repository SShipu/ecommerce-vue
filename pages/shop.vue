<template>
    <MetaHead :meta="metaTags"/>

    <div class="">
        <ShopBanner />
        <div class="container-fluid">
            <div class="mx-1 mx-lg-3 mx-md-3 my-4">
                <div class="d-flex justify-content-end align-items-center mx-1 mx-lg-3 mx-md-3 my-3">
                    <div class="d-flex justify-content-evenly align-items-center rounded-pill border border-dark filter-btn" @click.prevent="showFilter = !showFilter">
                        <img src="/images/filter.png" alt="">
                        <h5 class="m-0">Filter</h5>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 pt-2" v-if="showFilter">
                        <div class="filter-section-container mx-2">
                            <div class="filter-section-body">
                                <Categories 
                                    v-model="selectedCategories"
                                    :loading="categoryStore.isLoading"
                                    :selectedCategories="selectedCategories"
                                    :allCategory="categoryStore.allCategories" 
                                    label="Categories"
                                />
                                <Colors 
                                    :loading="false" 
                                    :items="allColors"
                                    :selectedCategories="selectedAttributes" 
                                    label="Colors" 
                                    v-model="selectedAttributes" 
                                    type="color"
                                />
                                <Colors 
                                    v-model="selectedAttributes" 
                                    :loading="false" 
                                    :items="allSizes"
                                    :selectedCategories="selectedAttributes" 
                                    label="Sizes" 
                                    collapsId="size"
                                />
                            </div>
                        </div>
                    </div>

                    <div 
                        :class="{
                            'col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 pt-2': showFilter, 
                            'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-2': !showFilter}
                        "
                    >
                        <div class="mx-1">
                            <div 
                                class="d-flex justify-content-between align-items-center my-2"
                                v-if="totalItems"
                            >
                                <h5 class="m-0 ms-2">{{ totalItems }} Items</h5>
                                <!-- <SortBy v-model="sortBy" /> -->
                            </div>

                            <div v-if="(fetchPageError.length > 0 && !isFetchingPage)"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>{{ fetchPageError }}</h3>
                            </div>

                            <div v-else-if="(!fetchPageError.length && !isFetchingPage) && !page.length"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>No Items Found</h3>
                            </div>

                            <GridSection 
                                v-else-if="page.length || isFetchingPage"
                                :items="page" 
                                :totalPages="totalPages" 
                                :total-items="totalItems"
                                :loading="isFetchingPage"
                                :showFilter="showFilter"
                                @onUpdatePage="updatePage" 
                                style="border-top: 1px solid transparent !important" 
                            />

                            <div v-else
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>No Items</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ShopBanner from '@/views/shop/ShopBanner.vue';
import GridSection from "@/views/shop/GridSection.vue";
import Categories from "@/views/shop/Categories.vue";
import Colors from "@/views/shop/Colors.vue";
import SortBy from "@/views/shop/SortBy.vue";
import { useSmaugBranchestemsSearchController } from "@/libs/gandalf/smaug/items/v3/useSmaugBranchestemsSearchController";

import { usePagination } from "@/libs/libs-pub/usePagination";
import { productsClient, optionsClient, categoriesClient } from "~~/libs/gandalf/apis/config";

import { useCategoryStore } from "~/stores/category-store";
import { useAttributesStore } from "~/stores/attributes-store";
import { useMetaTagStore } from "~/stores/meta-tag-store";
import MetaHead from '@/views/commons/MetaHead.vue';
const metaTagStore = useMetaTagStore();

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();
const attributesStore = useAttributesStore();
const currentScreenHeight = ref(process.client ? window.screen.width : 0);
const selectedCategories = ref([]);

const showFilter = ref(true);

const allColors = ref([]);
const allSizes = ref([]);
const allBabyAges = ref([]);

const selectedAttributes = ref([]);

// /* ~~~~~~~~~~~~START~~~~~~~~~~~~ */

const topCategories = ref([]);
const roomCategories = ref([]);
const selectedCategoriesRequestBody = ref([]);
const selectedAttributesRequestBody = ref([]);
const query = ref(route.query.query || "");
const categoryId = ref(route.query.categoryId ? route.query.categoryId : "");
const selectedRoomId = ref("");
const categoryName = ref(
    route.query.categoryName ? route.query.categoryName : "Shop"
);
const queryPage = ref(
    route.query && route.query.page && route.query.page > 0
        ? route.query.page
        : 1
);

// /* ~~~~~~~~~~~~END~~~~~~~~~~~~ */

/* // META TAGS SECTIOn START */
const metaTags = computed(() => {
    let title = "";
    let description = "";
    let image = "";

    if (metaTagStore.metaTags?.length) {
        let homesMeta = metaTagStore.metaTags.filter(i => i?.fields?.page && i?.fields?.page == 'shop');
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

if (metaTags.value?.title?.length) {
    useSeoMeta({
        title: metaTags.value?.title,
        ogTitle: metaTags.value?.title,
        description: metaTags.value?.description,
        ogDescription: metaTags.value?.description,
        ogImage: metaTags.value?.image,
    })
}
/* // META TAGS SECTIOn END */

const {
    page,
    totalPages,
    totalItems,
    isFetchingPagePage,
    updatePaginationParam,
    currentPage,
    fetchPageError,
    deleteByIndex,
} = useSmaugBranchestemsSearchController({
    tag: "item",
    fetch: true,
    refetchIfExists: true,
    extras: { itemTag: "FINISHED_GOODS" },
    callbacks: null,
});

const filter = async () => {
    let params = {
        query: "",
        filters: [],
        nonZeroStockOnly: false,
    };

    if (query.value && query.value.length > 0) {
        let searchVal = query.value.trim().toLowerCase();
        if (searchVal.startsWith('afl-')) {
            let model = searchVal.replaceAll("-", "\\-")
            params.filters.push({
                field: "model",
                values: [model]
            })
        } else params.query = searchVal;
    }

    if (selectedCategoriesRequestBody.value?.length) {
        params.filters.push(selectedCategoriesRequestBody.value[0]);
    }

    if (selectedAttributesRequestBody.value?.length) {
        params.filters.push(selectedAttributesRequestBody.value[0]);
    }
    
    if (params) {
        updatePaginationParam(params);
    }

};

watch(() => attributesStore.attributes, () => {
    if (attributesStore.attributes.length) {
        allColors.value = attributesStore.attributes.filter((att) => att.displayLabel.toUpperCase() == 'COLOR')[0];
        allSizes.value = attributesStore.attributes.filter((att) => att.displayLabel.toUpperCase() == 'SIZE')[0];
        allBabyAges.value = attributesStore.attributes.filter((att) => att.displayLabel.toUpperCase() == 'BABY AGE')[0];
    }
}, { immediate: true });

watch(selectedCategories, (newVal) => {
    console.log("selectedCategories.value");
    console.log(newVal);
    if (newVal.length) {
        selectedCategoriesRequestBody.value = [];
        let cateValues = [];
        let field = `categoryIds`;
        for (let i = 0; i < newVal.length; i++) {
            let value = newVal[i];
            cateValues.push(value.id);
        }
        if (cateValues.length && field.length) {
            selectedCategoriesRequestBody.value = [
                {
                    field: field,
                    values: cateValues
                }
            ]
        } else selectedCategoriesRequestBody.value = [];
        for (let i = 0; i < newVal.length; i++) {
          selectedCategoriesRequestBody.value.push(
            newVal[i].name.trim()
          );
        }
    } else {
        selectedCategoriesRequestBody.value = [];
    }
    queryPage.value = 1;
    filter();

}, { deep: true, immediate: true });

watch(selectedAttributes, (newVal) => {
    if (newVal.length) {
        selectedAttributesRequestBody.value = [];

        let optValues = [];
        let field = newVal[0]?.optionId ? `opt_${newVal[0].optionId}` : "";
        for (let i = 0; i < newVal.length; i++) {
            let value = newVal[i];
            optValues.push(value.id);
        }
        if (optValues.length && field.length) {
            selectedAttributesRequestBody.value = [
                {
                    field: field,
                    values: optValues
                }
            ]
        } else selectedAttributesRequestBody.value = [];
    } else {
        selectedAttributesRequestBody.value = [];
    }

    queryPage.value = 1;
    filter();
}, { deep:  true });

const setLoading = async () => {
    let shimmers = [];
    for (let i = 0; i < 7; i++) {
        shimmers.push({ isLoading: true });
    }
    return shimmers;
};


watch(
    categoryId,
    () => {
        if (categoryId.value) {
            categoryName.value =
                route.query?.categoryName?.length &&
                route.query.categoryName != "all"
                    ? route.query.categoryName
                    : "";
            selectedRoomId.value = route.query.categoryName;
            selectedCategories.value =
                route.query?.categoryId?.length
                    ? [
                          {
                              id: route.query.categoryId,
                              name: categoryName.value,
                              room: true,
                          },
                      ]
                    : "";
        }
    },
    { immediate: true },
    { deep: true }
);

const fetchTopCategories = async (id) => {
    roomCategories.value = await setLoading();

    let params = {
        textParams: [],
        sortParams: [{ field: "name", type: "ASCENDING" }],
        page: 1,
        size: 10,
    };

    if (id.length) {
        params.textParams.push({
            field: "parentId",
            value: id,
            matchType: "EXACT",
        });
    }

    categoriesClient.search(params).then((res) => {
        if (!res.networkError) {
            if (res.status == 200) {
                topCategories.value = res.body.list.sort(
                    (a, b) => a.sortOrder - b.sortOrder
                );
                roomCategories.value = topCategories.value;
            }
        }
    });
};

watch(()=>route.query,
    (query) => {
        if (route.query) {
            
            if (route.query?.categoryId?.length > 0) {
                categoryId.value = route.query.categoryId;
                let name = route.query?.category?.length ? route.query?.category : "";
                selectedCategories.value =
                    route.query?.categoryId?.length > 0
                        ? [
                              {
                                  id: route.query.categoryId,
                                  name: name,
                              },
                          ]
                        : "";
                fetchTopCategories(route.query.categoryId);
            } else {
                fetchTopCategories("all");
            }
        }
    },
    { immediate: true, deep: true }
);

</script>

<style lang="scss" scoped>
.filter-section-body {

}
.filter-btn {
    cursor: pointer;
    width: 120px;
    height: 40px;
}
</style>