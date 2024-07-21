import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  colorSchemes: {
    main: {
      palette: {
        background: {
          body: "#121212", 
        },
        text: {
          primary: "#e0e0e0", 
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          fontWeight: 400, 
        },
      },
    },
  },
});
