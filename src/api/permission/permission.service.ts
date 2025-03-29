import { PermissionName } from "@prisma/client";
import { PermissionRepository } from "./permission.repository";
import type { PermissionCreateInput, PermissionUpdateInput } from "./permission.schema";

export class PermissionService {
  private repository: PermissionRepository;

  constructor() {
    this.repository = new PermissionRepository();
  }

  /**
   * Get all permissions with pagination
   */
  async getPermissions(page: number, limit: number) {
    const { permissions, total } = await this.repository.findPermissions(page, limit);

    return {
      data: permissions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a permission by ID
   */
  async getPermissionById(id: number) {
    const permission = await this.repository.findById(id);

    if (!permission) {
      throw new Error("Permission not found");
    }

    return permission;
  }

  /**
   * Create a new permission
   */
  async createPermission(data: PermissionCreateInput) {
    // Check if permission with the same name already exists
    const existingPermission = await this.repository.findByName(data.name);
    if (existingPermission) {
      throw new Error("Permission with this name already exists");
    }

    return this.repository.create(data);
  }

  /**
   * Update a permission
   */
  async updatePermission(id: number, data: PermissionUpdateInput) {
    // Check if permission exists
    const existingPermission = await this.repository.findById(id);
    if (!existingPermission) {
      throw new Error("Permission not found");
    }

    return this.repository.update(id, data);
  }

  /**
   * Delete a permission
   */
  async deletePermission(id: number) {
    // Check if permission exists
    const existingPermission = await this.repository.findById(id);
    if (!existingPermission) {
      throw new Error("Permission not found");
    }

    // Delete the permission
    await this.repository.delete(id);
    return { success: true, message: "Permission deleted successfully" };
  }

  /**
   * Get roles for a permission
   */
  async getRolesForPermission(id: number) {
    // Check if permission exists
    const existingPermission = await this.repository.findById(id);
    if (!existingPermission) {
      throw new Error("Permission not found");
    }

    return this.repository.getRolesForPermission(id);
  }

  /**
   * Get all permission names (for enums)
   */
  getPermissionNames() {
    return Object.values(PermissionName);
  }
}
