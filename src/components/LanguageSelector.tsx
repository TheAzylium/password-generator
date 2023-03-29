import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const languageOptions = [
    {
      value: 'en',
      label: (
        <>
          <img
            src="flags/united-kingdom.png"
            alt="English"
            className="inline h-4 mr-1"
          />{' '}
          English
        </>
      ),
    },
    {
      value: 'fr',
      label: (
        <>
          <img
            src="flags/france.png"
            alt="Français"
            className="inline h-4 mr-1"
          />{' '}
          Français
        </>
      ),
    },
    {
      value: 'de',
      label: (
        <>
          <img
            src="flags/germany.png"
            alt="Deutsch"
            className="inline h-4 mr-1"
          />{' '}
          Deutsch
        </>
      ),
    },
    {
      value: 'es',
      label: (
        <>
          <img
            src="flags/spain.png"
            alt="Español"
            className="inline h-4 mr-1"
          />{' '}
          Español
        </>
      ),
    },
    {
      value: 'it',
      label: (
        <>
          <img
            src="flags/italy.png"
            alt="Italiano"
            className="inline h-4 mr-1"
          />{' '}
          Italiano
        </>
      ),
    },
    {
      value: 'pt',
      label: (
        <>
          <img
            src="flags/portugal.png"
            alt="Português"
            className="inline h-4 mr-1"
          />{' '}
          Português
        </>
      ),
    },
  ];

  const handleChange = (selectedOption: any) => {
    i18n.changeLanguage(selectedOption.value);
  };

  const selectedLanguage =
    languageOptions.find((option) => option.value === i18n.language) ||
    languageOptions[0];

  return (
    <div className="w-40 absolute top-4 left-4">
      <Select
        value={selectedLanguage}
        onChange={handleChange}
        options={languageOptions}
        isSearchable={false}
        components={{ IndicatorSeparator: () => null }}
        className="text-base"
      />
    </div>
  );
};

export default LanguageSelector;
