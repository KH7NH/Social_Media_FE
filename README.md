🧠 SafeNet – AI-Powered Social Media for Sensitive Image Detection

SafeNet is a modern social media web application built with React + Vite and integrated with an AI model (EfficientNet-B0) to automatically detect and block sensitive or gory images before they are published.
The goal of SafeNet is to create a safe, positive, and responsible online community by preventing the spread of disturbing content.

🚀 Features

🧩 User authentication (register, login, logout)

🖼️ Post creation with image upload – images are scanned by AI before posting

⚠️ Sensitive image detection (blood, gore, death scenes)

💬 User interactions – view, like, and comment on posts

🔒 Automatic blocking or blurring of sensitive images

☁️ Cloud deployment – React frontend on Vercel/Netlify, FastAPI backend on Render/Railway

⚙️ Tech Stack
🧩 Frontend

React + Vite – lightweight and fast development environment with Hot Module Replacement

Axios – API communication

Bootstrap / TailwindCSS – responsive and clean UI

🧠 Backend (AI + API)

FastAPI – high-performance backend and RESTful API

TensorFlow / Keras – training and serving the EfficientNet-B0 model

OpenCV / Pillow – image preprocessing

PostgreSQL / MongoDB – user, post, and moderation log storage

🧠 AI Model – EfficientNet-B0

The EfficientNet-B0 model is fine-tuned to classify images into two categories:

Normal: Safe and non-violent images

Sensitive: Gory or disturbing content (blood, injury, corpses)

When a user uploads an image, the backend sends it to the model via /analyze_image.
If the model predicts a sensitive probability > 0.7, the post is blocked and a warning message is shown.

🧪 How to Run Locally

Install dependencies

# Frontend

cd frontend

npm install

create .env

npm run dev

👨‍💻 Authors
Project Name: SafeNet

Year: 2025