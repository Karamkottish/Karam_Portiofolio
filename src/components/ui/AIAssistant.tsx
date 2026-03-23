"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Robust hardcoded Q&A simulation
const mockAIResponse = (input: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = input.toLowerCase();

      // Greeting
      if (q.match(/\b(hi|hello|hey|greetings|who are you)\b/)) {
        return resolve("Hi there! I'm Karam's AI assistant. You can ask me about his graduation, current roles, experience, or skills!");
      } 
      
      // Education / Graduation / University
      if (q.includes("graduate") || q.includes("university") || q.includes("college") || q.includes("study") || q.includes("education") || q.includes("degree")) {
        return resolve("Karam graduated from Al-Sham Private University in Damascus, Syria with a Bachelor of Engineering in Information Technology.");
      }
      
      // Year / Dates
      if (q.includes("year") || q.includes("when did he")) {
        return resolve("He attended Al-Sham Private University from 2020 to 2025. In his professional career, he has over 3+ years of experience.");
      }
      
      // Role / Current Job / What does he do
      if (q.includes("role") || q.includes("job") || q.includes("work") || q.includes("position") || q.includes("current") || q.includes("what does he do")) {
        return resolve("Karam is currently working multiple exciting roles! He is a Full Stack Engineer at NPT Solutions, a Product Manager & Flutter Team Leader at Paws Pal Connect, and a Freelance Full-stack Developer.");
      }

      // Experience / History
      if (q.includes("experience") || q.includes("history") || q.includes("companies") || q.includes("where has he worked")) {
        return resolve("Karam has 3+ years of experience. He's worked at NPT Solutions, Paws Pal Connect, Vica Web Solutions, Springer Capital, SoftTechSyria, and focal X agency.");
      }

      // Location
      if (q.includes("where") || q.includes("location") || q.includes("based") || q.includes("live") || q.includes("country")) {
        return resolve("He is currently based in Riyadh, Saudi Arabia.");
      }

      // Skills
      if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework") || q.includes("what can he do")) {
        return resolve("His technical stack is massive! For frontend: React.js, Next.js, TypeScript, Tailwind, and Three.js. For mobile: Flutter & React Native. For backend: Node.js, Python, PostgreSQL, and PHP. In Product Management, he handles Agile, Scrum, Jira, and Go-To-Market strategies.");
      }

      // Contact
      if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("message")) {
        return resolve("You can reach out to him directly through the Contact section right here on the portfolio. He's always open to discussing new opportunities or projects!");
      }

      // Specifically handling Paws Pal Connect
      if (q.includes("paws") || q.includes("pal")) {
        return resolve("At Paws Pal Connect, Karam wears two hats: he serves as a Product Manager and also leads the mobile development as the Flutter Team Leader.");
      }

      // Catch-all default
      resolve("That's an interesting question! I'm a limited offline bot, but you can definitely ask Karam himself via the Contact section. Try asking me 'where did he graduate?', 'what is his current role?', or 'what are his skills?'");
      
    }, 600 + Math.random() * 400); // Quick 0.6 to 1s delay
  });
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! I'm Karam's AI assistant. Ask me anything about his graduation, current role, or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const responseText = await mockAIResponse(userMsg.content);
    
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: "assistant", content: responseText }
    ]);
    setIsTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed z-50 transition-colors group flex items-center gap-2
              bottom-20 right-4 p-3
              sm:bottom-24 sm:right-6 sm:p-4
              lg:bottom-24 lg:right-8
              xl:bottom-24 xl:right-12 xl:p-5
              2xl:bottom-28 2xl:right-16 2xl:p-6
              bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]"
          >
            <Bot className="w-6 h-6 sm:w-6 sm:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 animate-pulse" />
            <span className="text-sm xl:text-base 2xl:text-lg font-medium tracking-wide hidden lg:block overflow-hidden max-w-0 group-hover:max-w-xs 2xl:group-hover:max-w-sm transition-all duration-300 whitespace-nowrap">
              Ask AI Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed z-50 flex flex-col bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden
              bottom-4 right-4 left-4 h-[80vh] rounded-2xl
              sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] sm:h-[550px] sm:max-h-[85vh]
              lg:right-8 lg:bottom-8 lg:w-[420px] lg:h-[600px]
              xl:right-12 xl:bottom-12 xl:w-[450px] xl:h-[650px]
              2xl:right-16 2xl:bottom-16 2xl:w-[550px] 2xl:h-[800px] 2xl:max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 xl:p-5 2xl:p-6 border-b border-foreground/10 bg-indigo-600/10 dark:bg-indigo-500/20">
              <div className="flex items-center gap-3 2xl:gap-4">
                <div className="p-2 2xl:p-3 bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                  <Bot className="w-5 h-5 2xl:w-7 2xl:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base xl:text-lg 2xl:text-2xl tracking-tight">Karam's AI Assistant</h3>
                  <p className="text-[10px] md:text-xs 2xl:text-sm text-emerald-500 font-mono tracking-widest font-semibold flex items-center gap-1.5 mt-0.5 2xl:mt-1">
                    <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                    ONLINE
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 2xl:p-3 hover:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors focus:outline-hidden"
              >
                <X className="w-5 h-5 2xl:w-7 2xl:h-7 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            {/* Chat History */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 xl:p-5 2xl:p-6 space-y-4 2xl:space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3.5 xl:p-4 2xl:p-5 text-[15px] xl:text-base 2xl:text-xl leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm 2xl:rounded-tr-md" 
                      : "bg-muted text-foreground border border-white/5 rounded-2xl rounded-tl-sm 2xl:rounded-tl-md"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted border border-white/5 px-4 py-3 xl:px-5 xl:py-4 2xl:px-6 2xl:py-5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 2xl:gap-2 shadow-sm h-[46px] 2xl:h-[60px]">
                    <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3.5 xl:p-4 2xl:p-6 border-t border-foreground/10 bg-background/80">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Karam..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-foreground/20 rounded-full py-3 pl-5 pr-12 xl:py-4 2xl:py-5 xl:pr-14 2xl:pr-16 2xl:pl-8 text-[15px] xl:text-base 2xl:text-xl focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 2xl:right-2.5 p-2 xl:p-2.5 2xl:p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-muted disabled:text-muted-foreground/30 text-white rounded-full transition-all shadow-md active:scale-95"
                >
                  <Send className="w-[18px] h-[18px] xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 translate-x-px -translate-y-px" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
