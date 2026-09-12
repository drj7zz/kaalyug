<div align="center">

# KAALYUG

### THE DIGITAL ECOSYSTEM FOR BUILDERS

**Build · Publish · Discover · Exchange**

An open-source ecosystem connecting developers, creators, digital projects and marketplace distribution.

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
  DOWNLOAD
```

The same ecosystem therefore supports open collaboration and creator monetization.

---

## 06 — API Architecture

The backend exposes the marketplace through a controlled, authenticated API.

```mermaid
flowchart TD
    A[FRONTEND] -->|HTTPS| B[KAALYUG API]
    B --> C[SERVICES]
    C --> D[(DATABASE)]
```

Example endpoints include:

```
GET  /api/projects
POST /api/projects
POST /api/users/login
GET  /api/admin/stats
```

All mutations require an authenticated token; the frontend is never trusted with privileged decisions.

---

## 07 — System Architecture

```mermaid
flowchart TB
    USER[USER]

    subgraph K[KAALYUG]
        KF[Frontend]
        KB[Backend]
        KM[Marketplace]
        KP[Projects]
    end

    DB[(Database)]

    USER --> KF
    KF --> KB
    KB --> KM
    KB --> KP
    KB --> DB
```

**Architecture principle:** Separate the responsibilities. Keep each layer independently maintainable.

---

## 08 — Security Model

The frontend should never be trusted with sensitive decisions.

The request path is:

```mermaid
flowchart TD
    A[USER] --> B[KAALYUG FRONTEND]
    B --> C[KAALYUG BACKEND]
    C --> D[(DATABASE)]
```

Core principles:

- Server-side validation
- Authenticated API communication
- Protected API credentials
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
│   └── Discovery
│
├── Backend
│   ├── Users
│   ├── Projects
│   └── Marketplace
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

**Community**
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
    G --> J[COMMUNITY]
    H --> J
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
