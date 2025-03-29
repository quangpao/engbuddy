import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  JWT_EXPIRES_IN: z.string().default("1h"),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  AXIOM_TOKEN: z.string(),
  AXIOM_DATASET: z.string(),
});

export const env = envSchema.parse(process.env);

export const {
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  NODE_ENV,
  PORT,
  AXIOM_TOKEN,
  AXIOM_DATASET,
} = env;
export const isDevelopment = NODE_ENV === "development";
