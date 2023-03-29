import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface LengthSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const LengthSlider: React.FC<LengthSliderProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="flex flex-col mt-6">
      <input
        type="range"
        id="length"
        name="length"
        min="8"
        max="64"
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="length" className="mb-1">
        {t('length')}: {value}
      </label>
    </div>
  );
};

export default LengthSlider;
