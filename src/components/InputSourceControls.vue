<template>
    <div>
        <h3 class="text-white text-xl text-center font-semibold">Input Source</h3>
        <div class="flex justify-center items-center mt-3">
            <vs-select
                class="mx-1"
                placeholder="Input source"
                v-model="inputSource"
                @input="setMode"
            >
                <vs-option label="WiFi" value="WIFI">WiFi</vs-option>
                <vs-option label="Bluetooth" value="BLUETOOTH">Bluetooth</vs-option>
                <vs-option label="Optical" value="OPTICAL">Optical</vs-option>
                <vs-option label="Aux" value="AUX">Aux</vs-option>
                <vs-option label="Usb" value="USB">Usb</vs-option>
                <vs-option label="Off" value="OFF">Off</vs-option>
            </vs-select>

            <vs-button
                icon
                color="danger"
                border
                :active="this.inputSource === 'OFF'"
                @click="turnOff"
                class="mx-1"
            >
                <i class='bx bx-power-off'></i>
            </vs-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import KefController from "../utils/kefControl";
import { InputSource } from "@/enums";

export default Vue.extend({
    props: {
        controller: {
            required: true,
            type: Object as () => KefController || null
        },
        value: {
            required: true,
            type: String as () => InputSource
        }
    },
    data() {
        return { volume: 50 as number };
    },
    computed: {
        inputSource: {
            get(): InputSource {
                return this.value as InputSource;
            },
            set(source: InputSource) {
                this.$emit("input", source);
            }
        }
    },
    methods: {
        async setMode(event: InputSource) {
            await this.controller.setSource(event);
        },
        async turnOff() {
            await this.controller.turnOff();
            this.inputSource = InputSource.Off;
        }
    }
});
</script>