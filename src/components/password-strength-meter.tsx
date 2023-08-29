import React from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthMeterProps {
  password: string;
  onChange: (isValid: boolean) => void;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({password, onChange}) => {
  console.log(password);
  const testResult = zxcvbn(password);
  const createPassLabel = () => {
    const textScore = ['Muito fraco', 'Fraco', 'Bom', 'Forte', 'Excelente'];
    console.log(testResult.score >= 2);
    onChange(testResult.score >= 2);
    return textScore[testResult.score];
  };

  const funcProgressColor = () => {
    const colorsScore = ['#f1f1f1', '#E30000', '#FFD80D', '#51BC65', '#229337'];
    return colorsScore[testResult.score];
  };

  return (
    <div className="rounded-lg mt-4 flex flex-row items-center justify-between" style={{height: '6px'}}>
      <div className="w-full flex flex-row">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              style={{
                width: '25%',
                height: '6px',
                background: index < testResult.score ? funcProgressColor() : '#F1F1F1',
              }}
              className={`rounded-lg ${index !== 0 && 'ml-2'}`}
            />
          ))}
      </div>

      <span className="text-sm min-w-[80px] text-end ml-4" style={{textDecorationColor: funcProgressColor()}}>
        {createPassLabel()}
      </span>
    </div>
  );
};

export default PasswordStrengthMeter;
