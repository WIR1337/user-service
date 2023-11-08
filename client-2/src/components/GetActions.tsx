import { FC } from "react";
import { getActions } from "../fetch/api";

const GetActions: FC = () => {
  async function setActions() {
      const response = await getActions()

      console.log(await response.json())
  }
  setActions()
  return <div>GetActions</div>;
};

export default GetActions;
