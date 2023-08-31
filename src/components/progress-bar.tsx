interface ProgressBarProps {
  maxSteps: number;
  actualStep: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="w-full max-w-[408px] rounded-full flex flex-row bg-[#E5E7EB]" style={{height: '6px'}}>
      <div
        style={{
          width: `${(100 / props.maxSteps) * props.actualStep}%`,
          height: '6px',
          background: '#B20000',
        }}
        className="rounded-full"
      />
    </div>
  );
}
