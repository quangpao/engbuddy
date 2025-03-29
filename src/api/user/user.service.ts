import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import type { UpdateUserData, UserCreateInput, UserUpdateInput } from "./user.schema";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  /**
   * Get users with pagination
   */
  async getUsers(page: number, limit: number) {
    const { users, total } = await this.repository.findUsers(page, limit);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single user by ID
   */
  async getUserById(id: number) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  /**
   * Create a new user
   */
  async createUser(userData: UserCreateInput) {
    const { slackId, name, email, password, roleId } = userData;

    // Check if user already exists
    const existingUser = await this.repository.findByEmailOrSlackId(email, slackId);
    if (existingUser) {
      throw new Error("User with this email or Slack ID already exists");
    }

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    // Create user
    return this.repository.create({
      slackId,
      name,
      email,
      passwordHash,
      roleId,
    });
  }

  /**
   * Update an existing user
   */
  async updateUser(id: number, userData: UserUpdateInput) {
    const { name, email, password, roleId, points } = userData;

    // Check if user exists
    const existingUser = await this.repository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Check email uniqueness if changing email
    if (email && email !== existingUser.email) {
      const emailExists = await this.repository.findByEmailExcludingId(email, id);
      if (emailExists) {
        throw new Error("Email is already in use");
      }
    }

    // Prepare update data
    const updateData: UpdateUserData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (roleId !== undefined) updateData.roleId = roleId;
    if (points !== undefined) updateData.points = points;

    // Handle password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    // Update user
    return this.repository.update(id, updateData);
  }

  /**
   * Delete a user
   */
  async deleteUser(id: number) {
    // Check if user exists
    const existingUser = await this.repository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Delete the user
    await this.repository.delete(id);
    return { success: true, message: "User deleted successfully" };
  }

  /**
   * Get user ranking
   */
  async getUserRanking(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Get current month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed

    // Get user's current ranking
    const ranking = await this.repository.getUserRanking(id, currentYear, currentMonth);

    if (!ranking) {
      return {
        userId: id,
        points: user.points,
        ranking: null,
        message: "Ranking not yet calculated for this month",
      };
    }

    return {
      userId: id,
      rank: ranking.rank,
      points: ranking.points,
      year: ranking.year,
      month: ranking.month,
    };
  }

  /**
   * Get user points history
   */
  async getUserPointsHistory(id: number, limit: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return this.repository.getUserPointsHistory(id, limit);
  }
}
