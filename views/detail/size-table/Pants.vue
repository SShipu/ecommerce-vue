<template>
    <table class="table table-bordered align-middle text-black">
        <thead class="">
            <tr class="">
                <th>Age</th>
                <!-- <th>Weight (lbs.)</th> -->
                <th>Bottom Length/Full Length</th>
                <th>Waist (Full)</th>
            </tr>
        </thead>
        <tbody>
            <tr class="" v-for="(size, i) in sizesArr" :key="i">
                <td>{{size.age}}</td>
                <td>{{size.length}}</td>
                <td>{{size.waist}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    const sizesArr = ref([
    {
        age: '2-3y',
        length: '20.47',
        waist: '18.11',
    },
    {
        age: '4-5y',
        length: '23.62',
        waist: '19.21',
    },
    
    {
        age: '6-7y',
        length: '26.77',
        waist: '20.31',
    },
    {
        age: '8-9y',
        length: '29.92',
        waist: '21.41',
    },
    {
        age: '10-12y',
        length: '30.7',
        waist: '22.51',
    },
    {
        age: '13-15y',
        length: '37.79',
        waist: '24.17',
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