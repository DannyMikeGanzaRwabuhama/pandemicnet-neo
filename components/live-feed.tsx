"use client";

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Card} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import {Clipboard} from "lucide-react";

interface Checkin {
    id: string;
    user: {
        name: string;
        avatar: string | null;
    };
    venue: string;
    time: number;
}

const LiveFeed = () => {
    const checkins = useQuery(api.checkins.getRecentCheckins) ?? [];

    return (
        <Card className={"p-4 space-y-8"}>
            <h2 className={"text-lg font-semibold"}>Live Activity</h2>
            <ScrollArea className={"h-[500px] pr-4"}>
                <div className={"space-y-4"}>
                    {checkins.map((checkin: Checkin) => (
                        <div key={checkin.id}>
                            {/*    Left side*/}
                            <div className={"flex items-center gap-3"}>
                                <Avatar className={"size-8"}>
                                    {checkin.user.avatar ? (
                                        <AvatarImage src={checkin.user.avatar}/>
                                    ) : (<AvatarFallback>{checkin.user.name?.charAt(0).toUpperCase()}</AvatarFallback>)}
                                </Avatar>
                                <div>
                                    <p className={"font-medium"}>{checkin.user.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Checked in at {checkin.venue}
                                    </p>
                                </div>
                            </div>

                            {/*    Right side*/}
                            <div className={"flex items-center gap-2"}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size={"icon"}
                                            variant={"ghost"}
                                            onClick={() => navigator.clipboard.writeText(checkin.venue)}
                                        >
                                            <Clipboard/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Copy Venue Name
                                    </TooltipContent>
                                </Tooltip>

                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(checkin.time, {addSuffix: true})}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    )
}
export default LiveFeed
