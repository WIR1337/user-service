import { useState } from "react";

import Authorization from "./components/Auth";
import GetActions from "./components/GetActions";
const App = () => {
  const [token, setToken] = useState("");
  const removeToken = async () => {
    localStorage.removeItem("Bearer");
    // tokenSetter("");
  };
  return (
    <div>
      <Authorization token={token} setToken={setToken}></Authorization> 
      <div style={{ width: "600px", wordWrap: "break-word" }}>
        Token: {token}
      </div>
      <button onClick={removeToken}>Remove token</button>
      <GetActions></GetActions> 
    </div>
  )
}

export default App