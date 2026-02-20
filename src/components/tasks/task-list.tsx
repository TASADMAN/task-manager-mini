"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskItem } from "./task-item";
import { EmptyState } from "./empty-state";
import type { Task, TaskStatus } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onStatusToggle?: (taskId: string, newStatus: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onCopy?: (task: Task) => void;
}

export function TaskList({
  tasks,
  isLoading,
  onStatusToggle,
  onEdit,
  onDelete,
  onCopy,
}: TaskListProps) {
  const [items, setItems] = React.useState<Task[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setItems(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const groupedTasks = React.useMemo(() => {
    const groups: Record<TaskStatus, Task[]> = {
      "in-progress": [],
      todo: [],
      done: [],
    };

    items.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });

    return groups;
  }, [items]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = items.find((task) => task.id === activeId);
    if (!activeTask) return;

    if (overId.startsWith("droppable-")) {
      const newStatus = overId.replace("droppable-", "") as TaskStatus;

      if (activeTask.status !== newStatus) {
        setItems((items) =>
          items.map((task) =>
            task.id === activeId ? { ...task, status: newStatus } : task,
          ),
        );

        onStatusToggle?.(activeId, newStatus);
      }
    } else {
      const overTask = items.find((task) => task.id === overId);
      if (overTask && activeTask.status !== overTask.status) {
        setItems((items) =>
          items.map((task) =>
            task.id === activeId ? { ...task, status: overTask.status } : task,
          ),
        );

        onStatusToggle?.(activeId, overTask.status);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = items.find((task) => task.id === activeId);
    const overTask = items.find((task) => task.id === overId);

    if (activeTask && overTask && activeTask.status === overTask.status) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3 ">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border bg-card p-3 sm:gap-4 sm:p-4"
          >
            <Skeleton className="h-5 w-5 rounded" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  const statusOrder: TaskStatus[] = ["in-progress", "todo", "done"];
  const statusLabels: Record<TaskStatus, string> = {
    "in-progress": "In Progress",
    todo: "To Do",
    done: "Completed",
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-8">
        {statusOrder.map((status) => {
          const statusTasks = groupedTasks[status];
          if (statusTasks.length === 0) return null;

          return (
            <DroppableSection
              key={status}
              status={status}
              label={statusLabels[status]}
              tasks={statusTasks}
              onStatusToggle={onStatusToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onCopy={onCopy}
            />
          );
        })}
      </div>
    </DndContext>
  );
}

interface DroppableSectionProps {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  onStatusToggle?: (taskId: string, newStatus: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onCopy?: (task: Task) => void;
}

function DroppableSection({
  status,
  label,
  tasks,
  onStatusToggle,
  onEdit,
  onDelete,
  onCopy,
}: DroppableSectionProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${status}`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{label}</h2>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>

      <div className="border-t" />

      <div
        ref={setNodeRef}
        className={`min-h-[100px] rounded-lg transition-colors ${
          isOver ? "bg-primary/5 ring-2 ring-primary ring-offset-2" : ""
        }`}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.map((task) => (
              <SortableTaskItem
                key={task.id}
                task={task}
                onStatusToggle={onStatusToggle}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

interface SortableTaskItemProps {
  task: Task;
  onStatusToggle?: (taskId: string, newStatus: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onCopy?: (task: Task) => void;
}

function SortableTaskItem({
  task,
  onStatusToggle,
  onEdit,
  onDelete,
  onCopy,
}: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskItem
        task={task}
        onStatusToggle={onStatusToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
