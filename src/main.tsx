import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme/index.ts";
import { I18nProvider } from "./i18n/I18nProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ChakraProvider>
  </StrictMode>
);
