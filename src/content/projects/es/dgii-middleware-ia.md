---
title: API middleware de IA generativa (DGII)
summary: API middleware que centraliza y orquesta el consumo de servicios de IA generativa, con control de cuotas, resiliencia e inferencia local de LLMs.
status: in-development
category: ai
kind: Backend · IA · DGII
tags: [.NET 8, Python, Node.js, OpenAI API, llama.cpp, Vulkan, Redis, Docker]
icon: smart_toy
order: 3
date: 2026-10-19
example: false
---
## Contexto

La DGII es la institución estatal dominicana responsable de administrar y recaudar los principales impuestos y tasas internos del país. Trabajo allí como Senior Software Analyst desde octubre de 2026.

## Qué hice

- Diseñé e implementé una **API middleware** para centralizar y orquestar el consumo de servicios de **IA generativa**, estandarizando los contratos de comunicación para clientes internos y externos.
- Implementé políticas de **rate limiting**, **control de cuotas de tokens** y mecanismos de **reintento/fallback** para asegurar alta resiliencia y control de costos.
- Integré el backend de cómputo de **Vulkan** (GPU Compute, SPIR-V) con el motor de inferencia local **llama.cpp**.
