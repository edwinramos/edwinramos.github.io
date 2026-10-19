---
title: "The site now revolves around my apps"
description: "An apps-first home page, an Apps section with version history and per-app RSS, and Instagram-ready images for every update."
date: 2026-10-19T18:00:00-04:00
tags: [Astro, Devlog, Instagram]
app: portafolio-devlog
version: v0.2
example: false
---
This site exists to showcase the apps I build and to share how I keep improving them. In this version I reorganized it around that idea.

## What changed

- **Apps-first home page**: at the top is the app I'm currently working on, followed by the app catalog and the latest updates.
- **"Projects" is now "Apps"**. Old `/projects/` links redirect to `/apps/` automatically.
- **Every app has its own page** with Google Play / App Store buttons (once published), beta access, a screenshots gallery, "What's new" and an **update history** with its own RSS feed.
- **Every devlog update can be linked to an app** and a version, like this one (v0.2).
- **Instagram kit**: when the site is built, a 1080×1080 square image is generated automatically for each update, along with the link-preview image (1200×630) and a copy-ready caption with the link and hashtags.
- The **About** page was reworked to cover what I do and how I work.

## The flow from now on

1. I improve an app.
2. I post the update here.
3. I download the image, copy the caption and share it on Instagram.

Everything still costs $0: the site is built with Astro on GitHub Actions and hosted on GitHub Pages.
