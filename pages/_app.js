import axios from "axios";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@material-ui/core/styles";
import { CookiesProvider } from "react-cookie";
import theme from "../styles/theme";
import "../styles/globals.css";

const config = {
  fetcher: async (...args) => {
    const { data } = await axios.get(...args);
    return data;
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={config}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CookiesProvider>
    </SWRConfig>
  );
}

export default MyApp;
