<template>
    <div class="my-5">
        <SectionHeaderSlider title="Similar to this Product"/>
        <div class="row">
            <div 
                class="col-12 col-lg-3 col-md-4 col-sm-6 col-sm-6 col-xs-6"
                v-for="(item, i) in items" 
                :key="i"
            >
                <ItemCard :item="item"/>
            </div>
        </div>
    </div>
</template>

<script setup>

const items = ref([
    {
        title: 'Babies',
        img: '/images/home/c-1.png',
    },
    {
        title: 'Boys',
        img: '/images/home/c-2.png',
    },
    {
        title: 'Girls',
        img: '/images/home/c-3.png',
    },
    {
        title: 'Accessories',
        img: '/images/home/c-4.png',
    },
])
</script>

<style lang="scss" scoped>


</style>