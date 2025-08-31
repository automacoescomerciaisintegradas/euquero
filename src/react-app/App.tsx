import { BrowserRouter as Router, Routes, Route } from "react-router";
import TestWhatsApp from "@/react-app/pages/TestWhatsApp";
import AuthPage from "@/react-app/pages/AuthPage";
import Dashboard from "@/react-app/pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestWhatsApp />} />
        <Route path="/test-whatsapp" element={<TestWhatsApp />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cadastro" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/painel" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
