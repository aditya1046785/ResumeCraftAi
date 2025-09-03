# ResumeCraft AI 📄✨

ResumeCraft AI is an innovative, AI-powered resume builder that transforms the tedious task of resume writing into a simple, conversational experience. Built with Next.js and powered by Google's Gemini models through Genkit, this application helps you create a professional, polished resume in minutes.

## ⭐ Features

- **🤖 Conversational AI Builder**: No more staring at a blank page. Our AI career coach asks you simple questions to gather your professional details.
- **👁️ Live Preview**: See your resume update in real-time as you answer questions.
- **✨ AI-Powered Enhancements**: Improve your resume content with AI suggestions for stronger, more professional phrasing.
- **🎯 Job Description Matching**: Paste a job description to get a "Fit Score" and tailored suggestions to optimize your resume for the role.
- **📄 Easy Export**: Download your finished resume as a print-ready PDF with a single click.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **UI**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aditya1046785/ResumeCraftAi.git
    cd ResumeCraftAi
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
