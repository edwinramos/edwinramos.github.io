---
title: CRM móvil de Maximizer → .NET MAUI
summary: Migración crítica de la app móvil de CRM de Maximizer de Xamarin.Forms a .NET 8 con .NET MAUI, para iOS y Android.
status: live
category: mobile
kind: App móvil · Maximizer
tags: [.NET 8, .NET MAUI, C#, XAML, LiteDB, FCM, Azure DevOps]
metric: "-45% tiempo de depuración"
icon: phone_android
order: 2
date: 2026-01-01
example: false
draft: true # hidden: names a (former) employer — rewrite anonymously before publishing
---
## Contexto

Maximizer es una empresa SaaS canadiense que atiende a más de 120,000 negocios con soluciones CRM todo en uno. Su app móvil estaba construida con Xamarin.Forms, una plataforma en proceso de obsolescencia.

## Qué hice (ene 2024 – ene 2026)

- Lideré la migración de la app de **Xamarin.Forms a .NET 8 con .NET MAUI**, resolviendo problemas de mantenibilidad y la obsolescencia de la plataforma.
- Rediseñé la arquitectura de UI y lógica de negocio con funciones modernas de MAUI y C#, mejorando la reutilización de código, la estabilidad y la respuesta en iOS y Android.
- Integré notificaciones push con **Firebase Cloud Messaging** e implementé registro de fallos y seguimiento estructurado de actividad.
- Añadí registro de eventos y almacenamiento ligero con **LiteDB**, habilitando funcionamiento sin conexión y mejor telemetría.
- Automaticé los pipelines de publicación en **Google Play y App Store** con **Azure DevOps**.

## Resultados

- **45% menos** tiempo de depuración de incidentes en producción.
- Entregas más rápidas y con menos errores humanos gracias a la publicación automatizada.
