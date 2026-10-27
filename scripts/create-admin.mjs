// Creates an admin account, or resets its password.
// Usage: npm run admin:create -- you@example.com   (the password is asked, or read from ADMIN_PASSWORD)
import { createInterface } from "node:readline/promises";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Usage: npm run admin:create -- you@example.com");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

let password = process.env.ADMIN_PASSWORD;
if (!password) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  password = await rl.question("Mot de passe (12 caractères minimum) : ");
  rl.close();
}
if (password.length < 12) {
  console.error("Le mot de passe doit faire au moins 12 caractères.");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const hash = await bcrypt.hash(password, 12);
await sql`
  INSERT INTO "user" (email, roles, password)
  VALUES (${email}, ${sql.json(["ROLE_ADMIN"])}, ${hash})
  ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, roles = EXCLUDED.roles
`;
await sql.end();
console.log(`Compte admin prêt : ${email}`);
