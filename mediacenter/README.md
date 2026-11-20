# Marquee: free media center

A single-page, no-build media center that runs in any modern browser. It's live at `/mediacenter/` on GitHub Pages and also works when you open `index.html` from disk.

| Tab | Source | Why it's legal |
| --- | --- | --- |
| Movies, TV, Documentaries, Videos | Internet Archive (`feature_films`, `classic_tv`, `film_noir`, `prelinger`, `nasa`, …) | Public domain or Creative Commons |
| Music | Internet Archive Live Music Archive (`etree`), `netlabels`, `oldtimeradio` | Artists allow free distribution, or CC-licensed |
| Radio | Radio Browser community directory | Streams come straight from each broadcaster |
| Podcasts | Apple Podcasts search/lookup API | Episodes play from the publisher's own feed |
| My Files | Browser File API | Your own files, read locally and never uploaded |

Features: global search, resume where you left off (Continue row), Saved list, multi-part/episode playlists with auto-advance, a persistent audio player bar, full-screen video overlay, media-key/lock-screen controls (Media Session), keyboard shortcuts (`/` search, `Space` play/pause, `←/→` seek 10s, `F` fullscreen, `Esc` close), and a mobile layout.

Everything is client-side. Progress, saved items and volume are kept in `localStorage`.

The **Go further** tab lists the open-source tools that make this a full home setup: VLC, Jellyfin, Kodi, Navidrome, AntennaPod, HandBrake, plus free library services (Kanopy, Hoopla) and ad-supported ones (Tubi, Pluto TV).
