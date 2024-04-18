<template>
    <div class="row">
        <div class="col-12 text-center">
            <span style="font-size: 12em;" class="fw-bold">404</span>
        </div>

        <div class="col-12 text-center">
            <span class="fs-2">OOPS! {{ caption }} NOT FOUND</span>
        </div>

        <div class="d-flex text-center justify-content-center my-2">
            <div class="col-8 col-sm-6 col-lg-4">
                <span class="fs-4" style="color: #556477;">It seems we can’t find what you’re looking for. Perhaps searching can help.</span>
            </div>
        </div>

        <div class=" text-center my-2">
            <div class="col-12" >
                <button  class="rounded-5 btn c-btn-primary fs-5 py-2 px-3" @click.prevent="goTo('index')">Back to Homepage</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    caption: {
        type: String,
        default: 'PAGE'
    }
})
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
</script>

<style lang="scss" scoped>
.c-btn-primary {
    background-color: #fff;
    color: #2277E0 !important;
    border-radius: 35px !important;
    font-weight: 700 !important;
    border: 1px solid #2277E0;

    &:hover {
        color: #fff !important;
        font-weight: 700 !important;
        background-color: #2277E0;
    }
}
</style>