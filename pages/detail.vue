<template>
    <main>
        <DetailsMain :itemId="itemId"/>
        <DetailsBottom :itemId="itemId" />
    </main>
</template>

<script setup>
import DetailsMain from "@/views/detail/DetailsMain.vue";
import DetailsBottom from "@/views/detail/DetailsBottom.vue";

const route = useRoute();
const router = useRouter();
const itemId = ref("");

const scrollToTop = () => {
    if(process.client) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
};

watch(()=> route,
    () => {
        if (route.query?.id?.length) {
            itemId.value = route.query.id;
            // fetchData(route.query.id);
        }
    },
    { immediate: true},{deep: true }
);

onMounted(() => {
    scrollToTop();
})
</script>

<style lang="scss" scoped>
</style>