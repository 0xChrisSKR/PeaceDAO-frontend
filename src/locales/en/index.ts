import donate from "./donate.json";
import treasury from "./treasury.json";
import verify from "./verify.json";

const en = {
  donate,
  treasury,
  verify
} as const satisfies Record<string, Record<string, string>>;

export default en;
