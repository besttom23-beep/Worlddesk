# The World Desk

An English-language news and learning website, made as a gift for a curious mind.

The central briefing covers politics, conflict, AI/technology and business. Left and right columns bring together seven international newsrooms, five interview/podcast channels, three analysis/journal collections and seven university courses. Featured conversations include Jensen Huang, Demis Hassabis and António Guterres.

## Preview

Install Node.js 20 or newer, open a terminal in this folder, and run:

```sh
npm start
```

Open the local address printed in the terminal. Windows users can also double-click `START-PREVIEW.cmd`. The preview server only needs Node; the checked-in news snapshot makes the first preview usable immediately.

For development and headline updates:

```sh
npm ci
npm run refresh
npm run check
npm run build
```

The deployable website is generated in `dist/`. Only `public/` contents are published; repository documentation, scripts, tests and dependencies stay out of the site.

## Publish and give it to your friend

Follow [GITHUB-PUBLISHING.md](GITHUB-PUBLISHING.md). The included GitHub Actions workflow fetches headlines and publishes GitHub Pages on main-branch pushes, manual runs and every six hours. It does not need a paid news API or an API key.

GitHub authentication and a repository destination are required before a real public URL can be created. Local builds and a prepared workflow are not proof of a deployed website.

## Maintain it

The reusable [SKILL.md](SKILL.md) explains the source map, curation standards, data model and release checks. `AGENTS.md` tells future coding sessions to consult it. For simple additions or removals, edit `public/data/catalog.json`. For news feed changes, edit `config/feeds.json` and run a refresh and the tests.

To personalize the gift message, edit `.masthead-note` and the footer text in `public/index.html`.

## How freshness and access work

- The five active adapters fetch Reuters and Bloomberg public YouTube feeds, the current Xinhua English world index, and France 24 and Al Jazeera RSS feeds. Only titles, URLs, attribution and dates are stored.
- Current Xinhua index links carry a date but not a reliable publication time, so the UI displays a calendar date without inventing an exact time.
- Topics use keyword rules. The briefing is a source-attributed feed, not a human fact-check or a claim to rank every important global event. Untagged general-interest and obvious sports stories are excluded.
- Failed sources retain eligible saved headlines for at most seven days. Before refreshing in GitHub, the workflow tries to recover the previous live snapshot. An all-source failure never receives a new successful-update timestamp. A stale banner appears after 24 hours without a successful update.
- “Refresh” fetches the latest published edition, not a new publisher crawl. The browser also checks every 15 minutes. The carousel rotates every 10 seconds, pauses on hover/focus, and starts paused for reduced-motion users.
- Public YouTube videos do not require a paid subscription, but playback can still depend on region, network, age or publisher restrictions. Direct-source and transcript/episode links remain available. No paywall is bypassed.
- Course badges distinguish free lecture videos from free course materials; third-party reading lists may contain books that are not freely available. Only selected free journal articles or a current free issue are linked, not a promise of free full archives.

`SOURCE-CHECKS.json` records the actual URL and video-metadata checks, including transient failures. These are not guarantees of playback in every country.

## Source acknowledgments

All linked articles, video thumbnails, videos, trademarks and course material belong to their publishers. This independent, noncommercial discovery website is not affiliated with them. It links to publishers rather than copying full articles or hosting their videos. Review feed use terms if expanding into a commercial or large-scale service.

Design uses DM Sans and Instrument Serif from Google Fonts, with system-font fallbacks. No analytics or user accounts are included. Videos load through YouTube’s privacy-enhanced embed only after an explicit play action; thumbnail and font requests can still contact third parties.
