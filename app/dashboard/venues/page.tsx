"use client"

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import VenueCard from "@/components/venues/card";

const Page = () => {
    const venues = useQuery(api.venues.list);

    if (!venues) {
        return <p className="text-center text-muted-foreground">Loading venues...</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">📍 Venues</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {venues.map((venue) => (
                    <VenueCard venue={venue} key={venue._id}/>
                ))}
            </div>
        </>
    )
}
export default Page
