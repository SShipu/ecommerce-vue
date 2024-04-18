<template>
    <div class="container-fluid account-container">
        <div class="row">
            <div class="col-12 col-lg-3 d-flex justify-content-center pt-3">
                <div class="account-menu-desktop">
                    <h1>My Account</h1>
                    <ul class="list-group list-unstyled mt-3 fs-4">
                        <li 
                            class="text-secondary py-1"
                            @click.prevent="setTab(menu)"
                            :class="{ active: selectTab == menu.tab }"
                            v-for="(menu, i) in menus" :key="i"
                        >
                            {{menu.name}}
                        </li>
                    </ul>
                </div>
                <div class="account-menu-mobile w-100">
                    <h3>My Account</h3>
                    <BaseSingleSelector class="w-100" label="" styles="border-radius: 10px !important;" :options="menus" v-model="selectedMenu"/>
                </div>
            </div>
            <div class="col-12 col-lg-9 pt-3 account-body">
                <!-- {{ selectTab }} -->
                <Overview v-if="selectTab == 'overview'"/>
                <OrderList v-if="selectTab == 'order'"/>
                <WishList v-if="selectTab == 'wishlist'"/>
                <AccountSettings v-if="selectTab == 'settings'"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import AccountSettings from '@/views/accounts/AccountSettings.vue';
import Overview from '@/views/accounts/Overview.vue';
import WishList from '~~/views/accounts/WishList.vue';
import OrderList from '~~/views/accounts/OrderList.vue';

const route = useRoute();
const router = useRouter();

const selectedMenu = ref({
        id: 1,
        name: 'Overview',
        tab: 'overview',
    });

const menus = ref([
    {
        id: 1,
        name: 'Overview',
        tab: 'overview',
    },
    {
        id: 2,
        name: 'My Order',
        tab: 'order',
    },
    {
        id: 3,
        name: 'My Wishlist',
        tab: 'wishlist',
    },
    {
        id: 4,
        name: 'Account Settings',
        tab: 'settings',
    },
    // {
    //     id: 5,
    //     name: 'Customer Service',
    //     tab: 'service',
    // },
])

const setTab = (val) => {
    selectedMenu.value = val;
}

const selectTab = computed(() => {
    if (selectedMenu.value != null) {
        return selectedMenu.value?.tab;
    }
    return 'overview';
});

watch(()=> route.query, ()=> {
    if(route.query && route.query.tab) {

        let index = menus.value.findIndex((m) => m.tab === route.query.tab);

        if(index > -1) {
            selectedMenu.value = menus.value[index];
        }
    }
},{ immediate: true}, {deep: true});

</script>

<style lang="scss" scoped>
.account-container {
    background-color: #fff;
    overflow-y: auto;
    min-height: 90vh;
    .account-menu-mobile{
        display: none;
    }
    .account-body {
        padding: 5% 5%;
    }
}
@media screen and (max-width: 1023px) {
    .account-container {

        .account-menu-desktop{
            display: none !important;
        }
        .account-menu-mobile{
            display: block;
        }
        .account-body {
            padding: 0 2%;
        }
    }
}
.list-group {
    li {
        cursor: pointer;
        font-weight: 700;
    }
}
.active {
    text-decoration: underline;
    color: #1C1C24 !important;
}
</style>