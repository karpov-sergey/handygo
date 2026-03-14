# Handygo — Project Guidelines

## Project context

A website for local services — connecting customers with service providers in their area.

Two main sections: **Providers directory** and **Job posts**.

One account model: a user can be a customer or enable a provider profile inside the same account.

## Tech stack

- Nuxt 4, Vue 3, TypeScript
- Supabase — database and auth
- Nuxt UI + Tailwind CSS v4
- i18n (English, Polish)
- Zod — schema validation
- Prettier — code formatting
- Stripe — payments (Pro accounts)
- Telegram Bot — moderation only

## Architecture

Feature-Sliced Design (FSD). Layers:

```
app/
├── pages/      # Route pages (Nuxt file-based routing)
├── widgets/    # Composite UI blocks (Header, Footer, ProfileNavigation)
├── features/   # User actions with business logic (auth, create-offer)
├── entities/   # Domain models and their UI (user, offer)
├── shared/     # Reusable utilities, types, UI primitives, config
├── layouts/    # Page layouts
├── assets/     # Global CSS
└── plugins/    # Nuxt plugins
```

Each slice (except `shared`) follows:
```
<layer>/<slice>/
├── ui/       # Vue components
├── model/    # Composables, types, stores
└── api/      # Supabase queries
```

Public API of a slice is exported via `index.ts` at the slice root.

## Code style

### Order inside `<script setup>`
1. `ref` declarations
2. `computed` properties
3. Functions

### Formatting
- Empty line after every `if` block
- Empty line after every `const` declaration

### Types
- TypeScript types are mandatory — always type explicitly, no implicit `any`

## Naming conventions

| Element | Convention | Example |
|---|---|---|
| Vue components | PascalCase | `Header.vue`, `LanguageSwitcher.vue` |
| Composables | camelCase, `use` prefix | `useAuth.ts` |
| API modules | camelCase, `.api.ts` suffix | `offer.api.ts` |
| Types | PascalCase, in `types.ts` | `UserProfile`, `Offer` |
| Pages | kebab-case (Nuxt convention) | `profile/settings.vue` |

## Implementation status

| Feature | Status |
|---|---|
| Auth (login / signup via Supabase) | ✅ Done |
| Header with navigation | ✅ Done |
| Footer | ✅ Done |
| Profile layout & navigation | ✅ Done |
| Language switcher (EN / PL) | ✅ Done |
| Profile settings page | ✅ Done |
| Offers list page | 🚧 In progress |
| Provider public profile | 🔲 Not started |
| Create job post | 🔲 Not started |
| Provider directory | 🔲 Not started |
| Rating system | 🔲 Not started |
| Stripe payments | 🔲 Not started |
| Telegram moderation bot | 🔲 Not started |

## Best practices

- Use `useAsyncData` / `useFetch` for server-side data fetching in Nuxt
- Prefer `definePageMeta` for route metadata (auth guards, layouts)
- Keep components small and focused — extract logic into composables
- Never mutate props directly — emit events or use a store
- Use Zod for all form and API input validation
- Avoid `any` — use `unknown` and narrow types explicitly
- Prefer `const` over `let`; avoid `var`
- Handle loading and error states explicitly in UI
- Use i18n keys for all user-facing strings — no hardcoded text in templates
- Keep API calls in `.api.ts` files — never call Supabase directly from components

## Guidelines for Junie

- Always follow the code style rules above when writing or editing any code
- Always check the implementation status table before starting a task — update it when a feature is completed or its status changes
- When adding new architectural patterns or conventions that aren't documented, add them to this file
- Keep types explicit — never skip TypeScript annotations
