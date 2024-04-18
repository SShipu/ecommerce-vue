<template>
    <table class="table table-bordered align-middle text-black">
        <thead class="">
            <tr class="">
                <th>Age</th>
                <!-- <th>Weight (lbs.)</th> -->
                <th>Top Length/Full Length</th>
                <th>Chest</th>
            </tr>
        </thead>
        <tbody>
            <tr class="" v-for="(size, i) in sizesArr" :key="i">
                <td>{{size.age}}</td>
                <td>{{size.weight}}</td>
                <td>{{size.chest}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    const sizesArr = ref([
    {
        age: '2-3y',
        weight: '16.53',
        chest: '24.4',
    },
    {
        age: '3-4y',
        weight: '17.32',
        chest: '25.19',
    },
    {
        age: '4-5y',
        weight: '18.11',
        chest: '25.98',
    },
    {
        age: '5-6y',
        weight: '18.89',
        chest: '26.77',
    },
    {
        age: '6-7y',
        weight: '19.68',
        chest: '27.55',
    },
    {
        age: '7-8y',
        weight: '20.47',
        chest: '28.34',
    },{
        age: '8-9y',
        weight: '21.25',
        chest: '29.13',
    },{
        age: '9-10y',
        weight: '22.04',
        chest: '29.92',
    },{
        age: '10-12y',
        weight: '22.83',
        chest: '30.7',
    },{
        age: '12-14y',
        weight: '24.4',
        chest: '32.28',
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