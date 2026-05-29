const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-4 border border-red-500/30 bg-red-500/10 flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
          <svg
            className="w-4 h-4 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-red-300 font-medium text-sm">Error</p>
          <p className="text-red-200/70 text-sm mt-0.5">{message}</p>
        </div>

        {/* Dismiss */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-red-400/60 hover:text-red-300 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
