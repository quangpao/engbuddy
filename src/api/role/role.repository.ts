import { PrismaClient } from "@prisma/client";
import type { RoleCreateInput, RoleData, RoleUpdateInput } from "./role.schema";

const prisma = new PrismaClient();

export class RoleRepository {
  /**
   * Find roles with pagination
   */
  async findRoles(page: number, limit: number): Promise<{ roles: RoleData[]; total: number }> {
    const skip = (page - 1) * limit;

    const [roles, total] = await Promise.all([
      prisma.role.findMany({
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              permissions: true,
              users: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      }),
      prisma.role.count(),
    ]);

    return { roles, total };
  }

  /**
   * Find a role by ID with permissions
   */
  async findById(id: number): Promise<RoleData | null> {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        _count: {
          select: {
            permissions: true,
            users: true,
          },
        },
      },
    });

    return role as RoleData | null;
  }

  /**
   * Find a role by name
   */
  async findByName(name: string): Promise<RoleData | null> {
    return prisma.role.findFirst({
      where: { name },
      include: {
        _count: {
          select: {
            permissions: true,
            users: true,
          },
        },
      },
    });
  }

  /**
   * Create a new role
   */
  async create(data: { name: string }): Promise<RoleData> {
    return prisma.role.create({
      data: {
        name: data.name,
      },
      include: {
        _count: {
          select: {
            permissions: true,
            users: true,
          },
        },
      },
    });
  }

  /**
   * Update a role
   */
  async update(id: number, data: { name?: string }): Promise<RoleData> {
    return prisma.role.update({
      where: { id },
      data,
      include: {
        _count: {
          select: {
            permissions: true,
            users: true,
          },
        },
      },
    });
  }

  /**
   * Delete a role
   */
  async delete(id: number): Promise<void> {
    await prisma.role.delete({
      where: { id },
    });
  }

  /**
   * Get permissions for a role
   */
  async getPermissionsForRole(id: number) {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return role?.permissions.map((rp) => rp.permission) || [];
  }

  /**
   * Get users for a role
   */
  async getUsersForRole(id: number) {
    return prisma.user.findMany({
      where: {
        roleId: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        slackId: true,
      },
    });
  }

  /**
   * Assign permissions to a role
   */
  async assignPermissions(id: number, permissionIds: number[]): Promise<void> {
    // First, remove all existing role-permission connections
    await prisma.rolePermission.deleteMany({
      where: {
        roleId: id,
      },
    });

    // Then create new connections
    await Promise.all(
      permissionIds.map((permissionId) =>
        prisma.rolePermission.create({
          data: {
            roleId: id,
            permissionId,
          },
        }),
      ),
    );
  }
}
