import { datadogRum } from "@datadog/browser-rum";

export default function ErrorButton() {
  const handleClick = () => {
    try {
      throw new Error("Test error from DataDogErrorButton component!");
    } catch (err) {
      datadogRum.addError(err, { component: "ErrorButton" });
      console.log("Error sent to Datadog:", err);
    }
  };

  return (
    <button onClick={handleClick} style={{ padding: "10px", fontSize: "16px" }}>
      Send Test Error to Datadog
    </button>
  );
};

