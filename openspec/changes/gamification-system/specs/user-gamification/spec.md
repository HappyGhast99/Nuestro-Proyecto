## ADDED Requirements

### Requirement: Streak Validation
The system SHALL validate the user's daily activity to maintain or reset their streak. A streak is maintained if activities are completed on consecutive days (UTC).

#### Scenario: Increment Streak
- **WHEN** the user completes their first activity of the day AND the last activity was completed exactly one day prior (UTC)
- **THEN** the system SHALL increment the `current_streak` by 1.

#### Scenario: Reset Streak
- **WHEN** the user completes their first activity of the day AND the last activity was completed more than one day prior (UTC)
- **THEN** the system SHALL reset the `current_streak` to 1.

#### Scenario: Maintain Streak (Same Day)
- **WHEN** the user completes an activity AND an activity was already completed on the same day (UTC)
- **THEN** the system SHALL NOT change the `current_streak`.

### Requirement: XP Awarding
The system SHALL award Experience Points (XP) to the user upon completion of an activity. The amount of XP awarded MUST be proportional to the activity's difficulty level.

#### Scenario: Award XP for Easy Activity
- **WHEN** an activity marked with difficulty "Easy" is completed
- **THEN** the system SHALL add 10 XP to the user's `total_xp`.

#### Scenario: Award XP for Hard Activity
- **WHEN** an activity marked with difficulty "Hard" is completed
- **THEN** the system SHALL add 50 XP to the user's `total_xp`.

### Requirement: Visual Streak Feedback
The system SHALL provide immediate visual feedback when a streak is active.

#### Scenario: Activate Fire Animation
- **WHEN** the user profile is loaded AND the `current_streak` is greater than 0
- **THEN** the frontend SHALL display a "fire" animation next to the streak counter.
