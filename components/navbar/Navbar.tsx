"use client"

import { Moon, Share, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";

interface NavbarProps {
    currentSummaryTitle: string;
  }
  
  export default function Navbar() {
    const { setTheme } = useTheme()
    return (
      <nav className="w-full sticky top-0 bg-background border-b border-border px-7 py-4 z-10 flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <SidebarTrigger className=''/>
          <h1 className="font-heading text-2xl text-foreground">
            Belum Ada Ringkasan
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"outline"} size={"icon"}>
            <Share className="h-[1.2rem] w-[1.2rem]"/>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    );
  }
  