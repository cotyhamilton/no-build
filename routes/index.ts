import { hono } from "../hono.ts";
import { vento } from "../vento.ts";

const app = hono();
const kv = await Deno.openKv();

app.get("/", async (c) => {
  const count = (await kv.get<number>(["count"])).value ?? 0;
  const template = await vento.run("./views/index.vto", { count });
  return c.render(template.content);
});

app.post("/", async (c) => {
  const count = (await kv.get<number>(["count"])).value ?? 0;
  await kv.set(["count"], count + 1);
  return c.text(`${count + 1}`);
});

export default app;
