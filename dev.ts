// until deno deploy supports deno serve API and
// serve subcommand supports watch
import app from "./mod.ts";

if (import.meta.main) {
  Deno.serve(app.fetch);
}
