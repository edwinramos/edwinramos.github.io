---
title: Maximizer mobile CRM → .NET MAUI
summary: Critical migration of Maximizer's mobile CRM app from Xamarin.Forms to .NET 8 with .NET MAUI, for iOS and Android.
status: live
category: mobile
kind: Mobile app · Maximizer
tags: [.NET 8, .NET MAUI, C#, XAML, LiteDB, FCM, Azure DevOps]
metric: "-45% debugging time"
icon: phone_android
order: 2
date: 2026-01-01
example: false
draft: true # hidden: names a (former) employer — rewrite anonymously before publishing
---
## Context

Maximizer is a Canadian SaaS company serving 120,000+ businesses with all-in-one CRM solutions. Its mobile app was built on Xamarin.Forms, a platform facing deprecation.

## What I did (Jan 2024 – Jan 2026)

- Led the migration of the app from **Xamarin.Forms to .NET 8 with .NET MAUI**, addressing maintainability and platform deprecation concerns.
- Redesigned the UI and business logic architecture using modern MAUI and C# features, improving code reuse, stability, and responsiveness across iOS and Android.
- Integrated push notifications with **Firebase Cloud Messaging** and implemented crash logging and structured activity tracking.
- Added in-app event logging and lightweight storage via **LiteDB**, enabling offline functionality and enhanced telemetry.
- Automated release pipelines for **Google Play and the App Store** via **Azure DevOps**.

## Results

- **45% less** production incident debugging time.
- Faster deliveries with less human error thanks to automated publishing.
