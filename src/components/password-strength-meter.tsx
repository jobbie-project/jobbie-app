import React from "react";
import zxcvbn from "zxcvbn";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const testResult = zxcvbn(password);
  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Muito fraco";
      case 1:
        return "Fraco";
      case 2:
        return "Bom";
      case 3:
        return "Forte";
      case 4:
        return "Excelente";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#f1f1f1";
      case 1:
        return "#E30000";
      case 2:
        return "#FFD80D";
      case 3:
        return "#51BC65";
      case 4:
        return "#229337";
      default:
        return "#F1F1F1";
    }
  };

  return (
    <div
      className="rounded-lg mt-4 flex flex-row items-center justify-between"
      style={{ height: "6px" }}
    >
      <div className="w-full flex flex-row">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              style={{
                width: "25%",
                height: "6px",
                background:
                  index < testResult.score ? funcProgressColor() : "#F1F1F1",
              }}
              className={`rounded-lg ${index !== 0 && "ml-2"}`}
            />
          ))}
      </div>

      <span
        className="text-sm min-w-[80px] text-end ml-4"
        style={{ textDecorationColor: funcProgressColor() }}
      >
        {createPassLabel()}
      </span>
    </div>
  );
};

export default PasswordStrengthMeter;
