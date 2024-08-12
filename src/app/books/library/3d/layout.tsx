import React from "react";
import { Fragment } from 'react';

// eslint-disable-next-line react/prop-types
export default function SettingsLayout({ children }) {
  return (
    <Fragment>
      {/* Your custom layout for the settings page */}
      <body className="settings-layout">
        {children}
      </body>
    </Fragment>
  );
}