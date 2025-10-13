# 💼 Windows XP Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://tu-portfolio.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Interactive portfolio showcasing RPA, AI/LLM, and Full-Stack development projects in a nostalgic Windows XP interface.

![Portfolio Screenshot](https://via.placeholder.com/800x450/0066cc/ffffff?text=Windows+XP+Portfolio)

## 🌟 Features

- **🪟 Interactive Windows**: Draggable, resizable windows with taskbar and start menu
- **📁 Project Explorer**: 11 projects with live demos and GitHub links
- **💻 Code Samples**: 6 snippets showing real code from production projects
- **🤖 RPA Lab**: Bot simulations with real outputs (tables, CSVs, charts)
- **🌐 API Demos**: Live integrations (PokéAPI, NASA APOD, Weather API)
- **⌨️ Terminal**: Interactive command-line interface
- **🐱 Desktop Pet**: Animated Felix the Cat companion

## 🚀 Live Demo

**[View Portfolio →](https://tu-portfolio.netlify.app)**

## 📂 Featured Projects

### 1. 🎬 Selenium Code Generator
Professional RPA tool that auto-generates robust Selenium code with 8 fallback selector strategies.
- **Tech**: Python, Selenium, JavaScript Injection, Metaprogramming
- **[Demo →](demos/selenium-recorder/)**

### 2. 🤖 RAG + RPA Automation System
Chatbot with RAG architecture + RPA suite for automated invoice processing.
- **Tech**: Python, Ollama, ChromaDB, LangChain, Playwright
- **85% time reduction**

### 3. 🏆 Apibee - Employee Wellbeing App
Winner of Apiux Hackathon - Gamification tool for measuring employee quality of life.
- **Tech**: Python, Kivy, UX Gamification
- **[GitHub →](https://github.com/liberius/Apibee)**

[View all 11 projects →](src/data/projects.ts)

## 🛠️ Tech Stack

**Frontend**:
- React 18 + TypeScript
- Zustand (state management)
- Framer Motion (animations)
- react-rnd (window system)
- Vite (build tool)

**Backend Demos**:
- Python (RPA, RAG, Scraping)
- Selenium, Playwright
- LangChain, ChromaDB
- Pandas, openpyxl

**Testing**:
- Vitest + React Testing Library
- 29 tests with TDD approach

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/liberius/portafolio.git
cd portafolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:5173

## 🧪 Python Demos

Each demo includes full documentation and requirements.txt:

```bash
# RPA Scraper Demo
cd demos/python-rpa-scraper
pip install -r requirements.txt
python scraper.py

# RAG Chatbot Demo
cd demos/rag-chatbot
python chatbot.py

# Selenium Recorder
cd demos/selenium-recorder
pip install -r requirements.txt
python recorder.py
```

## 🎯 Key Skills Demonstrated

- **AI/LLM**: RAG architecture, vector embeddings, local LLMs
- **RPA/Python**: Selenium automation, web scraping, process automation
- **Full-Stack**: React, TypeScript, REST APIs, state management
- **Data Analysis**: Pandas, data visualization, Excel reporting
- **DevOps**: CI/CD, Docker, Git, testing
- **SQL**: Complex queries, CTEs, window functions

## 📄 Documentation

- [Architecture Guide](architecture.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Project Requirements](docs/prd.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

## 🚀 Deployment

### Option A: Netlify (Recommended)

1. Push to GitHub
2. Connect repo at [netlify.com](https://netlify.com)
3. Deploy automatically

### Option B: Manual

```bash
npm run build
# Upload dist/ folder to any static host
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📊 Build Stats

- **Build size**: ~350 KB (gzipped: ~105 KB)
- **Components**: 15+ React components
- **Lines of code**: 7,900+
- **Test coverage**: 100% on WindowManager

## 🤝 Contact

**Manuel Medina**
- Portfolio: [Live Demo](https://tu-portfolio.netlify.app)
- GitHub: [@liberius](https://github.com/liberius)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/tu-perfil)

## 📝 License

MIT License - Free to use for personal and commercial projects

---

**🤖 Built with [Claude Code](https://claude.com/claude-code)**

*Showcasing: React • TypeScript • Python • RPA • AI/LLM • Full-Stack Development*
