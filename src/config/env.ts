import { type } from "arktype";

const envSchema = type({
  // Required string, must be a  valid URL format
  DATABASE_URL: "string.url",

  // Required string, must be at least 32 characters long
  JWT_SECRET: "string > 32",

  // Optional string, default handled after parsing
  JWT_EXPIRES_IN: "string?",

  // Optional number, default handled after parsing.
  // ArkType's 'number' type implicitly handles coercion from numeric strings during parsing/checking.
  PORT: "number?",

  // Optional string literal union, default handled after parsing
  NODE_ENV: "'development' | 'production' | 'test'?",

  // Required string for Axiom token
  AXIOM_TOKEN: "string",

  // Required string for Axiom dataset
  AXIOM_DATASET: "string",
});

const result = envSchema.assert(process.env);

const validatedEnv = result;

const finalEnv = {
  ...validatedEnv,
  JWT_EXPIRES_IN: validatedEnv.JWT_EXPIRES_IN ?? "1h",
  PORT: validatedEnv.PORT ?? 3000,
  NODE_ENV: validatedEnv.NODE_ENV ?? "development",
};

export const env = finalEnv;

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
