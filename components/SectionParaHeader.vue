<template>
    <div class="container d-flex justify-content-center my-2">
        <div class="d-flex flex-column align-items-center">
            <h1 class="">{{title}}</h1>
            <p class="text-center w-75">{{subTitle}}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    subTitle: {
        type: String,
        default: "",
    }
})
</script>

<style lang="scss" scoped></style>