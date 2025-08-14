import React, { useState, createContext, useContext } from 'react';
import { type Translations, languages } from '../values/appStrings.tsx';

type LanguageContextType = {
  lang: keyof typeof languages;
  translations: Translations;
  setLanguage: (lang: keyof typeof languages) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<keyof typeof languages>('fi');

  const translations = languages[currentLang];

  const setLanguage = (lang: keyof typeof languages) => {
    setCurrentLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ lang: currentLang, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};