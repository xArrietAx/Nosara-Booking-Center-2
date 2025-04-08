import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/Button";

export const Stepper = forwardRef(({ steps, onComplete, onNextStep, className, classNameWrapper, as = "div", customButtons, ...props }, ref) => {

  const Tag = as;
  const [currentStep, setCurrentStep] = useState(0);

  useImperativeHandle(ref, () => ({
    resetStepper: () => setCurrentStep(0),
  }));

  const nextStep = () => {
    if (onNextStep && !onNextStep(currentStep)) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete && onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const firstStep = currentStep === 0;
  const lastStep = currentStep === steps.length - 1;
  const currentStepIndex = currentStep + 1;
  const totalSteps = steps.length;

  return (
    <Tag className={classNameWrapper} {...props}>
      <div className={className}>{steps[currentStep]}</div>
      {customButtons ? customButtons({ currentStep, nextStep, prevStep, firstStep, lastStep, currentStepIndex, totalSteps }) : (
        <div className="flex justify-between">
          <Button onClick={prevStep} disabled={firstStep}>
            Atrás
          </Button>
          <Button onClick={nextStep}>
            {lastStep ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      )}
    </Tag>
  );
});
