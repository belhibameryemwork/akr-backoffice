import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
console.log("Testing with URL:", connectionString);

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const user = await prisma.user.findFirst();
        console.log('Success:', user);
    } catch (err: any) {
        console.error('Error message:', err.message);
        console.error('Stack:', err.stack);
    } finally {
        await prisma.$disconnect();
    }
}
main();
