import type { PermissionName } from "@prisma/client";
import { t } from "elysia";

// Validation schemas
export const roleCreateSchema = t.Object({
  name: t.String(),
  permissionIds: t.Optional(t.Array(t.Number())),
});

export const roleUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  permissionIds: t.Optional(t.Array(t.Number())),
});

export const roleIdParamSchema = t.Object({
  id: t.String(),
});

export const paginationQuerySchema = t.Object({
  page: t.Optional(t.String()),
  limit: t.Optional(t.String()),
});

export const assignPermissionsSchema = t.Object({
  permissionIds: t.Array(t.Number()),
});

// TypeScript interfaces
export interface RoleCreateInput {
  name: string;
  permissionIds?: number[];
}

export interface RoleUpdateInput {
  name?: string;
  permissionIds?: number[];
}

// Updated to match Prisma's actual return type
export interface RoleData {
  id: number;
  name: string;
  permissions?: {
    permission: {
      id: number;
      name: PermissionName;
      description: string | null;
    };
  }[];
  _count?: {
    permissions: number;
    users: number;
  };
}

// Interface for the transformed role data with flattened permissions
export interface TransformedRoleData {
  id: number;
  name: string;
  permissions?: {
    id: number;
    name: PermissionName;
    description: string | null;
  }[];
  _count?: {
    permissions: number;
    users: number;
  };
}

export interface AssignPermissionsInput {
  permissionIds: number[];
}
