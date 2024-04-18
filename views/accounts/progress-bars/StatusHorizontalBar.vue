<template>
<div class="col-12" style="min-height: 8vh;">
    <div class="product-delevary-process">
        <div class="process-bar">
            <div class="process-bar-active" :style="{width: shipmentStatus.barStatus}"></div>
            <div class="process-bar-item-container d-flex justify-content-between align-items-center">
                <div class="process-bar-item">
                    <div class="process-bar-item-inner" :class="{'process-active' : shipmentStatus.status == 'Pending'}">
                        <div class="icon-outer">
                            <!-- {{ shipmentStatus.barStatus }} -->
                            <div class="icon" :class="{'active-icon': shipmentStatus.barStatus == '33%' || shipmentStatus.barStatus == '66.5%' || shipmentStatus.barStatus == '100%' }">
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.43472 8.26314C3.09645 7.8678 2.50136 7.8215 2.10602 8.15977C1.71067 8.49804 1.66437 9.09313 2.00264 9.48847L4.50263 12.4052L5.21867 11.7925L4.50131 12.4074C4.8409 12.8035 5.4375 12.8495 5.8336 12.5099C5.85987 12.4874 5.88462 12.4636 5.90787 12.439L14.2775 4.64933C14.6585 4.2948 14.68 3.69801 14.3255 3.31703C13.971 2.93605 13.3742 2.91451 12.9932 3.26903L5.29501 10.4336L3.43472 8.26314Z" fill="white"/>
                                </svg> 
                            </div>
                        </div>
                    </div>
                    <div class="name">ORDERD</div>
                </div>

                <div class="process-bar-item">
                    <div class="process-bar-item-inner" :class="{'process-active' : shipmentStatus.status == ('Processing' || 'Dispatch')}">
                        <div class="icon-outer">
                            <div class="icon" :class="{'active-icon': shipmentStatus.barStatus == '66.5%' || shipmentStatus.barStatus == '100%' }">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.43472 8.26314C3.09645 7.8678 2.50136 7.8215 2.10602 8.15977C1.71067 8.49804 1.66437 9.09313 2.00264 9.48847L4.50263 12.4052L5.21867 11.7925L4.50131 12.4074C4.8409 12.8035 5.4375 12.8495 5.8336 12.5099C5.85987 12.4874 5.88462 12.4636 5.90787 12.439L14.2775 4.64933C14.6585 4.2948 14.68 3.69801 14.3255 3.31703C13.971 2.93605 13.3742 2.91451 12.9932 3.26903L5.29501 10.4336L3.43472 8.26314Z" :fill="shipmentStatus.barStatus == '33%' ? 'black' : 'white'" />
                                </svg> 
                            </div>
                        </div>
                    </div>
                    <div class="name">SHIPPED</div>
                </div>

                <div class="process-bar-item">
                    <div class="process-bar-item-inner" :class="{'process-active' : shipmentStatus.status == ('Delivered' || 'Complete')}">
                        <div class="icon-outer">
                            <!-- {{ shipmentStatus.barStatus }} -->
                            <div class="icon" :class="{'active-icon': shipmentStatus.barStatus == '100%' }">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.43472 8.26314C3.09645 7.8678 2.50136 7.8215 2.10602 8.15977C1.71067 8.49804 1.66437 9.09313 2.00264 9.48847L4.50263 12.4052L5.21867 11.7925L4.50131 12.4074C4.8409 12.8035 5.4375 12.8495 5.8336 12.5099C5.85987 12.4874 5.88462 12.4636 5.90787 12.439L14.2775 4.64933C14.6585 4.2948 14.68 3.69801 14.3255 3.31703C13.971 2.93605 13.3742 2.91451 12.9932 3.26903L5.29501 10.4336L3.43472 8.26314Z" :fill="shipmentStatus.barStatus == '33%' || shipmentStatus.barStatus == '66.5%'  ? 'black' : 'white'"/>
                                </svg> 
                            </div>
                        </div>
                    </div>
                    <div class="name">DELIVERED</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: null,
    }
});

const itemRef = toRef(props, 'item');

const shipmentStatus = computed(() => {
      let status = '';
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

    return {status: status, barStatus: `${barStatus}%`};
});
</script>

<style lang="scss" scoped>
 .product-delevary-process {
    // padding-top: 80px;
    // padding-bottom: 110px;
    max-width: 900px;
    margin: auto;
    .process-bar {
        width: 100%;
        height: 5px;
        background-color: #C7C7C7;
        position: relative;
        border-radius: 5px;
        .process-bar-active {
            background-color: #2277e0;
            width: 65%;
            height: 100%;
            border-radius: 5px;
        }
        .process-bar-item-container {
            width: 80%;
            position: absolute;
            left: 50%;
            // top: 50%;
            transform: translateY(-26%) translateX(-50%);
            .process-bar-item {
                text-align: center;
                .process-bar-item-inner {
                    // width: 100px;
                    // height: 80px;
                    // background-color: #eeeeee;
                    // box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
                    text-align: center;
                    margin-bottom: 15px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .check-icon {
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        line-height: 1;
                        opacity: 0.95;
                        
                    }
                    .icon-outer {
                        width: 24px;
                        height: 24px;
                        // padding: 4px;
                        // background-image: linear-gradient(#fff, #d7d7d7);
                        border-radius: 50%;
                        display: inline-block;
                        .icon {
                            background-color: #C7C7C7;
                            border: 2px solid #fff;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 45px;
                            display: flex;
                            align-items: center;
                            
                            svg {
                                width: 25px;
                            }
                        }

                        .active-icon {
                            background-color: #2277e0;
                        }
                    }
                }
                .name {
                    font-size: 12px;
                    line-height: 1.2;
                }
                .process-active {
                    // background-color: #6f432a;
                    .icon-outer {
                        
                        .icon {
                            
                            // svg {
                            //     fill: rebeccapurple;
                            // }
                        }
                    }
                }
            }
        }
    }
}
</style>