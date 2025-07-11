<template>
    <svg class="svg-icon" aria-hidden="true" :style="{ width, height, color }">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    iconClass: String,
    width: {
        type: [Number, String],
        default: '1em',
    },
    height: {
        type: [Number, String],
        default: '1em',
    },
    color: {
        type: [Number, String],
        default: '#333',
    },
});

const iconName = computed(() => {
    return `#${props.iconClass}`;
})
</script>

<style lang="less">
.svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: top;
}
</style>