# Tool Spec: Community Connector

## Purpose
Help communities facing data center proposals find 
and connect with each other to share strategies, 
resources, and organizing tactics.

## Current priority
Phase 1 MVP — frontend first, simple backend.

## What this tool does
- Community profile creation
- Match with similar communities by developer, 
  status, and geography
- Topic-based forums and channels
- Direct messaging between communities

## MVP screens (from Rork mockups)
1. Community Network landing page
2. My Community Profile form
3. Find Similar Communities results
4. Forums & Threads by topic
5. Start a Conversation / channel view
6. All Channels with message feed

## Forum topics
- Tax Incentives & Subsidies
- Water & Cooling Systems
- Zoning & Ordinances
- Organizing Tactics
- National Strategy & Story Sharing

## Community profile fields
- community_name
- state
- county_municipality
- community_type (rural/small town/suburb/city)
- project_status (no project/proposed/planning/
  under construction/operating)
- multiple_projects (yes/no)
- known_developer
- llc_or_codename (optional)
- current_zoning
- key_decision_makers (multi-select)
- organizing_strength (just starting/some 
  organizers/strong coalition)

## MVP scope
- Profile creation stored in database
- Basic community matching by state and developer
- Forum topics with channels
- Simple message posting
- No user authentication for MVP — 
  use display name only

## Not in MVP scope
- Real-time messaging (polling is fine)
- Private direct messages
- Email notifications
- User accounts with passwords
- Moderation tools

## Architecture location
- Backend: backend/shared/ for auth patterns
- Frontend: frontend/app/community/
- Database: PostgreSQL

## Design reference
See Rork mockup screenshots in project files.
Colors: navy #1a2332, gold #f5a623

## Success criteria
- A community member can create a profile
- They can find other communities facing 
  the same developer
- They can post in a topic forum
- A non-technical user finds it intuitive