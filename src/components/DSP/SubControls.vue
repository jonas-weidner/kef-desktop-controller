<template>
    <div class="mt-8">
        <h4 class="text-white text-xl text-center font-semibold">Subwoofer Volume</h4>
        <vue-slider
            class="mt-10"
            :max="10"
            :min="-10"
            v-model="db"
            @drag-end="setSubDb"
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
        return { db: 0 as number };
    },
    methods: {
        async getSubDb() {
            if (this.controller)
                this.db = await this.controller.getSubDb();
        },
        async setSubDb() {
            await this.controller.setSubDb(this.db);
        }
    }
});
</script>