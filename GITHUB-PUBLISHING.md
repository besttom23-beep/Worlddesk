# Publish The World Desk on GitHub Pages

The code and update workflow are ready. This folder has not been published merely by building it locally.

## Assisted publishing

Connect GitHub in Codex and provide your GitHub username or an existing repository URL. Suggested repository name: `the-world-desk`. The finished source package contains no credentials, private files or personal data.

For a free GitHub account, GitHub Pages supports public repositories. If the source must stay private, check your plan before changing visibility.

## Publish through GitHub's website

1. Create an empty repository called `the-world-desk` under your account. Choose Public if you want free public Pages hosting and are comfortable sharing the source code.
2. Upload the contents of this project folder to the repository root, including `.github/workflows/publish.yml`. Do not upload `node_modules/` or `dist/`. Use the provided ZIP's contents if available; it excludes those folders.
3. Open repository **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source.
4. Open **Actions → Refresh briefing and publish → Run workflow** on `main`. Enable Actions first if GitHub requests it.
5. Wait for both build and deploy to succeed. The deployment summary and Settings → Pages will show the real website URL. Share that confirmed URL with your friend.

The first push may run before Pages is enabled. If that run fails at “Configure Pages,” finish step 3 and run it again. Do not rename the workflow file or remove the `.github` folder.

## Publish through GitHub CLI

After authenticating with `gh auth login`, substitute your real account name below. Run from this project folder, and first check that the intended repository does not already exist. The `--public` flag publishes the source code.

```sh
git init -b main
git add .
git commit -m "Build The World Desk"
gh repo create YOUR-USERNAME/the-world-desk --public --source=. --remote=origin --push
gh api --method POST repos/YOUR-USERNAME/the-world-desk/pages -f build_type=workflow
gh workflow run publish.yml
gh run list --workflow publish.yml
```

The commit requires your existing Git author identity. If Git reports it missing, configure your actual preferred name and email first. For an existing repository, inspect its history and remote instead of running the creation commands blindly.

## Ongoing updates

The schedule runs at 00:17, 06:17, 12:17 and 18:17 UTC (08:17, 14:17, 20:17 and 02:17 in Shanghai). GitHub can delay scheduled runs. In public repositories GitHub can disable scheduled workflows after 60 days without repository activity; re-enable the workflow in Actions if needed. The site displays a stale-edition warning when successful updates are over a day old.

Edit the source, run the checks, and push to `main` to publish a feature or content change. A manual workflow run updates headlines without editing code. The automatic feed snapshots are deployed as artifacts rather than committed on every run, so the repository remains quiet.

Official references: [Custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Scheduled workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
