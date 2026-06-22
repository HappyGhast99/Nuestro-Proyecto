## 1. Database & Schema Preparation

- [x] 1.1 Update `db.js` to include the `users` table (`id`, `name`, `total_xp`, `current_streak`, `last_activity_date`).
- [x] 1.2 Seed a default user for the prototype.
- [x] 1.3 Add `difficulty` column (ENUM or TEXT) to the `cursos` table (or activities table if decided).

## 2. Backend Restructuring (3-Layer Architecture)

- [x] 2.1 Create folder structure: `src/routes`, `src/controllers`, `src/services`.
- [x] 2.2 Implement `GamificationService` for streak and XP logic.
- [x] 2.3 Implement `GamificationController` to handle requests and call services.
- [x] 2.4 Implement `GamificationRoutes` and mount them in `index.js`.
- [x] 2.5 Refactor existing `cursos` logic to follow the new 3-layer pattern.

## 3. Gamification Logic Implementation

- [x] 3.1 Implement streak validation logic (UTC comparison) in `GamificationService`.
- [x] 3.2 Implement XP rewarding logic based on activity difficulty.
- [x] 3.3 Create `POST /api/activities/:id/complete` endpoint to trigger gamification events.
- [x] 3.4 Create `GET /api/user/profile` endpoint to retrieve XP and streak status.

## 4. Frontend Development (Vanilla HTML/CSS/JS)

- [x] 4.1 Create `public/index.html` with a basic dashboard layout.
- [x] 4.2 Create `public/style.css` including the "fire" animation keyframes.
- [x] 4.3 Create `public/app.js` to fetch profile data and handle activity completion.
- [x] 4.4 Configure Express to serve static files from the `public` folder.

## 5. Testing & Validation

- [ ] 5.1 Verify semantic HTTP codes for all new endpoints (201, 400, 404, 500).
- [ ] 5.2 Validate streak increment/reset logic with manual date overrides in DB.
- [ ] 5.3 Validate XP awarding for different difficulty levels.
- [ ] 5.4 Ensure visual "fire" animation triggers correctly based on streak state.
