export function generateEditingQuery(
    id: string,
    name: string | undefined,
    email: string | undefined
  ) {
    var setClauses = [];
    try {
      if (name) {
        setClauses.push(`username = '${name}'`);
      }
      if (email) {
        setClauses.push(`email = '${email}'`);
      }
  
      if (setClauses.length === 0) {
        throw new Error("No valid update data provided.");
      }
  
      const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = ${id}`;
      return query;
    } catch (err: any) {
      console.log(err.message);
    }
    
    return "This should never happen";
  }