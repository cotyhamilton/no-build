import { upgradeWebSocket } from "hono/helper.ts";
import { hono } from "../hono.ts";
import { vento } from "../vento.ts";

const app = hono();

app.get(
  "/ws",
  upgradeWebSocket((_c) => {
    let intervalId: number;
    return {
      onOpen(_event, ws) {
        console.log("Web socket connection opened");
        intervalId = setInterval(() => {
          ws.send("message");
        }, 1000);
      },
      onClose: () => {
        console.log("Web socket connection closed");
        clearInterval(intervalId);
      },
    };
  }),
);

app.get("/ws-test", async (c) => {
  const template = await vento.run("./views/ws-test.vto", { count: 0 });
  return c.render(template.content);
});

export default app;
