# TAMELASA MUHAS — Association Management System

Tanzania Medical Laboratory Students Association (TAMELASA) — MUHAS Chapter.

## 🚀 Deploy kwa Vercel

### Hatua 1: Weka mradi GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/wewe/tamelasa.git
git push -u origin main
```

### Hatua 2: Unganisha Vercel
1. Nenda [vercel.com](https://vercel.com) → **New Project**
2. Import repository yako kutoka GitHub
3. Vercel itagundu mipangilio yote kiotomatiki (`vercel.json`)
4. Bonyeza **Deploy**

### Hatua 3: Weka Environment Variables kwenye Vercel
Nenda **Project Settings → Environment Variables** na ongeza:

| Variable | Thamani |
|---|---|
| `GEMINI_API_KEY` | API key yako ya Gemini |
| `VITE_SUPABASE_URL` | URL ya Supabase project yako |
| `VITE_SUPABASE_ANON_KEY` | Anon key ya Supabase |
| `VITE_PAYMENT_API_URL` | (Hiari) URL ya gateway ya malipo |

### Hatua 4: Weka Supabase Database
Ikiwa unatumia Supabase (inashauriwa kwa data ya kudumu):
1. Nenda [supabase.com](https://supabase.com) → New Project
2. Nenda **SQL Editor** na run migration:

```sql
-- Washa database kwa TAMELASA
create table if not exists members (
  id text primary key,
  "fullName" text not null,
  email text unique not null,
  phone text,
  "registrationNumber" text,
  programme text,
  "academicYear" text,
  gender text,
  "bloodGroup" text,
  "membershipCategory" text,
  "controlNumber" text,
  "paymentReference" text,
  "paymentChannel" text,
  "amountTzs" integer default 10000,
  "paymentStatus" text default 'PENDING',
  "registeredAt" timestamptz default now(),
  "verifiedAt" timestamptz,
  "submittedTxnAt" timestamptz,
  "membershipIdCard" text,
  password text,
  created_at timestamptz default now()
);

create table if not exists bills (
  "controlNumber" text primary key,
  "fullName" text,
  phone text,
  email text,
  programme text,
  "amountTzs" integer,
  purpose text,
  "createdAt" timestamptz,
  "expiresAt" timestamptz,
  status text default 'PENDING',
  "paymentReference" text,
  "paymentChannel" text,
  "paidAt" timestamptz,
  created_at timestamptz default now()
);

create table if not exists payments (
  "orderId" text primary key,
  "memberId" text,
  "memberName" text,
  email text,
  phone text,
  "amountTzs" integer,
  currency text,
  provider text,
  "controlNumber" text,
  purpose text,
  status text default 'PENDING',
  "checkoutUrl" text,
  "paymentReference" text,
  "createdAt" timestamptz,
  "paidAt" timestamptz,
  created_at timestamptz default now()
);

create table if not exists announcements (
  id text primary key,
  "refNo" text,
  title text,
  category text,
  "categoryLabel" text,
  "publishDate" text,
  "issuedBy" text,
  summary text,
  "pdfFileName" text,
  "fileSize" text,
  "isPinned" boolean default false,
  "fullPdfContent" jsonb,
  created_at timestamptz default now()
);

create table if not exists news (
  id text primary key,
  title text,
  category text,
  date text,
  summary text,
  content text,
  "imageUrl" text,
  author text,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id text primary key,
  title text,
  caption text,
  "imageUrl" text,
  category text,
  date text,
  "altText" text,
  created_at timestamptz default now()
);
```

## 🖥 Maendeleo ya Ndani (Local Development)

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# Hariri .env.local na maadili yako

npm run dev         # Anzisha frontend + backend pamoja
npm run server      # Backend peke yake (port 5000)
npm run build       # Build ya production
```

## 📁 Muundo wa Faili

```
tamelasa/
├── api/                    # Vercel Serverless Functions
│   ├── _db.ts              # Database adapter (Supabase + in-memory fallback)
│   ├── _payment.ts         # Payment service
│   ├── health.ts           # GET /api/health
│   ├── members.ts          # GET/POST /api/members
│   ├── members/[id].ts     # GET/PATCH/DELETE /api/members/:id
│   ├── bills.ts            # GET/POST /api/bills
│   ├── payments.ts         # POST /api/payments
│   ├── content.ts          # GET/POST/DELETE /api/content
│   ├── admin.ts            # POST /api/admin
│   └── pay/[orderId].ts    # GET /pay/:orderId (checkout page)
├── server/                 # Express server (local dev only)
├── src/                    # React frontend source
├── dist/                   # Built frontend (Vercel serves this)
├── vercel.json             # Vercel configuration
└── vite.config.ts          # Vite build configuration
```

## 🗄 Database

| Hali | Database | Faida | Hasara |
|---|---|---|---|
| **Bila Supabase** | In-memory | Hakuna config | Data inapotea kwenye restart |
| **Na Supabase** | PostgreSQL | Data ya kudumu | Inahitaji setup |

## API Endpoints

| Method | Endpoint | Maelezo |
|---|---|---|
| GET | `/api/health` | Hali ya mfumo |
| GET | `/api/members` | Orodha ya wanachama |
| POST | `/api/members?action=register` | Usajili wa mwanachama |
| POST | `/api/members?action=login` | Kuingia mwanachama |
| POST | `/api/members?action=submit-reference` | Kutuma kumbukumbu ya malipo |
| GET | `/api/members/:id` | Mwanachama mmoja |
| PATCH | `/api/members/:id` | Kubadilisha hali ya malipo |
| DELETE | `/api/members/:id` | Futa mwanachama |
| GET | `/api/bills` | Orodha ya bili |
| POST | `/api/bills?action=generate` | Tengeneza namba ya udhibiti |
| POST | `/api/bills?action=verify` | Thibitisha malipo |
| POST | `/api/payments?action=checkout` | Anza kikao cha malipo |
| GET | `/api/payments?orderId=xxx` | Hali ya amri |
| GET | `/api/content?kind=news` | Habari/matangazo/picha |
| POST | `/api/admin?action=login` | Kuingia msimamizi |
| GET | `/api/admin?action=stats` | Takwimu za mfumo |
| GET | `/pay/:orderId` | Ukurasa wa checkout |
