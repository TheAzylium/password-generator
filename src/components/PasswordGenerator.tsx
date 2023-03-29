import React, { useState } from 'react';
import CheckboxGroup from './CheckboxGroup';
import LengthSlider from './LengthSlider';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import LanguageSelector from './LanguageSelector';

interface Option {
  name: string;
  checked: boolean;
}

const defaultOptions: Option[] = [
  { name: 'lowercase', checked: true },
  { name: 'uppercase', checked: true },
  { name: 'numbers', checked: true },
  { name: 'symbols', checked: true },
  { name: 'spaces', checked: false },
  { name: 'noDuplicates', checked: false },
];

const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [length, setLength] = useState(16);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const { t } = useTranslation();

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setOptions(
      options.map((option) =>
        option.name === name ? { ...option, checked } : option
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const showTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  const generatePassword = () => {
    const characters = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
      spaces: ' ',
    };

    let password = '';
    let passwordChars = '';

    options.forEach((option) => {
      if (option.checked) {
        passwordChars += characters[option.name];
      }
    });

    if (passwordChars.length === 0) {
      alert('Veuillez sélectionner au moins un type de caractère');
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length);
      const randomChar = passwordChars[randomIndex];

      if (options.find((o) => o.name === 'noDuplicates').checked) {
        if (i > 0 && password[i - 1] === randomChar) {
          i--;
          continue;
        }
      }

      password += randomChar;
    }

    setGeneratedPassword(password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword).then(() => {
      showTooltip();
    });
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      } flex items-center justify-center px-4`}
    >
      <button onClick={toggleDarkMode} className="absolute top-4 right-4 ">
        {darkMode ? (
          <span
            className="material-icons text-gray-300 text-3xl"
            title={t('lightMode')}
          >
            brightness_7
          </span>
        ) : (
          <span
            className="material-icons text-gray-800 text-3xl "
            title={t('darkMode')}
          >
            brightness_2
          </span>
        )}
      </button>
      <div
        className={`bg-white p-8 rounded shadow-md w-full max-w-3xl ${
          darkMode ? 'dark' : ''
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">{t('title')}</h1>
        <CheckboxGroup options={options} onChange={handleCheckboxChange} />
        <LengthSlider value={length} onChange={setLength} />
        <button
          onClick={generatePassword}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
        >
          {t('generatePassword')}
        </button>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            {t('passwordGenerated')}
          </h2>
          <div className="relative bg-white border border-gray-300 p-2 w-full">
            <p className="truncate h-6">{generatedPassword}</p>
            <button
              onClick={copyToClipboard}
              title={t('copyToClipboard')}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              <span className="material-icons">content_copy</span>
            </button>
            <div
              className={`tooltip ${
                tooltipVisible ? 'show' : ''
              } absolute top-1/2 right-12 transform -translate-y-1/2`}
            >
              {t('copied')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
