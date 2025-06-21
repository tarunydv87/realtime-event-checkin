// src/resolvers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const resolvers = {
  Query: {
    events: async (_: any, __: any, context: any) => {
      return context.prisma.event.findMany({
        include: { attendees: true },
      })
    },
  },

  Mutation: {
    joinEvent: async (_: any, { eventId }: any, context: any) => {
      if (!context.userId) throw new Error('You must be logged in')

      await context.prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: { connect: { id: context.userId } },
        },
      })

      return context.prisma.event.findUnique({
        where: { id: eventId },
        include: { attendees: true },
      })
    },

    createEvent: async (
      _: any,
      { name, location, startTime }: any,
      context: any
    ) => {
      if (!context.userId) throw new Error('You must be logged in')

      const isoStart = new Date(Number(startTime)).toISOString()

      return context.prisma.event.create({
        data: {
          name,
          location,
          startTime: isoStart,
        },
      })
    },
  },
}
