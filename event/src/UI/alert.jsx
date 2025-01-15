import React from "react";

export const Alert = ({ variant, children }) => (
  <div className={`alert ${variant}`}>{children}</div>
);

export const AlertTitle = ({ children }) => <strong>{children}</strong>;

export const AlertDescription = ({ children }) => <p>{children}</p>;
