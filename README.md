## Solace Candidate Assignment

Next.js application with PostgreSQL database.

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Start PostgreSQL with Docker**

```bash
docker compose up -d
```

3. **Configure environment**

```bash
cp .env.example .env
```

4. **Push database schema**

```bash
npm run migrate:up
```

5. **Seed the database**

```bash
npm run seed
```

6. **Start the development server**

```bash
npm run dev
```

The app runs at http://localhost:3000
