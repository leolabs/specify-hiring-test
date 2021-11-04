import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    card: {
      bg: "#242C3B",
      border: "#2F384A",
      hover: "#2F3A4D",
    },
  },
});
