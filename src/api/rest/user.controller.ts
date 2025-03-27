import Elysia from "elysia";

export const UserController = new Elysia({ prefix: "users" })
  .get("/", async () => "CALLED: GET USER CONTROLLER")
  .get("/:id", async (data) => `CALLED: GET USER CONTROLLER WITH ${JSON.stringify(data, null, 2)}`)
  .post("/", async (data) => `CALLED: POST USER CONTROLLER WITH ${JSON.stringify(data, null, 2)}`)
  .delete("/:id", async (data) => `CALLED: USER CONTROLLER WITH ${JSON.stringify(data, null, 2)}`);
