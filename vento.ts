import vento from "vento/mod.ts";
import { dev } from "./environment.ts";

const env = vento({
  includes: `${Deno.cwd()}/views`,
  cache: !dev,
});

export { env as vento };
