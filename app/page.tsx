import DataTable from "@/components/data-table";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className={"min-h-screen w-full flex flex-col gap-y-4 items-center justify-center p-4"}>
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            <Button asChild>
                <Link href={'/dashboard'}>
                    Get Started <ArrowRight/>
                </Link>
            </Button>
            <DataTable/>
        </div>
    );
}
