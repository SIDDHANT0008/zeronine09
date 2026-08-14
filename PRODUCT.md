# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (React 19) with Tailwind CSS v4, GSAP + ScrollTrigger for scroll-scrubbed animation, Framer Motion for component transitions and spring physics, Lenis for smooth/inertial scrolling. Optional: Three.js / React Three Fiber for a single signature WebGL moment. Fonts: Inter (variable) + JetBrains Mono.

## Users

Primary: founders, CTOs, and product leaders at startups and scale-ups evaluating a development studio partnership. Situation: they're comparing studios and need to see craft, technical depth, and taste in the first 5 seconds. Secondary: other developers and designers who appreciate craft and may refer work.

## Product Purpose

zeronine is the marketing site for a development studio. It exists to demonstrate technical and design craft so convincingly that qualified prospects initiate contact. Success means the site itself is proof of capability — visitors should think "if their site is this good, imagine what they'd build for us."

## Positioning

A development studio that builds interfaces people remember. The site must not feel like a "website" — it must feel like a crafted digital experience, closer to an Apple product page than a typical agency site. Every scroll, hover, and transition should feel deliberate, physically believable, and slightly delightful.

## Operating Context

- Single-page scrolling site with section anchors (Hero, Work, Services, Process, Studio, Contact)
- Desktop-first with cursor-driven interactions; mobile-adapted with touch-appropriate alternatives
- Prefers-reduced-motion must be respected throughout
- Target: 60fps on all scroll/hover animation, Lighthouse 90+

## Capabilities and Constraints

- Lowercase wordmark "zeronine" throughout (unless at sentence start)
- "09" as recurring graphic motif (loader, favicon, footer, page transitions)
- Monochrome-first palette: near-black (#0A0A0A), off-white (#F5F5F5), greys — plus one restrained accent (#C8FF00) used sparingly
- Signature motion: expo-out cubic-bezier(0.16, 1, 0.3, 1) for reveals; spring physics for draggable/cursor-linked elements
- Base durations: 600–900ms section reveals, 150–250ms micro-interactions
- Scroll-linked animation scrubbed to scroll position, not just triggered
- No autoplay sound, no popups, no blocking interactions
- Mobile: cursor effects disabled, scroll-jacking replaced with simpler scroll-reveal

## Brand Commitments

- Name: zeronine (always lowercase)
- Tone: confident, minimal, technical-but-human, quietly premium
- Positioning line (placeholder): "A development studio building interfaces people remember."
- Visual identity: restraint is premium — one strong idea per section, executed flawlessly
- "09" numeral motif as a design device throughout the experience

## Evidence on Hand

- Full component-based Next.js codebase with all sections implemented
- Design token system in Tailwind config (colors, typography, spacing, easing curves)
- Custom cursor, smooth scroll, grain overlay, and preloader implementations
- No real project imagery or case studies yet (placeholder content)
- No real client logos or testimonials yet

## Product Principles

1. **Restraint is premium** — One strong idea per section, executed flawlessly, beats five mediocre effects. Cut motion when in doubt.
2. **Physically believable** — Nothing teleports, snaps, or linear-eases. Everything has mass. Spring physics over linear easing.
3. **Performance is a feature** — 60fps minimum. Animate only transform/opacity. Profile with DevTools. No layout thrashing.
4. **The site is the proof** — The experience itself demonstrates capability. Every detail signals what the studio can build.
5. **Mobile is not a compromise** — Scale down effects, never copy desktop scroll-jacking 1:1. Touch devices get their own considered experience.

## Accessibility & Inclusion

- prefers-reduced-motion: provide reduced-motion mode that strips parallax, scroll-jacking, and ambient background — cross-fades only
- Keyboard and screen-reader navigation must work with custom cursor and route transitions
- Don't trap focus, don't remove semantic HTML for animation
- Mobile: disable cursor-based effects, replace scroll-jacked sequences with simpler scroll-reveal
