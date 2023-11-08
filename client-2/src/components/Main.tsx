import { FC } from "react";
import { Setter } from "../types/components";
import GetActions from "./GetActions";

interface MainProps {
    token:string
    tokenSetter: Setter<string>
}
const Main:FC<MainProps> = ({token,tokenSetter}) => {
    const removeToken = async () => {
        localStorage.removeItem("Bearer");
        tokenSetter("");
      };
  return (
    <div>
      <div style={{ width: "600px", wordWrap: "break-word" }}>
        Token: {token}
      </div>
      <button onClick={removeToken}>Remove token</button>
      <GetActions></GetActions>
    </div>
  );
};

export default Main;
