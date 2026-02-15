import { Palmtree } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-muted-foreground">
        <Palmtree className="h-16 w-16 mx-auto" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        There are no tasks yet...
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Please add a new task to get started
      </p>
    </div>
  );
}
