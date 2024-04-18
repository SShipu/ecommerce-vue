<template>
    <div style="margin-left: 10px">
        <div class="wrapper">
            <ul class="StepProgress">
                <div
                    class="StepProgress-item"
                    :class="{
                        'current': shipmentStatus.status == '',
                        'is-done': [
                            'Pending',
                            'Processing',
                            'Dispatch',
                            'Delivered',
                            'Complete',
                        ].includes(shipmentStatus.status),
                    }"
                >
                    <strong>Order Received</strong>
                </div>

                <div class="StepProgress-item"
                :class="{'current' : shipmentStatus.status == 'Pending', 'is-done' : ['Processing', 'Dispatch', 'Delivered', 'Complete'].includes(shipmentStatus.status)}"
                >
                    <!-- <strong>Award an entry</strong> -->
                    Your order is being processed Dhaka - Bangladesh warehouse
                </div>

                <div class="StepProgress-item"
                :class="{'current' : shipmentStatus.status == 'Dispatch', 'is-done' : ['Dispatch', 'Delivered', 'Complete'].includes(shipmentStatus.status)}"
                >
                    <!-- <strong>Post a contest</strong> -->
                    Your order is shipped to Dhaka - Bangladesh warehouse
                </div>

                <div class="StepProgress-item"
                    :class="{
                        'current': shipmentStatus.status == 'Dispatch',
                        'is-done': [
                            'Delivered',
                            'Complete',
                        ].includes(shipmentStatus.status),
                    }"
                >
                    <!-- <strong>Handover</strong> -->
                    Your order is being processed Dhaka - Bangladesh warehouse
                </div>

                <div class="StepProgress-item"
                    :class="{
                        'current': shipmentStatus.status == 'Dispatch',
                        'is-done': [
                            'Delivered',
                            'Complete',
                        ].includes(shipmentStatus.status),
                    }"
                >
                    <!-- <strong>Provide feedback</strong> -->
                    Arriving Today before 16:32
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
});

const itemRef = toRef(props, "item");

const shipmentStatus = computed(() => {
    let status = "";
    let barStatus = 0;
    switch (props.item && props.item.shipmentStatus) {
        case "PENDING":
            status = "Pending";
            barStatus = 33;
            break;
        case "DISPATCHED":
            status = "Processing";
            barStatus = 66.5;
            break;
        case "DELIVERED":
            status = "Delivered";
            barStatus = 100;
            break;
    }

    return { status: status, barStatus: `${barStatus}%` };
});
</script>

<style lang="scss" scoped>
.wrapper {
    width: 330px;
    //  font-family: 'Helvetica';
    font-size: 14px;
}
.StepProgress {
    position: relative;
    padding-left: 45px;
    list-style: none;
}
.StepProgress::before {
    display: inline-block;
    content: "";
    position: absolute;
    top: 0;
    left: 15px;
    width: 10px;
    height: 100%;
}
.StepProgress-item {
    position: relative;
    counter-increment: list;
}
.StepProgress-item:not(:last-child) {
    padding-bottom: 20px;
}
.StepProgress-item::before {
    display: inline-block;
    content: "";
    position: absolute;
    left: -30px;
    height: 100%;
    width: 10px;
}
.StepProgress-item::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: -37px;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
}
.StepProgress-item.is-done::before {
    border-left: 4px solid #c7c7c7;
}
.StepProgress-item.is-done::after {
    content: "✔";
    font-size: 13px;
    color: #fff;
    text-align: center;
    border: 2px solid #c7c7c7;
    background-color: #c7c7c7;
}
.StepProgress-item.current::before {
    border-left: 4px solid #c7c7c7;
}
.StepProgress-item.current::after {
    content: counter(list);
    padding-top: 1px;
    width: 25px;
    height: 25px;
    top: -4px;
    left: -40px;
    font-size: 14px;
    text-align: center;
    color: #000;
    border: 2px solid #c7c7c7;
    background-color: white;
}
.StepProgress strong {
    display: block;
}
</style>
