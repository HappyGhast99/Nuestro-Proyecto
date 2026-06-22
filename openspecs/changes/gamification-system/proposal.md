## Why

To increase user engagement and encourage consistent discipline, we want to implement a gamification system. Users driven by constant stimuli will benefit from immediate gratification through points (XP) and visual feedback on their daily progress (streaks).

## What Changes

- **New Gamification Layer**: Introduction of XP and daily streak mechanics.
- **Visual Feedback**: Real-time "fire" animation for streaks in the user profile.
- **Task-Based Rewards**: Experience points assigned upon completion of planned activities, proportional to difficulty.
- **Architectural Refactoring**: Separation of business logic into `routes/`, `controllers/`, and `services/` layers.
- **Frontend Prototype**: Vanilla HTML + Fetch implementation served by Express.
- **API Standards**: Strict adherence to semantic HTTP codes (201, 400, 404, 500).

## Capabilities

### New Capabilities
- `user-gamification`: Core logic for managing user XP, streaks, and activity validation.
- `gamified-activities`: Extension of task/activity management to include difficulty levels and reward triggers.
- `gamification-ui`: Frontend implementation of the gamification dashboard and profile visual effects.

### Modified Capabilities
- `activity-tracking`: Updating the existing activity completion logic to trigger gamification events.

## Impact

- **Database**: New tables for user profiles (XP, streaks, last activity date) and potentially updates to the activities/tasks schema.
- **Backend Architecture**: Migration from a monolithic `index.js` to a layered architecture.
- **Frontend**: A new HTML client to interact with the gamified API.
- **API**: Enhanced response codes and new endpoints for gamification data.
