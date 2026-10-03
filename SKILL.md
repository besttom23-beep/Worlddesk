---
name: world-desk-maintenance
description: Maintain The World Desk news website, including adding or removing sources, courses and interviews, changing features, fixing headline refreshes, and preparing GitHub Pages releases. Use for this project, not unrelated news research or other websites.
---

# The World Desk maintenance

Work from the repository containing this file. It is a portable static website for an English-speaking reader, with a central rolling news briefing, sidebars of free resources, and long-form interviews. The user prefers reputable international publishers and open university material, with a visually distinctive editorial layout.

## Where changes belong

- `public/data/catalog.json`: newsrooms, interview/podcast channels, journals, courses and featured conversations. Add, remove or reorder entries here. Preserve stable unique IDs. Descriptions should explain the resource, not market it.
- `config/feeds.json`: automated headline sources, their actual endpoint, parsing mode and fallback topic.
- `scripts/news-core.mjs`: feed parsing, timestamp validation, deduplication and topic assignment.
- `scripts/refresh-news.mjs`: network refresh and atomic snapshot replacement.
- `public/data/news.json`: generated fallback snapshot. Do not invent or hand-edit news; regenerate it with `npm run refresh`.
- `public/index.html`, `public/styles.css`, `public/app.js`, `public/lib.js`: structure, editorial design, interactions and shared client logic.
- `.github/workflows/publish.yml`: six-hour refresh and GitHub Pages deployment. All browser asset paths must remain relative for project Pages URLs.

## Editorial constraints

Check actual URLs and current access before adding resources. Prefer official publisher, university and channel pages. Distinguish free full material, free selections and free registration; never describe an entire subscription archive as free. Paid certificates do not make otherwise open lecture videos paid, but say what is included.

Reuters and Bloomberg are linked through public YouTube channels. Their paid article services are not bypassed. Xinhua's legacy English RSS endpoint was stale; the supported adapter reads headlines from its dated current English index. If that markup changes, update the adapter and verify current publication dates.

Keep publisher attribution and links beside every headline. Never copy full articles, invent quotes or reset publication dates. Keep state/public/commercial perspectives visible in access notes. Interviews represent the guests' views, not independently verified claims. Do not describe basic URL checks or YouTube oEmbed success as proof of playback in every region.

## Features and cleanup

Preserve the three-column desktop arrangement and mobile reading order: briefing first, then source/learning collections. Preserve keyboard focus, native dialog dismissal, reduced-motion behavior, pause controls and original video/transcript alternatives. Load YouTube only on an explicit play action. Treat feed content as untrusted: escape text and allow HTTPS URLs only.

For removals, inspect references before deleting. Remove obsolete catalogue entries and their unique assets, but do not remove another source's shared assets or unrelated files. For a new feature, implement the requested behavior in the smallest appropriate module and update only documentation that becomes inaccurate.

## Validate and publish

Run `npm ci` after dependency changes, `npm run check`, and `npm run build`. Run `npm run refresh` when changing feeds. Verify source-level failures retain eligible prior data and leave `lastSuccessfulAt` unchanged. A full failure must never get a fresh `generatedAt` timestamp.

Use `npm start` for a local preview. Check desktop and narrow mobile, category filters, carousel navigation/pause, load-more, video close, and empty/error states for affected UI changes. Keep the main reading text legible and avoid horizontal overflow.

Read `GITHUB-PUBLISHING.md` for publication. Inspect the configured remote and authenticated account; never guess the account or overwrite an existing repository. Push/deploy only within the user's current authorization. Confirm the GitHub Pages workflow succeeds before announcing a public URL. Automatic schedules can be delayed or disabled after inactivity; the UI must continue showing real update age.

This skill is distributed with the code. To make it automatically discoverable, copy this file into `.agents/skills/world-desk-maintenance/SKILL.md` in the user's working repository or install it into their personal skills directory when they request that installation.
