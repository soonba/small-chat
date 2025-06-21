// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';

import '../src/styles/index.css'; // tailwind css file

import { MemoryRouter } from 'react-router-dom';

import { withThemeByDataAttribute } from '@storybook/addon-themes';

import type { Preview } from '@storybook/react';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      spring: 'spring',
      winter: 'winter',
    },
    defaultTheme: 'spring',
    attributeName: 'data-theme',
  }),
  (Story, context) => {
    useEffect(() => {
      const selectedMode = context.globals.mode || 'light';
      document.documentElement.classList.toggle('dark', selectedMode === 'dark');
    }, [context]);

    return (
      <MemoryRouter>
        <div className="flex min-h-screen w-screen items-center justify-center !bg-fixed p-10 spring:bg-pink-gradient winter:bg-blue-gradient dark:spring:bg-dark-pink-gradient dark:winter:bg-dark-blue-gradient">
          <Story />
        </div>
      </MemoryRouter>
    );
  },
];

const preview: Preview = {
  parameters: {
    toolbar: {
      title: { hidden: true },
      zoom: { hidden: true },
      eject: { hidden: true },
      copy: { hidden: true },
      fullscreen: { hidden: true },
      'storybook/background': { hidden: true },
      'storybook/viewport': { hidden: true },
      'storybook/outline': { hidden: true },
      'storybook/measure': { hidden: true },
    },
    options: {
      storySort: {
        includeNames: true,
        method: 'alphabetical',
        order: ['Introduction', 'Base', 'Components'],
      },
    },
  },
  globalTypes: {
    mode: {
      description: 'Global Mode for Components',
      toolbar: {
        title: 'Mode',
        items: [
          { icon: 'sun', value: 'light', title: 'Light Mode' },
          { icon: 'moon', value: 'dark', title: 'Dark Mode' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: 'light',
  },
};

export default preview;
