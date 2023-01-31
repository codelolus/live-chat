import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { lazy } from "react";
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const ChatContainer = lazy(() => import("./ChatContainer"));

export const URL = "http://localhost:3000";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:nick" element={<ChatContainer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)