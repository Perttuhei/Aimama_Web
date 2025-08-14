import { useLanguage } from "../utils/LangProvider";


const Sidebar: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
        <aside className="sidebar">
            <h2>{translations.sidebar.topicsTitle}</h2>
            <ul>
                <li>{translations.sidebar.generalQuestions}</li>
                <li>{translations.sidebar.socialMediaContent}</li>
                <li>{translations.sidebar.blogArticles}</li>
                <li>{translations.sidebar.emailMarketing}</li>
                <li>{translations.sidebar.adcopy}</li>
                <li >{translations.sidebar.image}</li>
            </ul>
        </aside>
    </>
  );
};

export default Sidebar;
