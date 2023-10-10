import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import styled from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

const Styled = {
  Global: styled.div`
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: "Gill Sans", sans-serif;
    box-sizing: border-box;
  `,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Styled.Global>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Styled.Global>
  </Provider>
);
