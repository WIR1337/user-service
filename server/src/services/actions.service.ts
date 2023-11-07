import db from '../repository/admin.queries';

class ActionsService {
  async get(page:number,perpage:number) {
    const actions = await db.selectActioins(page,perpage)
    return actions
  }
}

export default new ActionsService();
