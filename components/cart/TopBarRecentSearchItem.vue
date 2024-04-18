<template>
    <a v-if="item && !item.isLoading" class="rounded-6" style="cursor: pointer;" @click.prevent="goToDetail">  
        <h5 class="text-black fs-4 fw-7 c-title ">{{ title }}</h5>
    </a>

    <a v-else class="rounded-6" style="cursor: pointer;">  
        <h5 class="text-black fs-4 fw-7 c-title ">
            <Skeletor width="100px" height="15px" class="" style="border-radius: 5px"/>      
        </h5>
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
        name: 'shop',
        query: {
			query: title.value,
			routeBehavior: true,
			isWatcher: true,
		}
    });

    // query=sa&routeBehavior=true&isWatcher=true
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