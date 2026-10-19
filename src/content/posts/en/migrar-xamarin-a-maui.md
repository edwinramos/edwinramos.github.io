---
title: "Migrating from Xamarin.Forms to .NET MAUI (example post)"
description: EXAMPLE post to show the devlog format. Replace or delete it from the CMS.
date: 2026-10-12
tags: [.NET MAUI, Xamarin, C#]
project: .NET MAUI mobile app
version: v1.2.0
example: true
---
> **Example post.** This is how a post with code, lists and headings looks.

## Quick checklist

1. Upgrade to .NET 8 and the MAUI workload.
2. Replace renderers with *handlers*.
3. Review third-party dependencies.

```csharp
builder.ConfigureMauiHandlers(handlers =>
{
    handlers.AddHandler<MyEntry, MyEntryHandler>();
});
```

## Conclusion

Write your real learnings here.
