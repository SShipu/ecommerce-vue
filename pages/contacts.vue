<template>
    <div>
        <Banner />
        <Body :items="items"/>
    </div>
</template>

<script setup>
import Banner from '@/views/contacts/Banner.vue';
import Body from '@/views/contacts/Body.vue';
import { snippetsClient } from '~/libs/gandalf/apis/config';

const items = ref([]);

const fetchSeason = async () => {
    let params = {
        textParams: [{
            field: 'code',
            value: 'customer-care',
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
        console.log({res});
        items.value = res?.body?.list.sort((x,y) => x.sortOrder - y.sortOrder);
    }
}

onMounted(async () => {
    if(process.client) {
        window.scrollTo(0, 0);
    }
    await fetchSeason();
});
</script>

<style lang="scss" scoped>

</style>