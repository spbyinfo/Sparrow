import { LucideIcon } from 'lucide-react';

interface StepConfig {
  number: number;
  title: string;
  icon: LucideIcon;
}

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[] | StepConfig[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const isStepConfig = (step: string | StepConfig): step is StepConfig => {
    return typeof step === 'object' && 'title' in step;
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => {
          const stepTitle = isStepConfig(step) ? step.title : step;
          const StepIcon = isStepConfig(step) ? step.icon : null;
          const stepNumber = isStepConfig(step) ? step.number : index + 1;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  index < currentStep - 1
                    ? 'bg-primary border-primary text-primary-foreground'
                    : index === currentStep - 1
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}
              >
                {index < currentStep - 1 ? (
                  '✓'
                ) : StepIcon ? (
                  <StepIcon className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`text-xs mt-2 text-center ${
                index <= currentStep - 1 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {stepTitle}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative">
        <div className="w-full bg-muted h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}