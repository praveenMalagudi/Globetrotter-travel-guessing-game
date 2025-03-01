import { Provider } from "react-redux";
import "./App.css";
import { store } from "./api";
import Router from "@/routes";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
  