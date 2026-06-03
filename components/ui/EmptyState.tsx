import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`rounded-[2rem] border border-dashed border-neutral-300 bg-white/80 px-6 py-12 text-center shadow-sm shadow-black/[0.02] md:px-10 md:py-16 ${className}`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-lg text-neutral-500">
  —
</div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
        {title}
      </h2>

      {description ? (
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};

export default EmptyState;