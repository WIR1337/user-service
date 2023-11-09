import { FC, useEffect, useState } from "react";
import { getActions } from "../fetch/api";
import { Action, ActionsWithPage, Setter } from "../types/components";
import { useWebSocket } from "../weboscket";

import Filter from "./Filter";
import Pages from "./Pages";
import RemoveToken from "./RemoveToken";
import Table from "./Table";

interface MainProps {
  token: string;
  tokenSetter: Setter<string>;
}
const Main: FC<MainProps> = ({ token, tokenSetter }) => {
  useWebSocket(token);

  const [actions, setActions] = useState<ActionsWithPage[]>([]);
  const [page, setPage] = useState(1);
  const [totalActions, setTotalActions] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const [userId, setUserId] = useState<number>();

  const perpage = 10;

  async function fetchActions(page: number, perpage: number, user_id?: number) {
    const pageYetLoaded = actions.some(actByPage => actByPage.page === page)
    if(pageYetLoaded) return

    const response = await getActions(page, perpage, user_id);
    const  data = await response.json();

    setActions((prev) => [...prev, { page, actions:data.actions }]);
    setTotalActions(data.amountOfActions._max.id);

  }

  useEffect(() => {

    fetchActions(page, perpage, userId);
  }, [page]);

  return (
    <div>
      <RemoveToken token={token} tokenSetter={tokenSetter}></RemoveToken>
      <Filter></Filter>
      <Table actions={actions.find(actByPage => actByPage.page === page)?.actions as Action[]}></Table>
      <Pages></Pages>
    </div>
  );
};

export default Main;
