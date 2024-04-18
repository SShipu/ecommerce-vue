<template>
    <div class="card w-100 mx-1">
        <a 
            :href="itemLink"
            class="rounded-6 card-img-top bg-image h-40vh d-flex justify-content-center align-items-end text-center" 
            :style="{backgroundImage: `url('${item?.extras?.image}')`}"
        >
            <div class="overlay"></div>
            <!-- <div class="d-flex flex-column align-items-center mb-3">
                <span class="fs-3 fw-bold text-white shadow bg-text">{{title}}</span>
            </div> -->

            <div 
                class=" position-absolute d-flex flex-column align-items-center mb-3" 
                style="z-index: 200; width: 100%;"
                @click.prevent="router.push({name: 'collections', query: {collection: item?.title, collectionId: item?.id}})"
            >
                <span class="cdz-banner-desc  fw-bold text-white shadow bg-text">{{ title }}</span>
            </div>
        </a>
    </div>
</template>

<script setup>
import { useItemDto } from '~/composables/useItemDto';

const props = defineProps({
    item: {
        type: [String, Object],
        default: null
    }
});
const router = useRouter();
const itemRef = toRef(props, 'item');
const { id, primaryImageUrl, title } = useItemDto(itemRef);


const colors = ref([
    "#A58282",
    "#F7F9B7",
    "#9ED484",
    "#9FE0E4",
    "#7A8FD8"
])
const itemLink = computed(() => {
    
    let link = "#";
    // let name = props.type ? props.type : "";
    let title = props.item?.title?.length ? props.item.title : "";
    let id = props.item && props.item.id ? props.item.id : "";
    // if (id) {
    //     link = `/${name}/details?id=${id}`;
    // }
    link = `/collections?collectionId=${id}&collection=${title}`;
    return link;
});
</script>

<style lang="scss" scoped>
.cdz-banner-desc {
    //   bottom: 15px;
    padding: 10px 20px;
    // background-color: rgba(255, 255, 255, .7);
    background-color: #ffff;
    border-radius: 10px;
    color: #282828 !important;
    text-align: center !important;
    width: 150px;
    margin: 0 auto;
    opacity: 1;
    font-size: 16px;
    text-transform: uppercase;

    @media screen and (max-width: 700px) {
        width: 90%;
        font-size: 12px;
    }
}
.card-tag {
    top: 20px;
    left: 20px;
}

.colors-container {
    .each-color {
        width: 20px;
        height: 20px;
    }
}

.card {
    a:hover {
        .overlay {
            position: absolute;
            z-index: 10;
            background: rgba(0,0,0,.3);
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
}
</style>