# Marquee: free media center

A single-page, no-build media center that runs in any modern browser. It's live at `/mediacenter/` on GitHub Pages, installs as an app (manifest and service worker), and also works when you open `index.html` straight from disk.

| Tab | Source | Why it's legal |
| --- | --- | --- |
| Movies, TV, Documentaries, Videos | Internet Archive | Every query requires an explicit public-domain/CC licence, except collections that are PD by nature (Prelinger, NASA, Universal Newsreels) or hosted with permission (Computer Chronicles). Lending-only items are excluded. |
| Music | Live Music Archive (`etree`), CC netlabels, licensed old-time radio | Bands opt in to free sharing; netlabels are CC |
| Radio | Radio Browser directory (servers discovered at runtime) | Streams come straight from each broadcaster |
| Podcasts | Apple Podcasts search/lookup API | Episodes play from the publisher's own feed |
| My Files | Browser File API | Your own files, read locally and never uploaded |

## Playback details

- Picks the best browser-playable encoding for each title (h.264 first). If a file fails (404, or a codec the browser can't decode, which is detected when an MP4 loads without a picture), it falls back to the next encoding. If nothing works, it shows a link to the source page.
- All encodings of one source are grouped through the Archive's `original` field, so a film shows as one title, not seven.
- Captions: an item's `.vtt`/`.srt` files are fetched, with SRT converted to VTT, and attached as same-origin blobs.
- Resume is keyed per part: the file name for Archive items, the episode GUID for podcasts. Positions stay correct when a podcast publishes new episodes.
- Radio shows only HTTPS streams on the HTTPS site (HTTP ones would be blocked as mixed content), uses exact genre tags, and shows HLS stations only where the browser can play HLS.
- Archive descriptions are parsed with an inert `DOMParser` and rendered as text only.

## Tests

    node mediacenter/test/e2e.cjs          # 48 checks, every API mocked with real-shaped fixtures
    LIVE=1 node mediacenter/test/e2e.cjs   # also checks all 14 collections, radio, search and podcasts against the real APIs (67 checks)

The tests need Playwright's Chromium and `ffmpeg`, which generates tiny media fixtures.
