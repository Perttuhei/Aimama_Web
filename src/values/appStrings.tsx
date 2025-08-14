export interface Translations {
  navbar: {
    aiAssistant: string;
    home: string;
    chat: string;
    toggleTheme: string;
  };
  chat: {
    welcomeMessage: string;
    userLabel: string;
    aiLabel: string;
    inputPlaceholder: string;
    sendMessage: string;
    clearChat: string;
    simulatedAiResponse: (query: string) => string;
    imageDescription: string;
  };
  marketingTools: {
    title: string;
    socialMediaPost: string;
    blogPost: string;
    emailCampaign: string;
    adCopy: string;
    generatedMaterialTitle: string;
    simulatedGeneration: (prompt: string) => string;
    urlPromptMessage: string;
    urlPlaceholder: string; 
    urlInputRequired: string;
    generateFromUrl: string;
    generating: string; 
    failedToGenerate: string;
    backendError: string;
    noContentFound: string;
    generatingContent: string;
    imageGeneration: string;
    imagePromptMessage: string;
    imagePromptPlaceholder: string;
    imagePromptRequired: string;
    generateImage: string;
    generatingImage: string;
    failedToGenerateImage: string;
    noImageFound: string;
    imageGeneratedMessage: string;
  };
    sidebar: {
    topicsTitle: string;
    generalQuestions: string;
    marketingMaterials: string;
    blogArticles: string;
    socialMediaContent: string;
    emailMarketing: string;
    adcopy: string;
    image: string;
    ChatButton: string;
  };
  general: {
    loading: string;
    error: string;
  };
}

export const fi: Translations = {
  navbar: {
    aiAssistant: "Tekoälyavustaja",
    home: "Etusivu",
    chat: "Chat",
    toggleTheme: "Vaihda teemaa",
  },
  chat: {
    welcomeMessage: "Hei! Miten voin auttaa sinua tänään?",
    userLabel: "Sinä:",
    aiLabel: "Tekoäly:",
    inputPlaceholder: "Kysy jotain...",
    sendMessage: "Lähetä",
    clearChat: "Tyhjennä",
    simulatedAiResponse: (query: string) => `Vastaukseni kysymykseesi "${query}" on tässä. Miten haluat tarkentaa?`,
    imageDescription: "Luotu sisältö",
  },
  marketingTools: {
    title: "Markkinointityökalut",
    socialMediaPost: "Some-päivitys",
    blogPost: "Blogiteksti",
    emailCampaign: "Sähköpostikirje",
    adCopy: "Mainosteksti",
    generatedMaterialTitle: "Luotu markkinointimateriaali:",
    simulatedGeneration: (prompt: string) => `Tässä on luotu ${prompt}. Tämä on simuloitu vastaus.`,
    urlPromptMessage: "Anna haluamasi sivun URL-osoite tekstikenttään, josta generoidaan markkinointimateriaalia.",
    urlPlaceholder: "URL - esim. https://example.com/",
    urlInputRequired: "URL-osoite on pakollinen.",
    generateFromUrl: "Generoi URL:sta",
    generating: "Luodaan...",
    failedToGenerate: "Sisällön luominen epäonnistui.",
    backendError: "Virhe backend-palvelimella.",
    noContentFound: "Sisältöä ei löytynyt tai generoitua materiaalia ei palautettu.",
    generatingContent: "Luodaan sisältöä, odota hetki...",
    imageGeneration: "Kuvan luonti",
    imagePromptMessage: "Anna kuvaus siitä, millaisen kuvan haluat luoda:",
    imagePromptPlaceholder: "Kuvaile kuvaa, esim. 'aurinkoinen maisema tuntureilla ja revontulilla'",
    imagePromptRequired: "Kuvan kuvaus on pakollinen.",
    generateImage: "Luo kuva",
    generatingImage: "Luodaan kuvaa...",
    failedToGenerateImage: "Kuvan luominen epäonnistui.",
    noImageFound: "Kuvaa ei löytynyt vastauksesta. Tarkista backend-vastaus.",
    imageGeneratedMessage: "Tässä on luotu kuva pyyntösi perusteella.",
  },
    sidebar: {
    topicsTitle: "Aihepiirit",
    generalQuestions: "Yleiset kysymykset",
    marketingMaterials: "Markkinointimateriaalit",
    blogArticles: "Blogiartikkelit",
    socialMediaContent: "Sosiaalisen median sisällöt",
    emailMarketing: "Sähköpostimarkkinointi",
    adcopy: "Mainostekstit",
    image: "Kuvat",
    ChatButton: "takaisin keskusteluun",
  },
  general: {
    loading: "Ladataan...",
    error: "Virhe",
  },
};

export const en: Translations = {
  navbar: {
    aiAssistant: "AI Assistant",
    home: "Home",
    chat: "Chat",
    toggleTheme: "Toggle theme",
  },
  chat: {
    welcomeMessage: "Hi! How can I help you today?",
    userLabel: "You:",
    aiLabel: "AI:",
    inputPlaceholder: "Ask something...",
    sendMessage: "Send",
    clearChat: "Clear",
    simulatedAiResponse: (query: string) => `My answer to your question "${query}" is here. How would you like to refine it?`,
    imageDescription: "Generated content",
  },
  marketingTools: {
    title: "Marketing Tools",
    socialMediaPost: "Social Media Post",
    blogPost: "Blog Post",
    emailCampaign: "Email Campaign",
    adCopy: "Ad Copy",
    generatedMaterialTitle: "Generated Marketing Material:",
    simulatedGeneration: (prompt: string) => `Here is a generated ${prompt}. This is a simulated response.`,
    urlPromptMessage: "Please provide the URL of the page from which to generate marketing material in the text field.",
    urlPlaceholder: "URL - e.g., https://example.com/",
    urlInputRequired: "URL is required.",
    generateFromUrl: "Generate from URL",
    generating: "Generating...",
    failedToGenerate: "Failed to generate content.",
    backendError: "Error from backend server.",
    noContentFound: "No content found or generated material returned.",
    generatingContent: "Generating content, please wait...",
    imageGeneration: "Image generation",
    imagePromptMessage: "Please describe the type of image you want to create:",
    imagePromptPlaceholder: "Describe the image, e.g. 'sunny landscape with fells and northern lights'",
    imagePromptRequired: "A description of the image is required.",
    generateImage: "Create an image",
    generatingImage: "Creating an image...",
    failedToGenerateImage: "Image creation failed.",
    noImageFound: "Image not found in response. Check backend response.",
    imageGeneratedMessage: "Here is an image created based on your request.",
  },
    sidebar: {
    topicsTitle: "Topics",
    generalQuestions: "General Questions",
    marketingMaterials: "Marketing Materials",
    blogArticles: "Blog Articles",
    socialMediaContent: "Social Media Content",
    emailMarketing: "Email Marketing",
    adcopy: "Advertising texts",
    image: "Images",
    ChatButton: "Back to Chat",
  },
  general: {
    loading: "Loading...",
    error: "Error",
  },
};

export const languages = {
  fi: fi,
  en: en,
};