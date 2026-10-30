-- Podcast Studio launcher: opens Safari on the Riverside dashboard, the
-- Riverside Studio Mac app, and Logi Tune, and stages each window at the
-- exact layout captured 2026-10-30 on the MSI 5120x1440 ultrawide.
-- Run by the Desktop icon (10_app/podcast_studio_launcher.applescript) via
-- osascript, so edit this file freely; the icon never needs rebuilding.
-- Permissions: only "control Safari" (Automation). Window moves for the other
-- apps go through Hammerspoon's hs CLI (hs.ipc in ~/.hammerspoon/init.lua),
-- because macOS ignores Accessibility grants for this ad-hoc-signed icon.

property riversideURL : "https://riverside.com/dashboard/studios/turner-tomlinsons-studio/projects/"

-- {bundle id, app name, x, y, width, height}
property layout : {¬
	{"RVS-Riverside.fm-Mac", "Riverside Studio", 2078, 121, 1280, 800}, ¬
	{"com.logitech.logitune", "Logi Tune", 3372, 119, 401, 798}}

-- Safari: Riverside dashboard at 955,116, 1111x802
tell application "Safari"
	activate
	-- reuse a window already on riverside.com instead of stacking duplicates
	set target to missing value
	repeat with win in windows
		try
			if URL of current tab of win contains "riverside.com" then
				set target to win
				exit repeat
			end if
		end try
	end repeat
	if target is missing value then
		make new document with properties {URL:riversideURL}
		delay 1
		set target to front window
	end if
	set bounds of target to {955, 116, 955 + 1111, 116 + 802}
end tell

repeat with spec in layout
	set {bundleID, appName, x, y, w, h} to spec
	try
		tell application appName to activate
		my placeWindow(bundleID, x, y, w, h)
	on error errMsg number errNum
		my logLine(appName & " FAILED " & errNum & ": " & errMsg)
	end try
end repeat

on placeWindow(bundleID, x, y, w, h)
	-- Hammerspoon (already trusted for Accessibility) does the move, so this
	-- unsigned icon never needs Accessibility itself. Waits up to ~20 s.
	set lua to "local a=hs.application.get('" & bundleID & "'); local win=a and a:mainWindow(); " & ¬
		"if not win then return 'nowin' end; win:setFrame({x=" & x & ",y=" & y & ",w=" & w & ",h=" & h & "}); return 'ok'"
	set result_ to "nowin"
	repeat 40 times
		set result_ to do shell script "/opt/homebrew/bin/hs -q -c " & quoted form of lua & " 2>&1 | tail -1"
		if result_ is "ok" then exit repeat
		delay 0.5
	end repeat
	my logLine(bundleID & " -> " & result_ & " at " & x & "," & y)
end placeWindow

on logLine(msg)
	-- ~/Library/Logs/PodcastStudio.log — read this when a window doesn't move
	set stamp to do shell script "date '+%Y-%m-%d %H:%M:%S'"
	do shell script "echo " & quoted form of (stamp & " " & msg) & " >> ~/Library/Logs/PodcastStudio.log"
end logLine
