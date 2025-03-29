import { permissionController } from "@api/permission/permission.controller";
import { roleController } from "@api/role/role.controller";
import { userController } from "@api/user/user.controller";
import { AXIOM_DATASET, AXIOM_TOKEN } from "@config/env";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Elysia } from "elysia";
import { Logestic } from "logestic";

const app = new Elysia()
  .use(swagger())
  .use(
    opentelemetry({
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: "https://api.axiom.co/v1/trace",
            headers: {
              Authorization: `Bearer ${AXIOM_TOKEN}`,
              "X-Axiom-Dataset": AXIOM_DATASET,
            },
          }),
        ),
      ],
    }),
  )
  .use(Logestic.preset("fancy"))

  .group("/api/v1", (app) => app.use(userController).use(permissionController).use(roleController))
  .get("/", () => "Welcome to EngBuddy API");

export default app;
