import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface CheckboxOption {
  name: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  onChange: (name: string, checked: boolean) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onChange(name, checked);
  };

  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <label key={option.name} className="inline-flex items-center mb-2 ">
          <input
            type="checkbox"
            name={option.name}
            checked={option.checked}
            onChange={handleChange}
            aria-label={t(`options.${option.name}`)}
          />
          <span className="ml-2">{t(`options.${option.name}`)}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
