import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, ChatStatus, LeadData } from '../types';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasGreeted, setHasGreeted] = useState(false);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      addMessage('model', '¡Hola! Soy el asistente virtual de Salin. Puedo ayudarte con dudas sobre nuestra operación o conectarte con un asesor. ¿Cómo puedo ayudarte hoy?');
    }
  }, [isOpen, hasGreeted]);

  const addMessage = (role: 'user' | 'model', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleLeadSubmit = async (lead: LeadData) => {
    // In a real app, send to backend here
    console.log("LEAD CAPTURED:", lead);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    addMessage('user', userMsg);
    setStatus(ChatStatus.TYPING);

    try {
      const response = await sendMessageToGemini(userMsg, handleLeadSubmit);
      if (response) {
        addMessage('model', response);
      }
    } catch (error) {
      console.error(error);
      addMessage('model', 'Lo siento, hubo un error de conexión.');
    } finally {
      setStatus(ChatStatus.IDLE);
    }
  };

  return (
    <>
      {/* Trigger Button - Desktop: Bottom Right, Mobile: Hidden if Open */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary hover:bg-red-600 text-white px-5 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 group"
        >
          <span className="material-symbols-outlined text-2xl">chat_bubble</span>
          <span className="font-bold text-sm hidden md:inline">Hablar con Asesor</span>
          {/* Pulse effect */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[600px] z-50 bg-white dark:bg-surface-dark md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-float-in">

          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-[#061526] p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-secondary rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Asistente Salin</h3>
                <p className="text-[10px] text-white/70 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-green-400"></span>
                  En línea ahora
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-light dark:bg-background-dark/50 scrollbar-thin">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                <span className="material-symbols-outlined text-4xl mb-2 text-primary">support_agent</span>
                <p className="text-sm font-medium">Inicia la conversación para recibir ayuda personalizada.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-100 dark:border-gray-700 rounded-bl-none'
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {status === ChatStatus.TYPING && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-700 shrink-0">
            <div className="flex gap-2 items-end bg-gray-50 dark:bg-background-dark p-1.5 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="w-full bg-transparent border-none focus:ring-0 text-sm p-3 max-h-32 resize-none text-secondary dark:text-white placeholder:text-gray-400"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || status === ChatStatus.TYPING}
                className="p-3 bg-primary text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400">Powered by Salin AI</p>
            </div>
          </form>

        </div>
      )}
    </>
  );
};