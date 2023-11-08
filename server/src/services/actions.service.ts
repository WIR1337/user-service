import db from "../repository/admin.queries";

class ActionsService {
  async get(page: number, perpage: number, user_id:number|undefined) {
    const actions = await db.selectActioins(page, perpage,user_id);
    const amountOfActions = await db.selectAmountActions(user_id);
    return { page, perpage, amountOfActions, actions };
  }
}

export default new ActionsService();
