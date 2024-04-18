<template>
    <table class="table table-bordered align-middle text-black">
        <thead class="">
            <tr class="">
                <th>Age</th>
                <!-- <th>Weight (lbs.)</th> -->
                <th>Top Length/Full Length</th>
                <th>Chest (Full)</th>
            </tr>
        </thead>
        <tbody>
            <tr class="" v-for="(size, i) in sizesArr" :key="i">
                <td>{{size.age}}</td>
                <td>{{size.length}}</td>
                <td>{{size.chest}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    const sizesArr = ref([
    {
        age: '2-3y',
        length: '22.83',
        chest: '24.4',
    },
    {
        age: '4-5y',
        length: '24.8',
        chest: '25.98',
    },
    
    {
        age: '6-7y',
        length: '26.77',
        chest: '27.55',
    },
    {
        age: '8-9y',
        length: '28.74',
        chest: '29.13',
    },
    {
        age: '10-12y',
        length: '30.7',
        chest: '30.7',
    },
    {
        age: '13-15y',
        length: '33.66',
        chest: '33.07',
    },

])

// const sizesArr = ref([
//     {
//         age: 'X-Small (5-6)',
//         weight: '19.68',
//         chest: '19.68',
//     },
//     {
//         age: 'Small (7-8)',
//         weight: '19.68',
//         chest: '19.68',
//     },
//     {
//         age: 'Medium (10)',
//         weight: '19.68',
//         chest: '19.68',
//     },
//     {
//         age: 'Large (12)',
//         weight: '19.68',
//         chest: '19.68',
//     },
//     {
//         age: 'XL (14)',
//         weight: '19.68',
//         chest: '19.68',
//     },
//     {
//         age: 'XX-Large (16-18)',
//         weight: '19.68',
//         chest: '19.68',
//     },

// ])
</script>

<style lang="scss" scoped>

</style>