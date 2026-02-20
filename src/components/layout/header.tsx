"use client";

import * as React from "react";
import { Check, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { SettingsMenu } from "./settings-menu";
import { useAuth } from "@/contexts/auth-context";
import { RippleLoading } from "../ui/loading";
import { MdElectricBolt } from "react-icons/md";

interface HeaderProps {
  onAddTask?: () => void;
  onMarkAllCompleted?: () => void;
  onMarkAllInProgress?: () => void;
  onDeleteAll?: () => void;
  taskCount?: number;
  isLoading?: boolean;
}

export function Header({
  onAddTask,
  onMarkAllCompleted,
  onMarkAllInProgress,
  onDeleteAll,
  taskCount = 0,
  isLoading = false,
}: HeaderProps) {
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  if (isLoggingOut) {
    return <RippleLoading message="Logging out..." />;
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="m-auto flex h-16 items-center justify-between px-4 p-auto md:px-16">
        <div className="flex items-center gap-2">
          <div className="hidden h-8 w-8 items-center justify-center rounded-md sm:flex">
            {/* <Check className="h-12 w-12 text-primary" /> */}
            <MdElectricBolt className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-2xl font-bold">Manager</span>{" "}
            <span className="text-2xl font-light">Tasks</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Button onClick={onAddTask} size="default" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>

          {/* Settings Menu */}
          {onMarkAllCompleted && onMarkAllInProgress && onDeleteAll && (
            <SettingsMenu
              onMarkAllCompleted={onMarkAllCompleted}
              onMarkAllInProgress={onMarkAllInProgress}
              onDeleteAll={onDeleteAll}
              taskCount={taskCount}
              isLoading={isLoading}
            />
          )}

          <AnimatedThemeToggler />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  {/* รูป Avatar จาก Google */}
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt={
                      user?.user_metadata?.full_name || user?.email || "User"
                    }
                  />
                  {/* Fallback เป็นตัวอักษร */}
                  <AvatarFallback>
                    {user?.user_metadata?.full_name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) ||
                      user?.email?.slice(0, 2).toUpperCase() ||
                      "US"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.user_metadata?.full_name ||
                      user?.email?.split("@")[0] ||
                      "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
