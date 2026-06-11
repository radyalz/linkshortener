# Short Link Manager

A small production-quality short link manager built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Drizzle ORM, Neon Postgres, and Neon Auth.

Authenticated users can create short links, manage them from a dashboard, copy short URLs, delete links, track total clicks, and view a simple 7-day click chart for each link.

## Deployed URL

https://linkshortener-radmanalizadeh.vercel.app/

## GitHub Repo

https://github.com/radyalz/linkshortener

## Tech Stack

- Next.js 16 App Router
- TypeScript with strict mode
- Tailwind CSS v4
- shadcn/ui
- Drizzle ORM
- Neon Postgres
- Neon Auth
- Server Actions
- Zod
- next-themes
- sonner
- Recharts
- pnpm

## Features

- Email/password sign up and login
- Log out
- Protected dashboard route
- Create short links with optional custom slugs
- Server-side validation with Zod
- Random 6-character slug generation when no custom slug is provided
- Dashboard link list with slug, title, destination, click count, and created date
- Copy-to-clipboard button for full short URLs
- Delete confirmation dialog
- Clean empty state when the user has no links
- Redirect route at `/r/[slug]`
- Click count tracking on successful redirects
- Clean 404 page for missing short links
- Link detail page with destination URL, total clicks, created date, and a 7-day clicks chart
- Responsive UI for mobile and desktop
- Working dark mode toggle with `next-themes`
- Loading skeletons and error boundaries
- Toast notifications with `sonner`

## Local Setup

Clone the repository:

```bash
git clone https://github.com/radyalz/linkshortener.git
cd linkshortener
```

Install dependencies:

```bash
pnpm install
```

Create a `.env.local` file based on `.env.example`:

```env
DATABASE_URL="your-neon-postgres-connection-string"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEON_AUTH_BASE_URL="your-neon-auth-url"
NEON_AUTH_COOKIE_SECRET="your-random-cookie-secret"
```

Generate a cookie secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run the database migration:

```bash
pnpm db:migrate
```

Start the development server:

```bash
pnpm dev
```

Open the app:

```txt
http://localhost:3000
```

## Environment Variables

| Variable                  | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `DATABASE_URL`            | Neon Postgres connection string                    |
| `NEXT_PUBLIC_APP_URL`     | Base app URL used when generating full short links |
| `NEON_AUTH_BASE_URL`      | Neon Auth base URL from the Neon dashboard         |
| `NEON_AUTH_COOKIE_SECRET` | Random secret used for Neon Auth cookies           |

## Scripts

```bash
pnpm dev
```

Starts the local development server.

```bash
pnpm build
```

Builds the app for production.

```bash
pnpm start
```

Starts the production build.

```bash
pnpm lint
```

Runs linting.

```bash
pnpm db:generate
```

Generates Drizzle migration files from the schema.

```bash
pnpm db:migrate
```

Runs migrations against the Neon Postgres database.

```bash
pnpm db:studio
```

Opens Drizzle Studio.

## Database

The app uses two main application tables.

### `links`

Stores each user's short links.

Main fields:

- `id`
- `userId`
- `slug`
- `title`
- `destinationUrl`
- `clickCount`
- `createdAt`
- `updatedAt`

### `clicks`

Stores individual click events for analytics.

Main fields:

- `id`
- `linkId`
- `clickedAt`

## Decisions I Made

### Authentication route

The brief refers to a `/login` route, but the implementation uses `/authentication` because the page is a combined authentication wizard. It handles both login and signup from one email-first flow, so the route name is more accurate than `/login`.

For compatibility with the brief, `/login` redirects to `/authentication`.

### Slug uniqueness

Custom slugs are unique per user, matching the brief. Because the public redirect route is `/r/[slug]`, duplicate slugs across different users can theoretically make the redirect route ambiguous. For this test project I kept the public route simple and resolved slugs through the existing redirect lookup. In a production version, I would either keep slugs globally unique or introduce a user namespace in the public short URL.

### Server Actions and DB access

All mutations are handled with Server Actions. Database access is kept in `src/lib/db/` instead of being placed directly inside React components. Actions return controlled `{ data, error }` shaped results so raw database or auth errors are not exposed to the client.

### UI approach

The UI is intentionally small and focused on the requested short-link workflow. I used shadcn/ui primitives, Tailwind CSS, sonner, next-themes, and Recharts, but avoided extra product features such as teams, paid plans, QR codes, or a full analytics dashboard.

## How I used AI tools

I used AI tools as a development and refactoring assistant throughout the project. Roughly half of the implementation support came from AI, especially around project structure, package setup, Server Action patterns, route organization, validation flow, and later refactoring larger files into smaller components. AI also helped review the project against the brief, catch mismatches, and improve README wording.

The visual direction, interaction preferences, and final UI decisions were mostly guided by me. I iterated manually on the auth wizard, floating-label inputs, dark/light mode styling, button states, accordion-style transitions, and the overall feel of the interface. AI was useful for generating candidate code and alternative approaches, but many suggestions needed adjustment to fit the exact design I wanted and the current app structure.

The main places where AI helped most were debugging, refactoring, and checking edge cases. The places where it needed the most correction were UI taste, route naming decisions, and keeping the implementation aligned with my preferred interaction model.

## Deployment Notes

The app is deployed on Vercel. Production environment variables are configured in the Vercel project settings. `.env.local` is used only for local development and is not committed to the repository.

Before final submission, I verified the core flow:

```txt
Sign up → create short link → open /r/[slug] → return to dashboard → click count increases
```

## License

MIT License. See `LICENSE`.
