import { type PermissionName, PrismaClient } from "@prisma/client";
import type {
  PermissionCreateInput,
  PermissionData,
  PermissionUpdateInput,
} from "./permission.schema";

const prisma = new PrismaClient();

export class PermissionRepository {
  /**
   * Find permissions with pagination
   */
  async findPermissions(
    page: number,
    limit: number,
  ): Promise<{ permissions: PermissionData[]; total: number }> {
    const skip = (page - 1) * limit;

    const [permissions, total] = await Promise.all([
      prisma.permission.findMany({
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              roles: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      }),
      prisma.permission.count(),
    ]);

    return { permissions, total };
  }

  /**
   * Find a permission by ID
   */
  async findById(id: number): Promise<PermissionData | null> {
    return prisma.permission.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Find a permission by name
   */
  async findByName(name: PermissionName): Promise<PermissionData | null> {
    return prisma.permission.findUnique({
      where: { name },
      include: {
        _count: {
          select: {
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Create a new permission
   */
  async create(data: PermissionCreateInput): Promise<PermissionData> {
    return prisma.permission.create({
      data,
      include: {
        _count: {
          select: {
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Update a permission
   */
  async update(id: number, data: PermissionUpdateInput): Promise<PermissionData> {
    return prisma.permission.update({
      where: { id },
      data,
      include: {
        _count: {
          select: {
            roles: true,
          },
        },
      },
    });
  }

  /**
   * Delete a permission
   */
  async delete(id: number): Promise<void> {
    await prisma.permission.delete({
      where: { id },
    });
  }

  /**
   * Get roles for a permission
   */
  async getRolesForPermission(id: number) {
    return prisma.rolePermission.findMany({
      where: {
        permissionId: id,
      },
      include: {
        role: true,
      },
    });
  }
}
