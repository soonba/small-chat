import { create } from '@storybook/theming';

export default create({
  fontBase: '"Pretendard Variable", sans-serif',

  base: 'light',
  brandTitle: '작은 대화',
  brandUrl: 'https://soonba.github.io/small-chat',
  brandImage: 'https://soonba.github.io/small-chat/img_small_chat_logo.png',
  brandTarget: '_self',

  colorPrimary: '#000000',
  colorSecondary: '#0c436e',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#0c436e',
  appBorderRadius: 4,

  // Text colors
  textColor: '#0c436e',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#000000',
  barSelectedColor: '#0c436e',
  barHoverColor: '#0c436e',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#0c436e',
  inputTextColor: '#0c436e',
  inputBorderRadius: 2,
});
