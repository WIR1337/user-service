export async function getActions() {
    const response = fetch("/actions?page=1&perpage=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response
  }
