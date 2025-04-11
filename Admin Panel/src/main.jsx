// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import AppRouter from './router/AppRouter'
import { AuthProvider } from "@/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <AppRouter />
</QueryClientProvider>
</AuthProvider>

)
