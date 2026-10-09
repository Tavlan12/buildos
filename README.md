# BuildOS MVP

Next.js App Router, TypeScript, Tailwind, Lucide and PostgreSQL/Prisma foundation. Interactive investor demo, dark responsive dashboard, role selector, tender pipeline, spatial hierarchy, site issues, task board, daily reports, documents, team and AI assistant.

## Run

Requires Node.js 20.9+.

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Enter any valid email and a password of at least six characters. This is a clearly marked demo login, not authentication.

## Investor walkthrough

1. Enter as DIRECTOR. Open Tenders → New tender. Optionally choose PDF/DOCX/XLSX; create the preset ₸8.5B / 18-month tender.
2. Analyze tender: mocked score 78/100, margin 14%, three risk flags.
3. Mark WON → Convert to project. Conversion is idempotent. Block A, Floors 1/2 and East/West zones appear with a procurement task and critical alert.
4. Site operations → Log site issue. Upload a photo under 2 MB or simulate without one. Review suggested reinforcement issue and save.
5. AI Command Center → Ask BuildOS. Ask about Block A risks, then generate the purchase request. The request remains PENDING_APPROVAL; generating it does not place an order.

Change role in the header to explore the Foreman/PM views and permission-disabled actions. Reports and task status changes work. Document ingestion stores filenames and version numbers, not binary files. Invitations create local demo records and never send email.

## Structure

- `src/app/page.tsx`: interactive dashboard and demo authentication screens.
- `src/lib/domain.ts`: domain types, seed, role policy and workflow transitions.
- `src/app/api/demo/route.ts`: stateless demo transition API.
- `src/app/api/ai/route.ts`: deterministic, role-aware mock Q&A handler.
- `prisma/schema.prisma`: relational production-oriented schema with company-scoped composite foreign keys, zones, task/issue linkage, reports, documents and purchase requests. Money uses Decimal.

## Database preparation

Copy `.env.example` to `.env`, set DATABASE_URL to your PostgreSQL instance, then:

```powershell
npm run db:generate
npm run db:push
```

The UI currently uses localStorage and the stateless demo API, not Prisma persistence. No database is needed for the walkthrough. Prisma schema is supplied for the next implementation phase.

## Production boundary

Do not expose these demo APIs as a secure multi-tenant backend. The client supplies demo state and role. Before deployment, replace demo login with verified sessions, derive companyId and membership on the server, validate all request bodies, and load tenant-scoped data from PostgreSQL. Use transactions for tender conversion and approvals, enforce project membership, store uploads in private object storage, implement invitation acceptance and audit logs. Apply database row-level security where appropriate. AI answers here are deterministic simulations and do not analyze document/photo contents.

Browser-local state survives reloads; reset via browser storage. Layout is mobile-friendly, but full offline write synchronization/service worker support is not implemented. Organization name is editable for the current session. No accounting, payroll, HR or BIM engines are included.

## Checks

```powershell
npm run typecheck
npm run build
npx prisma validate
```

Validated: TypeScript, production build, Prisma schema, investor workflow transitions, conversion idempotency and demo role restrictions. The initial npm audit reports 12 dependency advisories (3 moderate, 9 high); compatible `npm audit fix` does not resolve them. Review and migrate affected tooling before production deployment; no forced major upgrades were applied.
