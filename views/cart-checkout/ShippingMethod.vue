<template>
    <div class="">
        <!-- <div class="border border-1 rounded-3 mt-3 overflow-hidden">
            <div class="px-4">
                <div class="row py-2 border-bottom">
                    <div class="col-2">Email</div>
                    <div class="col-8 text-center">{{ data.address.email }}</div>
                    <div class="col-2 text-end" style="cursor: pointer;" @click.prevent="goTo('informations')">Change</div>
                </div>
                <div class="row py-2">
                    <div class="col-2">Ship to</div>
                    <div class="col-8 text-center">{{ shortAddress }}</div>
                    <div class="col-2 text-end" style="cursor: pointer;" @click.prevent="goTo('informations')">Change</div>
                </div>
            </div>
        </div> -->

        <!-- payment Informations -->
        <div class="d-flex justify-content-between align-items-center mt-3 mb-2">
            <h4 class="m-0">Shipping Location</h4>
            <!-- {{ shippingCost }} -->
        </div>
        <div class="border border-1 rounded-3 overflow-hidden">

            <div class="my-0">
                <div class="border-bottom px-2 py-1 d-flex align-items-center">
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPickingLocation"
                        :name="'location'"
                        :value="'INSIDE_DHAKA'" 
                        :id="'INSIDE_DHAKA'" 
                        label="Inside Dhaka" 
                    />
                    <p class="m-0">(Delivery Time: 1-3 days)</p>
                </div>

                <div class="px-2 py-1 d-flex align-items-center">
                    <!-- {{ payment }} -->
                    <BaseRadio  
                        circle 
                        v-model="data.selectedPickingLocation"
                        :name="'location'"
                        :value="'OUT_SIDE_DHAKA'" 
                        :id="'OUT_SIDE_DHAKA'" 
                        label="Outside Dhaka" 
                    />
                    <p class="m-0">(Delivery Time: 3-7 Days)</p>
                </div>
            </div>
        </div>
        <!-- <Payment /> -->
    </div>
</template>

<script setup>
import { useVModel } from '~~/libs/fuel-station/useVModel';
import { useCartStore } from '~~/stores/cart';
import Payment from '@/pages/payment.vue';

const cartStore = useCartStore();
const props = defineProps({
    modelValue: {
        type: Object,
        default: null
    }
});
const router = useRouter();

const goTo = (name) => {
    router.push({name: name})
}
const emits = defineEmits(['update:modelValue']);
const data = useVModel(props, emits, 'modelValue');

const outsideDhaka = ref(150);
const insideDhaka = ref(70);

const shippingCost = computed(() => {
    let cost = 0; 
    switch (data.value?.selectedPickingLocation) {
        case "INSIDE_DHAKA":
            cost = insideDhaka.value;
            break;
    
        case "OUT_SIDE_DHAKA":
            cost = outsideDhaka.value;
            break;
    }
    return cost;
});

watch(data, () => {
    // if (data.value.selectedPickingLocation == 'INSIDE_DHAKA') {
    //     cartStore.addShippingCost(insideDhaka.value)
    // } else if (data.value.selectedPickingLocation == 'OUT_SIDE_DHAKA') {
    //     cartStore.addShippingCost(outsideDhaka.value)
    // };
    cartStore.addShippingCost(shippingCost.value)
}, {deep: true});

const shortAddress = computed(() => {
    if(data.value.address) {
        return data.value.address.street + ', ' + data.value.address.city + ', ' + data.value.address.zip + ', ' + data.value.address.country;
    }

    return ''
});

const pickPoint = computed(() => {
    if(data.value.selectedPickingLocation && data.value.selectedPickingLocation == 'INSIDE_DHAKA') {
        return 'Dhaka'
    } else if(data.value.selectedPickingLocation && data.value.selectedPickingLocation == 'OUT_SIDE_DHAKA') {
        return 'Out side Dhaka'
    }

    return ''
})



// const fetchDeliveryCharge = async () => {
//     ecommerceClient.fetchDeliveryCharge({size: 10}).then((res)=> {
//         if (res.status == 200 && !res.networkError) {
//             if (res.body && res.body.list && res.body.list.length > 0) {
//                 // data.value = res.body.list;
//                 res.body.list.forEach(element => {
//                     if (element.id == insideDhakaId.value) {
//                         insideDhaka.value = element.charge
//                     }
//                     if (element.id == outsideDhakaId.value) {
//                         outsideDhaka.value = element.charge
//                     }
//                 });
//             }
//         }
//     })
// }

// onMounted(async () => {
//    await fetchDeliveryCharge();
// })
</script>

<style lang="scss" scoped>
.edit-mode {
    cursor: pointer;
    text-decoration: underline;
}

.hav_account {
    font-size: 16px;
    font-weight: 700;

    a {
        cursor: pointer;
        &:hover {
            color: #2277e0;
        }
    }
}
</style>