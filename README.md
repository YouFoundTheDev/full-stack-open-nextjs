# Full Stack Open Next.js Exercises

This project now covers:

- Chapter 2 blog list and new blog form
- Chapter 3 Drizzle ORM and PostgreSQL setup for blogs

## Local setup

Create `.env.local` from `.env.local.example` and add your Neon/Vercel Postgres connection string:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
```

Then run:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

## Production check

```bash
npm run build
npm run start
```

## Database tools

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```
