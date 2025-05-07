# HumaPress Discord-Style UI Design

## Overview
This document outlines the design specifications for the HumaPress Discord-style news aggregator for Afghanistan content in Farsi.

## Color Palette
Based on Discord's dark theme with custom modifications:

- **Background Colors**
  - Primary: `#36393f` (Main content area)
  - Secondary: `#2f3136` (Sidebar, channel list)
  - Tertiary: `#202225` (Server list, outer sidebar)
  
- **Accent Colors**
  - Primary Accent: `#5865f2` (Discord blue)
  - Positive: `#43b581` (Green for positive reactions)
  - Negative: `#f04747` (Red for negative reactions)
  - Warning: `#faa61a` (Orange for warnings/quarantine)
  
- **Text Colors**
  - Primary Text: `#dcddde` (Main text)
  - Muted Text: `#72767d` (Secondary text)
  - Link: `#00b0f4` (Hyperlinks)

## Layout Structure

### Main Layout
- Left Sidebar: Channel list (#breaking-news, #moderation-log, #quarantine)
- Main Content Area: Article feed with infinite scroll
- Optional Right Sidebar: For additional information or filters

### Channel Structure
1. **#breaking-news**
   - Auto-updating article feed
   - Articles displayed as message-like cards
   - Reaction buttons (👍/👎) at the bottom of each article
   - Link to original article at the end
   
2. **#moderation-log**
   - List of blocked articles with SHA-256 hashes
   - Timestamp and reason for blocking
   - Simple, log-style format
   
3. **#quarantine**
   - Articles flagged by sentiment analysis (polarity < 0.2)
   - Similar to #breaking-news but with warning indicators

## Component Designs

### Article Card
- Header: Source name with icon, timestamp
- Body: Article title (bold) and content preview
- Footer: Reaction buttons, link to original, view count
- Hover state: Slightly lighter background

### File Upload Interface
- Drag and drop area for uploading evidence files
- Progress indicator during upload
- File preview after upload
- Description field for context
- Submit button with confirmation

### Navigation
- Channel selection with hover and active states
- Unread indicators for new content
- Optional filter dropdown for sources

## Responsive Design
- Desktop: Full three-column layout
- Tablet: Two columns (hide right sidebar)
- Mobile: Single column with navigation menu

## Interactions
- Hover effects on interactive elements
- Smooth transitions between states
- Real-time updates with subtle animations
- Infinite scroll for article feeds

## Accessibility
- High contrast between text and background
- Keyboard navigation support
- Screen reader compatible markup
- Focus states for interactive elements
