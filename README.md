<div align="center">
  <br />

  <div>
<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
<img src="https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
<img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" />
<img src="https://img.shields.io/badge/-Puter-A855F7?style=for-the-badge&logo=Puter&logoColor=white" /><br/>
<img src="https://img.shields.io/badge/-Gemini-4285F4?style=for-the-badge&logo=Google-Gemini&logoColor=white" />
  </div>

  <h3 align="center">SketchTo3D | AI-powered Architectural Visualization App</h3>
</div>

## 📋 Table of Contents

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

AI-powered architectural visualization SaaS built with React, TypeScript, and Puter. Use Google Gemini to transform 2D floor plans into photorealistic 3D renders with permanent hosting and persistent metadata. This project features 2D-to-3D photorealistic rendering, high-performance KV storage without needing external backend servers! Runs entirely client-side leveraging the Puter network!

## <a name="tech-stack">⚙️ Tech Stack</a>
- **[React](https://react.dev/)** is a popular JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)** is a modern frontend build tool.
- **[TypeScript](https://www.typescriptlang.org/)** is a strongly typed superset of JavaScript.
- **[TailwindCSS](https://tailwindcss.com/)** is a utility-first CSS framework.
- **[Puter](https://puter.com/)** is the underlying cloud computing platform and "Internet OS" that provides the infrastructure, including permanent file storage, key-value (KV) databases, and hosted AI models.
- **[Gemini](https://deepmind.google/technologies/gemini/)** is a state-of-the-art large language model used to power the architectural transformation.


## <a name="features">🔋 Features</a>
👉 **2D-to-3D Visualization**: Instant architectural rendering that transforms flat floor plans into photorealistic 3D models using state-of-the-art AI.

👉 **Persistent Media Hosting**: Permanent file storage that generates public URLs for every upload and output, ensuring your renders are always accessible.

👉 **Dynamic Project Gallery**: A personalized workspace that tracks your history of visualizations with instant loading and metadata persistence.

👉 **Side-by-Side Comparison**: Interactive tools designed to visualize the direct transformation from a source architectural sketch to its AI-rendered counterpart.

👉 **Ownership Mapping**: A clean metadata system that tracks project details across the platform for seamless account management.

👉 **Modern Export Functionality**: High-performance tools to download and move AI-generated renders.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the Repository**

```bash
git clone https://github.com/Dilpreetk11/SketchTo3D.git
cd SketchTo3D
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Zero Configuration Backend**

This project runs magically inside the browser using Puter's Key-Value store and file hosting APIs, meaning there are absolutely **no environment variables** necessary to set up manually! All database components persist inside the `puter.kv` native APIs seamlessly.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the running project.
