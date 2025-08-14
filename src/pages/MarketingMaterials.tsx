import React, { useEffect, useState } from 'react';
import '../styles/Chat.css';
import { useLanguage } from '../utils/LangProvider';

interface Content {
  title: string;
  text: string;
  imageUrl?: string;
}

// Helper function to render text with line breaks (copy from MarketingTools if already defined there)
const renderTextWithLineBreaks = (text: string) => {
  // Replace escaped newlines and trim surrounding quotes if present
  const cleanedText = text.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
  const lines = cleanedText.split('\n');
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />} {/* Add <br /> after each line except the last */}
    </React.Fragment>
  ));
};

export const MarketingMaterials: React.FC = () => {
    // State to store loaded content from local storage
    const [socialMediaContent, setSocialMediaContent] = useState<Content[]>([]);
    const [blogArticles, setBlogArticles] = useState<Content[]>([]);

    const [activeTab, setActiveTab] = useState<string>('socialMedia');

    // Access translations for dynamic text
    const { translations } = useLanguage();

    // --- Load data from Local Storage when the component mounts ---
    useEffect(() => {
        const loadContent = (key: string, setter: React.Dispatch<React.SetStateAction<Content[]>>) => {
        const storedContent = localStorage.getItem(key);
        if (storedContent) {
            try {
            setter(JSON.parse(storedContent));
            } catch (e) {
            console.error(`Error parsing content from local storage for key '${key}':`, e);
            // If parsing fails (e.g., corrupt data), clear it to prevent continuous errors
            localStorage.removeItem(key);
            }
        }
        };

        loadContent('socialMediaContent', setSocialMediaContent);
        loadContent('blogArticles', setBlogArticles);
    }, []);


  // --- Function to render the content for the currently active tab ---
  const renderCurrentTabContent = () => {
    let contentToDisplay: Content[] = [];
    let noContentMessage = "";

    if (activeTab === 'socialMedia') {
      contentToDisplay = socialMediaContent;
      noContentMessage = translations.marketingTools.backendError;
    } else if (activeTab === 'blogArticles') {
      contentToDisplay = blogArticles;
      noContentMessage = translations.marketingTools.backendError;
    }

    if (contentToDisplay.length === 0) {
      return <p className="no-content-message">{noContentMessage}</p>;
    }

    return contentToDisplay.map((item, index) => (
      <div key={index} className="material-item">
        <div className="material-text">
          {renderTextWithLineBreaks(item.text)}
        </div>
        {item.imageUrl && (
          <div className="material-image">
            <img src={item.imageUrl} alt={`Generated material ${index}`} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="marketing-materials-container">
      <h2>{translations.marketingTools.title}</h2>

      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'socialMedia' ? 'active' : ''}`}
          onClick={() => setActiveTab('socialMedia')}
        >
          {translations.marketingTools.socialMediaPost}
        </button>
        <button
          className={`tab-button ${activeTab === 'blogArticles' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogArticles')}
        >
          {translations.marketingTools.blogPost}
        </button>
      </div>

      <div className="materials-display">
        {renderCurrentTabContent()}
      </div>
    </div>
  );
};