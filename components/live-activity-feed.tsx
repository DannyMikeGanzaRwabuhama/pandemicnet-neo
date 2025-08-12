'use client';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

import {motion} from "framer-motion";

const activities = [
    {
        user: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        action: "checked in at",
        target: "Downtown Cafe",
        time: "2 min ago",
        type: "checkin",
    },
    {
        user: "Michael Green",
        avatar: "https://i.pravatar.cc/150?img=2",
        action: "registered as a new user",
        target: "",
        time: "10 min ago",
        type: "user",
    },
    {
        user: "Sara Lee",
        avatar: "https://i.pravatar.cc/150?img=3",
        action: "checked in at",
        target: "City Park",
        time: "30 min ago",
        type: "checkin",
    },
];

export function LiveActivityFeed() {
    return (
        <Card className="w-full max-w-md border shadow-lg">
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Live Activity</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="p-0">
                <ScrollArea className="h-[300px]">
                    <ul className="divide-y divide-border">
                        {activities.map((item, idx) => (
                            <motion.li
                                key={idx}
                                className="flex items-center p-4 space-x-4 hover:bg-muted/50 transition-colors"
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: idx * 0.05}}
                            >
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={item.avatar} alt={item.user}/>
                                    <AvatarFallback>{item.user[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col flex-1">
                  <span className="text-sm">
                    <span className="font-medium">{item.user}</span>{" "}
                      {item.action}{" "}
                      {item.target && (
                          <span className="font-medium text-primary">{item.target}</span>
                      )}
                  </span>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                </div>

                                <Badge
                                    variant={item.type === "checkin" ? "secondary" : "default"}
                                    className="capitalize"
                                >
                                    {item.type}
                                </Badge>
                            </motion.li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
