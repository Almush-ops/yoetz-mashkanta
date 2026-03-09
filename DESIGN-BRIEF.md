# Design Brief - yoetz-mashkanta.co.il

**Date**: 2026-03-09
**Type**: Lead Generation - Mortgage Consulting
**Target Audience**: זוגות צעירים, משפחות, רוכשי דירה ראשונה, מחזרי משכנתא

---

## Brand Personality

### 5 תכונות מותג
1. **אמין** (Trustworthy) - מתאים לתחום הפיננסי
2. **מקצועי** (Professional) - יועץ מוסמך, 169 המלצות
3. **אישי** (Personal) - איתי אנצל כפנים של העסק
4. **נגיש** (Approachable) - "בגובה העיניים"
5. **מומחה** (Expert) - חבר HFCA משנת 2017

---

## Color Palette

### Primary: Navy Trust (כחול כהה - אמינות)
מבוסס על פסיכולוגיית צבעים: כחול כהה = אמון, יציבות, מקצועיות פיננסית

```css
--navy-50: #f0f4f8;
--navy-100: #d9e2ec;
--navy-200: #bcccdc;
--navy-300: #9fb3c8;
--navy-400: #829ab1;
--navy-500: #627d98;
--navy-600: #486581;
--navy-700: #334e68;
--navy-800: #243b53;
--navy-900: #102a43;
```

### Accent: Growth Green (ירוק - צמיחה, כסף)
```css
--growth-50: #f0fdf4;
--growth-100: #dcfce7;
--growth-200: #bbf7d0;
--growth-300: #86efac;
--growth-400: #4ade80;
--growth-500: #22c55e;
--growth-600: #16a34a;
--growth-700: #15803d;
--growth-800: #166534;
--growth-900: #14532d;
```

### Semantic Colors
```css
--dark: var(--navy-900);        /* #102a43 - טקסט ראשי */
--surface: var(--navy-50);       /* #f0f4f8 - רקע משני */
--border: var(--navy-200);       /* #bcccdc - גבולות */
--accent: var(--growth-600);     /* #16a34a - CTA, הדגשות */
--accent-hover: var(--growth-700); /* #15803d */
```

### Tailwind Config
```js
colors: {
  brand: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
  },
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  dark: '#102a43',
  surface: '#f0f4f8',
  border: '#bcccdc',
}
```

---

## Typography

### Primary Font: Heebo
- **Why**: נקי, מקצועי, קריא, מושלם לתחום פיננסי
- **Weights**: 400 (body), 500 (medium), 700 (bold)
- **Source**: Google Fonts → Self-hosted

### Heading Font: Heebo (same)
- Single font family for consistency and professional look

### Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

---

## Hero Section

### Style: HeroCardForm (Hero + Lead Form)
**Reasoning**: אתר לידים - הטופס חייב להיות above the fold

### Hero Content
- **Title**: יועץ משכנתאות מומלץ בחיפה והקריות
- **Subtitle**: איתי אנצל - 169 לקוחות מרוצים, חבר התאחדות יועצי המשכנתאות
- **Trust Items**:
  - ניסיון של מעל 7 שנים
  - ייעוץ ראשוני ללא עלות
  - דירוג 9.68 מ-169 לקוחות

### Form Fields
1. שם מלא (text, required)
2. טלפון (tel, required)
3. סוג הפנייה (select): דירה ראשונה / מחזור משכנתא / שיפור תנאים / אחר

### Background
- `bg-surface` (light gray-blue) עם טקסט כהה
- Form card: `bg-white shadow-xl rounded-2xl`

---

## Layout Archetype: Lead Magnet

### Homepage Section Sequence

| # | Section | Background | Description |
|---|---------|------------|-------------|
| 1 | **HeroCardForm** | surface | H1 + subtitle + trust items + lead form |
| 2 | **Trust Bar** | white | מספרים: 169 לקוחות, 7+ שנות ניסיון, חבר HFCA |
| 3 | **Services Grid** | surface | 6 שירותים עיקריים בכרטיסים |
| 4 | **About Zigzag** | white | תמונת איתי + סיפור + E-E-A-T |
| 5 | **Testimonials** | surface | 3-4 המלצות מובילות |
| 6 | **Process Steps** | white | 4 שלבים: פגישה → ניתוח → מו"מ → סגירה |
| 7 | **CTA Banner** | brand-700 | קריאה לפעולה עם טלפון וטופס |
| 8 | **FAQ** | surface | 8-10 שאלות נפוצות |
| 9 | **Contact** | white | טופס + מפה + פרטי משרד |

---

## Component Choices

### Cards
- **Style**: Bordered
- **Radius**: `rounded-xl`
- **Shadow**: `shadow-sm` default, `shadow-lg` on hover
- **Border**: `border border-border`

### Buttons
- **Primary**: `bg-accent-600 hover:bg-accent-700 text-white rounded-lg px-6 py-3`
- **Secondary**: `bg-white border-2 border-brand-600 text-brand-700 hover:bg-brand-50 rounded-lg`
- **Shape**: `rounded-lg` (not pill, not square)

### Trust Bar Style
- **Variant**: Stats row (numbers + labels)
- **Background**: White with subtle shadow
- **Layout**: 3-4 items in a row

### Testimonial Cards
- Quote with quotation mark icon
- Customer name (anonymized if needed)
- Star rating
- Service type badge

---

## Imagery Direction

### Hero
- תמונת איתי במשרד (מהדרייב) או גרדיאנט
- אווירה מקצועית ונגישה

### About Section
- תמונת איתי - portrait, professional but friendly
- Office setting or consultation scene

### Service Icons
- Phosphor Icons (outline style)
- Brand-600 color
- 32px size in cards

### Trust Elements
- HFCA logo (if permitted)
- 169 reviews badge
- Years of experience counter

---

## Special Features

### E-E-A-T Integration
- Profile card with photo + credentials
- Link to HFCA membership (prominent)
- Link to Midrag (minimal, footer only)
- "עמית למשכנתא" mention in about text (subtle entity connection)

### Lead Form Behavior
- Webhook to n8n/Make
- Success message with phone number
- Error handling
- WhatsApp popup option (captures lead first)

### Mobile Optimizations
- Sticky phone button (bottom-left)
- Accessibility widget (bottom-right)
- Touch targets 44px minimum
- Form fields full-width

---

## Schema Markup

### Required Schemas
1. **LocalBusiness** - on all pages
2. **Person** (איתי אנצל) - about page
3. **Service** - each service page
4. **FAQPage** - FAQ sections
5. **Review/AggregateRating** - testimonials page
6. **BreadcrumbList** - all inner pages

### LocalBusiness Data
```json
{
  "@type": "LocalBusiness",
  "name": "יועץ משכנתאות - איתי אנצל",
  "image": "/images/itai-office.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "קרן היסוד 7",
    "addressLocality": "קריית ביאליק",
    "addressCountry": "IL"
  },
  "telephone": "TBD",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.68",
    "reviewCount": "169"
  }
}
```

---

## Files Needed

### From User (Pending)
- [ ] Logo (user will design)
- [ ] Phone number for site
- [ ] Email for site
- [ ] Webhook URL for lead form

### From Google Drive
- [x] Photos of Itai (10 files including "איתי במשרד.jpg")
- Drive folder ID: 1Pfs6JwJAubrK79WzSdlvN2AGEQAJ0HIm

### To Generate
- [ ] Favicon from logo
- [ ] OG Image (1200x630)
- [ ] Hero background (if using gradient: not needed)

---

## Implementation Notes

1. **Start with HeroCardForm** - the most critical component
2. **Use placeholder contact** until user provides real details
3. **Download Itai's photo** from Drive for About section
4. **Create services cards** with real service names from plan
5. **Build FAQ accordion** with real mortgage questions
6. **Add testimonial quotes** from Midrag (anonymized)

---

## Approved: Ready for Build
