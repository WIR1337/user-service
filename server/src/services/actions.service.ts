import db from "../repository/admin.queries";

class ActionsService {
  async get(page: number, perpage: number) {
    const actions = await db.selectActioins(page, perpage);
    const amountOfActions = await db.selectAmountActions();
    return { page, perpage, amountOfActions, actions };
  }
}

export default new ActionsService();
