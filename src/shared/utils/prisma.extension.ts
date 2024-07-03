import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete'

export const extendedPrismaClient = new PrismaClient().$extends(
    createSoftDeleteExtension({
        models: {
            User: true
        },
        defaultConfig: {
            field: 'deletedAt',
            createValue: (deleted) => {
                if (deleted) return new Date()
                return null
            }
        }
    })
)

export type ExtendedPrismaClient = typeof extendedPrismaClient
