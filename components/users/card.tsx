import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface UserCardProps {
    name?: string;
    email?: string;
    clerkId?: string;
    joinedAt: number;
}

const UserCard = ({user}: { user: UserCardProps }) => {
    return (
        <Card className={"hover:shadow-2xl hover:scale-105 transition-all"}>
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Clerk ID: {user.clerkId}
                </p>
                <p className="text-sm text-muted-foreground">
                    Joined At: {new Date(user.joinedAt).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    )
}
export default UserCard
