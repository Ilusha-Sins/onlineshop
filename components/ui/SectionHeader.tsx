import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div>
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-neutral-400">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500 md:text-base md:leading-7">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};

export default SectionHeader;