<template>
    <div class="text-white mt-10">
        <vs-input v-model="ipAddress" placeholder="Speaker IP Address" label="Speaker IP Address" />
        <vs-input
            class="mt-10"
            v-model="port"
            placeholder="Speaker Port"
            label="Speaker Port"
            type="number" />
        <div class="mt-5">
            <vs-button
                icon
                border
                @click="saveSettings"
                class="mx-1"
            >
                <div class="mr-2">Save</div>
                <i class='bx bx-save'></i>
            </vs-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import KefController from "@/utils/kefControl";
import ElectronStore from "electron-store";

export default Vue.extend({
    props: {
        controller: {
            required: true,
            type: Object as () => KefController || null
        }
    },
    data() {
        return {
            ipAddress: "",
            store: null! as ElectronStore,
            port: 50001
        };
    },
    mounted() {
        this.store = new ElectronStore();
        this.ipAddress = this.store.get("ip", "") as string;
        this.port = this.store.get("port", 50001) as number;
    },
    methods: {
        saveSettings() {
            this.store.set("ip", this.ipAddress);
            this.store.set("port", this.port);
        }
    }
});
</script>