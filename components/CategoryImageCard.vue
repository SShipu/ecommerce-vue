<template>
    <div class="card mb-0 w-100">  
        <a  :href="itemLink" 
            class="card-img-top bg-image h-40vh d-flex justify-content-center align-items-end" 
            :style="{backgroundImage: `url('${categoryImage(item)}')`}"
            @click.prevent="router.push({
                name: 'shop',
                query: {
                    category: item.name, 
                    categoryId: item.id
                }
            })"
        >
            <!-- @click.prevent="navigateTo({
                path: '/shop',
                query: {
                    routeBehavior: true,
                    categories: [item.name]
                }
            })" -->
            <!-- <div class="overlay"></div>
            <div class="d-flex flex-column align-items-center mb-3" style="z-index: 20;">
                <span class="fs-3 fw-bold text-white shadow bg-text">{{item.name}}</span>
            </div> -->
            <div class="overlay"></div>
            <div class=" position-absolute w-100 d-flex flex-column align-items-center mb-3" style="z-index: 200;bottom: 7%">
                <span class="cdz-banner-desc fw-bold text-white shadow bg-text">{{item.name}}</span>
            </div>
        </a>
    </div>

    <!-- <div class="card mb-0 w-100">  
        <a  :href="itemLink" 
            class="card-img-top position-relative" 
            @click.prevent="navigateTo({
                path: '/shop',
                query: {
                    routeBehavior: true,
                    categories: [item.name]
                }
            })"
        >
            <img :src="categoryImage(item)" class="img-fluid w-100 category_image" />
            <div class="overlay"></div>
            <div class=" position-absolute w-100 d-flex flex-column align-items-center mb-3" style="z-index: 200;bottom: 7%">
                <span class="cdz-banner-desc  fw-bold text-white shadow bg-text">{{item.name}}</span>
            </div>
        </a>
    </div> -->
</template>

<script setup>
import { useItemDto } from '~/composables/useItemDto';
const router = useRouter();
const props = defineProps({
    item: {
        type: [String, Object],
        default: null
    }
});

const showOverlay = ref(false);
const itemRef = toRef(props, 'item');
const { id, primaryImageUrl, title } = useItemDto(itemRef);
const categoryImage = (item) => {
    // console.log("item");
    // console.log(item);

    if(item && item?.extras?.thumbnail_image_url?.length) {
        return item?.extras?.thumbnail_image_url;
    }
    return '/images/home/c-1.png';
}

const itemLink = computed(() => {
    
    let link = "#";
    let name = props.item && props.item.name ? props.item.name : "";
    let id = props.item && props.item.id ? props.item.id : "";
    // if (id) {
    //     link = `/${name}/details?id=${id}`;
    // }
    link = `/shop?category=${name}&categoryId=${id}}`;
    return link;
});


const colors = ref([
    "#A58282",
    "#F7F9B7",
    "#9ED484",
    "#9FE0E4",
    "#7A8FD8"
])
</script>

<style lang="scss" scoped>

    .card-img-top {
        border-radius: 0px !important;
    }
    .category_image {
        height: 50vh;
    }
    
    @media screen and (max-width: 699px) {
        .category_image {
            height: 32vh;
        }
    }
.cdz-banner-desc {
//   bottom: 15px;
    padding: 10px 40px;
//   background-color: rgba(255, 255, 255, .7);
    background-color: #ffff;
    color: #282828 !important;
    text-align: center !important;
    // width: 150px;
    margin: 0 auto;
    opacity: 1;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 35px;
    align-items: center;
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