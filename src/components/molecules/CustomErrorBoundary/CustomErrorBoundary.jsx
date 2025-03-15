import { ErrorBoundary } from "react-error-boundary";

function CustomErrorBoundaryUI({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-[100vh] justify-center items-center px-10 bg-slack">
      <div className="max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold ">Oops! Something went wrong</h1>
        <p className="mb-4 text-gray-700">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-slack-light px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function CustomErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorBoundaryUI}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
