<template>
    <div>
        <section class="container-fluid">
            <ItemList 
                class="mx-1 mx-sm-1 mx-md-1 mx-lg-1 mx-xl-5 mx-xxl-5 my-1" 
                :items="relatedProducts"
                type="Similar"
                title="Similar to this Product" 
                :loading="isLoading"
            />
        </section>

        <ReviewSection class="mx-0" />

        <section class="container-fluid">
            <ItemList 
                class="mx-1 mx-sm-1 mx-md-1 mx-lg-1 mx-xl-5 mx-xxl-5 my-1" 
                :items="relatedFeaturedProducts"
                type="Recommended"
                title="We Also Recommend" />
        </section>
    </div>
</template>

<script setup>
import ReviewSection from "@/views/detail/ReviewSection.vue";

import { itemsV2Client, itemsClient, itemsV3Client } from '~/libs/gandalf/apis/config';

const props = defineProps({
    itemId: {
        type: String,
        required: true
    }
})

const route = useRoute();

const itemId = ref(route.query && route.query.id && route.query.id.length > 0 ? route.query.id : "");
const isLoading = ref(false);
const item = ref(null);
const relatedProducts = ref([]);
const relatedFeaturedProducts = ref([]);

const fetchData = async (id) => {
    isLoading.value = true;
    let res = await itemsV2Client.findOne({ id: id.length ? id : route.query.id });
    if (res.networkError) {
        /* TODO: show message */
        return;
    }

    if (res.status == 200 && res.body) {
        item.value = res.body;
        await fetchAllRelatedProducts();
        await fetchRelatedItems();
        await fetchAllRelatedFeaturedProducts();
    } else {
        return;
    }
    isLoading.value = false;
};


const setLoading = (numberOfShimmer) => {
    let shimmers = [];

    let length = numberOfShimmer ? numberOfShimmer : 4;
    
    for (let index = 0; index < length; index++) {
        shimmers.push({ isLoading: true });
    }

    return shimmers;
};

const fetchAllRelatedProducts = async () => {
    // relatedProducts.value =  setLoading(4);

    let categoryId = "";

    if (item.value?.categories?.length) {
        categoryId = item.value.categories[0].id;

        let params = {
            textParams: [],
            fetchCount: "true",
            page: 1,
            size: 10,
            nestedParams: [
                {
                    field: "categories.id",
                    value: categoryId,
                    matchType: "COLLECTION_CONTAINS_EXACT",
                    isRelational: true,
                },
            ],
            sortParams: [{ field: "title", type: "ASCENDING" }],
        };
        
        itemsClient
        .search(params)
        .then((res) => {
            // relatedProducts.value = [];
            if (!res.networkError) {
                if (res.status == 200 && res?.body?.list?.length > 1) {
                    relatedProducts.value = res.body.list.filter((p) => p.id != route.query.id);
                }
            } else {
                // relatedProducts.value = setLoading();
                console.log("else related product");
            }
        })
        .catch(async () => {
            console.log("catch related product");
            // relatedProducts.value =  setLoading();
        });
    }
};


const fetchRelatedItems = async (id) => {
    let param = {
        textParams: [],
        page: 1,
        size: 18,
    };

    if (id?.length) {
        param.textParams.push(
            {
                field: 'sourceId',
                value: props.itemId,
                matchType: "EXACT"
            }
        )

        param.textParams.push(
            {
                field: 'sourceType',
                value: 'ITEM',
                matchType: "EXACT"
            }
        )
    }

    // isFetchingRelatedItem.value = true;
   
    let res = await itemsV3Client.fetchRelatedProduct(param);
    // console.log("related product res");
    // console.log(res);
    if (res.status == 200 && !res.networkError) {
        relatedProducts.value = res?.body?.list;
        // totalItems.value = res?.body?.total;
        // currentPage.value = params.page;
        // totalPages.value = Math.round(totalItems.value / 18);
    }
    // isFetchingRelatedItem.value = false;
}


const fetchAllRelatedFeaturedProducts = async () => {
    relatedFeaturedProducts.value =  setLoading(4);

    let categoryId = "";

    if (item.value && item.value.categories && item.value.categories.length > 0) {
        categoryId = item.value.categories[0].id;

        let params = {
            textParams: [{ field: "status", value: "ACTIVE", matchType: "EXACT" }],
            fetchCount: "true",
            featured: "true",
            page: 1,
            size: 10,
            // nestedParams: [
            //     {
            //         field: "categories.id",
            //         value: categoryId,
            //         matchType: "COLLECTION_CONTAINS_EXACT",
            //         isRelational: true,
            //     },
            // ],
            // sortParams: [{ field: "title", type: "ASCENDING" }],
            status: "ACTIVE",
        };
        
        itemsClient
        .search(params)
        .then((res) => {
            if (!res.networkError) {
                if (res.status == 200 && res.body.list && res.body.list.length > 1) {
                    relatedFeaturedProducts.value = res.body.list.filter(
                    (p) => p.id != route.query.id
                    );
                }
            } else {
                relatedFeaturedProducts.value = setLoading();
            }
        })
        .catch(async () => {
            relatedFeaturedProducts.value =  setLoading();
        });
    }
};

watch(()=> route,
    () => {
        if (route.query && route.query.id && route.query.id.length > 0) {
            itemId.value = route.query.id;
            fetchData(route.query.id);
        }
    },
    { immediate: true},{deep: true }
);
</script>

<style lang="scss" scoped></style>