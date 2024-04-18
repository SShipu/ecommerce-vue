<template>
    <div class="container-fluid my-5">

        <div class="mx-5">
            <SectionHeaderSlider title="Category" targetCarousel="carouselExampleControls" />
            <div id="carouselExampleControls" class="carousel slide multi-item-carousel" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active h-40vh bg-image" v-for="(item, i) in items" :key="i"
                        :style="{ backgroundImage: `url('${item.img}')` }">
                        <div class="h-100 d-flex justify-content-center align-items-end">
                            <div class="d-flex flex-column align-items-center mb-3">
                                <span class="fs-3 fw-bold text-white shadow bg-text">{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

const items = ref([
    {
        title: 'Babies',
        img: '/images/home/c-1.png',
    },
    {
        title: 'Boys',
        img: '/images/home/c-2.png',
    },
    {
        title: 'Girls',
        img: '/images/home/c-3.png',
    },
    {
        title: 'Accessories',
        img: '/images/home/c-4.png',
    },
])

function convertCarousel() {
  const carousel = document.querySelector('.multi-item-carousel');
  new bootstrap.Carousel(carousel, { interval: false });

  const carouselItems = carousel.querySelectorAll('.item');
  carouselItems.forEach(function(item) {
    let next = item.nextElementSibling;
    if (!next) {
      next = item.parentNode.firstElementChild;
    }

    const clonedFirstChild = next.firstElementChild.cloneNode(true);
    item.appendChild(clonedFirstChild);

    if (next.nextElementSibling) {
      const clonedSecondChild = next.nextElementSibling.firstElementChild.cloneNode(true);
      item.appendChild(clonedSecondChild);
    } else {
      const firstItem = item.parentNode.firstElementChild;
      const clonedSecondChild = firstItem.firstElementChild.cloneNode(true);
      item.appendChild(clonedSecondChild);
    }
  });
}

onMounted(() => {
      if (typeof document !== 'undefined') {
        convertCarousel();
      }
});

</script>

<style lang="scss" scoped>
.bg-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

@media screen and (min-width: 576px) {
    .carousel-inner {
        display: flex;

        .carousel-item {
            display: block;
            margin-right: 0;
            flex: 0 0 calc(100%/4);
        }
    }
}
</style>