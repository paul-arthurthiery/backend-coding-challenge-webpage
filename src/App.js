import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';

import theme from './theme';
const engine = new Styletron();

export default () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={theme}>
      <div className={'App'}>
        <Home/>
      </div>
    </BaseProvider>
  </StyletronProvider>
);
