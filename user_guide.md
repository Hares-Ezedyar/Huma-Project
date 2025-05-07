# HumaPress User Guide

## Introduction

Welcome to HumaPress, a Discord-style news aggregator for Afghanistan content in Farsi. This guide will help you navigate and use the platform effectively.

## Getting Started

### Accessing HumaPress

You can access HumaPress at: [https://humapress.vercel.app](https://humapress.vercel.app)

The platform is optimized for both desktop and mobile devices.

### Interface Overview

HumaPress features a Discord-inspired interface with:

1. **Server List** - Left sidebar with server icons
2. **Channel List** - Second sidebar with available channels
3. **Content Area** - Main section displaying articles and content

## Channels

### #breaking-news
This is the main channel where you'll find the latest news articles from Afghanistan in Farsi. Articles are automatically updated and displayed in a message-like format.

Features:
- Auto-updating feed of articles
- Reaction buttons (👍/👎) to express your opinion
- Links to original articles

### #moderation-log
This channel displays SHA-256 hashes of blocked articles that contained Taliban-related content. The moderation system automatically filters content containing terms like طالبان, امارت اسلامی, داعش, and کابُل تحت کنترل.

### #quarantine
Articles with low sentiment scores (polarity < 0.2) are placed in this channel. These articles may contain negative or concerning content but are still available for viewing.

## Interacting with Articles

### Reading Articles
Articles are displayed with:
- Source name and icon
- Publication timestamp
- Article title and content in Farsi
- Link to the original article

### Reactions
You can react to articles with:
- 👍 (Like) - Click to express positive feedback
- 👎 (Dislike) - Click to express negative feedback

Your reactions are stored and the count is updated in real-time.

## Uploading Evidence

HumaPress allows you to upload evidence of crimes against humanity:

1. Navigate to the **evidence-upload** channel
2. Click on the upload area or drag and drop your files
3. Add a description of the evidence (optional)
4. Submit the files

Supported formats: JPG, PNG, PDF (maximum 20MB)

## Real-time Updates

HumaPress uses WebSocket technology to provide real-time updates:
- New articles appear automatically without refreshing
- Reaction counts update in real-time
- Moderation logs are added as content is filtered

## Translation

All content is automatically translated to Farsi using:
- MarianMT (Helsinki-NLP/opus-mt-en-fa) as the primary translation engine
- Google Translate API as a fallback when needed

Original articles are accessible via the link at the end of each article.

## Troubleshooting

If you encounter any issues:
- Check your internet connection
- Try refreshing the page
- Clear your browser cache
- Contact support if problems persist

## Privacy & Security

HumaPress prioritizes user privacy:
- No personal information is collected
- No account creation is required
- Evidence uploads are stored securely

## Feedback

We welcome your feedback to improve HumaPress. Please contact us with any suggestions or issues you encounter while using the platform.
