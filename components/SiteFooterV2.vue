<template>
    <div class="col-12 footer-v2">
        <ul class="navbar-nav ml-auto mr-md-3 d-flex text-center flex-wrap py-2" style="justify-content: center;flex-direction: row;">
            <li class="item col-4 col-md-2 px-1 fs-5 fw-bold py-1" v-for="(item, i) in lists" :key="i">
                <a  @click.prevent="goTo(item.path)">{{ item.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
const router = useRouter();
const lists = ref([
    {
        name: 'Refund policy',
        route_name: '',
        // path: 'refund-policy'
        path: ''
    },
    {
        name: 'Shipping policy',
        route_name: '',
        path: 'shipping-policy'
    },
    {
        name: 'Privacy policy',
        route_name: '',
        path: 'privacy-policy'
    },
    {
        name: 'Terms of service',
        route_name: '',
        path: 'terms-condition'
    },
    {
        name: 'Legal notice',
        route_name: '',
        path: ''
    },
]);

const goTo = (name) => {
    router.push({name: name})
}

// const goTo = (routeName) => {
//     navigateTo(routeName);
// }
</script>

<style lang="scss" scoped>
.footer-v2 {
    .item {
        color: #6D7482;
        cursor: pointer;

        &:hover {
            color: #2277E0
        }
    }
}
</style>