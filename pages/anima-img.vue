<template>
    <div>
        <!-- <div class="carousel-inner text-center">
            <div v-for="(imageUrl, i) in items" :key="i"
                :class="i === 0 ? 'carousel-item active' : 'carousel-item'"
            >
                <img :src="imageUrl" class="d-none" alt="Image" />
                <div 
                    v-if="imageUrl"
                    :id="'myimage'+i"
                    class="img-fluid rounded-4 bg-image h-100vh"
                    :style="{backgroundImage: `url(${imageUrl})`}"
                >
                </div>
                
                <Skeletor v-else class="img-fluid rounded-4 bg-image h-100vh" width="100%" height="100%" />
                <div :id="'myresult'+i" class="img-zoom-result" @click="handleButtonClick()">ascsacasc</div>
            </div>
        </div> -->
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <button @click="handleButtonClick(index)">Click me</button>
                <img :src="item.img" alt="Image" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const items = [
    { img: "/images/home/t-1.png" },
    { img: "/images/home/t-1.png" },
];

const handleButtonClick = (index) => {
    const btn = document.querySelectorAll("button")[index];
    const li = btn.closest("li");
    const shopping_cart = document.body;
    const btnOffsetTop = btn.getBoundingClientRect().bottom;
    // const btnOffsetRight = window.innerWidth - btn.getBoundingClientRect().left;
    const imgClone = li.querySelector("img").cloneNode(true);
    imgClone.style.bottom = `0px`;
    imgClone.style.right = `0px`;
    imgClone.classList.add("zoom");
    shopping_cart.appendChild(imgClone);

    setTimeout(() => {
        shopping_cart.removeChild(imgClone);
    }, 1000);
};
// const handleButtonClick = (index) => {
//   const imageUrl = items[0].img;
//   const img = document.querySelector(`#myimage${0}`);
//   const imgResult = document.querySelector(`#myresult${0}`);
//   const imgRect = img.getBoundingClientRect();
  
//   const imgZoomClone = document.createElement('img');
//   imgZoomClone.src = imageUrl;
//   imgZoomClone.alt = "Zoomed Image";
//   imgZoomClone.classList.add("zoom");
//   imgZoomClone.style.left = `${imgRect.left}px`;
//   imgZoomClone.style.top = `${imgRect.top}px`;
//   imgZoomClone.style.width = `200px`;
//   imgZoomClone.style.height = `200px`;
  
//   imgResult.appendChild(imgZoomClone);

// //   setTimeout(() => {
// //     imgResult.removeChild(imgZoomClone);
// //   }, 1000);
// };
</script>

<style>
.zoom {
    position: absolute;
    width: 40px;
    opacity: 0;
    animation: zoom 1s linear forwards;
}

@keyframes zoom {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        top: 100px;
        right: 40px;
    }
}

/* Add your CSS styles here */
</style>
