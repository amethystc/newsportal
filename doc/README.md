# 📚 Conflict News Portal - Documentation Hub

> **Context-Aware AI Agent Documentation** - Complete reference guide for understanding, developing, and maintaining the Conflict News Portal project.

## 🎯 **Documentation Overview**

This comprehensive documentation suite provides AI agents and developers with complete context for the Conflict News Portal project. Each document covers specific aspects of the codebase to ensure consistent understanding and implementation.

---

## 📄 **Available Documentation**

### **1. 🏗️ [Project Overview & Architecture](./project-overview.md)**
**Purpose**: High-level understanding of project structure and design
**Contents**:
- Technology stack and dependencies
- Directory structure and organization
- Data flow architecture
- Key features and implementation patterns
- Performance metrics and monitoring

**When to Use**: 
- Initial project familiarization
- Understanding architectural decisions
- System design discussions

---

### **2. 📊 [Sanity CMS Schema & Queries](./sanity-queries.md)**
**Purpose**: Complete understanding of content structure and data fetching
**Contents**:
- Sanity schema definitions (Article, Author, Region, Tag)
- Complete GROQ query reference with examples
- Query optimization strategies
- Data relationships and projections
- Performance optimization patterns

**When to Use**:
- Modifying content structure
- Creating new queries
- Optimizing data fetching
- Understanding content relationships

---

### **3. 🔌 [API Endpoints Documentation](./api-endpoints.md)**
**Purpose**: Complete API reference with examples and patterns
**Contents**:
- All available endpoints with request/response examples
- Error handling patterns and status codes
- Performance optimizations and caching strategies
- Security patterns and rate limiting
- Testing examples and monitoring

**When to Use**:
- Implementing new API endpoints
- Understanding data flow
- Debugging API issues
- Performance optimization

---

### **4. 🧩 [Component Architecture](./components-architecture.md)**
**Purpose**: Understanding React components and their relationships
**Contents**:
- Component hierarchy and organization
- Data flow patterns and state management
- Reusable component patterns
- Responsive design implementation
- Performance optimization strategies

**When to Use**:
- Building new components
- Understanding component relationships
- Implementing responsive design
- Optimizing component performance

---

### **5. 📝 [Type System Documentation](./types-system.md)**
**Purpose**: Complete TypeScript reference and patterns
**Contents**:
- All type definitions and interfaces
- Type safety patterns and utilities
- Data transformation patterns
- Performance optimizations
- Type testing and validation

**When to Use**:
- Understanding data structures
- Implementing type-safe code
- Type debugging and validation
- Performance optimization

---

### **6. 📋 [Development Guidelines](./development-guidelines.md)**
**Purpose**: Coding standards and best practices
**Contents**:
- Coding standards and conventions
- Performance guidelines
- SEO and accessibility standards
- Testing patterns and workflow
- Build and deployment guidelines

**When to Use**:
- Daily development work
- Code reviews
- Setting up development environment
- Understanding project standards

---

## 🤖 **AI Agent Usage Guide**

### **For Context Understanding**
1. **Start with Project Overview**: Read `project-overview.md` first to understand the big picture
2. **Deep Dive as Needed**: Refer to specific documentation based on the task at hand
3. **Cross-Reference**: Use multiple documents to understand relationships between different parts

### **For Development Tasks**
- **New Features**: Start with `development-guidelines.md`, then reference relevant domain docs
- **API Changes**: Use `api-endpoints.md` + `sanity-queries.md` + `types-system.md`
- **UI Components**: Use `components-architecture.md` + `development-guidelines.md`
- **Type Issues**: Use `types-system.md` for understanding and resolving type problems

### **For Debugging and Optimization**
- **Performance Issues**: Check `project-overview.md` for metrics, `api-endpoints.md` for API optimization
- **Content Issues**: Use `sanity-queries.md` for data-related debugging
- **Type Errors**: Use `types-system.md` for type resolution
- **Component Issues**: Use `components-architecture.md` for component debugging

---

## 🔄 **Documentation Maintenance**

### **Keeping Documentation Updated**
When making changes to the codebase, update the relevant documentation:

```bash
# Example: Adding new API endpoint
1. Update API endpoint documentation
2. Update type definitions if needed
3. Update component usage examples
4. Update development guidelines if new patterns introduced
```

### **Documentation Standards**
- **Consistency**: Use the same format and style across all documents
- **Examples**: Provide working code examples for all patterns
- **Cross-References**: Link between related documentation
- **Version Control**: Keep documentation in sync with code changes

---

## 📊 **Project Metrics Summary**

### **Technical Stack**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity CMS with GROQ
- **Deployment**: Optimized for Vercel

### **Performance Targets**
- **Core Web Vitals**: All metrics in "Good" range
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP/AVIF with LQIP
- **API Performance**: <500ms average response time
- **SEO Score**: 90+ on Lighthouse

### **Code Quality**
- **Type Safety**: 100% TypeScript coverage
- **Testing**: Component and API integration tests
- **Accessibility**: WCAG 2.1 AA compliance
- **Standards**: ESLint + Prettier configuration

---

## 🎯 **Getting Started**

### **For New Developers**
1. Read `project-overview.md` for architectural understanding
2. Review `development-guidelines.md` for coding standards
3. Set up local development environment
4. Explore `sanity-queries.md` to understand data structure
5. Study `components-architecture.md` for component patterns

### **For AI Agents**
1. Start with this README for navigation
2. Use `project-overview.md` for context
3. Reference specific documentation based on task requirements
4. Always cross-reference type definitions from `types-system.md`
5. Follow `development-guidelines.md` for implementation standards

---

## 🔍 **Quick Reference**

### **Common File Locations**
- **Components**: `src/components/{layout,section,ui,article}/`
- **Types**: `src/types/index.ts`
- **API Routes**: `src/app/api/{news,articles,waitlist}/`
- **Sanity Config**: `src/sanity/{client.ts,queries.ts}`
- **Pages**: `src/app/{page.tsx,article/[slug]/page.tsx}`

### **Key Patterns**
- **Data Fetching**: API-first with Sanity → API → Component flow
- **Component Structure**: Atomic design with strict typing
- **Styling**: Tailwind CSS with responsive-first approach
- **Performance**: Code splitting + image optimization + caching

---

## 📞 **Support and Questions**

### **Documentation Issues**
If documentation is unclear or outdated:
1. Check the codebase for current implementation
2. Cross-reference with other documentation files
3. Look for examples in the actual code

### **Development Questions**
- **Architecture**: Reference `project-overview.md`
- **Implementation**: Use `development-guidelines.md`
- **Specific Features**: Refer to domain-specific documentation

---

**💡 Important**: This documentation is designed to be self-contained and comprehensive. Always start here for context before diving into implementation details. The goal is to enable AI agents to work effectively with minimal human intervention by providing complete, accurate, and up-to-date information about every aspect of the project.