# Elsparkesykkel Scrollytelling

En interaktiv scrollytelling-nettside om elsparkesykkelulykker i Norge, bygget med React, GSAP og Recharts.

## Funksjoner

- **Scroll-basert historiefortelling** med animasjoner
- **Interaktive grafer** (linjediagram og stolpediagram) med Recharts
- **Parallax-effekter** og sticky sections med GSAP ScrollTrigger
- **Responsivt design** - mobile-first tilnærming
- **Scroll-indikator** som viser fremdrift

## Teknologier

- React 19
- Vite 7
- GSAP 3 + ScrollTrigger
- Recharts 2

## Installasjon

```bash
npm install
```

## Utvikling

```bash
npm run dev
```

Åpne nettleseren på den URL-en som vises (vanligvis `http://localhost:5173`).

## Bygge for produksjon

```bash
npm run build
```

## Struktur

- `src/components/` - React-komponenter
- `src/data/` - JSON-datasett ekstrahert fra research
- `src/lesav/` - Research-fil med kilde-data

## Seksjoner

1. **Hook** - Åpningsseksjon med stort tall (1878) og parallax
2. **Timeline** - Skader over tid med linjediagram
3. **Risk** - Risikomønstre med stolpediagram og ikoner
4. **Quotes** - Sitater fra leger, politi og pårørende
5. **Regulations** - Regelverk-tidslinje og før/etter-sammenligning

## Data

Alle data er ekstrahert fra `src/lesav/elsparkesykkel_research_pakke.md` og lagret som JSON-filer i `src/data/`.
