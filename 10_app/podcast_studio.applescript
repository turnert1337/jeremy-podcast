-- Podcast Studio launcher: opens Safari on the Riverside dashboard, the
-- Riverside Studio Mac app, and Logi Tune, and stages each window at the
-- exact layout captured 2026-10-30 on the MSI 5120x1440 ultrawide.
-- Run by the Desktop icon (10_app/podcast_studio_launcher.applescript) via
-- osascript, so edit this file freely; the icon never needs rebuilding.
-- Permissions: only "control Safari" (Automation). Window moves for the other
-- apps go through Hammerspoon's hs CLI (hs.ipc in ~/.hammerspoon/init.lua),
-- because macOS ignores Accessibility grants for this ad-hoc-signed icon.
--
-- Every window is VALIDATED after placement (frame read back, then re-checked
-- after a settle delay, since Electron apps can restore their own bounds).
-- Success → a 2.5 s on-screen banner. Any failure → an alert listing what failed and
-- why. Full trace: ~/Library/Logs/PodcastStudio.log

property riversideURL : "https://riverside.com/dashboard/studios/turner-tomlinsons-studio/projects/"
property hsCLI : "/opt/homebrew/bin/hs"
property tolerance : 2 -- px

-- {bundle id, app name, x, y, width, height}
property layout : {¬
	{"RVS-Riverside.fm-Mac", "Riverside Studio", 2078, 121, 1280, 800}, ¬
	{"com.logitech.logitune", "Logi Tune", 3372, 119, 401, 798}}

set failures to {}
my logLine("---- launch")

-- 0. Hammerspoon does the window moves; make sure it's up and answering
set hsProblem to my ensureHammerspoon()
if hsProblem is not "" then set end of failures to hsProblem

-- 1. Safari: Riverside dashboard at 955,116, 1111x802
try
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
		delay 0.5
		set b to bounds of target
	end tell
	if my near(item 1 of b, 955) and my near(item 2 of b, 116) and my near(item 3 of b, 2066) and my near(item 4 of b, 918) then
		my logLine("Safari OK " & my joinList(b))
	else
		set end of failures to "Safari: window ended at " & my joinList(b) & " instead of 955,116,2066,918."
	end if
on error errMsg number errNum
	set end of failures to "Safari: " & errMsg & " (" & errNum & ")"
end try

-- 2. Riverside Studio + Logi Tune via Hammerspoon
if hsProblem is "" then
	repeat with spec in layout
		set {bundleID, appName, x, y, w, h} to spec
		set r to my stageApp(bundleID, appName, x, y, w, h)
		if r is not "" then set end of failures to r
	end repeat
end if

-- 3. Report
if (count of failures) is 0 then
	my logLine("ALL OK")
	-- on-screen banner (hs.alert is non-modal and needs no notification permission)
	my hs("hs.alert.show('✓ Podcast Studio ready: Safari, Riverside, Logi Tune staged', 2.5); return 'ok'")
else
	set AppleScript's text item delimiters to linefeed & linefeed
	set msg to failures as text
	set AppleScript's text item delimiters to ""
	my logLine("FAILED: " & msg)
	my showError(msg)
end if

-- ===================================================================

on stageApp(bundleID, appName, x, y, w, h)
	-- open -a launches the app if it's quit AND reopens its window if the
	-- window was closed (plain "activate" does not reopen a closed window).
	try
		do shell script "open -a " & quoted form of appName
	on error errMsg
		return appName & ": couldn't launch (" & errMsg & ")."
	end try
	set frameLua to "{x=" & x & ",y=" & y & ",w=" & w & ",h=" & h & "}"
	set placeLua to "local a=hs.application.get('" & bundleID & "'); if not a then return 'norun' end; " & ¬
		"local win=a:mainWindow() or a:allWindows()[1]; if not win then return 'nowin' end; " & ¬
		"win:setFrame(" & frameLua & ", 0); return 'placed'"
	set checkLua to "local a=hs.application.get('" & bundleID & "'); if not a then return 'norun' end; " & ¬
		"local win=a:mainWindow() or a:allWindows()[1]; if not win then return 'nowin' end; " & ¬
		"local f=win:frame(); return string.format('%d,%d,%d,%d', f.x, f.y, f.w, f.h)"
	set lastState to ""
	-- up to ~60 s: cold launches (login screens, updaters) can be slow
	repeat with i from 1 to 120
		set lastState to my hs(placeLua)
		if lastState is "placed" then
			delay 0.4
			set got to my hs(checkLua)
			if my frameMatches(got, x, y, w, h) then
				-- settle re-check: Electron apps sometimes restore saved bounds late
				delay 1.5
				set got to my hs(checkLua)
				if my frameMatches(got, x, y, w, h) then
					my logLine(appName & " OK " & got)
					return ""
				end if
				my logLine(appName & " drifted to " & got & "; re-placing")
			else
				my logLine(appName & " landed at " & got & "; retrying")
			end if
			set lastState to "landed at " & got
		end if
		-- nudge a window into existence every ~5 s while waiting
		if (i mod 10) is 0 and (lastState is "nowin" or lastState is "norun") then
			try
				do shell script "open -a " & quoted form of appName
			end try
		end if
		delay 0.5
	end repeat
	if lastState is "norun" then return appName & ": app never started (60 s). Is it installed in /Applications?"
	if lastState is "nowin" then return appName & ": app is running but never showed a window (60 s). Click its Dock/menu-bar icon, then run Podcast Studio again."
	return appName & ": window wouldn't stay at " & x & "," & y & " " & w & "x" & h & " (last " & lastState & ")."
end stageApp

on ensureHammerspoon()
	-- the hs CLI blocks forever if Hammerspoon isn't running, so launch it
	-- first and only then ping it (each ping is also hard-capped in hs())
	try
		do shell script "pgrep -x Hammerspoon"
	on error
		my logLine("Hammerspoon not running; launching it")
		try
			do shell script "open -a Hammerspoon"
		on error errMsg
			return "Hammerspoon couldn't be launched (" & errMsg & "). It moves the Riverside and Logi Tune windows."
		end try
	end try
	repeat with i from 1 to 30
		try
			do shell script "pgrep -x Hammerspoon"
			if my hs("return 'pong'") is "pong" then return ""
		end try
		delay 0.5
	end repeat
	return "Hammerspoon isn't answering (needed to move the Riverside and Logi Tune windows). Open Hammerspoon and check that ~/.hammerspoon/init.lua still has require(\"hs.ipc\")."
end ensureHammerspoon

on hs(lua)
	try
		-- perl alarm = hard 8 s cap; the hs CLI can block indefinitely otherwise
		return do shell script "/usr/bin/perl -e 'alarm 8; exec @ARGV' " & hsCLI & " -q -t 5 -c " & quoted form of lua & " 2>&1 | tail -1"
	on error errMsg
		return "hs-error: " & errMsg
	end try
end hs

on frameMatches(got, x, y, w, h)
	try
		set AppleScript's text item delimiters to ","
		set parts to text items of got
		set AppleScript's text item delimiters to ""
		if (count of parts) is not 4 then return false
		return my near(item 1 of parts as integer, x) and my near(item 2 of parts as integer, y) and ¬
			my near(item 3 of parts as integer, w) and my near(item 4 of parts as integer, h)
	on error
		set AppleScript's text item delimiters to ""
		return false
	end try
end frameMatches

on near(a, b)
	set d to a - b
	if d < 0 then set d to -d
	return d ≤ tolerance
end near

on joinList(l)
	set AppleScript's text item delimiters to ","
	set s to l as text
	set AppleScript's text item delimiters to ""
	return s
end joinList

on showError(msg)
	-- native alert from this osascript process. NOT hs.dialog: a blocking
	-- Hammerspoon alert crashed Hammerspoon's IPC (2026-10-30 crash report)
	set body to msg & linefeed & linefeed & "Log: ~/Library/Logs/PodcastStudio.log"
	try
		activate
		set r to display alert "Podcast Studio: setup incomplete" message body as critical buttons {"Open Log", "OK"} default button "OK"
		if button returned of r is "Open Log" then do shell script "open -e ~/Library/Logs/PodcastStudio.log"
	on error errMsg
		my logLine("couldn't show alert: " & errMsg)
	end try
end showError

on logLine(msg)
	-- ~/Library/Logs/PodcastStudio.log — read this when a window doesn't move
	set stamp to do shell script "date '+%Y-%m-%d %H:%M:%S'"
	do shell script "echo " & quoted form of (stamp & " " & msg) & " >> ~/Library/Logs/PodcastStudio.log"
end logLine
