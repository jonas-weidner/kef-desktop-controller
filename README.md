# KEF Speaker Controller
An electron-based controller for KEF wireless speakers. Only tested with KEF LSX, but the LS50 should work as well.

<img src="https://i.imgur.com/6OPbLZ1.jpg" width="500">

## Getting started
Before you get started, make sure to change the IP address to your speaker's address. You can do so in src/utils/kefControl.ts on line 39.

```
yarn
yarn electron:serve
```

## Features & Todos
- [x] Turn on/off
- [x] Input source switching
- [x] Volume slider
- [x] Playback controls
- [x] Playback controls design
- [x] Include electron-builder
- [x] App Icon
- [x] Speaker IP settings
- [x] Check for status changes (volume, source ...)
- [ ] Auto-updater
- [ ] Release first bundled version
- [ ] Mute button
- [ ] Sound signature controls (In Progress, subwoofer controls already implemented)
- [ ] Transform into menubar application
- [ ] Search for speakers in network