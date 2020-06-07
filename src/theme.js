import { createTheme, darkThemePrimitives } from 'baseui';

console.log(darkThemePrimitives);

const primitives = {
  ...darkThemePrimitives,
  primaryFontFamily: 'Roboto',
};

const overrides = {
  borders: {
    inputBorderRadius: '30px',
  },
  colors: {
    inputPlaceholder: 'rgba(255, 255, 255, .35)',
    inputFill: darkThemePrimitives.primaryB,
    inputFillActive: darkThemePrimitives.primaryB,
    menuFill: darkThemePrimitives.primary600,
    menuFontDefault: darkThemePrimitives.primary,
  },
};

const theme = createTheme(primitives, overrides);

export default theme;
