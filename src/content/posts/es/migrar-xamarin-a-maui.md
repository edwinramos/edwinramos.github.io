---
title: "Migrar de Xamarin.Forms a .NET MAUI (artículo de ejemplo)"
description: Artículo de EJEMPLO para mostrar el formato del devlog. Reemplázalo o bórralo desde el CMS.
date: 2026-10-12
tags: [.NET MAUI, Xamarin, C#]
project: App móvil .NET MAUI
version: v1.2.0
example: true
---
> **Artículo de ejemplo.** Así se ve un post con código, listas y encabezados.

## Checklist rápido

1. Actualiza a .NET 8 y el workload de MAUI.
2. Reemplaza renderers por *handlers*.
3. Revisa dependencias de terceros.

```csharp
builder.ConfigureMauiHandlers(handlers =>
{
    handlers.AddHandler<MyEntry, MyEntryHandler>();
});
```

## Conclusión

Escribe aquí tus aprendizajes reales.
