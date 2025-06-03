import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (

        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <ThemeToggle />
            <Button>Coucou blog</Button>
        </div>

    );
}
