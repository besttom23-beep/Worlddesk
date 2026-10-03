# Delivery checks — 3 October 2026

## Passed

- All five configured headline sources fetched successfully in the final refresh: Reuters YouTube, Bloomberg Television YouTube, Xinhua English, France 24 and Al Jazeera. The snapshot contained 47 unique, dated, topic-matched headlines at that check; it changes with later updates.
- Eleven automated tests passed, covering RSS and Atom parsing, stale/future/unsafe input rejection, Xinhua calendar dates, partial and complete feed failures, deduplication, category filtering, escaping and catalog integrity.
- Production static build completed successfully.
- Browser checks passed at 320, 390, 768, 1024, 1440 and 1920 pixels without horizontal overflow. Category controls, headline navigation/pause, load-more, native video dialog, Escape dismissal and iframe teardown were exercised.
- Reduced-motion preference starts headline rotation paused.
- A simulated old snapshot displayed the stale-edition banner. A simulated unavailable snapshot displayed recovery guidance and retained the resource directory.
- No application JavaScript errors were recorded in the interaction checks. Both featured video thumbnails loaded.
- The maintenance skill passed the bundled skill validator.
- France 24's initial guessed channel handle returned 404; it was replaced with the channel ID linked from France 24's official site, which returned 200. AP's site presented a browser challenge, so the card now links to its confirmed public YouTube channel.

## Limits and remaining publication step

- URL status and YouTube oEmbed metadata were checked. They establish the resource exists, but do not prove uninterrupted playback or free access in every region. Embedded video playback was not confirmed in the automated browser; original YouTube links and episode/transcript alternatives are provided.
- GZERO's site and Chatham House sometimes timed out from this machine. GZERO now uses its confirmed YouTube channel and a verified official interview video. Chatham House's current issue was verified through its public web page, but local network access remains unconfirmed. `SOURCE-CHECKS.json` preserves the actual URL test results, including failures.
- Public GitHub Pages deployment and scheduled execution are not yet verified. They require the owner's GitHub connection and repository destination. The included workflow has been prepared from GitHub's official Pages guidance.

## Research references

- [Stanford public policy and democracy lectures](https://cddrl.fsi.stanford.edu/lnc/moocs)
- [Yale political philosophy](https://oyc.yale.edu/political-science/plsc-114)
- [Yale European history](https://oyc.yale.edu/history/hist-202)
- [Harvard Justice](https://sandel.scholars.harvard.edu/justice)
- [MIT Causes and Prevention of War](https://ocw.mit.edu/courses/17-42-causes-and-prevention-of-war-spring-2018/)
- [Journal of Democracy free articles](https://www.journalofdemocracy.org/articles/free/)
- [Chatham House's current issue](https://www.chathamhouse.org/publications/the-world-today)
- [Lex Fridman episode directory](https://lexfridman.com/podcast/)
- [GZERO Guterres interview](https://www.youtube.com/watch?v=36wNibURU-w)
- [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
