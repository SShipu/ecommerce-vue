<template>
    <div class="">
        <ShopBanner />
        <div class="container-fluid">
            <div class="mx-1 mx-lg-3 mx-md-3 my-4">
                <div class="d-flex justify-content-between align-items-center mx-1 mx-lg-3 mx-md-3 my-3">
                    <h2 class="heading" style="margin: 0;">
                        New Arrival
                    </h2>
                    <!-- <div class="d-flex justify-content-evenly align-items-center rounded-pill border border-dark filter-btn" @click.prevent="showFilter = !showFilter">
                        <img src="/images/filter.png" alt="">
                        <h5 class="m-0">Filter</h5>
                    </div> -->
                </div>

                <div class="row" v-if="!showFilter">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-2">
                        <div class="mx-1">

                            <div v-if="(fetchError.length > 0 && !isFetching)"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>{{ fetchError }}</h3>
                            </div>

                            <div v-else-if="(!fetchError.length && !isFetching) && !all"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>No Items Found</h3>
                            </div>


                            <GridSection 
                                v-else-if="all.length || isFetching"
                                :items="all" 
                                :totalPages="totalPages" 
                                :total-items="totalItems"
                                :loading="isFetching"
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
                
                <div class="row" v-else-if="showFilter">
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 pt-2">
                        <div class="filter-section-container mx-2">
                            <div class="filter-section-body">
                                <Categories 
                                    v-model="selectedCategories"
                                    :loading="false"
                                    :selectedCategories="selectedCategories"
                                    :allCategory="allCategory" 
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

                    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 pt-2">
                        <div class="mx-1">
                            <div 
                                class="d-flex justify-content-between align-items-center my-2"
                                v-if="totalItems"
                            >
                                <h5 class="m-0 ms-2">{{ totalItems }} Items</h5>
                                <SortBy v-model="sortBy" />
                            </div>

                            <div v-if="(fetchError.length > 0 && !isFetching)"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>{{ fetchError }}</h3>
                            </div>

                            <div v-else-if="(!fetchError.length && !isFetching) && !all"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <h3>No Items Found</h3>
                            </div>

                            <GridSection 
                                v-else-if="all.length || isFetching"
                                :items="all" 
                                :totalPages="totalPages" 
                                :total-items="totalItems"
                                :loading="isFetching"
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
import Lookups from "@/views/shop/Lookups.vue";
import Colors from "@/views/shop/Colors.vue";
import SortBy from "@/views/shop/SortBy.vue";
import AttributeFilter from '@/views/shop/AttributeFilter.vue';

import { usePagination } from "@/libs/libs-pub/usePagination";
import { productsClient, optionsClient } from "~~/libs/gandalf/apis/config";

import { useCategoryStore } from "~/stores/category-store";
import { useLookupsStore } from "~/stores/lookups-store";
import { useAttributesStore } from "~/stores/attributes-store";

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();
const lookupsStore = useLookupsStore();
const attributesStore = useAttributesStore();

// const totalPages = ref(10);
const fetchPageError = ref([]);
const isFetchingPage = ref(false);
const selectedCategories = ref([]);
const selectedCategoriesName = ref([]);
const sortBy = ref(null);

const showFilter = ref(false);

const allCategory = ref([]);

const allFit = ref([]);
const allLookups = ref([]);
const selectedLookups = ref([]);
const selectedLookupsName = ref({
    fit: [],
});

const allAttributes = ref([]);
const allColors = ref([]);
const allSizes = ref([]);
const allBabyAges = ref([]);

const selectedAttributes = ref([]);
const selectedAttributesName = ref({
    Color: [],
    Size: [],
    BabyAge: [],
});

// default parameter
const defaultPaginationParams = {
    query: "",
    categoryIds: [],
    categories: [],
    attributes: {
        Color: [],
        Size: [],
        BabyAge: [],
    },
    lookups: {
        fit: [],
    },
    sortParams: [
        { 
            field: "dateCreated", 
            type: "DESCENDING" 
        },
        {
            field: 'title',
            type: 'ASCENDING',
        },
    ],
    page: 1,
    size: 20,
    status: 'ACTIVE',
};

//category start here
// watching categories changes when filtering by categories
watch(() => selectedCategories, () => {
    selectedCategoriesName.value = [];

    selectedCategories.value.forEach((cat) => selectedCategoriesName.value.push(cat.name))
    updatePage(1);
}, { deep: true });

// categories set for categories component
const setCategories = (cats) => {

    if (allCategory.value && allCategory.value.length > 0 && cats && cats.length > 0) {
        selectedCategoriesName.value = cats;

        cats?.forEach((cat) => {
            selectedCategories.value.push(allCategory.value.filter((c) => c.name == cat)[0]);
        });
    }
};

// watching category store
watch(() => categoryStore.categories, () => {
    if (categoryStore.categories && categoryStore.categories.length > 0) {
        allCategory.value = categoryStore.categories;
        setCategories(defaultPaginationParams.categories);
    }
}, { immediate: true });
// category end here

//attribute start here
// watching attributes changes when filtering by attributes
watch(() => selectedAttributes, () => {

    selectedAttributesName.value = {
        Color: [],
        Size: [],
        BabyAge: [],
    };

    selectedAttributes.value.forEach((optn) => {
        if (optn && optn.optionId == 1) {
            selectedAttributesName.value.Color.push(optn.name);
        } else if (optn && optn.optionId == 4) {
            selectedAttributesName.value.Size.push(optn.name);
        } else if (optn && optn.optionId == 3) {
            selectedAttributesName.value.BabyAge.push(optn.name);
        }
    });

    updatePage(1);
}, { deep: true });

// attribute set for attributes component
const setAttributes = (attribute) => {
    if (allAttributes.value && allAttributes.value.length > 0 && attribute && attribute.length) {

        allAttributes.value.forEach((att) => {
            let val = [];
            // let val = att.values.filter((v) => v.name == attribute);
            attribute.forEach((at) => {
                val.push(att.values.filter((v) => v.name == at)[0]);
            });

            val.forEach((v) => {
                selectedAttributes.value.push(v);
            });
        });
    }
};

// wathcing attribute store
watch(() => attributesStore.attributes, () => {

    if (attributesStore.attributes && attributesStore.attributes.length > 0) {
        allAttributes.value = attributesStore.attributes;

        allColors.value = allAttributes.value.filter((att) => att.displayLabel == 'Color')[0];
        allSizes.value = allAttributes.value.filter((att) => att.displayLabel.toUpperCase() == 'SIZE')[0];
        
        allBabyAges.value = allAttributes.value.filter((att) => att.displayLabel.toUpperCase() == 'BABY AGE')[0];

        setAttributes(defaultPaginationParams.attributes.Color);
        setAttributes(defaultPaginationParams.attributes.Size);
        setAttributes(defaultPaginationParams.attributes.BabyAge);
    }
}, { immediate: true });
// attributes end here

// lookups start here
// watching lookups changes when filtering by lookups
watch(() => selectedLookups, () => {

    selectedLookupsName.value = {
        fit: [],
    };

    selectedLookups.value.forEach((lookup) => {
        if (lookup) {
            selectedLookupsName.value.origins.push(lookup.name)
        }
    });
    updatePage(1);
}, { deep: true });

// lookup set for lookups component
const setlookups = (lookups) => {

    if (allLookups.value && allLookups.value.length > 0 && lookups && lookups.length > 0) {
        lookups.forEach((lookup) => {
            selectedLookups.value.push(allLookups.value.filter((l) => l.name == lookup)[0]);
        });
    }
};

// watching lookups store
watch(() => lookupsStore.lookups, () => {
    if (lookupsStore.lookups && lookupsStore.lookups.length > 0) {
        allLookups.value = lookupsStore.lookups;

        allFit.value = allLookups.value.filter((origin) => origin.type == 'fit');
        setlookups(defaultPaginationParams.lookups.fit);
    }
}, { immediate: true });
// lookups end here

// pagination controller for public page
const { fetch, updateData, isFetching, fetchError, all, totalItems, totalPages, nextPageToken, currentPage } = usePagination({
    methodRef: productsClient.search,
    defaultPaginationParams: defaultPaginationParams,
    isRouterBehavior: true,
    routeMethodRef: route,
    routerMethodRef: router,
});

// page number update and service call
const updatePage = async (page) => {
    let param = JSON.parse(JSON.stringify(defaultPaginationParams));

    param.page = page ? page : 1;

    param.categories = selectedCategoriesName.value;
    param.lookups = selectedLookupsName.value;
    param.attributes = selectedAttributesName.value;

    // if (query.value && query.value.trim().length > 0)
    //     param.query = query.value.trim();

    let res = await updateData(param);

    // for update route cause after updateData default categories empty
    // param['categories']= selectedCategoriesName.value;

    if (res.status == 200) updateRouteData(param);
    if (process.client && window) {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

//route query updating after service call
const updateRouteData = (param) => {

    let data = {
        routeBehavior: true,
    };

    data.routeBehavior = true;
    data.query = param.query;

    data.page = Number(param.page) ? Number(param.page) : 1;
    data.size = Number(param.size) ? Number(param.size) : 20;
    data.categories = [];
    data.lookups = {
        origins: [],
        textures: [],
        materials: [],
    }

    data.attributes = {
        Color: [],
        Size: [],
        BabyAge: [],
    }

    if (param.categories && typeof (param.categories) == 'string') {
        data.categories.push(param.categories);
    } else {
        data.categories = param.categories;
    }

    if (param.Color && typeof (param.Color) == 'string') {
        data.Color.push(param.attributes.Color);
    } else {
        data.Color = param.attributes.Color;
    }

    if (param.Size && typeof (param.attributes.Size) == 'string') {
        data.Size.push(param.attributes.Size);
    } else {
        data.Size = param.attributes.Size;
    }

    if (param.BabyAge && typeof (param.attributes.BabyAge) == 'string') {
        data.BabyAge.push(param.attributes.BabyAge);
    } else {
        data.BabyAge = param.attributes.BabyAge;
    }

    if (param.origins && typeof (param.origins) == 'string') {
        data.origins.push(param.lookups.origins);
    } else {
        data.origins = param.lookups.origins;
    }

    if (param.textures && typeof (param.lookups.textures) == 'string') {
        data.textures.push(param.lookups.textures);
    } else {
        data.textures = param.lookups.textures;
    }

    if (param.materials && typeof (param.lookups.materials) == 'string') {
        data.materials.push(param.lookups.materials);
    } else {
        data.materials = param.lookups.materials;
    }


    if (param.sortParams && param.sortParams.length > 0) {
        data.sortParams = [];

        param.sortParams.forEach((s) => {
            let str = '';

            Object.keys(s).forEach((obj) => {

                if (str && str.length > 0) {
                    str = str.concat((',' + '"' + obj + '" ' + ':' + '"' + s[obj] + '"'));
                } else {
                    str = '"' + obj + '" ' + ':' + '"' + s[obj] + '"';
                }
            });
            data.sortParams.push(str);
        })
    }

    // let products = window.btoa(JSON.stringify({sortParams :param.sortParams}));

    // data = {products, ...data};

    // let decode = JSON.parse(window.atob(products));

    // let dObj = {...decode}

    router.push({
        name: route.query.name,
        query: data,
    });
};

// data formating from route query
const formateRouteData = (param) => {
    defaultPaginationParams.page = Number(param.page) ? Number(param.page) : 1;
    defaultPaginationParams.size = Number(param.size) ? Number(param.size) : 20;
    defaultPaginationParams.query = param.query;
    // defaultPaginationParams.categories = [];

    // set categories
    if (param.categories && typeof (param.categories) == 'string') {
        defaultPaginationParams.categories.push(param.categories);
        setCategories(defaultPaginationParams.categories);
    } else if (param.categories && param.categories.length > 0) {
        defaultPaginationParams.categories = [...param.categories];
        setCategories(defaultPaginationParams.categories);
    } else if (param.categories) {
        defaultPaginationParams.categories = param.categories;
        setCategories(defaultPaginationParams.categories);
    }


    // set options
    if (param.Color && typeof (param.Color) == 'string') {
        defaultPaginationParams.attributes.Color.push(param.Color);
        setAttributes(defaultPaginationParams.attributes.Color);
    } else if (param.Color && param.Color.length > 0) {
        defaultPaginationParams.attributes.Color = [...param.Color];
        setAttributes(defaultPaginationParams.attributes.Color);
    } else if (param.Color) {
        defaultPaginationParams.attributes.Color = param.Color;
        setAttributes(defaultPaginationParams.attributes.Color);
    }

    if (param.Size && typeof (param.Size) == 'string') {
        defaultPaginationParams.attributes.Size.push(param.Size);
        setAttributes(defaultPaginationParams.attributes.Size);
    } else if (param.Size && param.Size.length > 0) {
        defaultPaginationParams.attributes.Size = [...param.Size];
        setAttributes(defaultPaginationParams.attributes.Size);
    } else if (param.Size) {
        defaultPaginationParams.attributes.Size = param.Size;
        setAttributes(defaultPaginationParams.attributes.Size);
    }

    if (param.BabyAge && typeof (param.BabyAge) == 'string') {
        defaultPaginationParams.attributes.BabyAge.push(param.BabyAge);
        setAttributes(defaultPaginationParams.attributes.BabyAge);
    } else if (param.BabyAge && param.BabyAge.length > 0) {
        defaultPaginationParams.attributes.BabyAge = [...param.BabyAge];
        setAttributes(defaultPaginationParams.attributes.BabyAge);
    } else if (param.BabyAge) {
        defaultPaginationParams.attributes.BabyAge = param.BabyAge;
        setAttributes(defaultPaginationParams.attributes.BabyAge);
    }


    // set lookups
    if (param.fit && typeof (param.fit) == 'string') {
        defaultPaginationParams.lookups.fit.push(param.fit);
        setlookups(defaultPaginationParams.lookups.fit);
    } else if (param.fit && param.fit.length > 0) {
        defaultPaginationParams.lookups.fit = [...param.fit];
        setlookups(defaultPaginationParams.lookups.fit);
    } else if (param.fit) {
        defaultPaginationParams.lookups.fit = param.fit;
        setlookups(defaultPaginationParams.lookups.fit);
    }

    // lookups


    let parseSortParams = [];

    if (param.sortParams && typeof (param.sortParams) == 'string') {

        let srt = JSON.parse('{' + param.sortParams + '}');
        parseSortParams.push(srt);

        defaultPaginationParams.sortParams = parseSortParams;

    } else if (param.sortParams && param.sortParams.length > 0) {

        param.sortParams.forEach((s) => {
            parseSortParams.push(JSON.parse('{' + s + '}'));
        });

        defaultPaginationParams.sortParams = parseSortParams;

    }

    return defaultPaginationParams;
};

// read route queries and then call service
const readRouteData = async () => {
    let query = formateRouteData(route.query);

    await updateData(query);
    // await updatePage(query.page);
};

// checking route hae any query or fresh loading page
const generic = async (param) => {

    if (route.query && route.query.routeBehavior && Boolean(route.query.routeBehavior) && !route?.query?.isWatcher) {
        readRouteData();
    } else {
        let res = await updateData(param);

        if (res.status == 200) updateRouteData(param)
    }
};

onMounted(() => {
    if (!route.query.query) {
        generic(defaultPaginationParams);
    }
});

// watch route for outside filtering
watch(() => route.query, ()=> {
    if(route?.query?.isWatcher) {
        if(route.query.query) {
            defaultPaginationParams.page = 1;
            defaultPaginationParams.categories = [];
            defaultPaginationParams.query = route.query.query;
        }
        
        if(route.query.categories) {
            defaultPaginationParams.page = 1;
            defaultPaginationParams.query = "";
            defaultPaginationParams.categories = route.query.categories;
        }
        generic(defaultPaginationParams);
    }
}, {immediate: true, deep: true});


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