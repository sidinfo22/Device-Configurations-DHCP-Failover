# DHCP Failover Project Workflow

This project is prepared for GitHub Pages static hosting.

## Publish Setup

1. Run `npm install`
2. Run `npm run build:pages`
3. Push the repository to GitHub
4. In GitHub Pages settings, publish from the `docs` folder on your default branch

## Notes

- The production build outputs to `docs/`
- Routing uses `HashRouter`, which works on GitHub Pages without server rewrites
- Static assets use relative/base-aware paths for repo-subfolder hosting
- The contact form falls back to `mailto:` on GitHub Pages because the local `/api/contact` server is not available there
