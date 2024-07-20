import { extendTheme } from "@mui/joy/styles";


// Create a dark theme configuration
export const theme = extendTheme({
    colorSchemes: {
      dark: {
        palette: {
          background: {
            body: "#121212", // Dark background color for body
          },
          text: {
            primary: "#e0e0e0", // Light text color
          },
        },
      },
    },
    components: {
      JoyButton: {
        styleOverrides: {
          root: {
            fontWeight: 400, // Set the font weight for buttons globally
          },
        },
      },
    },
  });