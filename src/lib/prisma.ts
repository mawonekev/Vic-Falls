import { PrismaClient } from '@prisma/client';
import { normalizeEmail, normalizeIfEmail } from './email';

/**
 * Creates an extended PrismaClient that automatically normalizes email fields
 * at the query execution boundary across create, update, and upsert operations:
 * - Traveller.email -> strictly normalized
 * - Partner.contactEmail -> strictly normalized
 * - IssueReport.reporterEmail -> strictly normalized
 * - IssueReport.reporterContact -> normalized if email, preserved if phone/WhatsApp
 */
export function createExtendedPrismaClient() {
  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });

  return baseClient.$extends({
    name: 'emailNormalizationExtension',
    query: {
      traveller: {
        async create({ args, query }: any) {
          if (args.data?.email) {
            args.data.email = normalizeEmail(args.data.email);
          }
          return query(args);
        },
        async update({ args, query }: any) {
          if (args.data?.email && typeof args.data.email === 'string') {
            args.data.email = normalizeEmail(args.data.email);
          }
          return query(args);
        },
        async upsert({ args, query }: any) {
          if (args.create?.email) {
            args.create.email = normalizeEmail(args.create.email);
          }
          if (args.update?.email && typeof args.update.email === 'string') {
            args.update.email = normalizeEmail(args.update.email);
          }
          if (args.where?.email) {
            args.where.email = normalizeEmail(args.where.email);
          }
          return query(args);
        },
        async findUnique({ args, query }: any) {
          if (args.where?.email) {
            args.where.email = normalizeEmail(args.where.email);
          }
          return query(args);
        },
        async findFirst({ args, query }: any) {
          if (args.where?.email && typeof args.where.email === 'string') {
            args.where.email = normalizeEmail(args.where.email);
          }
          return query(args);
        }
      },
      partner: {
        async create({ args, query }: any) {
          if (args.data?.contactEmail) {
            args.data.contactEmail = normalizeEmail(args.data.contactEmail);
          }
          return query(args);
        },
        async update({ args, query }: any) {
          if (args.data?.contactEmail && typeof args.data.contactEmail === 'string') {
            args.data.contactEmail = normalizeEmail(args.data.contactEmail);
          }
          return query(args);
        },
        async upsert({ args, query }: any) {
          if (args.create?.contactEmail) {
            args.create.contactEmail = normalizeEmail(args.create.contactEmail);
          }
          if (args.update?.contactEmail && typeof args.update.contactEmail === 'string') {
            args.update.contactEmail = normalizeEmail(args.update.contactEmail);
          }
          return query(args);
        }
      },
      issueReport: {
        async create({ args, query }: any) {
          if (args.data?.reporterEmail) {
            args.data.reporterEmail = normalizeEmail(args.data.reporterEmail);
          }
          if (args.data?.reporterContact) {
            args.data.reporterContact = normalizeIfEmail(args.data.reporterContact) ?? undefined;
          }
          return query(args);
        },
        async update({ args, query }: any) {
          if (args.data?.reporterEmail && typeof args.data.reporterEmail === 'string') {
            args.data.reporterEmail = normalizeEmail(args.data.reporterEmail);
          }
          if (args.data?.reporterContact && typeof args.data.reporterContact === 'string') {
            args.data.reporterContact = normalizeIfEmail(args.data.reporterContact) ?? undefined;
          }
          return query(args);
        }
      }
    }
  });
}

// Global singleton for Next.js App Router fast-refresh
const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createExtendedPrismaClient> };

export const prisma = globalForPrisma.prisma ?? createExtendedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Authoritative Traveller Lookup-or-Create Helper
 * Always queries and creates using normalized email to guarantee single entity identity
 */
export async function findOrCreateTraveller(
  client: any,
  data: {
    email: string;
    fullName: string;
    phone?: string;
    nationality?: string;
  }
) {
  const normalizedEmail = normalizeEmail(data.email);

  return client.traveller.upsert({
    where: { email: normalizedEmail },
    create: {
      email: normalizedEmail,
      fullName: data.fullName,
      phone: data.phone,
      nationality: data.nationality
    },
    update: {
      fullName: data.fullName,
      phone: data.phone,
      nationality: data.nationality
    }
  });
}
