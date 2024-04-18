<template>
    <div class="w-100 h-25vh bg-image position-relative d-flex justify-content-center align-items-center banner-container border border-bottom-1">
        <div class="banner-text-container d-flex flex-column align-items-center">
            <h1 class="fs-1">{{item?.title}}</h1>
            <div class="fs-4 m-0 d-flex flex-column align-items-center" v-html="item?.text"></div>
            <!-- <p class="fs-4 m-0">
                Customer care opening hours
            </p>
            <p class="fs-4 m-0">
                Monday-Friday 10am to 6pm (GMT+6)
            </p> -->
        </div>
    </div>
</template>

<script setup>
import { snippetsClient } from '~/libs/gandalf/apis/config';

const props = defineProps({
    title: {
        type: String,
        default: ""
    }
})

const item = ref(null);

const fetchSeason = async () => {
    let params = {
        textParams: [{
            field: 'code',
            value: 'customer-care-header',
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

    let res = await snippetsClient.search(params);

    if (res.status == 200 && !res.networkError && res?.body?.list) {
        item.value = res?.body?.list.sort((x,y) => x.sortOrder - y.sortOrder)[0];
    }
}

onMounted(async () => {
    await fetchSeason();
});
</script>

<style lang="scss" scoped>

.banner-container {
    .banner-text-container {
        color: #fff
    }
}
.bg-image {
    // background-image: url('/images/home/banner.png');
    background-color: #2277E0;
}
.bg-text {
    font-weight: 800; 
    font-family: 'Roboto' sans-serif; 
    font-size: 55px;
}

.bg-btn {
    box-shadow: 0px 3px #2277E0; 
    color: #2277E0
}

@media screen and (max-width: 500px){
    .banner-container {
        .bg-text {
            font-size: 35px;
        }
    }
    
}
</style>