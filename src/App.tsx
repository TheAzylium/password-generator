import './App.css';
import PasswordGenerator from './components/PasswordGenerator';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';

const App = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.title = i18n.t('title');
  }, [i18n.language]);
  return (
    <div className="App">
      <LanguageSelector />
      <PasswordGenerator />
    </div>
  );
};

export default App;
