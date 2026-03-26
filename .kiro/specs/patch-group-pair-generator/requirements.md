# Requirements Document

## Introduction

The Patch Group Pair Generator is a Vue 3 web application that helps group leaders randomly assign chat pairs within their patch groups. The app eliminates the awkwardness of self-selection by generating random pairings with a fun animation. It supports 15 patch groups with hardcoded roster data sourced from a CSV. When a group has an odd number of members, one trio is formed instead of a pair.

## Glossary

- **App**: The Patch Group Pair Generator Vue 3 single-page application
- **Group_Card**: A clickable card on the home screen representing a single patch group
- **Home_Screen**: The initial landing page displaying all 15 patch group cards
- **Group_Page**: The detail page for a specific patch group showing its members and pair generation controls
- **Pair_Generator**: The component responsible for randomly shuffling members and forming pairs
- **Pair**: A set of exactly two members assigned to chat together
- **Trio**: A set of exactly three members assigned to chat together, formed when a group has an odd member count
- **Roster**: The hardcoded list of members for each patch group, sourced from CSV data
- **Member**: A person belonging to a patch group, identified by full name and department
- **Shuffle_Animation**: A visual animation displayed while pairs are being generated
- **Group_Number**: An integer from 1 to 15 identifying each patch group
- **Group_Theme**: The name/theme associated with each patch group (e.g., "Interdependence", "Badassitude")

## Requirements

### Requirement 1: Display Patch Group Cards on Home Screen

**User Story:** As a group leader, I want to see all patch groups listed as cards on the home screen, so that I can quickly find and select my group.

#### Acceptance Criteria

1. WHEN the App loads, THE Home_Screen SHALL display exactly 15 Group_Cards, one for each patch group.
2. THE Home_Screen SHALL display each Group_Card with the label "Patch Group {Group_Number}" where Group_Number is the group's integer identifier (1 through 15).
3. THE Home_Screen SHALL display the Group_Theme on each Group_Card beneath the group label.
4. THE Home_Screen SHALL arrange Group_Cards in ascending order by Group_Number.

### Requirement 2: Navigate to Group Page

**User Story:** As a group leader, I want to click on a group card to navigate to that group's detail page, so that I can manage pair generation for my specific group.

#### Acceptance Criteria

1. WHEN a user clicks a Group_Card, THE App SHALL navigate to the Group_Page for the selected patch group.
2. THE Group_Page SHALL display the group label "Patch Group {Group_Number}" and the Group_Theme as a heading.
3. THE Group_Page SHALL display the full Roster of Members for the selected group, showing each Member's full name.
4. THE Group_Page SHALL provide a navigation element to return to the Home_Screen.

### Requirement 3: Generate Random Pairs

**User Story:** As a group leader, I want to generate random chat pairs from my group's roster, so that members are assigned conversation partners without self-selection bias.

#### Acceptance Criteria

1. THE Group_Page SHALL display a "Generate Pairs" button.
2. WHEN the user clicks the "Generate Pairs" button, THE Pair_Generator SHALL randomly shuffle the Roster and divide Members into Pairs of exactly two.
3. WHEN the Roster contains an odd number of Members, THE Pair_Generator SHALL form one Trio and assign the remaining Members into Pairs.
4. WHEN the user clicks the "Generate Pairs" button again, THE Pair_Generator SHALL produce a new random set of Pairs, replacing the previous result.
5. THE Pair_Generator SHALL use all Members from the Roster exactly once per generation (no member left out, no member repeated).

### Requirement 4: Display Generated Pairs

**User Story:** As a group leader, I want to see the generated pairs displayed clearly, so that I can announce the pairings to my group.

#### Acceptance Criteria

1. WHEN pairs have been generated, THE Group_Page SHALL display each Pair as a visually distinct card showing both Member names.
2. WHEN a Trio has been formed, THE Group_Page SHALL display the Trio as a visually distinct card showing all three Member names.
3. WHEN a Trio is displayed, THE Group_Page SHALL label the Trio card to distinguish it from Pair cards (e.g., "Trio" label).
4. THE Group_Page SHALL number each Pair and Trio card sequentially starting from 1.

### Requirement 5: Shuffle Animation

**User Story:** As a group leader, I want a fun animation when pairs are generated, so that the experience feels engaging and builds anticipation.

#### Acceptance Criteria

1. WHEN the user clicks the "Generate Pairs" button, THE App SHALL play a Shuffle_Animation before revealing the final pairs.
2. THE Shuffle_Animation SHALL display member names visually shuffling or cycling for a duration between 1 and 3 seconds.
3. WHEN the Shuffle_Animation completes, THE Group_Page SHALL reveal the final generated Pairs with a transition effect.

### Requirement 6: Hardcoded Roster Data

**User Story:** As a developer, I want the group roster data hardcoded from the CSV, so that the app works without a backend or external data source.

#### Acceptance Criteria

1. THE App SHALL store Roster data for all 15 patch groups as a static data structure within the application code.
2. THE Roster data SHALL include each Member's full name, department name, and Group_Number.
3. THE Roster data SHALL include each group's Group_Theme.
4. THE App SHALL contain exactly the member counts per group as defined in the source CSV: groups of 9, 10, or 11 members.

### Requirement 7: Responsive Layout

**User Story:** As a group leader, I want the app to work well on different screen sizes, so that I can use it during meetings on any device.

#### Acceptance Criteria

1. THE Home_Screen SHALL arrange Group_Cards in a responsive grid that adapts to the viewport width.
2. THE Group_Page SHALL display Pair and Trio cards in a responsive layout that adapts to the viewport width.
3. WHILE the viewport width is less than 768 pixels, THE App SHALL display cards in a single-column layout.
