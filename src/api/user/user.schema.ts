import { t } from "elysia";

// Validation schemas for user operations
export const userCreateSchema = t.Object({
  slackId: t.String(),
  name: t.Optional(t.String()),
  email: t.String({ format: "email" }),
  password: t.Optional(t.String()),
  roleId: t.Number(),
});

export const userUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  email: t.Optional(t.String({ format: "email" })),
  password: t.Optional(t.String()),
  roleId: t.Optional(t.Number()),
  points: t.Optional(t.Number()),
});

export const userIdParamSchema = t.Object({
  id: t.String(),
});

export const paginationQuerySchema = t.Object({
  page: t.Optional(t.String()),
  limit: t.Optional(t.String()),
});

export const limitQuerySchema = t.Object({
  limit: t.Optional(t.String()),
});

// TypeScript interfaces for better type safety
export interface UserCreateInput {
  slackId: string;
  name?: string;
  email: string;
  password?: string;
  roleId: number;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
  points?: number;
}

export interface UserData {
  id: number;
  slackId: string;
  name: string | null;
  email: string;
  points: number;
  createdAt: Date;
  role: {
    id: number;
    name: string;
  };
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  roleId?: number;
  points?: number;
  passwordHash?: string;
}
