<template>
    <div class="header-default shadow-lg py-2 px-2 px-lg-5 px-md-5 bg-white w-100" id="header" style="z-index: 1024;">
        <nav class="navbar navbar-expand-lg row">
            <div class="d-flex justify-content-start col-4 desktop-hidden">
                <div class="cursor-pointer" @click.prevent="showMobileNav = !showMobileNav, showCart = false, showMiniCart = false ">
                    <i class="fa fa-bars fa-lg"></i>
                </div>
            </div>
            <div class="d-flex justify-content-start col-5 mobile-hidden desktop-nav-list p-0">
                <!-- <ul class="navbar-nav ml-auto mr-md-3">
                    <li class="nav-item pe-1 fs-4 fw-bold active">
                        <a 
                            href="/new-arrival" 
                            class="nav-link text-black ps-0" 
                            @click.prevent="goto('new-arrival')"
                            
                        >
                            New Arrival
                        </a>
                    </li>
                    <li class="nav-item px-1 fs-4 fw-bold active"
                        v-for="(cat, i) in categoryStore.categories"
                        :key="i"
                        :class="{'dropdown': cat?.children?.length}"
                    >
                        <a 
                            v-if="!cat?.children?.length"
                            href="/shop" 
                            class="nav-link text-black"
                            @click.prevent="navigateTo({
                                path: '/shop',
                                query: {
                                    categories: [cat.name],
                                    routeBehavior: true,
                                    isWatcher: true,
                                }
                            })"
                            
                        >
                            {{ cat.name.toUpperCase()[0] + cat.name.toLowerCase().slice(1) }}
                        </a>
                        <a 
                            v-else
                            href="#" 
                            class="nav-link text-black"
                            :class="{'dropdown-toggle': cat?.children?.length}"
                            :id="`navbarDropdownMenuLink-${i}-48`" 
                            role="button" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            
                        >
                            {{ cat.name.toUpperCase()[0] + cat.name.toLowerCase().slice(1) }}
                        </a>
                        <ul v-if="cat?.children?.length" class="dropdown-menu" :aria-labelledby="`navbarDropdownMenuLink-${i}`">
                            <li v-for="(childCat, i) in cat?.children" :key="i">
                                <a 
                                    class="dropdown-item text-black" 
                                    href="#"
                                    @click.prevent="navigateTo({
                                        path: '/shop',
                                        query: {
                                            categories: [childCat.name],
                                            routeBehavior: true,
                                            isWatcher: true,
                                        }
                                    })"
                                >{{childCat.name.toUpperCase()[0] + childCat.name.toLowerCase().slice(1)}}</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item px-1 fs-4 fw-bold">
                        <a href="#" class="nav-link text-black" @click.prevent="goto('shop')">Sales</a>
                    </li>
                </ul> -->
                <NavNavbarItems />
            </div>
            <div class="container-fluid px-3 col-3 justify-content-center p-0">
                <a class="navbar-brand" href="/" @click.prevent="navigateTo('/')">
                    <img src="/images/logo/logo.svg" alt="">
                </a>
            </div>
            <div class="d-flex justify-content-end col-4 desktop-hidden">
                <ul class="navbar-nav ml-auto mr-md-3 d-flex flex-row">
                    <li class="nav-item mx-2">
                        <a @click.prevent="showSearchCart = true" class="nav-link text-black cart" style="cursor: pointer;">
                            <img src="/images/search.png" style="width: 20px;" alt="">
                        </a>
                    </li>

                    <li class="nav-item">
                        <a :class="{ shake: isShakeActive }" class="nav-link text-black cart" @click.prevent="showCart = !showCart">
                            <!-- <i class="fa fa-shopping-cart fa-lg"></i> -->
                            <img src="/images/cart.png" style="width: 20px;" alt="">
                            <span class="position-absolute top-10 start-10 translate-middle badge rounded-pill" style="background-color: #2277E0;">
                                {{ cartStore.quantity }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="d-flex justify-content-end col-4 mobile-hidden desktop-nav-list p-0">
                <ul class="navbar-nav ml-auto mr-md-3">
                    <li class="nav-item px-1 fs-4 fw-bold">
                        <a href="/contacts" class="nav-link text-black" @click.prevent="goto('contacts')">Customer Care</a>
                    </li>

                    <li class="nav-item px-1 fs-4 fw-bold" v-if="!authStore.currentUser">
                        <a href="/sign-in" class="nav-link text-black" @click.prevent="goto('sign-in')">Login</a>
                    </li>
                    <li class="nav-item px-1 fs-4 fw-bold" v-if="authStore.currentUser">
                        <a href="#" class="nav-link text-black" @click.prevent="onSignOut()">Logout </a>
                    </li>

                    <li class="nav-item px-1 fs-4 fw-bold">
                        <a href="/account" class="nav-link text-black" v-if="authStore.currentUser" @click.prevent="goto('account')">My Account</a>
                    </li>

                    <li class="nav-item">
                        <a @click.prevent="showSearchCart = true" class="nav-link text-black" style="cursor: pointer;">
                            <!-- <i class="fa fa-search fa-lg"></i> -->
                            <img src="/images/search.png" style="width: 20px;" alt="">
                        </a>
                    </li>
                    <li class="nav-item">
                        <a :class="{ shake: isShakeActive }" class="nav-link text-black cart" @click.prevent="showCart = !showCart, showMiniCart = false">
                            <!-- <i class="fa fa-shopping-cart fa-lg"></i> -->
                            <img src="/images/cart.png" style="width: 20px;" alt="">
                            <!-- <i style="background-color: #2277E0; ">s</i> -->
                            <span class="position-absolute top-10 start-10 translate-middle badge rounded-pill" style="background-color: #2277E0;">
                                {{ cartStore.quantity }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- <CartSideBarCart :showCart="showCart" @closeSideCart="showCart = !showCart"/> -->
        <CartFooterBarCart v-if="showCart" :showCart="showCart" @closeSideCart="showCart = false"/>
        <CartFooterMiniCart  v-if="showMiniCart" :showCart="showMiniCart" @close="showMiniCart = false, cartStore.changeSideBarShow()" @openCart="showMiniCart = false, showCart = true, cartStore.changeSideBarShow()"/>
        <CartTopBarCart v-if="showSearchCart" :showCart="showSearchCart" @closeSideCart="showSearchCart = !showSearchCart"/>
        <NavMobileNavbar v-if="showMobileNav" :show="showMobileNav" @closeSideNav="showMobileNav = !showMobileNav"/>

        <!-- <div class="modal-dialog modal-xl">...</div> -->
    </div>
    <!-- <BaseFilterCard  class="mb-5"/> -->
</template>

<script setup>
import { useCartStore } from "~~/stores/cart";
import { useAuthStore } from "~~/stores/auth-store";
import { useCategoryStore } from "~~/stores/category-store";
import { companiesClient } from '~/libs/gandalf/apis/config';
// import NavbarItems from './NavbarItems.vue';

const authStore = useAuthStore();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();

const router = useRouter();
const showCart = ref(false);
const showMiniCart = ref(false);
const showSearchCart = ref(false);
const showMobileNav = ref(false);
const accountList = ref(false);
const isShakeActive = ref(false);


watch(()=> cartStore.isSideBarShow, ()=> {
    isShakeActive.value = true;
    if(cartStore.isSideBarShow) {
        showMiniCart.value = true;
        // showCart.value = 'true';
    }

    setTimeout(() => {
        isShakeActive.value = false;
    }, 1500);
}, {deep: true, immediate: true});


const accountArray = [
    {
        title: "Profile",
        img: "fa-user",
        path: "ProfilePage",
    },
    {
        title: "Sign Out",
        img: "fa-power-off",
    },
];

const goto = (name) => {
    router.push({name: name})    
}


const onSignOut = () => {
    authStore.signOut();

    if(process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("profile");
    }

    navigateTo("sign-in");
}

const onAccountClick = (item) => {
    if (item.path && item.path == "ProfilePage") {
        navigateTo("account");
    } else {
        onSignOut();
    }
    accountList.value = false;
};

const myAccount = computed(() => {
    let title = "";
    if (authStore.currentUser != null) {
        title = authStore.profile.name.toLowerCase();
    } else {
        title = "My Account";
    }
    return title;
});

const showAccount = () => {
    if (authStore.currentUser != null) {
        accountList.value = !accountList.value;
    }
};

const fetchCompany = async () => {
    // console.log("fetchCompany");
    let res = await companiesClient.findOne({});
    // console.log("!!res~~~");
    // console.log(res);
};

const onOutsideClick = () => {
    accountList.value = false;
};

onMounted(async() => {
    await fetchCompany();
})
</script>

<style lang="scss" scoped>
  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
.account-list {
    // display: none;
    max-height: 300px;
    width: 300px;
    border-radius: 5px;
    box-shadow: 0 0 0 1px rgba(68, 68, 68, 0.11);
    box-sizing: border-box;
    //   margin: 4px 0 0;
    // opacity: 0;
    //   overflow: hidden;
    overflow-y: inherit;
    padding: 15px;
    //   pointer-events: none;
    position: absolute;
    top: 105px;
    right: 0%;
    transform-origin: 50% 0;
    transform: scale(0.75) translateY(-21px);
    z-index: 3026;
    background: #fff;
    border: 1px solid #cacaca;
}

.account-list .option {
    color: #000 !important;
}
.account-list .option:hover {
    color: #ea1a21;
}
.account-list .option .lower-slide-section span {
    margin-left: 10px;
}
.nav-item {
    .nav-link {
        &:hover {
            color: #2277E0 !important;
        }
    }
    .cart {
        cursor: pointer;
    }
}

@media screen and (min-width: 1024px) and (max-width: 1361px)  {
    .desktop-nav-list {
        .nav-item {
            font-size: .9rem !important;
        }
    }
}

</style>