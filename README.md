# Short Link Manager

A production-quality short link manager built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Drizzle ORM, Neon Postgres, and Neon Auth.

Authenticated users can create short links, manage them from a dashboard, copy short URLs, delete links, track total clicks, and view a simple 7-day click chart for each link.

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
- Random 6-character slug generation
- Dashboard link list
- Copy-to-clipboard button
- Delete confirmation dialog
- Redirect route at `/r/[slug]`
- Click count tracking
- Link detail page with a 7-day clicks chart
- Dark mode toggle
- Loading and error boundaries
- Toast notifications

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

Create a `.env.local` file:

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

Generate Drizzle migrations:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

Start the development server:

```bash
pnpm dev
```

Open the app:

```text
http://localhost:3000
```

## Environment Variables

| Variable                  | Description                              |
| ------------------------- | ---------------------------------------- |
| `DATABASE_URL`            | Neon Postgres connection string          |
| `NEXT_PUBLIC_APP_URL`     | Base app URL used for full short links   |
| `NEON_AUTH_BASE_URL`      | Neon Auth URL from the Neon dashboard    |
| `NEON_AUTH_COOKIE_SECRET` | Random secret used for Neon Auth cookies |

## Database

The app uses two main tables:

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

## Decisions I Made

The brief says custom slugs should be unique per user, but the redirect route is `/r/[slug]`, which does not include a user identifier. If two different users created the same slug, the app would not know which destination URL to redirect to. To avoid that ambiguity, I made slugs globally unique.

I used Server Actions for mutations such as sign up, login, logout, creating links, and deleting links. Database logic is kept in `src/lib/db/` instead of being placed directly inside React components.

I used shadcn/ui components installed through the CLI instead of hand-rolling UI primitives, as requested in the brief. I also kept the project intentionally small and avoided extra features such as teams, paid plans, QR codes, or advanced analytics dashboards.

## How I Used AI Tools

I used AI tools as a development assistant to help plan the project structure, break the work into small steps, and compare the implementation against the test brief. I used AI to speed up repetitive setup tasks such as creating route files, Server Actions, validation schemas, and UI component structure. I reviewed and tested the code as I went, especially with `pnpm build`, because AI suggestions sometimes needed adjustment for the exact package versions, file names, or Windows PowerShell behavior. AI was especially useful for debugging setup issues with pnpm build approvals, missing shadcn utility files, Drizzle configuration, and organizing the app around Next.js App Router conventions. The final implementation decisions, testing, commits, and fixes were made while checking the actual project behavior locally.

## Deployed URL

TODO: Add Vercel URL after deployment.

## GitHub Repo

https://github.com/radyalz/linkshortener

## License

MIT License. See `LICENSE`.

## not done based on breif
Deploy to Vercel
Add production env vars
Test live app
Update README with deployed URL
Final push

## not done based on me
ui is to much simple 
still the dark mode light mode has issues 
i think some of the ui's are dull and need fixing 
database manager of the user is shit and there is no role for it so i need it to be fixxed 
there is no lang 
and there is no animation
the analytics is simple we could make it beeter
we could add stuff to the ui to make it better 



what we did now after doing anything after ai 

1. Fix/verify Neon Auth session plumbing
2. Add app-side roles/user_profiles/login_events tables
3. Record successful/failed login attempts
4. Attach every logged-in user to a default role



## 4. Commit the auth fix

First remove the temporary debug page after confirming `hasSession: true`:

```powershell
Remove-Item -Recurse -Force src\app\debug-session