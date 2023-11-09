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

  const [actions, setActions] = useState<ActionsWithPage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [userId, setUserId] = useState<number>();

  const perpage = 10;


  useWebSocket(token);

  async function fetchActions(page: number, perpage: number, user_id?: number) {
    const pageYetLoaded = actions.some(actByPage => actByPage.page === page)
    if(pageYetLoaded) return

    const response = await getActions(page, perpage, user_id);
    const  data = await response.json();

    if (!data.actions) return
    setActions((prev) => [...prev, { page, actions:data.actions }]);
    setTotalPages(Math.ceil(data.amountOfActions._max.id / perpage))

  }

  useEffect(() => {
    fetchActions(page, perpage, userId);
  }, [page,userId]);

  return (
    <div>
      <RemoveToken token={token} tokenSetter={tokenSetter}></RemoveToken>
      <Filter setCurrentPage={setPage} setUserId={setUserId} setActions={setActions}></Filter>
      <Table actions={actions.find(actByPage => actByPage.page === page)?.actions as Action[]}></Table>
      <Pages currentPage={page} totalPages={totalPages as number} setPage={setPage}></Pages>
    </div>
  );
};

export default Main;
