import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/globals.css"; // Import your global styles

const theme = createTheme({
  typography: {
    fontFamily: "",
  },
});

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
