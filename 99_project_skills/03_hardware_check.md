# Skill — `/hardware-check`

**File:** `99_project_skills/03_hardware_check.md`
**Surface:** `10_app/machine.html?view=hardware` (data: `10_app/hardware_data.js`)
**Invoked when:** gear changes, before a recording session, or the operator says "check the hardware" / "test the mic/camera".

## Probe recipe (read-only, ~1 minute)

1. **Enumerate:** `system_profiler SPCameraDataType SPAudioDataType` — confirm Logitech BRIO and RØDE PodMic USB are present; note the macOS *default input* (it has historically been the MacBook Air mic — a trap).
2. **USB tree:** `system_profiler SPUSBHostDataType` — per device record Link Speed and USB Product Version (bcdDevice). The RØDE's bcdDevice maps to firmware (0x0119 = v1.1.9). The Brio should read 5 Gb/s; 480 Mb/s means a USB-2-only cable and no 4K.
3. **Device indices:** `ffmpeg -f avfoundation -list_devices true -i ""`.
4. **Mic level test:** cue the operator AUDIBLY first (`say "...talk for ten seconds, starting now"`) — terminal prompts go unseen. Capture `ffmpeg -f avfoundation -i ":<rode index>" -t 10 -ar 48000 test.wav`, then `astats`/`volumedetect`. Healthy speech: peaks around −12 to −6 dBFS, no 0 dBFS clipping. Near −50 dBFS peaks = silence or gain far too low; re-cue before concluding.
5. **Camera frame:** `ffmpeg -f avfoundation -framerate 30.000030 -video_size 1920x1080 -pixel_format nv12 -i "<brio index>:none" -frames:v 3 -update 1 frame.jpg` (the odd framerate matches the device exactly; `30` fails). Look at the frame: framing and exposure, not the person's appearance.
6. **Firmware:** RØDE → RØDE Central. Brio → Logi Tune (the only reader of its firmware version).

## Recording results

Append a new entry to `checks[]` in `hardware_data.js` (newest first, never rewrite old entries), update each device's `status`/`verdict`/`todo`, bump `lastProbe`. Statuses: `ready`, `attention`, `warning`. Test media goes in the session scratchpad, never the repo (public).
