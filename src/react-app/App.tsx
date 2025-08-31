import { BrowserRouter as Router, Routes, Route } from "react-router";
import TestWhatsApp from "@/react-app/pages/TestWhatsApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestWhatsApp />} />
        <Route path="/test-whatsapp" element={<TestWhatsApp />} />
      </Routes>
    </Router>
  );
}
