"use client";

import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {toast} from "sonner";
import {motion, AnimatePresence} from "framer-motion";
import {useDevices} from "@yudiel/react-qr-scanner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, CheckCircle2} from "lucide-react";
import {Button} from "@/components/ui/button";

// Dynamic import to avoid SSR issues
const Scanner = dynamic(
    () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
    {ssr: false}
);

interface QRScannerProps {
    onDetected: (value: string) => void;
    paused?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({onDetected, paused = false}) => {
    const [selectedDevice, setSelectedDevice] = useState("");
    const [isScanning, setIsScanning] = useState(true);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [lastScanned, setLastScanned] = useState("");
    const [isPaused, setIsPaused] = useState(paused);

    const devices = useDevices() || [];

    // Update internal pause state when prop changes
    useEffect(() => {
        setIsPaused(paused);
    }, [paused]);

    useEffect(() => {
        if (devices.length > 0 && !selectedDevice) {
            const backCamera = devices.find((d) =>
                d.label.toLowerCase().includes("back")
            );
            setSelectedDevice(backCamera?.deviceId || devices[0]?.deviceId || "");
        }
    }, [devices, selectedDevice]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            // Reset states when component unmounts
            setIsScanning(false);
            setLastScanned("");
        };
    }, []);

    const handleScan = (detected: { rawValue?: string }[] | null) => {
        if (detected?.length && detected[0]?.rawValue) {
            const text = detected[0].rawValue;
            setLastScanned(text);
            onDetected(text);
            setIsScanning(false);
            toast.success("Scanned successfully!");
        }
    };

    const handleError = (err: any) => {
        console.error("Scanner error:", err);
        setHasPermission(false);
        toast.error("Camera error — unable to access or mount device");
    };

    const reset = () => {
        setIsScanning(true);
        setLastScanned("");
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
        if (!isPaused) {
            setIsScanning(false);
            setLastScanned("");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
            <div className="w-full flex justify-between items-center">
                {devices.length > 0 && (
                    <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                        <SelectTrigger className="w-full max-w-[200px]">
                            <SelectValue placeholder="Select a camera"/>
                        </SelectTrigger>
                        <SelectContent>
                            {devices.map(
                                (device) =>
                                    device.deviceId && (
                                        <SelectItem key={device.deviceId} value={device.deviceId}>
                                            {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                                        </SelectItem>
                                    )
                            )}
                        </SelectContent>
                    </Select>
                )}
                <Button
                    variant={isPaused ? "default": "outline"}
                    onClick={togglePause}
                    className="ml-2"
                >
                    {isPaused ? "Resume" : "Pause"} Scanner
                </Button>
            </div>

            {hasPermission === false && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please enable camera access in your browser settings to use the QR
                        scanner.
                    </AlertDescription>
                </Alert>
            )}

            <div
                className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-muted">
                {!devices.length ? (
                    <div
                        className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2"/>
                        <p>No cameras detected</p>
                        <p className="text-sm">
                            Please make sure you have a camera connected and have granted
                            permission.
                        </p>
                    </div>
                ) : isPaused ? (
                        <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
                            <div
                                className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-muted flex items-center justify-center">
                                <p className="text-muted-foreground">Scanner paused</p>
                            </div>
                        </div>
                    ) :
                    (
                        <>
                            <Scanner
                                onScan={handleScan}
                                onError={handleError}
                                components={{finder: false}}
                                constraints={selectedDevice ? {deviceId: selectedDevice} : undefined}
                                paused={paused}
                                scanDelay={500}
                                formats={["qr_code", "micro_qr_code"]}
                            />

                            {/* Scanning overlay */}
                            {isScanning && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Animated scanning line */}
                                    <motion.div
                                        className="absolute left-0 w-full h-[2px] bg-muted-foreground"
                                        initial={{top: "0%"}}
                                        animate={{top: ["0%", "100%"]}}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                    {/* Corner brackets */}
                                    <div
                                        className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-foreground"/>
                                    <div
                                        className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-foreground"/>
                                    <div
                                        className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-foreground"/>
                                    <div
                                        className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-foreground"/>
                                </div>
                            )}

                            {/* Animated confirmation */}
                            <AnimatePresence>
                                {!isScanning && lastScanned && (
                                    <motion.div
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-black/75 text-white p-4"
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.9}}
                                        transition={{duration: 0.3}}
                                    >
                                        <CheckCircle2 className="w-16 h-16 text-secondary"/>
                                        <p className="text-lg font-semibold">Scanned Successfully!</p>
                                        <Button
                                            onClick={reset}
                                            size={"lg"}
                                        >
                                            Scan Another
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
            </div>
        </div>
    );
};
