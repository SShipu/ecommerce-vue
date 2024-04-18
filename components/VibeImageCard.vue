<template>
    <div class="card mb-0 w-100">
        <a :href="itemLink" class="card-img-top bg-image h-60vh d-flex justify-content-center align-items-end"
            :style="{ backgroundImage: `url('${item.url}')` }" 
            @click.prevent="
                router.push({
                    name: 'collections', 
                    query: { collection: item?.fields?.collectionTitle, collectionId: item?.fields?.url }
                })
            "
        >
            <div class="overlay"></div>
            <div class="w-100 d-flex flex-column align-items-center mb-3 button-container" style="z-index: 200;bottom: 7%">
            </div>
        </a>
    </div>
</template>

<script setup>

const props = defineProps({
    item: {
        type: [String, Object],
        default: null
    }
});

const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}

const itemRef = toRef(props, 'item');
const itemLink = computed(() => {
    
    // let link = "#";
    // link = `/shop`;
    // return link;
});
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
.card {

    a:hover {
        .overlay {
            position: absolute;
            z-index: 10;
            background: rgba(0, 0, 0, .3);
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
}

.button-container {
    display: none;

    button {
        color: black;

        &:first-child {
            color: white;
        }

        &:hover {
            color: black !important;
        }
    }
}
</style>