<template>
    <div class="h-100 mx-1 position-relative fade-in col-lg-1 col-md-2 col-sm-2 col-xs-3 col-3">
            <!-- {{ itemRef }} -->
        <img :src="productImage" style="height: 100px; width: 100%;" class="img-fluid rounded-6" alt="...">
        <p class="fs-7 text text-justify m-0">{{ title }}</p>
        <p class="fs-7 text text-justify m-0">{{ productSize }}
            <!-- <span v-if="productColor.length">{{ ', ' + productColor }}</span> -->
        </p>
        <div 
            class="position-absolute card-tag bg-black d-flex justify-content-center align-items-center top-0 right-0"
            style="border-radius: 90px; height: 20px; width: 20px; right: 0;"
        >
            <span style="color: #ffff; font-weight: 600;">
                {{ quantity }}
            </span>
        </div>
        <!-- <img
            :src="productImage"
            alt="products"
            class="img-fluid rounded-6"
            style="height: 100px; width: 100px;"
        /> -->
    </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { useCartItemDto } from "@/composables/cart/useCartItemDto";
import skuUtils from "@/composables/sku-utils";

const cartStore = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});

const toaster = ref(null);

const itemRef = toRef(props, 'item');
const {
    id,
    productImage,
    name,
    productAttributes,
    productSize,
    productColor,
    productPrice,
    productQuantity,
    productSubtotal } = useCartItemDto(itemRef);

const quantity = ref(0);

const selectedTotalQuantity = computed(() => {
    if (props.item) {
        return skuUtils.skuTotalQuantity(
            props.item.product,
            props.item.sku,
            'LOLY2UVD-1HBTY4ZESF7YX--197IBCC0D3AIK'
        );
    }
    return 0;
});

const title = computed(() => {
    if (name.value) {
        return name.value.length > 17 ? name.value.slice(0, 16) + '...' : name.value;
    }
    return 0;
});

if (productQuantity.value) {
    quantity.value = productQuantity.value;
}

// methods start here
const onIncreaseQuantity = async () => {

    if (Number(selectedTotalQuantity.value) > Number(productQuantity.value)) {

        cartStore.increase(itemRef.value);
        toaster.value.success(`Item added`, 1500);

    } else {
        toaster.value.error(`No more Stock`, 1500);
        // will show toast
    }
};

const onDecreaseQuantity = async () => {
    if (Number(productQuantity.value) > 1) {
        cartStore.decrease(props.item);
        // toaster.value.success(`Item added`, 1500);
        toaster.value.success(`Item remove`, 1500);
    } else {
        toaster.value.error(`Item Not Remove`, 1500);
        // will show toast
    }
    // cartStore.decrease(props.item);
    // toaster.value.success(`Item remove`, 1500);
};

const goToDetailPage = () => {
    router.push({
        name: "products",
        query: {
            id: id.value,
        },
    });
};

watch(
    cartStore,
    () => {
        quantity.value = productQuantity.value;
    },
    { immediate: true },
    { deep: true }
);

</script>

<style lang="scss" scoped>

.num_count {
    width: 120px;
    height: 40px;
    -webkit-box-shadow: 0px 1px 10px 5px #f4f4f4;
    box-shadow: 0px 1px 10px 5px #f4f4f4;
    position: relative;
    border-radius: 35px;
    border: 1px solid #2277E0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
    
.num_count input {
    width: 50px;
    text-align: center;
    margin: 0 auto;
    border: none;
    font-size: 18px;
    font-weight: 700;
}

.num_count button {
    padding: 0;
    i {
        font-size: 14px;
    }
}

.num_count .minus {
    left: 0px;
    display: flex;
    cursor: pointer;
    color: #1f2230;
    position: absolute;
    height: inherit;
    width: 35px;
    text-align: center;
    border-right: 1px solid #2277E0;
}

.num_count button,
.num_count button:focus {
    width: 100%;
    border: none;
    -webkit-box-shadow: none;
            box-shadow: none;
    font-size: 20px;
}

.num_count .add {
    position: absolute;
    display: flex;
    right: 0px;
    cursor: pointer;
    width: 35px;
    height: inherit;
    color: #1f2230;
    border-left: 1px solid #2277E0;
}

.num_count .minus button {
    text-align: center;
}

.num_count .add button {
    text-align: center;
}
.c-remove-section {
    cursor: pointer;

    .c-trash {
        font-size: 18px !important;
        
        color: red;
        font-weight: 400 !important;

    }
    .c-remove-text {
        font-size: 16px !important;
        color: #2277E0;
    }

    &:hover {
        .c-trash {
            color: #2277E0;
        }
        .c-remove-text {
            color: red;
        }
    }
}

</style>