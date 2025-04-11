import React from "react";

function OrderProcessing({ steps, orderStatusHistory }) {
  const statusSet = new Set(orderStatusHistory.map((s) => s.status));

  const completedSteps = steps.reduce(
    (count, step) => (statusSet.has(step.key) ? count + 1 : count),
    0
  );
  const totalSteps = steps.length;
  const fillPercent = (completedSteps / totalSteps) * 100;

  return (
    <div className="order-processing" style={{ position: "relative" }}>
      <div
        className="progress-track"
        style={{
          position: "absolute",
          top: "8px",
          left: "115px",
          width: "75%",
          height: "10px",
          background:
            "url('../images/order-progress-line.png') no-repeat center",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      <div
        className="progress-fill"
        style={{
          position: "absolute",
          top: "8px",
          left: "115px",
          width: `${(75 * fillPercent) / 100}%`,
          maxWidth: "75%",
          height: "10px",
          background:
            "url('../images/order-progress-bar.png') no-repeat center",
          backgroundSize: "cover",
          zIndex: 1,
        }}
      />

      {steps.map((step, index) => {
        const isActive = statusSet.has(step.key);
        return (
          <div
            key={step.key}
            className={`order-${step.label.toLowerCase().replace(" ", "-")}`}
            style={{
              display: "inline-block",
              marginRight: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {isActive ? (
              <>
                <img src="/images/order-check.png" alt="check" />
              </>
            ) : (
              <img src="/images/order-circle.png" alt="circle" />
            )}
            <div className="order-box">
              <img src={`/images/${step.icon}`} alt={step.label} />
              <span>{step.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderProcessing;
