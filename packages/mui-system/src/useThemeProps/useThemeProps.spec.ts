import { useThemeProps } from '@mui/system';
import { expectType } from '@mui/types';

interface SliderProps {
  track?: boolean;
  valueLabelDisplay?: boolean;
  color: 'primary' | 'secondary';
}

interface Theme {
  components?: {
    MuiSlider: {
      defaultProps: SliderProps;
    };
  };
}

function ThemedComponent() {
  const props = useThemeProps<Theme, SliderProps, 'MuiSlider'>({
    props: { color: 'primary' },
    name: 'MuiSlider',
  });

  // component's props are valid
  // Only existence of props is relevant here not type.
  props.track;
  props.valueLabelDisplay;
}
