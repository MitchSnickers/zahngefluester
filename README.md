# Zahngeflüster — Neubau

Zwei Websites, ein Repository, zwei Vercel-Projekte.

| | Domain | Ordner | Zustand |
|---|---|---|---|
| Marketing | zahngefluester.com | `apps/marketing` | Grundgerüst steht, Inhalte sind Platzhalter |
| Lernplattform | zahngefluester.education | `apps/education` | leer, kommt nach der Marketing-Seite |

Betriebs- und Arbeitsregeln stehen in **[CLAUDE.md](./CLAUDE.md)**. Vor dem
ersten Commit lesen.

## Loslegen

```bash
npm install            # einmal im Repo-Wurzelverzeichnis, installiert beide Workspaces
npm run dev:marketing  # http://localhost:3000
npm run build:marketing
```

Node ≥ 20.11, siehe `.nvmrc`.

## Struktur

```
apps/
  marketing/          Next.js 16, App Router, TypeScript, Tailwind 4
    src/content/      Texte und Daten als TS-Dateien — der Ort für Inhaltsänderungen
    src/components/   Layout-Bausteine
    src/app/          Routen
    middleware.ts     410-Antworten für dauerhaft entfernte URLs
    next.config.ts    liest die Weiterleitungen aus packages/redirects
  education/          noch leer
packages/
  redirects/          URL-Mapping alt → neu, einzige Quelle für beide Apps
```

## Vercel

Zwei Projekte aus diesem Repository:

| | Projekt 1 | Projekt 2 (später) |
|---|---|---|
| Root Directory | `apps/marketing` | `apps/education` |
| Domain | www.zahngefluester.com | www.zahngefluester.education |
| Install Command | Standard (npm erkennt die Workspaces) | Standard |

Wichtig: bei Projekt 1 in den Einstellungen **„Include files outside of the Root
Directory"** aktiviert lassen, sonst fehlt `packages/redirects` beim Build.

Kanonisch ist **www** — die Altseite läuft heute schon so. Die Apex-Domain wird
in Vercel auf www weitergeleitet.

## Was bewusst noch fehlt

- **Blog** (`/blog/`) aus dem Seitenbaum. Er startet bei null; ohne einen ersten
  Beitrag ist eine leere Rubrik schlechter als keine.
- **Kontaktformular.** Nimmt personenbezogene Daten entgegen und braucht
  geprüfte Zustellung. Bis dahin steht die E-Mail-Adresse da.
- **Newsletter-Opt-in.** Braucht Double-Opt-in über Resend.
- **Echte Bilder, echte Texte, Markenfarben, Markenschrift.** Alles Platzhalter.
