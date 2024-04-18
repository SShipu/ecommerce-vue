<template>
    <div class="item-body">
        <!-- {{ selectItem }} -->
        <!-- <label 
            v-if="props.singleItem && (props.singleItem.id.length > 0) || (props.singleItem.id != '')" 
            class="" style="cursor: pointer; display: flex; column-gap: 15px;">
            <input class="primary-checkbox" type="checkbox" name="cate" :checked="isChecked" v-model="selectItem"
                :value="props.singleItem" @change="$emit('onChangeProcessed', { args: $event.target.checked, item: props.singleItem })" />
            <span >{{ itemLabel }}</span>
        </label> -->
        <BaseCheckBox 
            v-if="props.singleItem?.id"
            :label="itemLabel"
            v-model="selectItem" 
            :value="props.singleItem" 
            :checked="isChecked" 
            @onChange="onChangeProcessed"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    selectedItems:{
        type: Array,
        required: true,
    },
    singleItem:{
        type: Object,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    }
});
const emit = defineEmits(['onChangeProcessed']);
const selectedItemsRef = toRef(props, 'selectedItems');

const selectItem = ref([]);

const itemLabel = computed(()=> {
    if (props.singleItem?.name?.length) {
        return props.singleItem.name;
    } else if (props.singleItem?.title?.length) {
        return props.singleItem.title;
    }
    return "";
})

const isChecked = computed(() => {
    let checked = false;
    if (selectedItemsRef.value && selectedItemsRef.value.length > 0 ) {
        checked = selectedItemsRef.value.map(c => c.id).includes(props.singleItem.id);
    }
    return checked;
});

const onChangeProcessed = (event) => {
    emit('onChangeProcessed', { args: event.target.checked, item: props.singleItem });
};
</script>

<style lang="scss">
.primary-checkbox {
    margin-right: 5px !important;
    // accent-color: #ea1a21;
}
</style>
