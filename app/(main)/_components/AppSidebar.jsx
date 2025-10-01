"use client"

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/Constant";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {

    const path = usePathname();
    console.log(path)

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center mt-5">
        <Image
          src={"/logo.jpeg"}
          height={100}
          width={100}
          alt="logo"
          className="w-[100px] h-[100px]"
        />
        <Button className="w-full mt-5">
          <Plus /> Create new interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton asChild className={`p-5 ${path == option.path && "bg-blue-200"}`}>
                    <Link href={option.path}>
                      <option.icon  className={`mr-2 ${path == option.path && "text-primary"}`} />
                      <span className={`text-[16px] ${path == option.path && "text-primary"}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
