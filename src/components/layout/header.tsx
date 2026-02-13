"use client";

import * as React from "react";
import { Check, Plus, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

interface HeaderProps {
  onAddTask?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function Header({
  onAddTask,
  userName = "Thokin Noibuddee",
  userEmail,
  userAvatar,
}: HeaderProps) {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <header className=" sticky top-0 z-50 w-full  bg-background/95 backdrop-blur">
      <div className="mx-16  flex h-16 items-center justify-between px-4 md:px-8 m-auto">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <div className="sm:flex h-8 w-8 items-center justify-center rounded-md hidden ">
            <Check className="h-12 w-12  text-primary" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="font-bold text-2xl">Manager</span>{" "}
            <span className="font-light text-2xl">Tasks</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Add Task Button */}
          <Button onClick={onAddTask} size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>

          {/* Theme Toggle */}
          <AnimatedThemeToggler />

          {/* Settings */}
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-45">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  {userEmail && (
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
