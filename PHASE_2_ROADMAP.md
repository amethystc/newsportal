# 🗺️ Phase 2 Development Roadmap
## Conflict Wire News Portal - Q1 2026

---

## 🎯 **Strategic Objectives**

1. **Increase User Engagement** - Add features that keep users on site longer
2. **Improve Content Discovery** - Help users find relevant articles quickly
3. **Build Community** - Enable user interaction and discussion
4. **Grow Audience** - Convert visitors to subscribers/members
5. **Enhance Credibility** - Showcase journalist expertise

---

## 📅 **Week-by-Week Implementation Plan**

### **Week 1-2: Foundation (Search & Author Pages)**

#### **Task 1.1: Global Search Implementation**
**Priority**: 🔥 CRITICAL  
**Effort**: 2-3 days  
**Dependencies**: None

**Implementation Steps**:
```
1. Create search API endpoint
   File: /src/app/api/search/route.ts
   - Accept query parameter
   - Search across article titles, excerpts, body
   - Return paginated results

2. Create Sanity search query
   File: /src/sanity/queries.ts
   - Add searchArticlesQuery with text matching
   - Include fuzzy matching for better results

3. Build search UI component
   File: /src/components/ui/SearchBar.tsx
   - Search input with live suggestions
   - Keyboard navigation (arrow keys, enter)
   - Loading states

4. Create search results page
   File: /src/app/search/page.tsx
   - Display search results in grid
   - Show result count and query
   - Pagination controls
   - Empty state for no results
   - Search filters (category, date range)

5. Add search to header
   File: /src/components/layout/Header.tsx
   - Desktop: Expandable search bar
   - Mobile: Full-screen search overlay
```

**Acceptance Criteria**:
- [ ] Search returns relevant results in < 500ms
- [ ] Handles typos gracefully
- [ ] Mobile-responsive
- [ ] SEO-friendly URLs (/search?q=keyword)
- [ ] Works with empty/special characters

---

#### **Task 1.2: Author Profile Pages**
**Priority**: 🔥 HIGH  
**Effort**: 2-3 days  
**Dependencies**: None

**Implementation Steps**:
```
1. Create author query
   File: /src/sanity/queries.ts
   - Add authorBySlugQuery
   - Add authorArticlesQuery with pagination

2. Create author page route
   File: /src/app/author/[slug]/page.tsx
   - Dynamic metadata generation
   - Author bio section
   - Social media links
   - Article grid (paginated)
   - Author statistics

3. Create author components
   Files:
   - /src/components/author/AuthorHero.tsx
   - /src/components/author/AuthorStats.tsx
   - /src/components/author/AuthorSocial.tsx

4. Update article pages
   File: /src/components/article/Author.tsx
   - Make author names clickable
   - Link to /author/[slug]

5. Create authors listing page
   File: /src/app/authors/page.tsx
   - Grid of all authors
   - Search/filter authors
   - Sort by article count
```

**Acceptance Criteria**:
- [ ] All authors have profile pages
- [ ] Author pages show all their articles
- [ ] Clicking author name goes to profile
- [ ] SEO metadata for each author
- [ ] Social sharing works

---

### **Week 3: User Engagement (Comments & Newsletter)**

#### **Task 3.1: Comments System Integration**
**Priority**: 🔥 HIGH  
**Effort**: 1-2 days  
**Dependencies**: None

**Recommended Solution**: **Giscus** (GitHub Discussions-based, free, privacy-friendly)

**Implementation Steps**:
```
1. Set up GitHub repository discussions
   - Enable Discussions on your repo
   - Install Giscus app

2. Create comments component
   File: /src/components/article/Comments.tsx
   - Giscus React component
   - Theme matching (light/dark ready)
   - Loading placeholder

3. Add to article pages
   File: /src/app/article/[slug]/page.tsx
   - Place below article content
   - Add section heading "Join the Discussion"

4. Style integration
   - Match Conflict Wire branding
   - Responsive layout
```

**Alternative Options**:
- **Commento** ($99/year, privacy-focused, no tracking)
- **Hyvor Talk** ($5/month, feature-rich)
- **Disqus** (Free but ads, not recommended)

**Acceptance Criteria**:
- [ ] Comments load on article pages
- [ ] Users can post without signup (optional: require GitHub)
- [ ] Moderation tools available
- [ ] Mobile-responsive
- [ ] Matches site design

---

#### **Task 3.2: Enhanced Newsletter System**
**Priority**: 🎯 MEDIUM  
**Effort**: 2-3 days  
**Dependencies**: Email service account

**Recommended Solution**: **ConvertKit** or **Buttondown**

**Implementation Steps**:
```
1. Choose email service provider
   Options:
   - ConvertKit (powerful, $29/mo for 1k subscribers)
   - Buttondown ($9/mo, simple, privacy-focused)
   - SendGrid (developer-friendly, free tier)

2. Update waitlist API
   File: /src/app/api/waitlist/route.ts
   - Integrate with chosen ESP
   - Add to mailing list
   - Send welcome email
   - Tag subscribers by interest

3. Create newsletter signup variations
   Files:
   - /src/components/ui/NewsletterInline.tsx (in-content)
   - /src/components/ui/NewsletterPopup.tsx (exit-intent)
   - /src/components/ui/NewsletterFooter.tsx (footer)

4. Build newsletter preferences page
   File: /src/app/newsletter/page.tsx
   - Frequency preferences (daily/weekly)
   - Topic selection (conflict, trade, etc.)
   - Unsubscribe option

5. Create email templates
   - Weekly digest template
   - Breaking news alert
   - New article notification
```

**Acceptance Criteria**:
- [ ] Email collection works across site
- [ ] Welcome email sent immediately
- [ ] Subscribers can manage preferences
- [ ] GDPR compliant (double opt-in)
- [ ] Unsubscribe link in all emails

---

### **Week 4: Content Discovery (Pagination & Filters)**

#### **Task 4.1: Pagination System**
**Priority**: 🎯 MEDIUM  
**Effort**: 1-2 days  
**Dependencies**: None

**Implementation Steps**:
```
1. Create pagination component
   File: /src/components/ui/Pagination.tsx
   - Page numbers with ellipsis
   - Previous/Next buttons
   - Current page highlighting
   - URL query parameter sync

2. Update category page queries
   Files: All category pages
   - Add offset/limit parameters
   - Default: 12 articles per page

3. Add "Load More" option
   File: /src/components/ui/LoadMore.tsx
   - Button to fetch next page
   - Infinite scroll variant (optional)
   - Loading state with skeleton

4. Create pagination hook
   File: /src/hooks/usePagination.ts
   - Handle page state
   - URL sync
   - Scroll to top on page change
```

**Acceptance Criteria**:
- [ ] Category pages show 12 articles initially
- [ ] Pagination works with URL params
- [ ] Back button maintains page state
- [ ] Mobile-friendly pagination controls
- [ ] SEO-friendly (page numbers in URL)

---

#### **Task 4.2: Advanced Filtering**
**Priority**: 🎯 MEDIUM  
**Effort**: 2-3 days  
**Dependencies**: Pagination complete

**Implementation Steps**:
```
1. Create filter component
   File: /src/components/ui/ArticleFilters.tsx
   - Sort by: Latest, Oldest, Popular
   - Date range picker
   - Author filter (dropdown)
   - Region filter (multi-select)
   - Tag filter (multi-select)

2. Update API endpoints
   - Accept filter parameters
   - Combine filters in GROQ queries
   - Return filter counts

3. Add filter UI to category pages
   - Sticky filter bar
   - Active filter badges
   - Clear all filters button

4. Persist filter state
   - URL query parameters
   - LocalStorage for preferences
```

**Acceptance Criteria**:
- [ ] Filters work in combination
- [ ] URL reflects current filters
- [ ] Filter counts shown (e.g., "Conflict (47)")
- [ ] Mobile-friendly filter drawer
- [ ] Clear visual feedback

---

## 🚀 **Quick Wins (Parallel Implementation)**

These can be done anytime alongside main tasks:

### **QW-1: Reading Time Estimator**
**Effort**: 30 minutes
```typescript
Location: /src/components/article/ReadingTime.tsx
Logic: wordCount / 200 words per minute
Display: "5 min read" badge on article cards
```

### **QW-2: Social Share Buttons**
**Effort**: 1 hour
```typescript
Location: /src/components/article/ShareButtons.tsx
Platforms: Twitter, Facebook, LinkedIn, WhatsApp, Email
Implementation: Use Web Share API + fallback
```

### **QW-3: Back to Top Button Enhancement**
**Effort**: 30 minutes
```typescript
Current: Already exists ✅
Enhancement: Add reading progress indicator
Visual: Circular progress around button
```

### **QW-4: Related Articles Enhancement**
**Effort**: 1-2 hours
```typescript
Current: Basic tag matching ✅
Enhancement: Weight by multiple factors
- Same region: +3 points
- Shared tags: +2 points per tag
- Same author: +1 point
- Recency: Decay factor
```

### **QW-5: Article Image Placeholders**
**Effort**: 1 hour
```typescript
Location: Next.js Image components
Add: Blur placeholder from Sanity LQIP
Implementation: blurDataURL prop
```

### **QW-6: Error Boundaries**
**Effort**: 2 hours
```typescript
Files:
- /src/app/error.tsx (app-level)
- /src/components/ui/ErrorBoundary.tsx
Features: Friendly error messages, retry button
```

### **QW-7: 404 Page Enhancement**
**Effort**: 1 hour
```typescript
Current: Basic 404 exists ✅
Enhancement: Suggest related articles, search bar
```

### **QW-8: Cookie Consent Banner**
**Effort**: 2 hours
```typescript
Location: /src/components/ui/CookieConsent.tsx
Compliance: GDPR, CCPA
Storage: LocalStorage for preference
```

---

## 📊 **Analytics & Monitoring Setup**

### **Setup Tasks (Week 1)**

#### **Analytics Integration**
```bash
Options:
1. Plausible Analytics (recommended - privacy-friendly, €9/mo)
2. Google Analytics 4 (free, comprehensive)
3. Fathom Analytics (privacy-focused, $14/mo)

Implementation:
- Add tracking script to layout.tsx
- Set up custom events (article views, clicks, searches)
- Configure conversion goals (newsletter signups)
```

#### **Performance Monitoring**
```bash
Tools:
1. Vercel Analytics (built-in, free)
2. Sentry (error tracking, free tier)
3. Lighthouse CI (automated audits)

Implementation:
- Enable Vercel Speed Insights
- Set up Sentry for error reporting
- Add Lighthouse CI to GitHub Actions
```

#### **Uptime Monitoring**
```bash
Options:
1. UptimeRobot (free, basic monitoring)
2. Pingdom (comprehensive, $10/mo)
3. Vercel Monitoring (built-in)

Setup:
- Monitor main pages (/, /article/*, /api/*)
- Alert on downtime (email/SMS)
- Check every 5 minutes
```

---

## 🎨 **Design Improvements**

### **Visual Enhancements (Ongoing)**

#### **Typography Refinement**
```css
Current: Be Vietnam Pro ✅
Enhancements:
- Add headline font (e.g., Playfair Display for article titles)
- Refine line heights for better readability
- Optimize font loading with font-display: swap
```

#### **Color Palette Expansion**
```css
Current: Red, Yellow, Gray scale
Add:
- Category-specific colors (already partially done)
  * Conflict: Red
  * Humanitarian: Blue
  * Trade: Green
  * Geopolitics: Purple
  * Spaces: Cyan
- Dark mode variants (future)
```

#### **Component Polish**
```
- Add subtle animations (hover, load)
- Improve card shadows and depth
- Consistent spacing system (4px grid)
- Loading skeletons for all async content
```

---

## 🧪 **Testing Strategy**

### **Testing Setup (Week 2-3)**

#### **Unit Tests**
```bash
Framework: Vitest or Jest
Coverage Target: 70%+
Priority Areas:
- Utility functions (/src/lib/)
- GROQ query builders
- Form validation
```

#### **Integration Tests**
```bash
Framework: React Testing Library
Test Coverage:
- Component rendering
- User interactions
- API integration
- Form submissions
```

#### **E2E Tests**
```bash
Framework: Playwright
Critical Paths:
- Homepage → Article → Related Article
- Search → Results → Article
- Newsletter signup flow
- Author page navigation
```

#### **Performance Tests**
```bash
Tools: Lighthouse CI
Metrics:
- Performance Score: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
```

---

## 📚 **Documentation Tasks**

### **Developer Documentation**

1. **Component Storybook** (Optional but recommended)
   - Document all UI components
   - Visual regression testing
   - Design system reference

2. **API Documentation**
   - OpenAPI/Swagger spec
   - Request/response examples
   - Error codes and handling

3. **Contributing Guide**
   - Code style guide
   - Git workflow
   - PR template
   - Issue templates

4. **Deployment Runbook**
   - Step-by-step deployment
   - Rollback procedures
   - Environment setup
   - Troubleshooting

---

## 🔐 **Security Enhancements**

### **Security Checklist**

- [ ] **Rate Limiting** on API endpoints (prevent abuse)
- [ ] **CORS Configuration** (restrict API access)
- [ ] **Input Sanitization** (prevent XSS)
- [ ] **CSP Headers** (Content Security Policy)
- [ ] **Environment Variables** (never commit secrets)
- [ ] **Dependency Audits** (npm audit, Snyk)
- [ ] **HTTPS Enforcement** (Vercel handles this ✅)
- [ ] **Security Headers** (X-Frame-Options, etc.)

### **Implementation**
```typescript
File: /src/middleware.ts
- Add rate limiting
- Set security headers
- CORS configuration
```

---

## 📈 **Success Metrics & KPIs**

### **Track Weekly**

| Metric | Current | Week 4 Target | Month 3 Target |
|--------|---------|---------------|----------------|
| Page Load Time | ~2s | <1.5s | <1s |
| Lighthouse Score | ~85 | 90+ | 95+ |
| Bounce Rate | ? | <50% | <40% |
| Avg. Session Duration | ? | >2min | >3min |
| Pages/Session | ? | >2 | >3 |
| Newsletter Signups | ? | 50+ | 500+ |
| Search Usage | N/A | 20% users | 30% users |
| Comment Engagement | N/A | 5% readers | 10% readers |

---

## 🎯 **Milestones**

### **Milestone 1: Enhanced Discovery** (Week 2)
✅ Search functionality live  
✅ Author pages complete  
✅ Pagination working  
**Outcome**: Users can find content 3x faster

### **Milestone 2: Community Building** (Week 3)
✅ Comments enabled  
✅ Newsletter integrated  
✅ Social sharing active  
**Outcome**: User engagement increases 2x

### **Milestone 3: Content Refinement** (Week 4)
✅ Advanced filters working  
✅ Related articles improved  
✅ Analytics tracking  
**Outcome**: Pages/session increases to 3+

### **Milestone 4: Polish & Performance** (Week 5-6)
✅ All quick wins implemented  
✅ Performance score 95+  
✅ Tests coverage 70%+  
**Outcome**: Production-ready for scale

---

## 🚧 **Risk Mitigation**

### **Potential Blockers**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| API Rate Limits | Medium | High | Implement caching, optimize queries |
| Sanity Costs | Low | Medium | Monitor usage, optimize queries |
| Search Performance | Medium | High | Use search service (Algolia) if needed |
| Email Deliverability | Medium | High | Use reputable ESP, warm up domain |
| Mobile Performance | Low | Medium | Regular mobile testing, optimization |

---

## 📝 **Week 1 Action Items**

### **Day 1-2: Search Implementation**
- [ ] Create `/api/search` endpoint
- [ ] Build search UI component
- [ ] Add search to header
- [ ] Test on mobile

### **Day 3-4: Author Pages**
- [ ] Create author queries
- [ ] Build `/author/[slug]` page
- [ ] Create author components
- [ ] Link from articles

### **Day 5: Testing & Refinement**
- [ ] Test all new features
- [ ] Fix bugs
- [ ] Performance optimization
- [ ] Deploy to production

---

## 🎉 **End Goal: Phase 2**

By end of Week 6, Conflict Wire should have:

✅ **Powerful search** - Users find content instantly  
✅ **Author showcase** - Journalist credibility established  
✅ **Active community** - Users discussing articles  
✅ **Growing audience** - Newsletter subs increasing  
✅ **Better discovery** - Advanced filters and pagination  
✅ **Professional polish** - 95+ Lighthouse score  
✅ **Analytics tracking** - Data-driven decisions  
✅ **Test coverage** - Confident deployments  

**Result**: A world-class news platform ready to scale! 🚀

---

**Roadmap Version**: 1.0  
**Last Updated**: January 21, 2026  
**Next Review**: Weekly standup every Monday  

---

*Let's build something amazing! 💪*
