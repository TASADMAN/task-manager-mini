"use client";

import * as React from "react";
import { Trash2, AlertTriangle } from "lucide-react";
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
import type { Task } from "@/types/task";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteTaskDialog({
  open,
  onOpenChange,
  task,
  onConfirm,
  isLoading = false,
}: DeleteTaskDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader className="flex text-start">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-xl">
                Delete Task
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-1">
                This action cannot be undone
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {task && (
          <div className="my-4 space-y-3">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
              <p className="text-sm font-medium text-foreground">
                Are you sure you want to delete this task?
              </p>
              {/* <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  "{task.title}"
                </span>
                {task.description && (
                  <span className="ml-1">
                    and all its data will be permanently removed.
                  </span>
                )}
              </p> */}
            </div>

            {/* {task.description && (
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Description:
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-foreground">
                  {task.description}
                </p>
              </div>
            )} */}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                {/* <Trash2 className="mr-2 h-4 w-4" /> */}
                Delete Task
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
