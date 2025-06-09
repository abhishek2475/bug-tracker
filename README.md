# BugTracker Pro - Modern Task & Bug Tracking Application


**BugTracker Pro** is a sleek, modern, and intuitive web application designed to help development teams manage tasks, track bugs, and monitor project progress with ease. Built with a modern tech stack including Next.js, React, and Tailwind CSS, this application focuses on providing a clean user interface and a seamless user experience.
<img src="https://drive.google.com/file/d/1XpEutq94MmM5HMwfiZ7xa3L3DL_0Bgz4/view?usp=sharing" alt="Dashboard Image">

**[Live Demo Link](https://bug-tracker-nine-beta.vercel.app/)** 

---

## ✨ Features

-   **Role-Based Authentication**: Secure login system with distinct roles for 'Developer' and 'Manager', providing tailored views and permissions.
-   **Interactive Dashboard**: A central hub to view and manage tasks.
    -   **Developers** see a personalized list of their active tasks.
    -   **Managers** get a comprehensive overview of all open tasks across the team.
-   **Trend Analysis Chart**: A beautiful line chart for Managers, visualizing the trend of concurrently active tasks over the last 30 days.
-   **Full CRUD Functionality for Tasks**: Developers can Create, Read, Update, and Delete tasks through an intuitive and stylish interface.
-   **Managerial Approval Workflow**: A robust workflow where developers can submit completed tasks for approval. Managers can then approve the closure or re-open the task for further work.
-   **Integrated Time Tracking**: A simple yet powerful feature to log time spent on each task, with a clear history and total time display.
-   **Dynamic Filtering**: Easily filter tasks on the dashboard by their status or priority to quickly find what you're looking for.
-   **Modern & Responsive UI**: Designed with Tailwind CSS and `shadcn/ui` for a clean, professional, and fully responsive experience that works seamlessly on desktop and mobile devices.

---

## 🛠️ Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React.js](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and unstyled components.
-   **State Management**: React Context API (`useState`, `useContext`)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (Version 18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    _or if you use yarn:_
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    _or if you use yarn:_
    ```bash
    yarn dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the application!

---

## 🔑 Sample Credentials & Usage

The application uses a mock authentication system with hardcoded credentials from a JSON file. Use the following accounts to test the different roles:

### **Manager Role**

-   **Email**: `manager@example.com`
-   **Password**: `password123`
-   **Permissions**: Can view all open tasks, approve or re-open tasks pending approval, and see the task trend chart.

### **Developer Role**

-   **Email**: `dev@example.com`
-   **Password**: `password123`
-   **Permissions**: Can view only their assigned tasks. Can create, edit, delete, and submit tasks for approval. Can log time on tasks.

---

## 💡 Assumptions & Design Choices

-   **Mock Backend**: All data (users, tasks, time logs) is managed on the client-side using React Context and sourced from local JSON files. This was done to focus purely on frontend development without the need for a live database or backend API. In a production environment, all context functions (`addTask`, `updateTask`, etc.) would be replaced with API calls.
-   **State Management**: React's built-in Context API was chosen for state management. For this project's scale, it provides a clean and sufficient solution without adding the complexity of external libraries like Redux or Zustand.
-   **UI Component Library**: `shadcn/ui` was chosen for its excellent design, accessibility, and developer experience. It allows for full ownership and customization of components via Tailwind CSS.

---

## ✨ Project Highlights

Areas of the project that I would like to highlight include:

1.  **Robust Role-Based Access Control (RBAC)**: The UI dynamically adapts based on the logged-in user's role. Components, action buttons (like 'Create Task' or 'Approve Closure'), and even entire data visualizations (the trend chart) are conditionally rendered, providing a secure and role-appropriate user experience.

2.  **Centralized State Management with React Context**: The use of `AuthProvider`, `TaskProvider`, and `TimeLogProvider` creates a clean, decoupled architecture. This makes state management predictable and allows components to consume only the data they need, without prop-drilling.

3.  **Modern UI/UX with `shadcn/ui` and Tailwind CSS**: Significant focus was placed on creating a user interface that is not only functional but also aesthetically pleasing and intuitive. The use of components like `Dialog`, `DropdownMenu`, `Card`, and `Badge` creates a professional and polished feel throughout the application.

4.  **Complex Data Visualization**: The concurrent task trend chart (`TrendChart.tsx`) demonstrates the ability to process raw data (`tasks.json`) and transform it into a meaningful and insightful visualization for managerial users, using the `recharts` library.

---

Thank you for reviewing my project!
