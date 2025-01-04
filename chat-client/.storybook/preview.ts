import { withThemeByClassName } from '@storybook/addon-themes';

// tailwind css file
import '../src/styles/index.css';

import type { Preview } from '@storybook/react';

export const decorators = [
  withThemeByClassName({
    defaultTheme: 'light',
    themes: {
      dark: 'dark',
      light: 'light',
    },
  }),
];

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        includeNames: true,
        method: 'alphabetical',
        order: ['Auth', 'Chat'],
      },
    },
  },
};

export default preview;
