"use client";
import React from 'react'
import {useQuery} from "convex/react";

import {api} from '@/convex/_generated/api';
import UserCard from "@/components/users/card";

const Page = () => {
    const users = useQuery(api.users.list);

    if (!users) {
        return <p className="text-center text-muted-foreground">Loading users...</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">👤 Users</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </>
    )

}
export default Page
