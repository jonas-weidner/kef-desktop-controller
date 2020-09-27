<template>
    <div class="mt-8">
        <h3 class="text-white text-xl text-center font-semibold">Volume</h3>
        <vue-slider
            class="mt-10"
            :max="100"
            :min="0"
            v-model="volume"
            @drag-end="setVolume"
            tooltip="always"
            height="8px"
            :processStyle="{ backgroundColor: '#2074FF' }"
            :tooltipStyle="{ backgroundColor: '#2074FF' }"
            :drag-on-click="true"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueSlider from "vue-slider-component";
import KefController from "../utils/kefControl";
import "vue-slider-component/theme/default.css";

export default Vue.extend({
    components: { VueSlider },
    props: {
        controller: {
            required: true,
            type: Object as () => KefController || null
        }
    },
    data() {
        return { volume: 50 as number };
    },
    methods: {
        async getVolume() {
            if (this.controller)
                this.volume = await this.controller.getVolume();
        },
        async setVolume() {
            await this.controller.setVolume(this.volume);
        }
    }
});
</script>