import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

// Define the type for the venues prop
interface VenueCardProps {
    name: string;
    location?: string;
    latitude: number;
    longitude: number;
    qrCodeId: string;
}

const VenueCard = ({venue}: { venue: VenueCardProps }) => {
    return (
        <Card className={"hover:shadow-2xl hover:scale-105 transition-all"}>
            <CardHeader>
                <CardTitle>{venue.name}</CardTitle>
                <CardDescription>{venue.location}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Latitude: {venue.latitude.toFixed(6)}
                </p>
                <p className="text-sm text-muted-foreground">
                    Longitude: {venue.longitude.toFixed(6)}
                </p>
                <p className="text-sm font-medium mt-2">
                    QR Code ID: <span className="font-mono">{venue.qrCodeId}</span>
                </p>
            </CardContent>
        </Card>
    )
}
export default VenueCard
