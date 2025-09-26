


export default function SentryErrorButton() {
  return (
    <button onClick={() => {
      throw new Error("This is a test error for Sentry!");
    }}> Throw Test Error </button>
  );
}

