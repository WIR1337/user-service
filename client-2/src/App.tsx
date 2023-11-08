import { useState } from "react";

import Authorization from "./components/Auth";
import Main from "./components/Main";
const App = () => {
  const [token, setToken] = useState("");

  if (!token) {
    return <Authorization token={token} setToken={setToken}></Authorization>;
  } else {
    return <Main token={token} tokenSetter={setToken}></Main>;
  }
};

export default App;
