interface StatusMessageProps {
  title: string;
  message: string;
  action?: () => void;
  actionText?: string;
}

export function StatusMessage({ title, message, action, actionText }: StatusMessageProps) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-md p-12 text-center">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-xs text-gray-500">{message}</p>
      {action && (
        <button
          onClick={action}
          className="mt-6 rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 hover:cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}