# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Vue 3 plugin (`@smartsquad/ionic-vue-app-version-check`) that checks app versions in Ionic/Capacitor applications against Firebase Remote Config. It compares the installed app version with remote configuration values to trigger optional or mandatory update flows.

## Commands

```bash
pnpm install    # Install dependencies
pnpm build      # Compile TypeScript to dist/
pnpm lint       # Run ESLint via vue-cli-service
```

## Architecture

The plugin exposes a Vue 3 plugin with a `$avc` global property:

- **[app-version-check.ts](src/app-version-check.ts)**: Plugin entry point. Defines `IAppVersionCheckOptions` interface and installs the `$avc.verify()` method on Vue components.

- **[verify.ts](src/verify.ts)**: Core verification logic. Fetches `app_versions` from Firebase Remote Config (JSON with `c` for current and `m` for mandatory versions), compares against the device's app version using semver, and triggers either `mandatoryUpdateAction` or shows an alert via Ionic's `alertController`.

## Remote Config Format

The Firebase Remote Config value (default key: `app_versions`) must be a JSON string:
```json
{"c": "2.0.0", "m": "1.5.0"}
```
- `c`: Current available version (shows optional update alert if app is older)
- `m`: Mandatory minimum version (triggers `mandatoryUpdateAction` if app is older)

## Peer Dependencies

Requires Firebase SDK <9 (legacy namespace API) and Vue >=3.

## Commit Message Style

- Lowercase first letter, no period at the end
- Short, descriptive messages
- Use backticks for code/package names (e.g., `update the \`@ionic/vue\` library`)
- Release commits: `release \`X.X.X\``

## Changelog Style

Follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format with `### Added`, `### Changed`, etc. subsections under version headers.
