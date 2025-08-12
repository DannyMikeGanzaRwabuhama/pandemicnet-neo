import {mutation, query} from './_generated/server';
import {v} from "convex/values";
import {Id} from './_generated/dataModel';

export const createCheckin = mutation({
    args: {
        venueId: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new Error("Not authenticated");

        await ctx.db.insert("checkins", {
            userId: user.subject,
            venueId: args.venueId,
            checkInTime: Date.now(),
        })
    }
});

export const getRecentCheckins = query({
    args: {},
    handler: async (ctx) => {
        const checkins = await ctx.db
            .query('checkins')
            .order('desc')
            .take(20);

        return await Promise.all(
            checkins.map(async (checkin) => {
                // Find user by clerkId instead of direct ID
                const user = await ctx.db
                    .query("users")
                    .filter(q => q.eq(q.field("clerkId"), checkin.userId))
                    .first();
                const venue = await ctx.db.get(checkin.venueId as Id<"venues">);
                return {
                    id: checkin._id,
                    user: {
                        name: user?.name ?? 'Unknown User',
                        avatar: null,
                    },
                    venue: venue?.name ?? 'Unknown Venue',
                    time: checkin._creationTime,
                };
            })
        );
    },
});
