<template>
    <ModalBaseModal 
        :title="`${title}'s Size`" 
        :show="show" 
        @close="close()" 
        maxWidth="60%" 
        :modalFooter="false"
        body-style="padding: 0"
    >
        <div class="text-black">
            <!-- <div class="d-flex">
                <div class="w-50 text-center border-bottom border-2 cursor-pointer" :class="{'size-active': sizeTab === 'chart'}" @click.prevent="switchSizeInfo('chart')">
                    <h4 class="my-3">Size Chart</h4>
                </div>
                <div class="w-50 text-center border-bottom border-2 cursor-pointer" :class="{'size-active': sizeTab === 'measure'}" @click.prevent="switchSizeInfo('measure')" >
                    <h4 class="my-3">How to Measure</h4>
                </div>
            </div> -->
            <div class="d-flex flex-column justify-content-center align-items-center text-black mt-3">
                <h3>Body Measurements</h3>
                <p class="text-secondary">Measurements are in inches, unless otherwise noted.</p>
            </div>
            <div class="container-xl table-responsive px-3">
                <!-- <TShirt v-if="type == 'shirts'"/>
                <Pants v-if="type == 'pants'"/>
                <Kurta v-if="type == 'kurta'"/>
                <Joggers v-if="type == 'joggers'"/> -->
                <table class="table table-bordered align-middle text-black" v-if="sizeCharts?.sizeChartsBody?.length">
                    <thead class="" v-if="sizeCharts.sizeChartsHeader">
                        <tr class="">
                            <th>{{sizeCharts.sizeChartsHeader.fieldName1}}</th>
                            <th>{{sizeCharts.sizeChartsHeader.fieldName2}}</th>
                            <th>{{sizeCharts.sizeChartsHeader.fieldName3}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="" v-for="(size, i) in sizeCharts.sizeChartsBody" :key="i">
                            <td>{{size.fieldValue1}}</td>
                            <td>{{size.fieldValue2}}</td>
                            <td>{{size.fieldValue3}}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="text-center my-4">
                    No Charts Available for {{title}} 
                </div>
            </div>
        </div>
    </ModalBaseModal>
</template>

<script setup>
import TShirt from "@/views/detail/size-table/TShirt.vue";
import Pants from "@/views/detail/size-table/Pants.vue";
import Kurta from "@/views/detail/size-table/Kurta.vue";
import Joggers from "@/views/detail/size-table/Joggers.vue";
const props = defineProps({
    show: {
        type: Boolean,
        default:  false
    },
    type: {
        type: String,
        default: 'shirt'
    },
    title: {
        type: String,
        default: 'Title'
    },
    sizeCharts: {
        type: Object,
        default: null,
    },
})
const emit = defineEmits(['close']);
const sizeTab = ref('chart');

const close = () => {
    emit('close');
}

const switchSizeInfo = (val) => {
    sizeTab.value = val;
}
</script>

<style lang="scss" scoped>
.size-active {
    border-bottom: 3px solid #1C1C24 !important;
}
</style>