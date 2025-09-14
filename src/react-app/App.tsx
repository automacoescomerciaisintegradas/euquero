import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestWhatsApp from "@/react-app/pages/TestWhatsApp";
import AuthPage from "@/react-app/pages/AuthPage";
import Dashboard from "@/react-app/pages/Dashboard";
import AutomationPage from "@/react-app/pages/AutomationPage";
import PrivacyPolicy from "@/react-app/pages/PrivacyPolicy";
import TermsOfUse from "@/react-app/pages/TermsOfUse";

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
        <Route path="/automacao" element={<AutomationPage />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos" element={<TermsOfUse />} />
      </Routes>
    </Router>
  );
}
