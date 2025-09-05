import { useState } from "react";
import Button from "./ui/Button";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Por favor, insira um email válido." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // In a real implementation, you would send the email to your backend here
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: "success", text: "Obrigado por se inscrever! Em breve você receberá nossas novidades." });
      setEmail("");
    } catch (_error) {
      setMessage({ type: "error", text: "Ocorreu um erro. Por favor, tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Newsletter</h3>
      <p className="text-gray-400 text-sm mb-4">
        Inscreva-se para receber novidades, dicas e ofertas exclusivas.
      </p>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.type === "success" 
            ? "bg-green-900 text-green-200" 
            : "bg-red-900 text-red-200"
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor email"
          className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          className="whitespace-nowrap"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </div>
          ) : (
            "Inscrever"
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;