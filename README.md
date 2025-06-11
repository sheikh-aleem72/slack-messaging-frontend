# 🚀 Slacky — A Real-Time Slack-Style Chat App

A modern, full-featured Slack-style messaging app built with **React**, **Node.js**, **MongoDB**, **Express**, and **Socket.IO**. It supports real-time chat, workspaces, channels, image sharing, and much more.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

---

## ✅ Features

## ✅ Authentication  
🧭 Allows users to securely sign up, log in, and log out. Uses access and refresh tokens for session management.  
🖼 ![Authentication](./Preview%20Images/authentication.jpg)

---

## ✅ Create Workspace  
🧭 Users can create separate workspaces for different teams or organizations, each with its own members and channels.  
🖼 ![Create Workspace](./Preview%20Images/create-workspace.jpg)


---

## ✅ Create Channel  
🧭 Users can create public or private channels within the workspace. Private channels restrict access to invited members only.  
🖼 ![Create Channel](./Preview%20Images/create-channel.jpg)

---

## ✅ Add Member via Email  
🧭 Admins can invite new users to the workspace using their email. If the email is registered, the user is added immediately; else, they receive a pending invite.  
🖼 ![Add Member](./Preview%20Images/add-member.jpg)

---

## ✅ Switch Workspace  
🧭 Enables users to switch between different workspaces they are part of, allowing a clean separation of teams/projects.  
🖼 ![Switch Workspace](./Preview%20Images/switch-workspace.jpg)

---

## ✅ Home Page  
🧭 Displays an overview of the workspace, including available channels and online members.  
🖼 ![Home Page](./Preview%20Images/home-page.jpg)

---

## ✅ Channel Chat  
🧭 Real-time group messaging within channels. Messages are updated live for all users in the channel.  
🖼 ![Channel Chat](./Preview%20Images/channel-chat.jpg)

---

## ✅ Private Chat  
🧭 One-on-one real-time messaging between members of the workspace, separate from public channels.  
🖼 ![Private Chat](./Preview%20Images/private-chat.jpg)

---

## ✅ Real-Time Messaging  
🧭 Powered by Socket.IO, all chats (channel or private) are updated in real-time across all devices.  
🖼 ![Real-Time Chat](./Preview%20Images/real-time%20chat.jpg)

---

## ✅ Image Sharing  
🧭 Users can upload and share images in chats. Images are uploaded to Cloudinary and appear inline in the chat.  
🖼 ![Image Sharing](./Preview%20Images/image-sharing.jpg)

---

## ✅ Delete Message  
🧭 Users can delete their own messages, which removes them from the chat history for everyone.  
🖼 ![Delete Message](./Preview%20Images/delete-message.jpg)

---

## ✅ Workspace Preferences  
🧭 Users can manage workspace settings such as name, logo, members, or leave/delete the workspace.  
🖼 ![Workspace Preferences](./Preview%20Images/workspace-preferences.jpg)

---

## ✅ Editor with Advanced Features  
🧭 The chat input editor supports rich-text features like multiline input, emoji, and media handling. Designed for optimal real-time messaging.  
🖼 ![Editor](./Preview%20Images/editor.jpg)

---

### Apart from these there are many more features that works underneath

## ✅ Channel Section  
🧭 Displays a list of all channels in the current workspace, grouped as public or private. Automatically updates when a new channel is created.  

---

## ✅ Member Section  
🧭 Shows a live list of all members in the workspace, including their online/offline status. Useful for initiating private chats.  

---

## ✅ Live Typing Indicator  
🧭 Users can see when someone else is typing in a channel or private chat. This real-time typing feedback improves interactivity.  

---

## ✅ Logout Option  
🧭 Securely logs the user out by clearing tokens from cookies/local storage and redirecting them to the login screen.  

---

## ✅ Token System  
🧭 Implements access and refresh token strategy for secure, scalable session management using JWT. Supports token renewal and revocation.  

---

## ✅ Email Verification (Dev Only)  
🧭 New users receive a verification email upon signup (disabled in production). This verifies ownership of the email before full access.  

---

## ✅ Loaders  
🧭 Clean and responsive loading states are shown across the app — for channels, messages, workspace switching, etc. Enhances user experience.  

---

## ✅ Page Not Found  
🧭 Displays a user-friendly "404 - Page Not Found" message for unmatched routes, with a redirect button to return to home.  

---

## ✅ And Many More...  
🧭 Slacky includes robust socket reconnections, optimistic UI updates, intelligent message caching, and mobile responsiveness — delivering a seamless modern chat experience.  

---



---

## ⚙️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Socket.IO-client
- **Backend:** Node.js, Express, MongoDB, Socket.IO
- **Authentication:** JWT (Access + Refresh)
- **Image Hosting:** Cloudinary
- **Others:** Axios, Context API, Zod (for validation)

---

## 🛠 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sheikh-aleem72/slack-messaging-frontend
cd slacky

```

---

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install
```

---

### 3. Create Environment Variables

Create a `.env` file in the `server/` directory and add the following:

```ini
VITE_BACKEND_API_URL='http://localhost:3000/api/v1'
VITE_SOCKET_BACKEND_URL='http://localhost:3000'
```

---

### 4. Run in Development Mode

Go back to the root directory and run:

```bash
npm run dev
```

---

### 🔗 Visit Your App

Once the dev server is running, open your browser and visit:

```
http://localhost:3000
```
Make sure to clone the backend code from [slacky backend repo link](https://github.com/sheikh-aleem72/slack-messaging-backend)

You’ll see the Slacky login screen. Start building or chatting right away!

---


## 💡 Usage Tips
 - Sign up and create your first workspace.

 - Switch between workspaces using the dropdown in the top nav.

 - Create channels and invite teammates by email.

 - Send rich-format or image messages in real time.

 - If you don't see new messages, check WebSocket connectivity in Console.

---


## 🛠 Contribution
Contributions are welcome!

 - Fork the project
 - Create a feature branch git checkout -b feature/YourFeature
 - Commit your changes git commit -m "Add amazing feature"
 - Push to your fork git push origin feature/YourFeature
 - Submit a pull request 🚀

Be sure to follow the existing code style and maintain clean commit history.

---

## 📁 Folder Structure (Atomic Design Architecture)

The project uses the **Atomic Design Pattern** to organize UI components in a scalable and maintainable way. This pattern breaks down the interface into the following layers:

```
src/
├── api # Request to backend 
├── assets/ # Static files (images, icons, fonts, etc.)
├── components/ # Reusable UI components structured by atomic design
│ ├── atoms/ # Basic UI elements (e.g., Button, Input, Avatar)
│ ├── molecules/ # Combinations of atoms (e.g., FormInput, UserCard)
│ └── organisms/ # Groups of molecules forming complex sections (e.g., Sidebar, ChatWindow)
├── pages/ # Actual pages using templates and full data
├── context/ # React context providers for global state management
├── hooks/ # Custom React hooks (e.g., useAuth, useSocket)
├── utils/ # Utility functions and helpers
├── services/ # API calls and external service integrations (e.g., auth, cloudinary)
├── routes/ # Route definitions and protected routing logic
├── constants/ # Centralized config, enums, environment values
├── socket/ # Socket.IO client logic
├── App.jsx # App entry component with routes and providers
└── main.jsx # ReactDOM render entry point

```

---


### 🧩 Why Atomic Design?

Atomic Design helps maintain separation of concerns by:

- **Atoms**: Being completely reusable, styling-agnostic building blocks.
- **Molecules**: Creating self-contained mini-components with simple logic.
- **Organisms**: Enabling reusable sections that can be composed in pages.
- **Templates**: Acting as blueprints with placeholder data or structure.
- **Pages**: Assembling everything into full screens with real content and logic.

This model improves **scalability**, **testing**, and **readability** in large front-end projects.

---

### [Website Link](https://slack-messaging.vercel.app)
