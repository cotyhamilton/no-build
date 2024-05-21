import vento from "vento/mod.ts";

const env = vento({
  includes: `${Deno.cwd()}/views`,
});

export { env as vento };
