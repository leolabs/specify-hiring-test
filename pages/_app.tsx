import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/hljs-atom-one-dark.css";
import { theme } from "../util/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
