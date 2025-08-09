import {Button} from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className={"w-full min-h-screen gap-4 flex items-center justify-center"}>
        <Button size={"lg"}>Hello world</Button>
        <ThemeToggle />
    </div>
  );
}
