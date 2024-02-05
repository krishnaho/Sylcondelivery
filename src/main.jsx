import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "./assets/css/custom.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Offline, Online } from "react-detect-offline";
import OfflineComponent from "./components/Elements/OfflineComponent.jsx";
import { store, persistor } from "./redux/index.js";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-spring-bottom-sheet/dist/style.css'


const polling = { 
  enabled: false,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Online polling={polling}>
          <App />
        </Online>
        <Offline polling={polling}>
          <OfflineComponent />
        </Offline>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

