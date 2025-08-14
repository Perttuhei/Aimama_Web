import React from 'react';
import '../styles/InputArea.css';
import { AiOutlineSend, AiOutlineCloseCircle } from 'react-icons/ai';
import { useLanguage } from '../utils/LangProvider';

interface InputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  onSendMessage: () => void;
  onClearChat: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ userInput, setUserInput, onSendMessage, onClearChat }) => {
  const { translations } = useLanguage();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      onSendMessage();
    }
  };

  return (
    <div className="input-area">
      <textarea
        className="user-input-field"
        placeholder={translations.chat.inputPlaceholder}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3} 
      />
      <div className="input-controls">
        <button onClick={onSendMessage} className="send-button" title={translations.chat.sendMessage}>
          <AiOutlineSend size={24} /> {translations.chat.sendMessage}
        </button>
        <button onClick={onClearChat} className="clear-button" title={translations.chat.clearChat}>
          <AiOutlineCloseCircle size={24} /> {translations.chat.clearChat}
        </button>
      </div>
    </div>
  );
};