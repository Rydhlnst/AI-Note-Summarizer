"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronDown, NewspaperIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Sidebar className="">
      <div className="w-full flex items-center justify-between">
        <SidebarHeader className="p-4">
          <h1 className="text-xl">AI Note</h1>
        </SidebarHeader>
        <div className="pr-2">
          <Button variant={"ghost"} size={"icon"}>
            <NewspaperIcon/>
          </Button>
        </div>
      </div>
      <SidebarContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <h2>History</h2>
                <ChevronDown className={cn(`ml-auto transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`)} />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="px-2 space-y-2 ">
              <SidebarGroupContent>
              <Button variant="ghost" className="w-full justify-start">
                Belajar PPKN
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Ringkasan Fisika
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Materi Algoritma
              </Button>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="border rounded-xl py-3 px-3 flex items-center justify-start gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-sidebar-foreground">Faiq Haqqani</p>
                <p className="text-xs text-sidebar-foreground opacity-90">Free User</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default LeftSideBar