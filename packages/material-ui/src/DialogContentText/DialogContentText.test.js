import * as React from 'react';
import { createClientRender, describeConformanceV5, createMount } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import DialogContentText, {
  dialogContentTextClasses as classes,
} from '@material-ui/core/DialogContentText';

describe('<DialogContentText />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<DialogContentText>foo</DialogContentText>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    mount,
    muiName: 'MuiDialogContentText',
    refInstanceof: window.HTMLParagraphElement,
    skip: ['componentsProp', 'themeVariants'],
  }));

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <span data-testid="test-children" />;
      const { getByTestId } = render(<DialogContentText>{children}</DialogContentText>);

      getByTestId('test-children');
    });
  });
});
