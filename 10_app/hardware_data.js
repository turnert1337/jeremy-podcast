/* Podcast hardware registry — read by machine.html?view=hardware.
   Update after every probe session; append to checks[] (newest first), never
   rewrite old checks. Probe recipe lives in 99_project_skills/03_hardware_check.md. */

window.HARDWARE = {
  lastProbe: "2026-10-30",
  host: "MacBook Air (Apple M5), macOS Darwin 27.2",

  devices: [
    {
      id: "rode",
      name: "RØDE PodMic USB",
      role: "Your voice — the podcast mic",
      status: "ready",
      path: "Mic → USB-C/USB-A cable → MSI MPG 491C OLED's rear USB hub (VIA Labs USB 2.0) → Mac",
      firmware: "v1.1.9 (USB bcdDevice 0x0119) — matches the latest RØDE lists",
      link: "12 Mb/s (USB full speed; normal and plenty for 48 kHz mono audio)",
      serial: "2302683A",
      verdict: "Works through the monitor hub. The worry about the hop is resolved: macOS sees it, ffmpeg captures from it, and the hub adds nothing a voice signal can notice. 10-second spoken test peaked at −11.6 dBFS with RMS peaks at −21 dB — a healthy podcast level with headroom, no clipping.",
      todo: [
        "Select it by name every session: Riverside input = \"RØDE PodMic USB\". macOS's system default input is still the MacBook Air mic, so anything set to \"Default\" records the laptop instead.",
        "Optional: install RØDE Central for gain/APHEX processing controls and future firmware (none needed today)."
      ]
    },
    {
      id: "brio",
      name: "Logitech BRIO (4K)",
      role: "Your camera",
      status: "attention",
      path: "Camera → USB-C to USB-C cable → Mac directly",
      firmware: "unknown — USB bcdDevice 0x0017; Logitech's firmware version is only readable in Logi Tune (not installed)",
      link: "480 Mb/s — USB 2.0 speed. The Brio is a 5 Gb/s USB 3 camera.",
      serial: "4EC1B308",
      verdict: "Works: 1080p30 frames come through sharp and well exposed. Two issues. (1) The USB 2.0 link means no 4K mode is offered at all — almost always a USB-C cable that's charge-grade (USB 2 data only). For Riverside this isn't blocking; 1080p is plenty for a podcast. (2) It's aimed far too low: the test frame showed torso and hand at desk height, not your face.",
      todo: [
        "Re-aim: mount it on top of the ultrawide, lens at eye level, face centered with a little headroom.",
        "Want 4K later? Swap to a USB 3 / 5 Gb/s-rated USB-C cable (or the one from the box), then re-probe — the link should read 5 Gb/s.",
        "Install Logi Tune to read and update the firmware."
      ]
    },
    {
      id: "monitor",
      name: "MSI MPG 491C OLED",
      role: "Ultrawide display + USB hub for the mic",
      status: "ready",
      path: "Mac → USB-C (DisplayPort alt mode) → monitor",
      firmware: "not readable from macOS",
      link: "5120 × 1440 display; rear hub is USB 2.0 (480 Mb/s), VIA Labs",
      serial: "—",
      verdict: "Driving the display and passing the RØDE through cleanly. Note: it also shows up as an audio OUTPUT (\"MPG 491C OLED\") — if you route sound to it, headphone monitoring gets confusing. Keep your ears on headphones.",
      todo: []
    },
    {
      id: "laptopmic",
      name: "MacBook Air Microphone",
      role: "Fallback only — never the podcast mic",
      status: "warning",
      path: "Built-in",
      firmware: "—",
      link: "—",
      serial: "—",
      verdict: "Currently the macOS DEFAULT input. That's the trap: any app on \"default\" records this instead of the RØDE.",
      todo: ["System Settings → Sound → Input → choose RØDE PodMic USB (makes the RØDE the default everywhere)."]
    }
  ],

  checks: [
    {
      date: "2026-10-30",
      summary: "First full probe after the Brio + RØDE setup.",
      results: [
        "All devices enumerate: Brio (video + 2ch mic), RØDE (1ch in / 2ch out), laptop mic, MSI display audio.",
        "RØDE through the monitor hub: capture works; first 6s take was silence (no cue), second take with a spoken cue peaked −11.6 dBFS. PASS.",
        "Brio: 1080p30 captured, sharp; aimed too low; USB 2.0 link caps it below 4K. PASS with notes.",
        "Firmware: RØDE v1.1.9 current. Brio unverified (needs Logi Tune).",
        "Next: Riverside test recording with Jeremy-ready output."
      ]
    }
  ],

  riversideSetup: [
    "Open the studio → before joining, open the device menu.",
    "Camera: Logitech BRIO. Microphone: RØDE PodMic USB. Speaker: your headphones (not the monitor, not the laptop speakers).",
    "Talk and watch Riverside's level meter bounce — speaking voice should sit mostly in the green/yellow.",
    "Record 60 seconds, stop, and wait until the upload shows 100% before closing anything."
  ]
};
