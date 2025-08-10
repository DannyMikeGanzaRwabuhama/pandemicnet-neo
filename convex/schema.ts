import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    checkins: defineTable({
        checkInTime: v.float64(),
        userId: v.string(),
        venueId: v.string(),
    }),
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        joinedAt: v.float64(),
        name: v.string(),
    }),
    venues: defineTable({
        createdAt: v.float64(),
        latitude: v.float64(),
        location: v.string(),
        longitude: v.float64(),
        name: v.string(),
        qrCodeId: v.string(),
    }),
});