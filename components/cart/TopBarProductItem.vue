<template>
    <a v-if="item && !item.isLoading" class="rounded-6" style="cursor: pointer;" @click.prevent="goToDetail">  
        <div class="d-flex flex-row">
            <img :src="primaryImageUrl" alt="" style="width: 100px; height: 120px; border-radius: 10px;">
            
            <div class=" d-flex flex-column align-items-center">
                <h5 class="text-black fs-5 text-center mt-4 ms-2 -title">{{ title }}</h5>
            </div>
        </div>
    </a>

    <a v-else class="rounded-6" style="cursor: pointer;">  
        <div class="d-flex flex-row">
            <Skeletor width="100px" height="120px" class="" style="width: 100px; height: 120px; border-radius: 10px;"/>
            <div class=" d-flex flex-column align-items-center">
                <h5 class="text-black fs-5 text-center mt-4 ms-1 -title">
                    <Skeletor width="100px" height="15px" class="" style="border-radius: 5px"/>    
                    <Skeletor width="80px" height="15px" class="mt-2" style="border-radius: 5px"/>    
                </h5>
            </div>
        </div>
    </a>
</template>

<script setup>
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
import { useItemDto } from '~/composables/useItemDto';

const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
        default: null
    },
});

const itemRef = toRef(props, 'item');
const { id, primaryImageUrl, title, price, discountedSalesPrice, subscriptionPrice } = useItemDto(itemRef);

const emits = defineEmits(['close'])

const goToDetail = () => {
    router.push({
        name: 'detail',
        query: {id: id.value}
    });

    emits('close');
}
</script>

<style lang="scss" scoped>
.c-title {
    &:hover {
        color: #2277e0 !important;
    }
}
</style>