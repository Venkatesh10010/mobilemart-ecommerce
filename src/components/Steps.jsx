function Steps({ currentStep }) {
  const steps = ["Cart", "Delivery", "Payment"];

  return (
    <div className="steps">
      {steps.map((step, index) => (
        <div
          key={step}
          className={currentStep === index + 1 ? "active" : ""}
        >
          {index + 1}. {step}
        </div>
      ))}
    </div>
  );
}

export default Steps;
