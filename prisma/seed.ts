// npx prisma migrate dev --name init
// npx prisma generate
// npx prisma db seed
// "prisma": {
// 		"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
// 	},

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.upsert({
		where: { email: "test@test.com" },
		update: {},
		create: {
			email: "test@test.com",
			name: "test",
			hashedPassword: await hash("testtest", 10),
		},
	});
	// console.log({ user });
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
