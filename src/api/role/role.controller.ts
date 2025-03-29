import { Elysia } from "elysia";
import {
  assignPermissionsSchema,
  paginationQuerySchema,
  roleCreateSchema,
  roleIdParamSchema,
  roleUpdateSchema,
} from "./role.schema";
import { RoleService } from "./role.service";

// Create a singleton service instance
const roleService = new RoleService();

export const roleController = new Elysia({ prefix: "roles" })
  // Get all roles with pagination
  .get(
    "/",
    async ({ query }) => {
      const { page = "1", limit = "10" } = query;
      return roleService.getRoles(Number(page), Number(limit));
    },
    {
      query: paginationQuerySchema,
      detail: {
        tags: ["Roles"],
        summary: "Get all roles",
        description: "Returns a paginated list of all roles in the system",
      },
    },
  )

  // Get role by ID
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      return roleService.getRoleById(Number(id));
    },
    {
      params: roleIdParamSchema,
      detail: {
        tags: ["Roles"],
        summary: "Get role by ID",
        description: "Returns detailed information about a specific role including its permissions",
      },
    },
  )

  // Create a new role
  .post(
    "/",
    async ({ body }) => {
      return roleService.createRole(body);
    },
    {
      body: roleCreateSchema,
      detail: {
        tags: ["Roles"],
        summary: "Create role",
        description: "Creates a new role in the system with optional permissions assignment",
      },
    },
  )

  // Update a role
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      return roleService.updateRole(Number(id), body);
    },
    {
      params: roleIdParamSchema,
      body: roleUpdateSchema,
      detail: {
        tags: ["Roles"],
        summary: "Update role",
        description: "Updates an existing role's name and/or permissions",
      },
    },
  )

  // Delete a role
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      return roleService.deleteRole(Number(id));
    },
    {
      params: roleIdParamSchema,
      detail: {
        tags: ["Roles"],
        summary: "Delete role",
        description: "Deletes a role from the system (if not assigned to any users)",
      },
    },
  )

  // Assign permissions to a role
  .post(
    "/:id/permissions",
    async ({ params, body }) => {
      const { id } = params;
      return roleService.assignPermissions(Number(id), body);
    },
    {
      params: roleIdParamSchema,
      body: assignPermissionsSchema,
      detail: {
        tags: ["Roles"],
        summary: "Assign permissions to role",
        description: "Replaces all permissions for the role with the provided list",
      },
    },
  )

  // Get permissions for a role
  .get(
    "/:id/permissions",
    async ({ params }) => {
      const { id } = params;
      return roleService.getPermissionsForRole(Number(id));
    },
    {
      params: roleIdParamSchema,
      detail: {
        tags: ["Roles"],
        summary: "Get role permissions",
        description: "Returns all permissions assigned to a specific role",
      },
    },
  )

  // Get users for a role
  .get(
    "/:id/users",
    async ({ params }) => {
      const { id } = params;
      return roleService.getUsersForRole(Number(id));
    },
    {
      params: roleIdParamSchema,
      detail: {
        tags: ["Roles"],
        summary: "Get role users",
        description: "Returns all users assigned to a specific role",
      },
    },
  );
