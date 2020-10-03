<template>
    <div class="mt-8">
        <h4 class="text-white text-xl text-center font-semibold">Subwoofer Low-Pass Frequency</h4>
        <vue-slider
            class="mt-10"
            :max="250"
            :min="40"
            :interval="5"
            v-model="hz"
            @drag-end="setSubHz"
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
import KefController from "@/utils/kefControl";
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
        return { hz: 140 as number };
    },
    methods: {
        async getSubHz() {
            if (this.controller)
                this.hz = await this.controller.getSubHz();
        },
        async setSubHz() {
            await this.controller.setSubHz(this.hz);
        }
    }
});
</script>