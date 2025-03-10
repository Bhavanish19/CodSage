// 'use client'

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image"; // ✅ Fix Image import
// import { cn } from "@/lib/utils";
// import { 
//   Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, 
//   SidebarMenu, SidebarMenuButton, SidebarMenuItem 
// } from "@/components/ui/sidebar";
// import { Bot, CreditCard, LayoutDashboard, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import React from "react"; // ✅ Added React for useState
// import useProject from "@/hooks/use-project";
// import { useSidebar } from "@/components/ui/sidebar";
// const items = [
//   { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
//   { title: "Q&A", url: "/qa", icon: Bot },
//   { title: "Meetings", url: "/meetings", icon: CreditCard },
// ];



// export function AppSidebar() {
//   const pathname = usePathname();
//   const { open } = useSidebar()
//   const { projects, projectId, setProjectID } = useProject()

//   return (
//   <Sidebar collapsible="icon" variant="floating">
//       <SidebarHeader>
//         <div className="flex items-center gap-2">
//           <Image src="/logo.png" alt="Logo" width={40} height={40} />
//           {open && (
//             <h1 className="text-xl font-bold text-primary/80">
//                 CodeSage
//             </h1>
//           )}
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link 
//                       href={item.url} 
//                       className={cn(
//                         pathname === item.url ? "!bg-primary !text-white" : "",
//                         "list-none flex items-center gap-2 p-2"
//                       )}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarGroup>
//           <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {projects?.map(project => (
//                 <SidebarMenuItem key={project.name}>
//                   <SidebarMenuButton asChild>
//                     <div className="flex items-center gap-2 p-2 hover:bg-gray-100">
//                       <div className={cn(
//                         "rounded-sm border size-6 flex items-center justify-center text-sm bg-slate-100 text-primary",
//                         { "bg-primary text-white": true }
//                       )}>
//                         {project.name.charAt(0)}
//                       </div>
//                       <span>{project.name}</span>
//                     </div>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//               <div className="h-2"></div>

//               {open && ( // ✅ Fix: 'open' is now defined
//                 <SidebarMenuItem>
//                   <Button asChild size="sm" variant="outline" className="w-fit">
//                     <Link href="/create" className="flex items-center gap-2">
//                       <Plus />
//                       Create New Project
//                     </Link>
//                   </Button>
//                 </SidebarMenuItem>
//               )}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//       </SidebarContent>
//     </Sidebar>
//   );
// }

// export default AppSidebar;



/////////////////////




'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"

import { Bot, Calendar, ChevronDown, CreditCard, File, FolderTree, Home, Inbox, LayoutDashboard, Plus, Presentation, Search, Settings } from "lucide-react"
// import Logo from "./logo"
import Image from "next/image"; 
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useProject from "@/hooks/use-project"
import { Skeleton } from "@/components/ui/skeleton"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot,
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    },
]

export function AppSidebar() {
    const router = useRouter()
    const { projects, projectId, setProjectId, isLoading } = useProject()
    const pathname = usePathname()
    const { open } = useSidebar()
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </SidebarHeader>
            <SidebarContent className="">
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className={cn({
                                            '!bg-primary !text-white': pathname === item.url,
                                        })}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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
                            {isLoading && (<>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="w-full h-8" />
                                ))}
                            </>)}

                            {projects?.map((project) => (
                                <SidebarMenuItem key={project.id}>
                                    <SidebarMenuButton asChild>
                                        <div onClick={() => {
                                            setProjectId(project.id)
                                            router.push(`/dashboard`)
                                        }} className={cn({
                                            'cursor-pointer': true,
                                        })}>
                                            <div className="">
                                                <div className={cn("rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary", {
                                                    'bg-primary text-white': projectId === project.id,
                                                })}>
                                                    {project.name[0]}
                                                </div>
                                            </div>
                                            <span>{project.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <div className="h-2"></div>
                            {open && (
                                <SidebarMenuItem key="create">
                                    <Link href="/create">
                                        <Button size='sm' variant={'outline'}>
                                            <Plus />
                                            <span>Create Project</span>
                                        </Button>
                                    </Link>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {!open && (
                    <>
                        <SidebarSeparator />
                        <SidebarTrigger className="text-stone-500 hover:text-stone-900 self-center" />
                    </>
                )}
            </SidebarContent>

        </Sidebar>
    )
}
