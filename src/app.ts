import { UserController } from "@api/rest/user.controller";
import { Elysia } from "elysia";

new Elysia()
  .use(UserController)
  .get("/", () => "Welcome to Engbuddy API!")
  .listen(3000);
