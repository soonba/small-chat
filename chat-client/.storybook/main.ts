import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-themes', '@storybook/addon-toolbars'],

  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  // https://github.com/aleclarson/vite-tsconfig-paths/issues/65#issuecomment-1221271942
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },

  docs: {
    autodocs: true
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;
