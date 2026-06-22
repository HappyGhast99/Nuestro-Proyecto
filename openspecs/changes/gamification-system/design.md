## Context

The current application is a monolithic `index.js` using Express and `better-sqlite3`. It handles basic CRUD operations for courses. The goal is to evolve this into a gamified platform where users earn XP and maintain streaks for completing activities.

## Goals / Non-Goals

**Goals:**
- Implement a 3-layer architecture (Routes, Controllers, Services).
- Design a scalable database schema for users and gamification data.
- Create a reactive frontend prototype using Vanilla JS and CSS animations.
- Ensure strict HTTP status code compliance.

**Non-Goals:**
- Implementation of a full authentication system (session/JWT) at this stage; we will use a mock/fixed user ID for the prototype.
- Advanced animation libraries (e.g., GSAP); only CSS transitions/animations will be used.
- Migration of existing "cursos" data if it conflicts with the new activity structure (we will treat "activities" as a new entity or extend courses).

## Decisions

### 1. Architectural Pattern: 3-Layer Architecture
- **Rationale**: Separates concerns, making the business logic (XP/Streak calculation) independent of the transport layer (Express) and persistence layer (SQLite).
- **Alternative**: Keeping logic in controllers. Rejected as it makes unit testing and future expansion harder.

### 2. Database Schema Expansion
- **Rationale**: Add a `users` table with `total_xp`, `current_streak`, and `last_activity_date`.
- **Alternative**: Storing gamification data in a JSON blob. Rejected due to query performance and data integrity concerns.

### 3. Streak Validation Logic
- **Rationale**: Server-side validation comparing `last_activity_date` with current date. If `current - last == 1 day`, increment streak. If `> 1 day`, reset to 1. If `same day`, maintain.
- **Alternative**: Client-side streak management. Rejected as it's easily exploitable.

### 4. Frontend Strategy: Vanilla SPA-lite
- **Rationale**: Serving a single `index.html` from `public/` that uses `fetch` to interact with the API. This meets the "no framework" constraint while providing a modern feel.

## Risks / Trade-offs

- **[Risk] Date/Time Synchronization** → **Mitigation**: Use UTC timestamps on the server for all comparisons to avoid timezone-related streak resets.
- **[Risk] Monolith to Layered Migration** → **Mitigation**: Perform the refactor incrementally, starting with the new gamification endpoints before migrating existing `cursos` logic.
- **[Risk] Performance of `better-sqlite3` on concurrent writes** → **Mitigation**: SQLite's WAL mode and the small scope of the prototype make this negligible for now.
