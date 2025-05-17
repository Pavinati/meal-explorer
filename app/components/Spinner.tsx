export function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin stroke-blue-600 text-gray-200 dark:text-gray-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
        />
        <path
          d="M 45 5 A 45 45 0 0 0 5 50"
          stroke="currentStroke"
          strokeWidth="10"
          fill="transparent"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
