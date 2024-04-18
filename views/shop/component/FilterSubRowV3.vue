<template>
    <div class="item-body" v-if="itemLabel.length">
        <BaseCheckBox 
            v-if="props.singleItem?.id"
            :label="itemLabel"
            v-model="selectItem" 
            :value="props.singleItem" 
            :checked="isChecked" 
            @onChange="onChangeProcessed"
        />
    </div>
    <label class="color-body my-1 mx-1 py-1 d-flex rounded-circle position-relative" 
        :class="{'active-body': isChecked}" v-if="props.singleItem?.color?.length" 
        style="cursor: pointer; column-gap: 15px;"
        :style="{backgroundColor: props.singleItem.color}"
    >
        <input 
            class="primary-checkbox"
            :class="{inputHidden: inputType}"
            type="checkbox" 
            name="cate" 
            :checked="isChecked"
            v-model="selectItem[i]" 
            :value="props.singleItem"
            @change="$emit('onChangeProcessed', { args: $event.target.checked, item: props.singleItem })"
        />
    </label>
    <label class="color-body my-1 mx-1 py-1 d-flex rounded-circle position-relative" 
        :class="{'active-body': isChecked}" v-if="props.singleItem?.size?.length" 
        style="cursor: pointer; column-gap: 15px;"
    >
        <input 
            class="primary-checkbox"
            :class="{inputHidden: inputType}"
            type="checkbox" 
            name="cate" 
            :checked="isChecked"
            v-model="selectItem[i]" 
            :value="props.singleItem"
            @change="$emit('onChangeProcessed', { args: $event.target.checked, item: props.singleItem })"
        />
        <span>{{ props.singleItem.size }}</span>
    </label>
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
}
.active-body {
    border-radius: 60px;
    background: #F3F3F3;
    border: 2px solid red !important;
 }
.inputHidden {
    position: absolute;
    clip-path: circle(0);
    height: 1px;
    width: 1px;
    opacity: 0;
}

.color-body {
    width: 40px;
    height: 40px;
    border: 1px solid black;
}
</style>
