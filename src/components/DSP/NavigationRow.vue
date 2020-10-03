<template>
    <div>
        <vs-button
            icon
            border
            @click="$emit('back')"
            class="mx-1"
        >
           <i class='bx bxs-left-arrow-alt' ></i>
        </vs-button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>