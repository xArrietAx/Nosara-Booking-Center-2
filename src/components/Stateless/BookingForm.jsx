"use client";

import { BookingContext } from "@/context/BookingContext";
import { useHistory } from "@/hooks/useHistory";
import { useContext, useEffect, useRef } from "react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";

export function BookingForm({ steps = [], handleSubmit = () => {} }) {
  const { reset } = useContext(BookingContext);

  const stepperRef = useRef(null);

  const { previousRoute, pathname } = useHistory();

  useEffect(() => {
    if (previousRoute.startsWith("/Rentals") ||
      previousRoute.startsWith("/Shuttles") ||
      previousRoute.startsWith("/Tours") ||
      previousRoute.startsWith("/Vacation-rentals") ||
      previousRoute.startsWith("/")
    ) {
      return reset();
    }
  }, [pathname]);

  function validateStep(nextStep) {
    const form = document.querySelector("form");
    if (form && !form.reportValidity()) return;

    return nextStep();
  }

  return (
    <div className="border border-border rounded-lg shadow-md">
      <div className="p-7 bg-secondary ">
        <p className="text-xl-bold">Booking Form</p>
      </div>

      <Stepper
        as="form"
        onSubmit={e => handleSubmit(e, stepperRef.current?.resetStepper)}
        steps={steps}
        className="space-y-4"
        ref={stepperRef}
        classNameWrapper="space-y-5 p-7"
        customButtons={({
          nextStep,
          prevStep,
          firstStep,
          lastStep,
          currentStepIndex,
          totalSteps,
        }) => {
          return (
            <div className="flex items-center gap-3 !mt-8">
              {!firstStep && (
                <Button
                  type="button"
                  isIconOnly="sm"
                  variant="outline"
                  className=""
                  onClick={prevStep}
                >
                  <i className="icon-[ion--chevron-back]" />
                </Button>
              )}
              <span className="text-sm-bold">
                {currentStepIndex} / {totalSteps}
              </span>
              {!lastStep && (
                <Button
                  type="button"
                  isIconOnly="sm"
                  variant="outline"
                  onClick={() => validateStep(nextStep)}
                >
                  <i className="icon-[ion--chevron-forward]" />
                </Button>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
