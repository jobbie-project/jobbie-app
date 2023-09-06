import {Checkbox, ThemeProvider, createTheme} from '@mui/material';
import {red} from '@mui/material/colors';

const Theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
  },
});

interface CustomCheckboxProps {
  callback?: (checked: boolean) => void;
  className?: string;
  text?: string;
}

export function CustomCheckbox(props: CustomCheckboxProps) {
  return (
    <div className={`flex flex-row items-center ml-[-10px] ${props.className}`}>
      <ThemeProvider theme={Theme}>
        <Checkbox
          onClick={(e: any) => {
            props.callback && props.callback(e.target.checked);
          }}
        />
      </ThemeProvider>
      <div className="text-sm text-lightblack flex items-start">{props.text}</div>
    </div>
  );
}
