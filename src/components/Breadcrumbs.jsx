import React from 'react';


export const Breadcrumbs = ({ breadcrumbs }) => {
  const entries = Object.entries(breadcrumbs);
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {entries.map(([label, href], index) => {
        label = label.length > 25 ? label.slice(0, 20) + '...' : label;
        const isLast = index === entries.length - 1;
        return (
          <span key={label} className="truncate">
            {isLast ? (
              <p className="font-semibold text-[14px] text-on-white">{label}</p>
            ) : (
              <a className="text-[#004E84] text-[14px]" href={href}>
                <p className="">{label} &gt;</p>
              </a>
            )}
          </span>
        );
      })}
    </div>
  );
}