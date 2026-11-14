type ErrorProps = {
  text: string;
};

export function Error({ text }: ErrorProps) {
  return (
    <div className="flex gap-3 px-2">
      <ErrorIcon className="h-3.5 w-3.5 shrink-0 text-error" />
      <p className="text-error">{text}</p>
    </div>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.325 7.57501C14.325 11.3029 11.3029 14.325 7.57495 14.325C3.84703 14.325 0.824951 11.3029 0.824951 7.57501C0.824951 3.84709 3.84703 0.825012 7.57495 0.825012C11.3029 0.825012 14.325 3.84709 14.325 7.57501Z" />
      <path d="M7.57495 4.20001V7.95001" />
      <path d="M7.57495 10.575V10.65" />
    </svg>
  );
}
