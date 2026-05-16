import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const hashedPassword = await bcrypt.hash('test123', 10);
        await prisma.user.update({
            where: { email: 'admin@akr.com' },
            data: { password: hashedPassword }
        });
        console.log('Password reset successfully to test123');
    } catch (err: any) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
