import React from 'react';


export const Breadcrumbs = ({ breadcrumbs }) => {
    const entries = Object.entries(breadcrumbs);
    return (
      <div className="flex flex-row">
        {entries.map(([label, href], index) => {
          const isLast = index === entries.length - 1;
          return (
            <span key={label}>
              {isLast ? (
                <p className="font-semibold">{label}</p>
              ) : (
                <a className="text-[#004E84]" href={href}>
                  {label} &nbsp;&gt;&nbsp;
                </a>
              )}
            </span>
          );
        })}
      </div>
    );
}