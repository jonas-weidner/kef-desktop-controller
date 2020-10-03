import { InputSource } from "@/enums";
import net from "net";
import PromiseSocket from "promise-socket";

export default class KefController {
    private socket: net.Socket = null!;
    private promiseSocket: PromiseSocket<net.Socket> = null!;
    private connected = false;
    private modeMessages = {
        "WIFI": [0x53, 0x30, 0x81, 0x12, 0x82],
        "OPTICAL": [0x53, 0x30, 0x81, 0x1B, 0x00],
        "BLUETOOTH": [0x53, 0x30, 0x81, 0x19, 0xAD],
        "AUX": [0x53, 0x30, 0x81, 0x1B, 0x00],
        "USB": [0x53, 0x30, 0x81, 0x1C, 0xF7]
    }

    constructor() {
        this.createSocket();
    }

    private createSocket() {
        this.socket = new net.Socket();
        this.promiseSocket = new PromiseSocket(this.socket);
    }

    private destroySocket() {
        this.socket = null!;
        this.promiseSocket = null!;
    }

    private async delay(ms: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    private async openConnection(): Promise<void> {
        if (!this.promiseSocket || !this.connected) {
            this.createSocket();
            this.connected = true;
            await this.promiseSocket.connect(50001, "192.168.1.218");
        }
    }

    public async closeConnection(): Promise<void> {
        if (this.promiseSocket && this.connected) {
            this.connected = false;
            await this.promiseSocket.end();
            this.destroySocket();
        }
    }

    public async setSource(mode: InputSource): Promise<void> {
        await this.openConnection();
        // @ts-ignore
        const msg = Buffer.from(this.modeMessages[mode]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }

    public async turnOff(): Promise<void> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x53, 0x30, 0x81, 0x9B, 0x0B]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }

    public async getVolume(): Promise<number> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x47, 0x25, 0x80]);
        await this.promiseSocket.write(msg);
        const response = await this.promiseSocket.read(5);
        const bufferArray = Array.prototype.slice.call(response, 0);
        await this.closeConnection();
        await this.delay(200);
        if (bufferArray.length === 5) return bufferArray[3];
        return -1;
    }

    public async getSubDb(): Promise<number> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x47, 0x2D, 0x80]);
        await this.promiseSocket.write(msg);
        const response = await this.promiseSocket.read(5);
        const bufferArray = Array.prototype.slice.call(response, 0);
        await this.closeConnection();
        await this.delay(200);
        if (bufferArray.length === 5) return (bufferArray[3]-128)*1-10;
        return -1;
    }
    public async getSubHz(): Promise<number> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x47, 0x2C, 0x80]);
        await this.promiseSocket.write(msg);
        const response = await this.promiseSocket.read(5);
        const bufferArray = Array.prototype.slice.call(response, 0);
        await this.closeConnection();
        await this.delay(200);
        if (bufferArray.length === 5) return (bufferArray[3]-128)*5+40;
        return -1;
    }

    public async getSource(): Promise<InputSource> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x47, 0x30, 0x80]);
        await this.promiseSocket.write(msg);
        const response = await this.promiseSocket.read(5);
        const bufferArray = Array.prototype.slice.call(response, 0);
        await this.closeConnection();
        await this.delay(200);
        if (bufferArray.length === 5) return this.convertMode(bufferArray[3]);
        return InputSource.Off;
    }

    private convertMode(modeNumber: number): InputSource {
        const table = {
            18: InputSource.WiFi,
            25: InputSource.Bluetooth,
            27: InputSource.Optical,
            31: InputSource.Bluetooth
        };

        // @ts-ignore
        if (!table[modeNumber]) return InputSource.Off;
        // @ts-ignore
        return table[modeNumber];
    }

    public async setVolume(volume: number): Promise<void> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x53, 0x25, 0x81, `0x${volume.toString(16)}`, 0x1A]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }

    public async setSubDb(db: number): Promise<void> {
        if (!this.connected) await this.openConnection();
        const convertedDb = (db + 10)/1 + 128;
        const msg = Buffer.from([0x53, 0x2D, 0x81, `0x${convertedDb.toString(16)}`, 0x1A]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }

    public async setSubHz(hz: number): Promise<void> {
        if (!this.connected) await this.openConnection();
        const convertedHz = (hz - 40) / 5 +128;
        const msg = Buffer.from([0x53, 0x2C, 0x81, `0x${convertedHz.toString(16)}`, 0x1A]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }



    public async playPause(): Promise<void> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x53, 0x31, 0x81, 0x81]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }

    public async nextTrack(): Promise<void> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x53, 0x31, 0x81, 0x82]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }

    public async previousTrack(): Promise<void> {
        if (!this.connected) await this.openConnection();
        const msg = Buffer.from([0x53, 0x31, 0x81, 0x83]);
        await this.promiseSocket.write(msg);
        await this.closeConnection();
        await this.delay(200);
    }
}