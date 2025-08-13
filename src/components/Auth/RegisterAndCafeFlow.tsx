import { useState } from "react";
import RegisterForm from "../Auth/RegisterForm";
import CafeForm from "../Cafe/CafeForm";

export default function RegisterAndCafeFlow() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div>
      {step === 1 && (
        <RegisterForm onSuccess={() => setStep(2)} />
      )}
      {step === 2 && (
        <CafeForm />
      )}
    </div>
  );
}
