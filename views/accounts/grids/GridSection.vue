<template>
    <div class="grid-section-container row" v-if="items.length">
        <div v-for="(item, i) in items" :key="i" class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
            <ItemCard 
              :item="item.item" 
              :isWishIconVisible="true" 
              :isNewBadge="false"
            />
        </div>
    </div>
    <div class="grid-section-container" v-else>
        <div class="row grid-child">
            <div v-for="(item, i) in 20" :key="i" class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <ItemShimmer />
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});

</script>

<style lang="scss">

.grid-section-container {
  padding: 20px 0px;
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
