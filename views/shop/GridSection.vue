<template>
    <div class="grid-section-container row" v-if="!loading && items.length">
        <div v-for="(item, i) in items" :key="i" class="col-md-6 col-sm-6 col-6" :class="{'col-xl-4 col-lg-4': showFilter, 'col-xl-3 col-lg-3': !showFilter}">
            <ItemCard :item="item"/>
        </div>
		
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 grid-pagination">
            <v-pagination 
              v-show="totalPages > 1" 
              v-model="currentPage" 
              :pages="Math.ceil(totalPages)" 
              :range-size="0"
              active-color="#000" 
              @update:modelValue="onUpdatePage(currentPage)" 
            />
        </div>
    </div>

    <div class="grid-section-container" v-else-if="loading">
        <div class="row grid-child">
            <div v-for="(item, i) in 20" :key="i" class="col-md-6 col-sm-6 col-12" :class="{'col-xl-4 col-lg-4': showFilter, 'col-xl-3 col-lg-3': !showFilter}">
                <ItemShimmer />
            </div>
        </div>
    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showFilter: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["on-update-page"]);
const itemsRef = ref([]);
const currentPage = ref(1);
const pageSize = ref(20); // this value will be set from request size

watch(
  () => props.items,
  () => {
    if (props.items?.length > 0) {
		let arrayOfObject = [];
		
		props.items.forEach((item) => {
			if (item?.id?.length > 0) {
				if (arrayOfObject.filter((i) => i.id == item.id).length <= 0) {
					arrayOfObject.push(item);
				}
			}
		});

		itemsRef.value = arrayOfObject;
    }
  }
);


const onUpdatePage = (page) => {
  	emit("on-update-page", page);
};
</script>

<style lang="scss">

.grid-section-container {
	padding: 20px 20px;
	border-top: 1px solid #e6e6e6;

	.grid-pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		.Page {
			height: 47px;
			width: 47px;
			font-weight: 700;
			border-radius: 10px;
			margin-right: 10px;
			box-shadow: 0px 2px 8px 0px #e6e6e6;
		}
		.Page-active {
			height: 40px !important;
			width: 40px !important;
			color: #fff;
			font-size: 18px;
			font-weight: 700;
			border-radius: 100%;
			background-color: #aeaeae !important;
		}
	}
}

@media screen and (min-width: 768px) and (max-width: 991px) {
	.grid-section-container {
		padding: 20px 20px;
	}
}
@media screen and (min-width: 0px) and (max-width: 767px) {
	.grid-section-container {
		padding: 0px 0px 30px;
		.grid-pagination {
			display: flex;
			justify-content: center;
			align-items: center;
			row-gap: 15px;
			.Page {
				height: 30px;
				width: 30px;
				font-weight: 700;
				border-radius: 10px;
				margin-right: 10px;
				box-shadow: 0px 2px 8px 0px #e6e6e6;
			}
			.Page-active {
				color: #fff;
				font-size: 18px;
				font-weight: 700;
				border-radius: 100%;
			}
		}
	}
}
</style>
