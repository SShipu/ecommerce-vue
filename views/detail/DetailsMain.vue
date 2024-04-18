<template>

    <MetaHead :meta="metaTags"/>
    <section class="container-fluid">
        <div class="mx-1 mx-sm-1 mx-md-1 mx-lg-1 mx-xl-5 mx-xxl-5 my-1">
            
            <span class="" style="color: #6D7482;"> 
                <span @click="goTo('index')" style="cursor: pointer;">Home</span> / 
                <span>{{ categoryName }}</span>
                / <span style="color: #202028; font-weight: 700;">{{ title }}</span></span>
            
            <div class="d-sm-flex flex-column flex-sm-column flex-md-column flex-lg-column flex-xl-row flex-xxl-row my-3">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-7 me-lg-3" >
                    <Galleries 
                        :item="item" 
                        :loading="isLoading"
                        ref="galleries"
                    />
                </div>

                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4">
                    <Description 
                        class="ms-1 ms-sm-1 ms-md-1 ms-lg-2 ms-xl-4 ms-xxl-1"
                        :item="item" 
                        :loading="isLoading"
                        :overviewDetails="overviewDetails"
                        @handleButtonClick="handleButtonClick"
                        :sizeCharts="sizeCharts"
                    />
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { useItemDetailDto } from "~/composables/item-detail/useItemDetailDto";
import Galleries from '@/views/detail/Galleries.vue';
import Description from '@/views/detail/Description.vue';

import { itemsV2Client, itemsV3Client, cmsClient, cmsV2Client, kvpsClient, stocksClient } from '~/libs/gandalf/apis/config';
import { useMetaTagStore } from "~/stores/meta-tag-store";
import MetaHead from '@/views/commons/MetaHead.vue';

const metaTagStore = useMetaTagStore();

const route = useRoute();

const props = defineProps({
    itemId: {
        type: String,
        required: true
    }
})
const router = useRouter();
const goTo = (name) => {
    router.push({name: name})
}
const itemId = ref(route.query && route.query.id && route.query.id.length > 0 ? route.query.id : "");
const isLoading = ref(false);
const item = ref(null);
const loading = ref(false);
const galleries = ref(null);
const metaTagsList = ref([]);

const sizeCharts = ref({
    sizeChartsBody: [],
    sizeChartsHeader: null
});

const overviewDetails = ref([
    {
        title: "Fabric Details: ",
        content: "100% Organic Cotton"
    }
]);

const { title, categoryName } = useItemDetailDto(
    item,
    []
);

const fetchMetaTags = async (id) => {
    // isLoading.value = true;
    let params = {
        textParams: [{
            field: 'type',
            value: `itemId_${id}`,
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
        console.log("tag res");
        console.log(res);
        metaTagsList.value = res?.body?.list;
    }
    // isLoading.value = false;
}

const metaTags = computed(() => {
    let title = "";
    let description = "";
    let image = "";

    if (metaTagsList.value) {
        let descriptionMeta = metaTagsList.value.filter(i => i?.fields?.page && i?.fields?.page == 'description');
        if (descriptionMeta.length) {
            title = descriptionMeta[0]?.title;
            description = descriptionMeta[0]?.fields?.description;
            image = descriptionMeta[0]?.fields?.image;
        }
    }

    return {
        title: title,
        description: description,
        image: image,
    };
});

watch(metaTags,() => {
    if (metaTags.value?.title?.length) {
        useSeoMeta({
            title: metaTags.value?.title,
            ogTitle: metaTags.value?.title,
            description: metaTags.value?.description,
            ogDescription: metaTags.value?.description,
            ogImage: metaTags.value?.image,
        })
    }
},{deep: true})
const fetchStocks = async (id) => {
    // isLoading.value = true;
    let params = {
        textParams: [
            {
                'field': 'itemId',
                'value': id,
                'matchType': 'EXACT',
            }
        ],
        page: 1,
        size: 100
    }
    let pageToken = "";
    let stockList = [];

    do {
        let stockRes = await stocksClient.stockSearch(params)

        if (stockRes.status == 200 && !stockRes.networkError && stockRes?.body?.list?.length) {
            stockList = stockList.concat(stockRes.body.list);
            if (stockRes?.body?.nextPageToken?.length) {
                pageToken = stockRes.body.nextPageToken;
                params.page++
            }
        }

    } while (pageToken.length);

    // isLoading.value = false;
    return stockList;
};

const fetchData = async (id) => {
    isLoading.value = true;

    // let res = await itemsV2Client.findOne({ id: id.length ? id : props.itemId });
    let res = await itemsV3Client.findOneJoin({ id: id, fetchSkus: true });

    if (res.networkError) {
        /* TODO: show message */
        return;
    }

    if (res.status == 200 && res.body) {
        // item.value = res.body;
        let itemBody = res.body;
        let categories = itemBody?.categories?.length ? itemBody.categories.map(i => i.category) : [];
        let collections = itemBody?.collections?.length ? itemBody.collections.map(i => i.collection) : [];
        let stocks = await fetchStocks(id);
        item.value = {
            ...itemBody.item,
            categories: categories,
            lookups: itemBody.lookups,
            keywords: itemBody.keywords,
            images: itemBody.attachments,
            skus: itemBody.skus,
            collections: collections,
            stocks: stocks
        }
        
        await fetchArticles();
        // await fetchDescription();
        // await fetchSizeCharts()
    } else {
        return;
    }

    isLoading.value = false;
};

// const fetchSizeCharts = async (id) => {
//     let params = {
//         textParams: [
//             {
//                 field: 'type',
//                 value: `itemId_${itemId.value}`,
//                 matchType: 'EXACT',
//             }
//         ],
//         nestedParams: [],
//         sortParams: [
//             {
//                 field: 'title',
//                 type: 'ASCENDING',
//             },
//         ],
//         page: 1,
//         size: 100,
//     };

//     let res = await kvpsClient.search(params);

//     if (res.status == 200 && !res.networkError && res?.body?.list?.length) {
//         // console.log("res");
//         // console.log(res);
//         let charts = res?.body?.list.filter(i => i.title == "Size Chart" && i.type == `itemId_${itemId.value}`);
//         // console.log({charts});
//         if (charts.length) {
//             sizeCharts.value.sizeChartsBody = JSON.parse(charts[0].fields?.chartsBody);
//             sizeCharts.value.sizeChartsHeader = JSON.parse(charts[0].fields?.chartsHeader);
//             // console.log("~~~~~~~~~~~~~~~sizeCharts");
//             // console.log(sizeCharts);
//         }
//     }
// }


const fetchArticles = async () => {
    let req = {
        textParams: [
            {
                field: 'itemId',
                value: itemId.value,
                matchType: 'EXACT'
            }
        ],
        page: 1,
        size: 10
    }
    
    let res = await cmsV2Client.fetchArticles(req);

    if (res.status == 200 && !res.networkError) {
        if (res?.body?.list?.length) {
            let hasChart = res?.body?.list.filter(i => i.type == "size-chart");
            if (hasChart.length) {
                let chart = JSON.parse(hasChart[0].content)
                sizeCharts.value.sizeChartsBody = chart.chartsBody;
                sizeCharts.value.sizeChartsHeader = chart.chartsHeader;
                // console.log("~~~~~~~~~~~~~~~sizeCharts");
                // console.log(sizeCharts);
            }

            // console.log("res?.body?.list?.length");
            let hasDescription = res?.body?.list.filter(i => i.type == "description");
            if (hasDescription.length) {
                let description = JSON.parse(hasDescription[0].content);
                overviewDetails.value = description;
                // console.log("~~~~~~~~~~~~~~~overviewDetails");
                // console.log(description);
            }
            // overviewDetails.value = res.body.list.filter(a => a.type != 'short-description')[0]?.content;
        }
    }
};

const handleButtonClick = (e) => {
    // // console.log(galleries.value.ClickCart(e));
}

watch(()=> props.itemId,
    () => {
        if (props.itemId?.length > 0) {
            itemId.value = props.itemId;
            fetchData(props.itemId);
            fetchMetaTags(props.itemId);
        }
    },
    { immediate: true},{deep: true }
);

// watch(()=> route,
//     () => {
//         if (route.query && route.query.id && route.query.id.length > 0) {
//             itemId.value = route.query.id;
//             fetchData(route.query.id);
//         }
//     },
//     { immediate: true},{deep: true }
// );
</script>

<style lang="scss" scoped>
</style>