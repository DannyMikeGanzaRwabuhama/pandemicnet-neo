"use client";

import {useState} from "react";
import {QRScanner} from "@/components/qr-scanner";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {Copy} from "lucide-react";
import {toast} from "sonner";

export default function ScanPage() {
    const [scannedData, setScannedData] = useState("");
    const [permissionState, setPermissionState] = useState<"unknown" | "granted" | "denied">("unknown");
    const [isPaused, setIsPaused] = useState(false);

    const handleDetected = (value: string) => {
        setScannedData(value);
        setIsPaused(true); // Pause scanner after successful scan
    };

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            if (stream) {
                setPermissionState("granted");
                stream.getTracks().forEach((track) => track.stop()); // Stop immediately after checking
            }
        } catch (err) {
            console.error("Permission request failed:", err);
            setPermissionState("denied");
        }
    };

    const handleResume = () => {
        setIsPaused(false);
        setScannedData(""); // Clear previous scan when resuming
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4 space-y-6">
            <motion.h1
                className="text-2xl font-bold"
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
            >
                Scan a QR Code
            </motion.h1>

            {permissionState === "denied" && (
                <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Camera access was denied. Please allow it in browser settings, or try again:
                    </p>
                    <Button onClick={requestCameraPermission}>Request Permission</Button>
                </div>
            )}

            {permissionState !== "denied" && (
                <QRScanner
                    onDetected={(value) => {
                        handleDetected(value);
                        setPermissionState("granted");
                    }}
                    paused={isPaused}
                />
            )}

            {scannedData && (
                <div className="space-y-4 w-full max-w-sm">
                    <div className="p-3 bg-muted rounded-lg w-full flex items-center justify-evenly gap-4">
                        <p className={"truncate font-mono text-sm"}>{scannedData}</p>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            onClick={() => {
                                navigator.clipboard.writeText(scannedData)
                                    .then(r => toast.success("Scanned data copied to clipboard!"),
                                        err => console.log("Failed to copy text:", err));
                            }}
                        >
                            <Copy/>
                        </Button>
                    </div>
                    <Button
                        className="w-full"
                        onClick={handleResume}
                    >
                        Scan Another
                    </Button>
                </div>
            )}

            {permissionState === "unknown" || permissionState === "denied" && (
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={requestCameraPermission}
                >
                    Enable Camera
                </Button>
            )}
        </div>
    );
}
