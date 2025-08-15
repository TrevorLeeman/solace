# Development Discussion

## What I'd Do Next With More Time

If I had additional time to work on this application, here's what I'd tackle next:

### Performance Improvements

**Switch to TanStack Table**  
I'd replace the current table implementation with TanStack Table. It handles large datasets much better with virtualization and gives us better sorting/filtering controls out of the box.

**Add Database Indexes**  
I'd add indexes on the columns we search most: `name`, `city`, `state`, and `specialties`. Right now queries are doing full table scans which won't scale well past a few thousand records.

**Implement React Query**  
I'd replace the `useEffect` data fetching with React Query. This would give us proper caching, polling background updates, fine-grained query invalidation, and an overall more idiomatic React approach to data fetching.

### Code Quality

**Add Unit Tests**  
I'd write tests for the core functionality - especially the search logic, pagination, and API endpoints. The current code has no tests which makes refactoring risky.

**API Validation with Zod**  
I'd add proper input validation to the API routes using Zod. Right now there's no validation on search parameters which could cause issues.

**Rate Limiting**  
I'd add basic rate limiting to prevent abuse of the search API.

### CI/CD Pipeline

**GitHub Actions Setup**  
I'd set up a proper CI/CD pipeline that runs on every PR. It would include linting with ESLint, TypeScript type checking, running the full test suite, and doing a production build to catch any issues early. I'd also configure automatic deployments on merge to improve DX and increase efficiency.

### User Experience

**Better Error Handling**  
I'd add Error Boundaries around the main components so if something breaks, users see a nice error message instead of a blank page.

**Track Usage Patterns**  
I'd add some basic analytics to see what people are actually searching for. This would help us understand which features matter most to patients.

With these improvements, this application would feel much more production-ready!

---

Thank you for the opportunity to work on this assignment. I really enjoyed diving into the codebase and thinking through how to make it more scalable and user-friendly. Solace's mission of connecting patients with the right advocates resonates with me, and I'd love the chance to contribute to that goal as part of your team. - Trevor Leeman
