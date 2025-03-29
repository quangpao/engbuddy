import { RoleRepository } from "./role.repository";
import type {
  AssignPermissionsInput,
  RoleCreateInput,
  RoleUpdateInput,
  TransformedRoleData,
} from "./role.schema";

export class RoleService {
  private repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
  }

  /**
   * Get all roles with pagination
   */
  async getRoles(page: number, limit: number) {
    const { roles, total } = await this.repository.findRoles(page, limit);

    return {
      data: roles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a role by ID
   */
  async getRoleById(id: number): Promise<TransformedRoleData> {
    const role = await this.repository.findById(id);

    if (!role) {
      throw new Error("Role not found");
    }

    // Transform the data to match expected structure
    const transformedRole: TransformedRoleData = {
      ...role,
      permissions: role.permissions ? role.permissions.map((p) => p.permission) : [],
    };

    return transformedRole;
  }

  /**
   * Create a new role
   */
  async createRole(data: RoleCreateInput) {
    const { name, permissionIds } = data;

    // Check if role with same name already exists
    const existingRole = await this.repository.findByName(name);
    if (existingRole) {
      throw new Error("Role with this name already exists");
    }

    // Create the role
    const role = await this.repository.create({ name });

    // Assign permissions if provided
    if (permissionIds && permissionIds.length > 0) {
      await this.repository.assignPermissions(role.id, permissionIds);
    }

    // Return the created role with assigned permissions
    return this.getRoleById(role.id);
  }

  /**
   * Update a role
   */
  async updateRole(id: number, data: RoleUpdateInput) {
    const { name, permissionIds } = data;

    // Check if role exists
    const existingRole = await this.repository.findById(id);
    if (!existingRole) {
      throw new Error("Role not found");
    }

    // Check name uniqueness if changing name
    if (name && name !== existingRole.name) {
      const nameExists = await this.repository.findByName(name);
      if (nameExists) {
        throw new Error("Role with this name already exists");
      }
    }

    // Update role basic info
    if (name) {
      await this.repository.update(id, { name });
    }

    // Update permissions if provided
    if (permissionIds !== undefined) {
      await this.repository.assignPermissions(id, permissionIds);
    }

    // Return updated role
    return this.getRoleById(id);
  }

  /**
   * Delete a role
   */
  async deleteRole(id: number) {
    // Check if role exists
    const existingRole = await this.repository.findById(id);
    if (!existingRole) {
      throw new Error("Role not found");
    }

    // Check if role has associated users
    if (existingRole._count && existingRole._count.users > 0) {
      throw new Error("Cannot delete role that has associated users");
    }

    // Delete the role
    await this.repository.delete(id);
    return { success: true, message: "Role deleted successfully" };
  }

  /**
   * Assign permissions to a role
   */
  async assignPermissions(id: number, data: AssignPermissionsInput) {
    // Check if role exists
    const existingRole = await this.repository.findById(id);
    if (!existingRole) {
      throw new Error("Role not found");
    }

    // Assign permissions
    await this.repository.assignPermissions(id, data.permissionIds);

    // Return updated role
    return this.getRoleById(id);
  }

  /**
   * Get permissions for a role
   */
  async getPermissionsForRole(id: number) {
    // Check if role exists
    const existingRole = await this.repository.findById(id);
    if (!existingRole) {
      throw new Error("Role not found");
    }

    return this.repository.getPermissionsForRole(id);
  }

  /**
   * Get users for a role
   */
  async getUsersForRole(id: number) {
    // Check if role exists
    const existingRole = await this.repository.findById(id);
    if (!existingRole) {
      throw new Error("Role not found");
    }

    return this.repository.getUsersForRole(id);
  }
}
