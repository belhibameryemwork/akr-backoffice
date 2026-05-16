import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

prisma.$connect()
    .then(() => {
        console.log(">>> [DATABASE] Connexion réussie à PostgreSQL via Prisma");
    })
    .catch((err) => {
        console.error(">>> [DATABASE] ÉCHEC de connexion :", err.message);
    });