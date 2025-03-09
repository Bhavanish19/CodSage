'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // ✅ Fix Image import
import { cn } from "@/lib/utils";
import { 
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, 
  SidebarMenu, SidebarMenuButton, SidebarMenuItem 
} from "@/components/ui/sidebar";
import { Bot, CreditCard, LayoutDashboard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react"; // ✅ Added React for useState

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
  { title: "Meetings", url: "/meetings", icon: CreditCard },
];

const projects = [
  { name: "Project 1" },
  { name: "Project 2" },
  { name: "Project 3" }
];

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true); // ✅ Fix undefined 'open'

  return (
  <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          {open && (
            <h1 className="text-xl font-bold text-primary/80">
                CodeSage
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url} 
                      className={cn(
                        pathname === item.url ? "!bg-primary !text-white" : "",
                        "list-none flex items-center gap-2 p-2"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map(project => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-100">
                      <div className={cn(
                        "rounded-sm border size-6 flex items-center justify-center text-sm bg-slate-100 text-primary",
                        { "bg-primary text-white": true }
                      )}>
                        {project.name.charAt(0)}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="h-2"></div>

              {open && ( // ✅ Fix: 'open' is now defined
                <SidebarMenuItem>
                  <Button asChild size="sm" variant="outline" className="w-fit">
                    <Link href="/create" className="flex items-center gap-2">
                      <Plus />
                      Create New Project
                    </Link>
                  </Button>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
