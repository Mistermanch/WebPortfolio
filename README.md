# 📚 WebPortfolio

A stunning **interactive flipbook-style web portfolio** showcasing your projects and experience. Built with modern web technologies and a custom typeface for a unique, engaging presentation.

## 🌟 Features

- **Interactive Flipbook Design** - Smooth page-turning animations using [Turn.js](https://turnjs.com/)
- **Responsive Layout** - Works seamlessly on desktop and adapts for touch devices
- **Mobile-friendly Fallback** - On touch devices (phones/tablets) Turn.js is disabled: pages are stacked vertically and use native scrolling for a better mobile experience
- **Custom Typography** - Beautiful custom font for a distinctive brand
- **Animated Hints** - Pulsing "Click to start" indicator guides visitors
- **Project Showcase** - Display your best projects with images and descriptions
- **Elegant Design** - Book-inspired aesthetic with gold accents and dark covers

## 🛠️ Built With

- **HTML5** - Semantic markup (46.3% of codebase)
- **CSS3** - Advanced styling with responsive design (45.1% of codebase)
- **JavaScript** - Interactive functionality with jQuery (8.6% of codebase)
- **Turn.js** - 3D flipbook effect library (initialized only on non-touch devices)
- **jQuery** - DOM manipulation and event handling

## 📖 Projects Featured

- **About Me** - Your background and skills
- **CanSat** - ESA/ESERO project participation
- **MIDI Drums** - Arduino-based percussion instrument
- **Web Portfolio** - This project itself

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required

### Usage
Go to https://mistermanch.github.io/WebPortfolio/

### Mobile behavior
To improve usability on touch devices, this project detects touch support and conditionally initializes Turn.js only on non-touch (desktop) environments. On mobile devices Turn.js is disabled and pages are presented in a stacked layout that uses the browser's native scrolling. This ensures better performance and a more accessible experience on phones and tablets.

## 📝 Recent changes
- 2026-06-30 — Disable Turn.js on mobile: added touch detection, conditional initialization/destroy, and CSS for stacked pages with native scrolling


