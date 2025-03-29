import { Elysia } from "elysia";
import {
  limitQuerySchema,
  paginationQuerySchema,
  userCreateSchema,
  userIdParamSchema,
  userUpdateSchema,
} from "./user.schema";
import { UserService } from "./user.service";

// Create a singleton service instance
const userService = new UserService();

export const userController = new Elysia({ prefix: "users" })
  // Get all users with pagination
  .get(
    "/",
    async ({ query }) => {
      const { page = "1", limit = "10" } = query;
      return userService.getUsers(Number(page), Number(limit));
    },
    {
      query: paginationQuerySchema,
      detail: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Returns a paginated list of all users registered in the system",
      },
    },
  )

  // Get user by ID
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      return userService.getUserById(Number(id));
    },
    {
      params: userIdParamSchema,
      detail: {
        tags: ["Users"],
        summary: "Get user by ID",
        description: "Returns detailed information about a specific user, including their role",
      },
    },
  )

  // Create a new user
  .post(
    "/",
    async ({ body }) => {
      return userService.createUser(body);
    },
    {
      body: userCreateSchema,
      detail: {
        tags: ["Users"],
        summary: "Create user",
        description: "Creates a new user with the provided information and role assignment",
      },
    },
  )

  // Update a user
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      return userService.updateUser(Number(id), body);
    },
    {
      params: userIdParamSchema,
      body: userUpdateSchema,
      detail: {
        tags: ["Users"],
        summary: "Update user",
        description:
          "Updates an existing user's information, including name, email, password, role or points",
      },
    },
  )

  // Delete a user
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      return userService.deleteUser(Number(id));
    },
    {
      params: userIdParamSchema,
      detail: {
        tags: ["Users"],
        summary: "Delete user",
        description: "Deletes a user from the system",
      },
    },
  )

  // Get user ranking
  .get(
    "/:id/ranking",
    async ({ params }) => {
      const { id } = params;
      return userService.getUserRanking(Number(id));
    },
    {
      params: userIdParamSchema,
      detail: {
        tags: ["Users", "Rankings"],
        summary: "Get user ranking",
        description: "Returns the current month's ranking information for a specific user",
      },
    },
  )

  // Get user monthly points history
  .get(
    "/:id/points-history",
    async ({ params, query }) => {
      const { id } = params;
      const { limit = "12" } = query; // Default to last 12 months
      return userService.getUserPointsHistory(Number(id), Number(limit));
    },
    {
      params: userIdParamSchema,
      query: limitQuerySchema,
      detail: {
        tags: ["Users", "Points"],
        summary: "Get user points history",
        description:
          "Returns the monthly points history for a specific user, with optional limit parameter",
      },
    },
  );
