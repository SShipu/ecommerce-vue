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
        age: 'XS',
        length: '38.97',
        waist: '27.55',
    },
    {
        age: 'S',
        length: '39.37',
        waist: '29.13',
    },
    
    {
        age: 'M',
        length: '39.76',
        waist: '30.7',
    },
    {
        age: 'L',
        length: '40.15',
        waist: '32.28',
    },
    {
        age: 'XL',
        length: '40.55',
        waist: '33.85',
    },
    {
        age: 'XXL',
        length: '40.94',
        waist: '35.43',
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