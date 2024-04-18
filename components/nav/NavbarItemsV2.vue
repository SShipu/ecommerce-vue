<template>
    <div class="navbar-items d-flex justify-content-start align-items-center">
        <!-- {{ menuStore }} -->
        <div 
            class="nav-item px-1 fs-4 fw-bold item-name item-has-mega-menu mx-2" 
            @click="handleHover" 
            v-for="(category, i) in menuStore.menus" 
            :key="i"
        >
            <a 
                :href="itemLink({
                    categories: [category.link],
                    linkType: category.linkType,
                    routeBehavior: true,
                    isWatcher: true,
                })"
                @click.prevent="goToShopPage({
                        categories: [category.link],
                        linkType: category.linkType,
                        routeBehavior: true,
                        isWatcher: true,
                    })"
                class="nav-link text-black"
            >
                {{category.name}} 
                <i class="fa fa-angle-down" v-if="category?.children?.length"></i>
            </a>
            <div 
                class="mega-menu-container style2" 
                v-if="category?.children?.length && isShowDropDownMenu" 
                @click="handleHover"
            >
                <div class="row m-0">
                    <div class="col-lg-2" v-for="(item, i) in category.children" :key="i">
                        <div class="category-item">
                            <a 
                                data-toggle="collapse"
                                role="button" 
                                aria-expanded="false" 
                                aria-controls="mobile-product1"
                                :href="itemLink({
                                    categories: [item.link],
                                    linkType: item.linkType,
                                    routeBehavior: true,
                                    isWatcher: true,
                                })"
                                @click.prevent="goToShopPage({
                                    categories: [item.link],
                                    linkType: item.linkType,
                                    routeBehavior: true,
                                    isWatcher: true,
                                })"
                            >
                                <h6 class="title nav-link text-black fs-5 fw-bold">{{item.name}}</h6>
                            </a>
                            <ul class="list-unstyled">
                                <li v-for="(childItem, j) in item.children" :key="i">
                                    <a 
                                        class="nav-link text-black"
                                        :href="itemLink({
                                            categories: [childItem.link],
                                            linkType: childItem.linkType,
                                            routeBehavior: true,
                                            isWatcher: true,
                                        })"
                                        @click.prevent="goToShopPage({
                                            categories: [childItem.link],
                                            linkType: childItem.linkType,
                                            routeBehavior: true,
                                            isWatcher: true,
                                        })"
                                    >{{childItem.name}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </div>
</template>

<script setup>
import { useMenuStore } from "@/stores/menu-store";
const router = useRouter();
const emit = defineEmits(["hide-nav"]);
const menuStore = useMenuStore();

const categories = ref([]);
const isShowDropDownMenu = ref(true);

const itemLink = (obj) => {
    let link = "#";

    if (obj.linkType == 'CATEGORY' && obj.categories && obj.categories.length > 0) {
        link = `/shop?categories=${obj.categories}&routeBehavior=${obj.routeBehavior}&isWatcher=${obj.isWatcher}`;
    } else if (obj.linkType == 'LINK') {
        link = `/shop`;
        // link = obj.name;
    }

    return link;
};

const goToShopPage = (obj) => {
    if (obj.linkType == 'CATEGORY') {
        router.push({
            name: "shop",
            query: obj
        })
    } else if (obj.linkType == 'LINK') {
        router.push({
            path: obj.categories[0]
        })
    }
  emit('hideNav');
}

const findChildRoom = (room)=> {
    let obj = {
        id: '',
        name: '',
        img: '',
        madeBy: []
    }
    if (room && room.id && room.id.length > 0) {
        obj.id = room.id;
        obj.name = room.name;
        obj.img = room.extras && room.extras.shop_banner_image_url ? room.extras.shop_banner_image_url : '';
    }
    if (room && room.children && room.children.length <= 0) {
        if (room.options && room.options.length > 0) {
            let discriminator = room.options.filter(i => i.discriminator == false)
            if (discriminator.length > 0) {
                discriminator[0].values.forEach(element => {
                    obj.madeBy.push(element.displayLabel)
                });
            }
        }
    }
    return obj;
};

const  handleHover = () => {
	isShowDropDownMenu.value = false;
    setTimeout(() => {
        isShowDropDownMenu.value = true;
    }, 1000);
}

onMounted(async () => {
    if (localStorage.getItem("all-categories")) {
        let categoriesVal = JSON.parse(localStorage.getItem("all-categories"));
        categories.value = categoriesVal.categories;
    }
});
</script>

<style>
.navbar-items .item-has-children {
  position: relative;
}
.navbar-items .item-has-children.active > a {
  color: #F69320;
}
.navbar-items .item-has-children > a i {
  font-size: 12px;
}
.navbar-items .item-has-children .submenu {
  position: absolute;
  left: 0;
  top: 100%;
  min-width: 220px;
  background-color: #fff;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s ease;
  /* border-top: 3px solid red; */
  z-index: 2;
}
.navbar-items .item-has-children .submenu:hover {
    display: block;
}
.navbar-items .item-has-children .submenu li a {
  display: block;
  padding: 8px 15px;
  font-size: 13px;
  font-weight: 400;
  border-bottom: 1px solid rgba(89, 184, 40, 0.1);
}
/* .navbar-items .item-has-children .submenu li a:hover {
  background-color: #F69320;
  color: white;
}
.navbar-items .item-has-children .submenu li.active > a {
  background-color: #F69320;
  color: white;
} */
.navbar-items .item-has-children .submenu .submenu {
  left: 100%;
  top: 0;
}
.navbar-items .item-has-children:hover > .submenu {
  transform: scaleY(1);
}
@media only screen and (max-width: 1200px) {
    .navbar-items .item-has-children .submenu {
        position: static;
        transform: scaleY(1);
    }
    .navbar-items .item-has-children .submenu li a {
        border-bottom: none;
    }
    .navbar-items .item-has-children .submenu li a:hover {
        background-color: transparent;
        color: #F69320;
    }
}
.navbar-items .item-has-children .item-has-children > a {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
}
.navbar-items .item-has-mega-menu {
    position: initial;
}

.navbar-items .item-has-mega-menu > a i {
    font-size: 12px;
}
.navbar-items .item-has-mega-menu .mega-menu-container {
    position: absolute;
    left: 0;
    top: 60%;
    /* top: 116%; */
    /* max-width: 1200px; */
    max-width: 100%;
    width: 50%;
    max-height: 50vh;
    /* max-height: 480px; */
    padding: 50px 30px 30px 30px;
    overflow-y: auto;
    background-color: #fff;
    transform: scaleY(0);
    transform-origin: top;
    /* transition: all 0.3s ease; */
    z-index: 1024;
    /* box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.06); */
    /* margin-top: 12px; */
}
.navbar-items .item-has-mega-menu .mega-menu-container .category-item .title {
    font-size: 14px;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 15px;
    font-weight: 500;
    /* margin-left: 25px; */
}
.navbar-items .item-has-mega-menu .mega-menu-container .category-item .active {
  color: #F69320;
}
.navbar-items .item-has-mega-menu .mega-menu-container .category-item ul {
  margin-bottom: 35px;
}
.navbar-items .item-has-mega-menu .mega-menu-container .category-item ul li a {
  padding: 5px 0;
  color: #4b566b;
  font-size: 14px;
  font-weight: 600;
}
.navbar-items .item-has-mega-menu .mega-menu-container .category-item ul li a:hover {
  color: #F69320;
}
.navbar-items .item-has-mega-menu:hover > a {
  color: #F69320;
}
.navbar-items .item-has-mega-menu:hover .mega-menu-container {
  transform: scaleY(1);
}

</style>
