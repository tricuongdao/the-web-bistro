import * as React from 'react';
import { renderToString } from 'react-dom/server';

/*
 * Loaded through Vite's SSR graph so the React copy used by the app modules
 * and the one used by renderToString are guaranteed to be the same instance.
 * (Importing react-dom/server directly from the Node script resolves a second
 * React copy, which breaks hook dispatch: "Invalid hook call".)
 */
export { React, renderToString };
