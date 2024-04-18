<template>
    <div>
        <Banner title="Our Story"/>
        <div v-if="data?.text?.length" class="container-xl my-5 about-us-container" v-html="data?.text"></div>
        <div v-else class="container-xl my-5 privacy-container">
            <p class="pt-2 text-center">
                Currently No Content Given
            </p>
        </div>
    </div>
</template>

<script setup>
import Banner from '@/views/commons/Banner.vue';
import { usePagesContentStore } from "@/stores/pages-content-store";

const pagesContentStore = usePagesContentStore();

const data = computed(() =>{
    if (pagesContentStore?.pagesContents?.length) {
        return pagesContentStore?.pagesContents.find(i => i.title == 'Our Story');
    }
    return null;
});
</script>

<style lang="scss" scoped>
.about-us-container {
    font-size: 1.225rem !important;
}
</style>