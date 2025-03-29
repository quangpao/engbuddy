import { PermissionName } from "@prisma/client";
import { t } from "elysia";

// Validation schemas
export const permissionCreateSchema = t.Object({
  name: t.Enum(PermissionName),
  description: t.Optional(t.String()),
});

export const permissionUpdateSchema = t.Object({
  description: t.Optional(t.String()),
});

export const permissionIdParamSchema = t.Object({
  id: t.String(),
});

export const paginationQuerySchema = t.Object({
  page: t.Optional(t.String()),
  limit: t.Optional(t.String()),
});

// TypeScript interfaces
export interface PermissionCreateInput {
  name: PermissionName;
  description?: string;
}

export interface PermissionUpdateInput {
  description?: string;
}

export interface PermissionData {
  id: number;
  name: PermissionName;
  description: string | null;
  _count?: {
    roles: number;
  };
}

export interface RolePermissionData {
  id: number;
  roleId: number;
  permissionId: number;
  role: {
    id: number;
    name: string;
  };
  permission: {
    id: number;
    name: PermissionName;
  };
}
