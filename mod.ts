import { logger, serveStatic } from "hono/middleware.ts";
import { hono } from "./hono.ts";
import index from "./routes/index.ts";
import ws from "./routes/ws.ts";

const app = hono();

app.use("*", logger());
app.route("/", index);
app.route("/", ws);
app.use("/static/*", serveStatic({ root: "./" }));

// export default {
//   fetch(request: Request) {
//     return app.fetch(request);
//   },
// };

Deno.serve(app.fetch);
