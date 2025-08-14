import React, { useEffect, useRef, useState } from 'react';
import '../styles/Chat.css';
import { InputArea } from '../components/InputArea';
import { useLanguage } from '../utils/LangProvider';
import { supabase } from '../utils/supabaseClient';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  imageUrl?: string;
}

export const Chat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { translations } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: translations.chat.welcomeMessage },
  ]);
  const [userInput, setUserInput] = useState<string>('');

  const aiResponse = async (currentMessages: Message[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const openaiMessages = currentMessages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text,
      }));

      const { data, error } = await supabase.functions.invoke("chat_text", {
        body: { messages: openaiMessages },
      });

      if (error) {
        throw new Error(error.message || translations.marketingTools.backendError);
      }
      
      const generatedText = data.response; 
      return generatedText;

    } catch (e) {
      console.error("Error during content generation workflow:", e);
      let errorMessage = translations.marketingTools.failedToGenerate;

      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === 'string') {
        errorMessage = e;
      }
      setError(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newUserMessage: Message = { id: Date.now().toString(), sender: 'user', text: userInput.trim() };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setUserInput('');

      try {
        const aiGeneratedText = await aiResponse(updatedMessages);
        if (aiGeneratedText) {
          const response: Message = { id: Date.now().toString(), sender: 'ai', text: aiGeneratedText };
          setMessages((prevMessages) => [...prevMessages, response]);
        } else {
          const errorMessage: Message = { id: Date.now().toString(), sender: 'ai', text: translations.marketingTools.backendError };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } catch (e) {
        console.error("Unhandled error in handleSendMessage after aiResponse:", e);
      }
    }
  };

  const handleClearChat = () => {
    setMessages([{ id: '1', sender: 'ai', text: translations.chat.welcomeMessage }]);
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <main className="chat-area">
        <div className="messages-display">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-bubble">
                <span className="sender-label">{message.sender === 'ai' ? translations.chat.aiLabel : translations.chat.userLabel}</span> {message.text}
                {message.imageUrl && <img src={message.imageUrl} alt="Generated content" className="generated-image" />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> 
        </div>

        <InputArea
          userInput={userInput}
          setUserInput={setUserInput}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
        />
        
      </main>
    </div>
  );
};