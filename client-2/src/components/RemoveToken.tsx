import { FC } from "react";
import { Setter } from "../types/components";
const RemoveToken: FC<{ token: string; tokenSetter: Setter<string> }> = ({
  token,
  tokenSetter,
}) => {
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
    </div>
  );
};

export default RemoveToken;
