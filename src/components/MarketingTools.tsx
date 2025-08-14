import React, { useState } from 'react';
import { FaFileAlt, FaBullhorn, FaMailBulk, FaEdit, FaLink, FaImage } from 'react-icons/fa';
import { supabase } from "../utils/supabaseClient";
import '../styles/MarketingTools.css';
import { useLanguage } from '../utils/LangProvider';

/*interface SavedMaterial {
  text: string;
  image?: string | null;
  timestamp: number;
}*/

const MarketingTools: React.FC = () => {
  const [generatedContent, setGeneratedContent] = useState<{ text: string; image: string | null } | null>(null);
  const { translations } = useLanguage();
  const [urlInput, setUrlInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [showImagePromptInput, setShowImagePromptInput] = useState<boolean>(false); 
  const [imagePromptInput, setImagePromptInput] = useState<string>(''); 
  const [currentToolContext, setCurrentToolContext] = useState<string | null>(null);

  /*const saveMaterialToSessionStorage = (material: SavedMaterial) => {
    const storedMaterialsString = localStorage.getItem('generatedMarketingMaterials');
    let materials: SavedMaterial[] = [];

    if (storedMaterialsString) {
      try {
        materials = JSON.parse(storedMaterialsString);
      } catch (e) {
        console.error("Error parsing existing materials from session storage:", e);
        materials = [];
      }
    }

    materials.unshift(material);

    if (currentToolContext) {
      console.log("example of adding material to local storage")
      //localStorage.setItem(currentToolContext, JSON.stringify(materials));
    }
  };*/

  const handleGenerateFromUrl = async () => {
    if (!urlInput.trim()) {
      setError(translations.marketingTools.urlInputRequired);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setShowUrlInput(false);
    setShowImagePromptInput(false);

    let endpoint = "";

    switch (currentToolContext) {
      case translations.marketingTools.socialMediaPost:
        endpoint = "social_media_post";
        break;
      case translations.marketingTools.blogPost:
        endpoint = "blog_post";
        break;
      case translations.marketingTools.emailCampaign:
        endpoint = "email_campaign";
        break;
      case translations.marketingTools.adCopy:
        endpoint = "ad_copy";
        break;
    }

    try {
      console.log(endpoint)
      /*__________TEKSTI__________ */
      const { data: text, error } = await supabase.functions.invoke(endpoint, {
        body: { searchParams: urlInput.trim() },
      })

      if (!text) {
        const errorData = await error
        throw new Error(errorData.detail || translations.marketingTools.backendError);
      }
      const generatedText = text.generatedText;

      /*__________KUVA__________ */
      const { data: image_data, error: imageInvokeError } = await supabase.functions.invoke("generate_image", {
        body: { prompt: generatedText },
      });

      if (!image_data) {
        const imageErrorData = await imageInvokeError
        throw new Error(imageErrorData.detail || translations.marketingTools.backendError);
      }
      const generatedImage = image_data.image_data; 

      if (!generatedImage) {
        throw new Error(translations.marketingTools.noImageFound);
      }
      setGeneratedContent({ text: generatedText, image: generatedImage });
      /*saveMaterialToSessionStorage({
        text: generatedText,
        image: generatedImage,
        timestamp: Date.now(),
      });*/

    } catch (e: unknown) {
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
      setUrlInput('');
      setCurrentToolContext(null);
    }
  };

  const handleGenerateImageFromPrompt = async () => {
    if (!imagePromptInput.trim()) {
        setError(translations.marketingTools.imagePromptRequired);
        return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setShowUrlInput(false);
    setShowImagePromptInput(false);

    try {
      const { data: image_data, error: imageInvokeError } = await supabase.functions.invoke("generate_image", {
      body: { prompt: imagePromptInput.trim() },
      });

      if (!image_data) {
        const imageErrorData = await imageInvokeError
        throw new Error(imageErrorData.detail || translations.marketingTools.backendError);
      }
      const generatedImage = image_data.image_data; 

      if (!generatedImage) {
        throw new Error(translations.marketingTools.noImageFound);
      }

      setGeneratedContent({ text: translations.marketingTools.imageGeneratedMessage, image: generatedImage });

    } catch (e: unknown) {
        console.error("Error generating image (standalone):", e);
        let errorMessage = translations.marketingTools.failedToGenerateImage;

        if (e instanceof Error) {
            errorMessage = e.message;
        } else if (typeof e === 'string') {
            errorMessage = e;
        }
        setError(errorMessage);
    } finally {
        setIsLoading(false);
        setImagePromptInput('');
        setCurrentToolContext(null);
    }
  };

  const handleToolClickRequiresUrl = (toolName: string) => {
    setShowUrlInput(true);
    setShowImagePromptInput(false);
    setCurrentToolContext(toolName);
    setGeneratedContent(null);
    setError(null);
    setUrlInput('');
    setImagePromptInput('');
  };

  const handleGenerateImageClick = () => {
    setShowImagePromptInput(true);
    setShowUrlInput(false);
    setCurrentToolContext(translations.marketingTools.imageGeneration);
    setGeneratedContent(null);
    setError(null);
    setUrlInput('');
    setImagePromptInput('');
  };

  const renderTextWithLineBreaks = (text: string) => {
    const cleanedText = text.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
    const lines = cleanedText.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="tool-section">
      <h3>{translations.marketingTools.title}</h3>

      <div className="tools">
        <button
          onClick={() => handleToolClickRequiresUrl(translations.marketingTools.socialMediaPost)}
          className="tool-button"
          disabled={isLoading}
        >
          <FaBullhorn size={20} /> {translations.marketingTools.socialMediaPost}
        </button>

        <button
          onClick={() => handleToolClickRequiresUrl(translations.marketingTools.blogPost)}
          className="tool-button"
          disabled={isLoading}
        >
          <FaFileAlt size={20} /> {translations.marketingTools.blogPost}
        </button>

        <button
          onClick={() => handleToolClickRequiresUrl(translations.marketingTools.emailCampaign)}
          className="tool-button"
          disabled={isLoading}
        >
          <FaMailBulk size={20} /> {translations.marketingTools.emailCampaign}
        </button>

        <button
          onClick={() => handleToolClickRequiresUrl(translations.marketingTools.adCopy)}
          className="tool-button"
          disabled={isLoading}
        >
          <FaEdit size={20} /> {translations.marketingTools.adCopy}
        </button>

        {/* You can keep or remove this button if image generation is fully integrated into text generation */}
        {/* If you keep it, make sure handleGenerateImageFromPrompt is still correctly implemented to be standalone */}
        <button
            onClick={handleGenerateImageClick}
            className="tool-button"
            disabled={isLoading}
        >
            <FaImage size={20} /> {translations.marketingTools.imageGeneration}
        </button>

      </div>

      {showUrlInput && (
        <div className="url-input-section">
          <input
            type="url"
            placeholder={translations.marketingTools.urlPlaceholder}
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="url-input-field"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerateFromUrl}
            className="url-submit-button"
            disabled={isLoading || !urlInput.trim()}
          >
            <FaLink size={20} /> {isLoading ? translations.marketingTools.generating : translations.marketingTools.generateFromUrl}
          </button>
        </div>
      )}

      {/* Conditionally rendered Image Prompt input section (still useful if you keep standalone image generation) */}
      {showImagePromptInput && (
        <div className="image-prompt-section url-input-section">
          <input
            type="text"
            placeholder={translations.marketingTools.imagePromptPlaceholder}
            value={imagePromptInput}
            onChange={(e) => setImagePromptInput(e.target.value)}
            className="image-prompt-field url-input-field"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerateImageFromPrompt}
            className="image-submit-button url-submit-button"
            disabled={isLoading || !imagePromptInput.trim()}
          >
            <FaImage size={20} /> {isLoading ? translations.marketingTools.generatingImage : translations.marketingTools.generateImage}
          </button>
        </div>
      )}

      {isLoading && <p className="loading-message">{translations.marketingTools.generatingContent}</p>}
      {error && <p className="error-message">{error}</p>}

      {generatedContent && !isLoading && (
        <div className="generated-content">
          <h4>{translations.marketingTools.generatedMaterialTitle}</h4>
          {generatedContent.text && <p>{renderTextWithLineBreaks(generatedContent.text)}</p>}
          {generatedContent.image && (
            <img src={generatedContent.image} alt="Generated Image" className="generated-image-preview" style={{ maxWidth: '100%', height: 'auto', display: 'block', marginTop: '15px' }} />
          )}
        </div>
      )}
    </div>
  );
};

export default MarketingTools;