// for deno deploy until declarative server is supported
import app from "./mod.ts";

if (import.meta.main) {
  Deno.serve(app.fetch);
}
