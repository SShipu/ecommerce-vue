<template>
    <div>
        <Head>
            <Title>{{meta.title}}</Title>
            <meta property="og:description" :content="meta.description">
            <meta property="og:image" :content="meta.image">
         </Head>
    </div>
</template>

<script setup>
const props = defineProps({
    meta: {
        type: [Array, Object, String],
        default: () => []
    }
})
</script>

<style lang="scss" scoped>

</style>