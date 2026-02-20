"use client";

import * as React from "react";
import {
  Settings,
  Check,
  Clock,
  Trash2,
  AlertTriangle,
  CheckCheck,
  ClockFadingIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface SettingsMenuProps {
  onMarkAllCompleted: () => void;
  onMarkAllInProgress: () => void;
  onDeleteAll: () => void;
  taskCount: number;
  isLoading?: boolean;
}

export function SettingsMenu({
  onMarkAllCompleted,
  onMarkAllInProgress,
  onDeleteAll,
  taskCount,
  isLoading = false,
}: SettingsMenuProps) {
  const [showDeleteAllDialog, setShowDeleteAllDialog] = React.useState(false);

  const handleDeleteAll = () => {
    setShowDeleteAllDialog(true);
  };

  const handleConfirmDeleteAll = () => {
    onDeleteAll();
    setShowDeleteAllDialog(false);
  };

  const hasNoTasks = taskCount === 0;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            disabled={isLoading}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel inert>Task Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Mark all as completed */}
          <DropdownMenuItem
            onClick={onMarkAllCompleted}
            disabled={hasNoTasks || isLoading}
            className="cursor-pointer"
          >
            <CheckCheck className="mr-2 h-4 w-4 text-green-600" />
            <span>Mark all as completed</span>
          </DropdownMenuItem>

          {/* Mark all as in progress */}
          <DropdownMenuItem
            onClick={onMarkAllInProgress}
            disabled={hasNoTasks || isLoading}
            className="cursor-pointer"
          >
            <ClockFadingIcon className="mr-2 h-4 w-4 text-orange-600" />
            <span>Mark all as in progress</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete all tasks */}
          <DropdownMenuItem
            onClick={handleDeleteAll}
            disabled={hasNoTasks || isLoading}
            className="cursor-pointer text-red-600  dark:text-red-400"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-600  dark:text-red-400" />
            <span>Delete all tasks</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete All Confirmation Dialog */}
      <AlertDialog
        open={showDeleteAllDialog}
        onOpenChange={setShowDeleteAllDialog}
      >
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader className="flex items-start text-start">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <AlertDialogTitle className="text-xl">
                  Delete All Tasks
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  This action cannot be undone
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="my-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
              <p className="text-sm font-medium text-foreground">
                Are you sure you want to delete all {taskCount} task
                {taskCount !== 1 ? "s" : ""}?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                All tasks and their data will be removed. This action cannot be
                undone.
              </p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDeleteAll();
              }}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              {/* <Trash2 className="mr-2 h-4 w-4" /> */}
              Delete All Tasks
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
