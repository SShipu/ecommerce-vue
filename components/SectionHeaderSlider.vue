<template>
    <div class="d-flex justify-content-between my-1">
        <div class="d-flex justify-content-center align-items-center">
            <h2 class="">{{title}}</h2>
        </div>
        <div class="d-flex justify-content-between my-1">
            <div class="slider-sec prev-btn rounded-circle d-flex justify-content-center align-items-center mx-1" @click.prevent="$emit('prev')">
                <i class="fa fa-chevron-left fa-lg"></i>
            </div>
            <div class="slider-sec next-btn rounded-circle d-flex justify-content-center align-items-center mx-1" @click.prevent="$emit('next')">
                <i class="fa fa-chevron-right fa-lg"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "",
    }
})
</script>

<style lang="scss" scoped>

.slider-sec {
    &:hover {
        background-color: #2277E0;
        color: #fff;
    }
}
.prev-btn {
    width: 44px;
    height: 44px;
    background-color: #EEEFF5;
}

.next-btn {
    width: 44px;
    height: 44px;
    background-color: #EEEFF5;
}
</style>