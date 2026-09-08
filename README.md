<div align="center">

# KAALYUG

### THE DIGITAL ECOSYSTEM FOR BUILDERS

**Build · Publish · Discover · Exchange**

An open-source ecosystem connecting developers, creators, digital projects, marketplace distribution, and YugCoin-powered transactions.

![Status](https://img.shields.io/badge/STATUS-ACTIVE_DEVELOPMENT-000000?style=for-the-badge&labelColor=111111)
![Open Source](https://img.shields.io/badge/OPEN_SOURCE-YES-000000?style=for-the-badge&labelColor=111111)
![Platform](https://img.shields.io/badge/PLATFORM-WEB-000000?style=for-the-badge&labelColor=111111)
![Ecosystem](https://img.shields.io/badge/ECOSYSTEM-KAALYUG-000000?style=for-the-badge&labelColor=111111)

</div>

---

## 01 — The Idea

The internet is full of people building things.

Projects are created in one place, showcased somewhere else, distributed through another service, and monetized through completely separate systems.

Kaalyug is built around connecting that lifecycle.

```
   CREATE
     │
     ▼
   PUBLISH
     │
     ▼
   DISCOVER
     │
     ▼
    USE
     │
     ▼
   EXCHANGE
     │
     ▼
    GROW
```

Kaalyug turns a digital project into more than a repository. It becomes a discoverable, presentable, distributable object inside an ecosystem.

---

## 02 — What Is Kaalyug?

Kaalyug is an open-source digital ecosystem and marketplace for software projects and digital creations.

Creators can publish projects, users can discover them, developers can contribute to them, and eligible projects can be distributed through a free or paid model.

At the center of the ecosystem is **YugCoin** — the connected wallet and transaction engine designed to handle marketplace payments.

```mermaid
flowchart TD
    A[CREATOR] --> B[PROJECT]
    B --> C[KAALYUG]
    C --> D[DISCOVERY]
    C --> E[MARKETPLACE]
    C --> F[COMMUNITY]
    E --> G{DISTRIBUTION}
    G --> H[FREE]
    G --> I[PAID]
    I --> J[YUGCOIN]
    J --> K[TRANSACTION]
    K --> L[CREATOR]
```

---

## 03 — The Ecosystem

Kaalyug is not just one page or one marketplace. It is designed as a collection of connected layers.

| Layer | Purpose |
|---|---|
| Discovery | Find projects, tools, applications and creations |
| Creators | Give builders a public identity |
| Projects | Present complete projects in a structured format |
| Marketplace | Distribute free and paid digital products |
| Community | Connect people around projects |
| YugCoin | Provide the wallet and transaction layer |
| Open Source | Enable contribution, transparency and collaboration |

The ecosystem can grow without forcing every component into a single responsibility.

---

## 04 — Projects

A project on Kaalyug isn't simply `project.zip`. It is a structured digital product.

```
┌───────────────────────────────────────────┐
│                                            │
│              PROJECT PREVIEW              │
│                                            │
├───────────────────────────────────────────┤
│  Name                                     │
│  Creator                                  │
│  Description                              │
│                                            │
│  Features                                 │
│  Version                                  │
│  Documentation                            │
│  Repository                               │
│                                            │
│  Distribution       FREE / PAID           │
│                                            │
└───────────────────────────────────────────┘
```

Projects can contain:

- Complete applications
- Websites
- Web tools
- UI projects
- Templates
- Developer utilities
- Open-source software
- Digital resources
- Community projects

---

## 05 — Free × Paid

Kaalyug intentionally supports both sides of digital distribution.

**Open**

Projects can be published freely for the community.

```
   CREATOR
     │
     ▼
   PROJECT
     │
     ▼
  COMMUNITY
     │
     ├── USE
     ├── STUDY
     ├── SHARE
     └── CONTRIBUTE
```

**Marketplace**

Creators can also publish projects as paid digital products.

```
   CREATOR
     │
     ▼
   PROJECT
     │
     ▼
  MARKETPLACE
     │
     ▼
    BUYER
     │
     ▼
   YUGCOIN
     │
     ▼
  TRANSACTION
```

The same ecosystem therefore supports open collaboration and creator monetization.

---

## 06 — YugCoin

**The transaction layer.**

YugCoin (YC) is the wallet engine designed for the Kaalyug ecosystem.

> It is a digital wallet/payment system, not a public cryptocurrency.

YugCoin is responsible for the financial logic of the ecosystem while Kaalyug remains responsible for the marketplace experience.

**Separation of responsibilities**

```mermaid
flowchart LR
    K[KAALYUG] -->|API| Y[YUGCOIN]

    K --> K1[Projects]
    K --> K2[Marketplace]
    K --> K3[Orders]
    K --> K4[Creators]

    Y --> Y1[Wallets]
    Y --> Y2[Balances]
    Y --> Y3[Transfers]
    Y --> Y4[Transactions]
```

This separation is intentional. Kaalyug knows *what* is being purchased. YugCoin knows *how* the transaction happens.

---

## 07 — The Payment Engine

A marketplace purchase follows a controlled path:

```mermaid
sequenceDiagram
    participant U as User
    participant K as Kaalyug
    participant Y as YugCoin
    participant DB as Wallet Database

    U->>K: Purchase project
    K->>K: Create pending order
    K->>Y: Authenticated payment request
    Y->>Y: Verify wallet
    Y->>Y: Check balance
    Y->>DB: Process transaction
    DB-->>Y: Transaction reference
    Y-->>K: Payment confirmed
    K->>K: Mark order as paid
    K-->>U: Grant project access
```

The important principle:

> Kaalyug does not directly modify wallet balances.

The wallet engine remains responsible for the actual transaction.

---

## 08 — Wallet Preview

YugCoin is designed to feel native to the Kaalyug experience.

A lightweight wallet preview can appear inside the marketplace:

```
╭─────────────────────────────────╮
│  YUGCOIN                        │
│                                  │
│  AVAILABLE BALANCE               │
│  1,250.50 YC                     │
│                                  │
│  YC •••••• 291                   │
│                                  │
│  ● WALLET CONNECTED              │
│                                  │
│  ─────────────────────────────   │
│          OPEN WALLET             │
╰─────────────────────────────────╯
```

And during checkout:

```
╭─────────────────────────────────╮
│  KAALYUG CHECKOUT                │
│                                  │
│  Project              250 YC     │
│                                  │
│  Wallet balance     1,250 YC     │
│  After payment      1,000 YC     │
│                                  │
│  ─────────────────────────────   │
│                                  │
│          PAY 250 YC              │
╰─────────────────────────────────╯
```

The objective is simple: the wallet should feel like part of Kaalyug — not an unrelated application.

---

## 09 — API Architecture

YugCoin already contains the wallet engine. The API becomes the controlled interface through which other applications communicate with it.

```mermaid
flowchart TD
    A[EXTERNAL APP] -->|HTTPS| B[YUGCOIN API]
    B --> C[WALLET ENGINE]
    C --> D[(DATABASE)]
```

Example endpoints can include:

```
GET  /api/wallet/balance
POST /api/payments
GET  /api/payments/:reference
GET  /api/transactions/:reference
```

The API does not duplicate the wallet logic. It exposes the existing engine through controlled, authenticated routes.

---

## 10 — System Architecture

```mermaid
flowchart TB
    USER[USER]

    subgraph K[KAALYUG]
        KF[Frontend]
        KB[Backend]
        KM[Marketplace]
        KP[Projects]
        KO[Orders]
    end

    subgraph Y[YUGCOIN]
        YF[Wallet Frontend]
        YB[Wallet Backend]
        YE[Wallet Engine]
        YT[Transactions]
    end

    DB[(Database)]

    USER --> KF
    USER --> YF

    KF --> KB
    KB --> KM
    KB --> KP
    KB --> KO

    KB -->|Authenticated API| YB

    YB --> YE
    YE --> YT
    YT --> DB
```

**Architecture principle:** Separate the responsibilities. Connect the systems.

This keeps the marketplace and wallet engine independently maintainable.

---

## 11 — Security Model

The frontend should never be trusted with sensitive transaction decisions.

The intended request path is:

```mermaid
flowchart TD
    A[USER] --> B[KAALYUG FRONTEND]
    B --> C[KAALYUG BACKEND]
    C -->|Authenticated Request| D[YUGCOIN API]
    D --> E[WALLET ENGINE]
    E --> F[(DATABASE)]
```

Core principles:

- Server-side validation
- Authenticated API communication
- Protected API credentials
- Balance verification
- Unique transaction references
- Order/payment IDs
- Idempotent payment requests
- Atomic transaction processing
- Environment-based secrets
- No private API credentials in frontend code

---

## 12 — Built for Real Hardware

Kaalyug is designed with a practical constraint:

> Good software should not require expensive hardware.

The platform aims to remain usable across:

**Low-end phones + Older laptops + Limited hardware + Slower networks = Accessible ecosystem**

Performance is therefore considered part of the product.

The goal is **not** "make it look impressive at any cost." The goal is "make it look impressive while remaining usable."

---

## 13 — Design Language

Kaalyug follows a deliberately restrained visual direction.

| Principle | Description |
|---|---|
| **Dark** | A strong dark interface creates the foundation |
| **Clean** | Information should remain understandable before decoration takes over |
| **Technical** | The visual language reflects the developer-focused nature of the ecosystem |
| **Premium** | Projects and creators should feel like first-class products |
| **Responsive** | The experience should adapt rather than simply shrink |
| **Purposeful** | Motion, effects and visual elements should communicate something |

---

## 14 — Open Source

Kaalyug is being developed as an open-source project.

The repository is intended to provide a foundation that developers can inspect, learn from, modify and contribute to.

```mermaid
flowchart TD
    A[OPEN SOURCE] --> B[INSPECT]
    A --> C[BUILD]
    A --> D[CONTRIBUTE]
    B --> E[IMPROVE]
    C --> E
    D --> E
    E --> F[KAALYUG]
```

Contributions can include:

- Bug fixes
- UI improvements
- Performance improvements
- New marketplace capabilities
- API integrations
- Documentation
- Security improvements
- Developer tooling
- Ecosystem ideas

> A public repository alone does not make software open source. Licensing is what grants others the permissions to use, modify and distribute it.

The project should include an appropriate open-source `LICENSE` file defining how others may use, modify and distribute the software.

---

## 15 — Contribution Flow

```mermaid
flowchart TD
    A[IDEA] --> B[ISSUE]
    B --> C[FORK]
    C --> D[BRANCH]
    D --> E[DEVELOP]
    E --> F[TEST]
    F --> G[PULL REQUEST]
    G --> H[REVIEW]
    H --> I[MERGE]
    I --> J[RELEASE]
```

Kaalyug is designed to grow with its contributors rather than only through its original implementation.

---

## 16 — Project Structure

The ecosystem is conceptually divided into independent responsibilities:

```
Kaalyug
│
├── Frontend
│   ├── Marketplace
│   ├── Discovery
│   ├── Project pages
│   ├── Creator profiles
│   └── Wallet interface
│
├── Backend
│   ├── Users
│   ├── Projects
│   ├── Marketplace
│   ├── Orders
│   └── YugCoin integration
│
└── Ecosystem
    ├── Open-source projects
    ├── Free projects
    ├── Paid projects
    └── Community contributions
```

The exact implementation may evolve as the platform develops.

---

## 17 — Development Roadmap

**Foundation**
- Core UI
- Marketplace foundation
- Project discovery
- Creator profiles
- Responsive experience

**Publishing**
- Project publishing
- Project versions
- Project previews
- Free distribution
- Paid distribution

**YugCoin**
- Wallet integration
- Balance preview
- Payment API
- Marketplace checkout
- Transaction references

**Ecosystem**
- Community
- Analytics
- Reviews
- Creator tools
- Collaboration
- Mobile applications
- Additional ecosystem services

The roadmap is intentionally evolutionary. Features should be introduced when their underlying systems are ready.

---

## 18 — Versioning

Kaalyug follows an incremental product-development philosophy.

| Version | Focus |
|---|---|
| **v1.0** | Foundation — Core experience |
| **v1.1** | Refinement — Marketplace improvements |
| **v1.2** | Publishing — Creator systems |
| **v1.3** | YugCoin — Transaction integration |
| **v1.x** | Ecosystem expansion |

Versions should represent meaningful milestones rather than arbitrary changes.

---

## 19 — The Bigger Picture

The long-term model looks like this:

```mermaid
flowchart LR
    A[IDEA] --> B[BUILD]
    B --> C[PUBLISH]
    C --> D[DISCOVER]
    D --> E[USE]
    E --> F{DISTRIBUTE}
    F --> G[FREE]
    F --> H[PAID]
    H --> I[YUGCOIN]
    G --> J[COMMUNITY]
    I --> J
    J --> K[CONTRIBUTE]
    K --> L[IMPROVE]
    L --> B
```

This creates a continuous loop:

> Build → Publish → Discover → Use → Contribute → Build again.

That loop is the core idea behind Kaalyug.

---

## 20 — Why Kaalyug?

Because a project should be able to become more than a repository. It should have:

- **Identity** — Creator, Version, Preview, Documentation
- **Discovery** — Search, Categories, Community
- **Distribution** — Free, Paid
- **Transaction** — YugCoin
- **Community** — Contribution, Collaboration

Kaalyug brings these concepts together into one ecosystem.

---

## 21 — Current Status

**Active Development**

Kaalyug is an evolving project. The current architecture establishes the foundation for:

- Digital project discovery
- Creator-oriented publishing
- Marketplace distribution
- Free and paid projects
- YugCoin integration
- Open-source collaboration
- Low-end device accessibility

Some ecosystem capabilities represent the planned direction of the platform and will be introduced progressively.

---

## 22 — Philosophy

```mermaid
flowchart TD
    A[BUILD] --> B[PUBLISH]
    B --> C[DISCOVER]
    C --> D[USE]
    D --> E[CONTRIBUTE]
    E --> F[GROW]
    F --> A
```

Build something. Put it into the ecosystem. Let it evolve.

---

## 23 — Quick Start

### Prerequisites
- Node.js (`>=20 <23`)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
The API starts on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
The application opens on `http://localhost:5173`.

---

<div align="center">

### KAALYUG

**BUILD • PUBLISH • DISCOVER • EXCHANGE**

An open-source digital ecosystem for creators and builders.

© Kaalyug — Open Source — Active Development

</div>
