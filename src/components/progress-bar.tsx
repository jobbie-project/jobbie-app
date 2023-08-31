interface ProgressBarProps {
  maxSteps: number;
  actualStep: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="w-full max-w-sm flex flex-row" style={{height: '6px'}}>
      {Array(props.maxSteps)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            style={{
              width: `${100 / props.maxSteps}%`,
              height: '6px',
              background: props.actualStep > index ? '#B20000' : '#E5E7EB',
            }}
            className={`${index === 0 && 'rounded-l-lg'} ${index + 1 === props.maxSteps && 'rounded-r-lg'}`}
          />
        ))}
    </div>
  );
}
