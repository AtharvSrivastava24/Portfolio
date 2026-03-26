# Atharv Srivastava — Personal Portfolio

> A modern, 3D-animated, fully responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-5b52e8?style=for-the-badge&logo=github)](https://atharvSrivastava24.github.io/Portfolio)
[![GitHub repo size](https://img.shields.io/github/repo-size/AtharvSrivastava24/Portfolio?style=for-the-badge&color=06b6d4)](https://github.com/AtharvSrivastava24/Portfolio)
[![Last Commit](https://img.shields.io/github/last-commit/AtharvSrivastava24/Portfolio?style=for-the-badge&color=10b981)](https://github.com/AtharvSrivastava24/Portfolio/commits/main)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Three.js Particle Background** | Animated neural-network particle field with mouse parallax |
| **Custom Cursor** | Smooth-lerp dot + ring cursor with hover expansion |
| **Loader Screen** | Animated intro with gradient logo and progress bar |
| **Typing Effect** | Role rotator in the hero (AI/ML Engineer, Data Scientist, etc.) |
| **Scroll Reveal** | IntersectionObserver-based fade + slide animations |
| **Animated Stats** | Counter animation for Projects, Certifications, Publications, CGPA |
| **Project Filter** | Category-based filterable project grid (All / AI-ML / Web / JS) |
| **Skills System** | Chip-based proficiency display (Expert / Proficient / Familiar) |
| **Dark / Light Mode** | Toggle with `localStorage` persistence |
| **Scroll Progress Bar** | Thin gradient line tracking scroll depth |
| **Back to Top** | Floating button that appears after 480 px scroll |
| **Modal Viewer** | Full-screen modal for projects and certifications |
| **Fully Responsive** | Mobile-first, tested at 480 / 768 / 1024 / 1440 px |

---

## 🗂️ Project Structure

```
Portfolio/
├── index.html                  # Main HTML — all sections with edit comments
├── style.css                   # Design system, layout, animations
├── script.js                   # All JS logic (Three.js, interactions, animations)
├── me.png                      # Profile photo (About section)
├── Atharv_Srivastava_Resume.pdf
├── traffic.png                 # Project screenshots
├── ai-news.png
├── amazon.png
├── rock.png
├── currency.png
├── calc.png
├── advancedata.png             # Certification images
├── data.png
├── ibm.png
├── meta.png
├── microsoft.png
└── ml.png
```

---

## 🚀 Getting Started

No build tools or dependencies required. Just open the file locally:

```bash
# Clone the repository
git clone https://github.com/AtharvSrivastava24/Portfolio.git

# Navigate into the folder
cd Portfolio

# Open in browser
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```

> **Internet connection required** for Google Fonts and the Three.js CDN to load.

---

## ✏️ How to Customise

Every section in `index.html` has a clearly labelled comment block explaining what to change. Here are the most common edits:

### Update your name / headline
```html
<!-- index.html → Hero Section -->
<h1 class="hero-title">
  Hi, I'm <span class="name-text">Your Name</span>
</h1>
```

### Change the rotating roles
```js
// script.js → initHeroTyping()
const ROLES = [
  'AI / ML Engineer',
  'Data Scientist',
  // Add or remove roles here
];
```

### Update CGPA
```html
<!-- index.html → Hero Stats -->
<span class="stat-num" data-count="8" data-decimal=".78">0</span>
<!-- data-count = integer part, data-decimal = decimal string -->
```

### Add a new project
Copy any `.project-card` block in the Projects section and update these attributes:
```html
data-category="ml"          <!-- ml | web | js -->
data-title="Project Name"
data-desc="Full description shown in modal."
data-tags="Python,ML,Flask"
data-img="your-image.png"
```

### Add a new skill chip
```html
<span class="skill-chip skill-expert">Your Skill</span>
<!--  Levels: skill-expert | skill-proficient | skill-familiar  -->
```

### Update contact links
```html
<!-- index.html → Contact Section -->
<a href="mailto:your@email.com" ...>
<a href="https://linkedin.com/in/your-profile" ...>
<a href="https://github.com/your-username" ...>
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#5b52e8` | Primary indigo-violet |
| `--accent-2` | `#06b6d4` | Cyan / secondary |
| `--accent-warm` | `#f59e0b` | Amber highlights |
| `--f-display` | Space Grotesk | Headings, logo, buttons |
| `--f-body` | Inter | Body text |
| `--f-mono` | JetBrains Mono | Tags, labels, code |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup with ARIA attributes
- **Vanilla CSS** — Custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — ES6+, IntersectionObserver, localStorage
- **[Three.js r128](https://threejs.org/)** — WebGL particle background (CDN)
- **[Google Fonts](https://fonts.google.com/)** — Space Grotesk, Inter, JetBrains Mono

> No frameworks. No build tools. No npm. Just open and go.

---

## 📬 Contact

| Platform | Link |
|---|---|
| **Email** | [atharvsrivastava24112005@gmail.com](mailto:atharvsrivastava24112005@gmail.com) |
| **LinkedIn** | [atharv-srivastava-642281293](https://www.linkedin.com/in/atharv-srivastava-642281293) |
| **GitHub** | [AtharvSrivastava24](https://github.com/AtharvSrivastava24) |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).  
Feel free to use it as a template — a credit link back is appreciated but not required.

---

<p align="center">Crafted with care by <strong>Atharv Srivastava</strong> · 2025</p>
