# Tech Debt Report - Conflict News Portal

**Date:** 2026-01-21  
**Status:** 🔴 High (Requires attention)

## Executive Summary
The project has accumulated significant technical debt in terms of code quality, type safety, and repository cleanliness. A recent lint check revealed **68 problems** (40 errors, 28 warnings). Most critical are the React Hook anti-patterns in context providers and the presence of duplicate/dead code in the layout directory.

---

## 1. High Priority Issues (Critical)

### 🔴 React Hook Anti-patterns
- **Location:** `src/context/MemberContext.tsx`, `src/components/layout/MobileNavigationProvider.tsx`
- **Issue:** Synchronous `setState` calls inside `useEffect`.
- **Impact:** Causes unnecessary re-renders and potential race conditions in authentication and navigation state.
- **Remedy:** Refactor to use state initializers or ensure effects only fire on relevant transitions.

### 🔴 Repository Cleanliness (Dead Code)
- **Location:** `src/components/layout/`
- **Files:** `Header copy.tsx`, `Header copy 2.tsx`
- **Issue:** Several "copy" versions of the Header exist in the codebase.
- **Impact:** Confuses developers and increases the risk of editing the wrong file or importing the wrong version.
- **Remedy:** Delete `Header copy.tsx` and `Header copy 2.tsx` immediately.

### 🔴 Type Safety (Implicit `any`)
- **Location:** `src/app/sitemap.ts`, `src/app/magazine/page.tsx`, `src/components/ui/portable-text.tsx`
- **Issue:** Heavy use of the `any` type.
- **Impact:** Negates the benefits of TypeScript, leading to potential runtime errors when data structures from Sanity change.
- **Remedy:** Define proper interfaces or use existing ones in `src/types/index.ts`.

---

## 2. Medium Priority Issues (Structural)

### 🟡 Sanity Query Efficiency
- **Location:** `src/app/page.tsx`
- **Issue:** Multiple parallel network requests for different categories (`spacesQuery`, `geopoliticsQuery`, etc.).
- **Impact:** Increased network overhead and latency.
- **Remedy:** Combine queries into a single GROQ request using aliasing (e.g., `{"hero": *[...], "conflict": *[...]}`).

### 🟡 Hardcoded Configuration
- **Location:** `src/app/membership/page.tsx`, `src/components/section/MembershipCTA.tsx`, `src/components/section/Exclusive.tsx`
- **Issue:** Pricing ($9.99, $79.99) and membership benefits are hardcoded.
- **Impact:** Content updates require code changes and deployments rather than simple CMS updates.
- **Remedy:** Move pricing and benefits to Sanity Studio in `siteSettings` or a new `membershipSettings` document.

### 🟡 Type Redundancy
- **Location:** `src/types/index.ts`
- **Issue:** `Article` and `ExclusiveContent` types share 90% of fields but are maintained separately.
- **Impact:** Maintenance overhead when adding fields (like `exclusive` or `publishedAt`).
- **Remedy:** Use inheritance or composition (e.g., `interface ExclusiveContent extends Article { ... }`).

---

## 3. Low Priority Issues (Polish)

### 🟢 Unused Imports & Variables
- **Location:** `src/app/[...not-found]/page.tsx` and various components.
- **Issue:** Residual imports like `Search` or `Loader2` that are no longer used.
- **Impact:** Slight increase in bundle size and minor code clutter.
- **Remedy:** Run `eslint --fix` or manually clean up after feature development.

### 🟢 Console Logs
- **Location:** Throughout the codebase.
- **Issue:** Numerous `console.log` statements for debugging.
- **Impact:** Log noise in production and potential performance hit in extreme cases.
- **Remedy:** Replace with a dedicated logger or remove before production deployment.

---

## 4. Proposed Action Plan

### Phase 1: Cleanup (Immediate)
1. Delete `Header copy.tsx` and `Header copy 2.tsx`.
2. Fix the `setState` sync errors in `MemberContext` and `MobileNavigationProvider`.

### Phase 2: Type Hardening
1. Replace `any` in `magazine/page.tsx` and `sitemap.ts`.
2. Unify `Article` and `ExclusiveContent` types.

### Phase 3: Optimization
1. Refactor Home page data fetching to use a single GROQ query.
2. Externalize pricing and benefits to Sanity.

---

## Conclusion
While the frontend is visually impressive and feature-rich, the underlying code requires stabilization to prevent future bugs and maintainability issues. Addressing the High Priority items will reduce the current 68 lint errors to a manageable level.
