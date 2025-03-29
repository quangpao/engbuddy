import { Elysia } from "elysia";
import {
  paginationQuerySchema,
  permissionCreateSchema,
  permissionIdParamSchema,
  permissionUpdateSchema,
} from "./permission.schema";
import { PermissionService } from "./permission.service";

// Create a singleton service instance
const permissionService = new PermissionService();

export const permissionController = new Elysia({ prefix: "permissions" })
  // Get all permissions with pagination
  .get(
    "/",
    async ({ query }) => {
      const { page = "1", limit = "10" } = query;
      return permissionService.getPermissions(Number(page), Number(limit));
    },
    {
      query: paginationQuerySchema,
      detail: {
        tags: ["Permissions"],
        summary: "Get all permissions",
        description: "Returns a paginated list of all available permissions in the system",
      },
    },
  )

  // Get permission by ID
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      return permissionService.getPermissionById(Number(id));
    },
    {
      params: permissionIdParamSchema,
      detail: {
        tags: ["Permissions"],
        summary: "Get permission by ID",
        description: "Returns detailed information about a specific permission",
      },
    },
  )

  // Create a new permission
  .post(
    "/",
    async ({ body }) => {
      return permissionService.createPermission(body);
    },
    {
      body: permissionCreateSchema,
      detail: {
        tags: ["Permissions"],
        summary: "Create permission",
        description: "Creates a new permission in the system",
      },
    },
  )

  // Update a permission
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      return permissionService.updatePermission(Number(id), body);
    },
    {
      params: permissionIdParamSchema,
      body: permissionUpdateSchema,
      detail: {
        tags: ["Permissions"],
        summary: "Update permission",
        description: "Updates an existing permission's information",
      },
    },
  )

  // Delete a permission
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      return permissionService.deletePermission(Number(id));
    },
    {
      params: permissionIdParamSchema,
      detail: {
        tags: ["Permissions"],
        summary: "Delete permission",
        description: "Deletes a permission from the system",
      },
    },
  )

  // Get roles for a permission
  .get(
    "/:id/roles",
    async ({ params }) => {
      const { id } = params;
      return permissionService.getRolesForPermission(Number(id));
    },
    {
      params: permissionIdParamSchema,
      detail: {
        tags: ["Permissions"],
        summary: "Get roles for permission",
        description: "Returns all roles that have been assigned this permission",
      },
    },
  )

  // Get all permission names (enum values)
  .get(
    "/names",
    () => {
      return permissionService.getPermissionNames();
    },
    {
      detail: {
        tags: ["Permissions"],
        summary: "Get all permission names",
        description: "Returns a list of all available permission names (enum values)",
      },
    },
  );
