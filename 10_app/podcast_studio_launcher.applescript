-- Desktop "Podcast Studio" icon: a fixed wrapper that runs the layout script
-- in the repo. Edit 10_app/podcast_studio.applescript freely; this icon never
-- needs rebuilding, so its macOS permissions (Accessibility + Automation)
-- survive. Errors land in ~/Library/Logs/PodcastStudio.log.
-- Build:
--   osacompile -o ~/Desktop/"Podcast Studio.app" 10_app/podcast_studio_launcher.applescript
--   /usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string com.turnertomlinson.podcaststudio" ~/Desktop/"Podcast Studio.app"/Contents/Info.plist
--   codesign --force --deep -s - ~/Desktop/"Podcast Studio.app"
set layoutScript to "/Users/turnertomlinson/CommandCenter/Jeremy Podcast test/10_app/podcast_studio.applescript"
do shell script "osascript " & quoted form of layoutScript & " >> ~/Library/Logs/PodcastStudio.log 2>&1 || true"
