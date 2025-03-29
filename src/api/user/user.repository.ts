import { PrismaClient } from "@prisma/client";
import type { UpdateUserData, UserCreateInput, UserData } from "./user.schema";

// Create a singleton Prisma instance
const prisma = new PrismaClient();

export class UserRepository {
  /**
   * Find users with pagination
   */
  async findUsers(page: number, limit: number): Promise<{ users: UserData[]; total: number }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          slackId: true,
          name: true,
          email: true,
          points: true,
          createdAt: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.user.count(),
    ]);

    return { users, total };
  }

  /**
   * Find a user by ID
   */
  async findById(id: number): Promise<UserData | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        slackId: true,
        name: true,
        email: true,
        points: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Find user by email or slackId
   */
  async findByEmailOrSlackId(email: string, slackId: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { slackId }],
      },
    });
  }

  /**
   * Find user by email excluding a specific user ID
   */
  async findByEmailExcludingId(email: string, excludeId: number) {
    return prisma.user.findFirst({
      where: {
        email,
        id: { not: excludeId },
      },
    });
  }

  /**
   * Create a new user
   */
  async create(data: UserCreateInput & { passwordHash: string | null }): Promise<UserData> {
    return prisma.user.create({
      data,
      select: {
        id: true,
        slackId: true,
        name: true,
        email: true,
        points: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Update a user
   */
  async update(id: number, data: UpdateUserData): Promise<UserData> {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        slackId: true,
        name: true,
        email: true,
        points: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Delete a user
   */
  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Get user's current month ranking
   */
  async getUserRanking(userId: number, year: number, month: number) {
    return prisma.ranking.findUnique({
      where: {
        year_month_userId: {
          userId,
          year,
          month,
        },
      },
    });
  }

  /**
   * Get user's monthly points history
   */
  async getUserPointsHistory(userId: number, limit: number) {
    return prisma.monthlyPoints.findMany({
      where: { userId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
      take: limit,
    });
  }
}
