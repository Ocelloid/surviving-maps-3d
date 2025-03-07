"use client";
import { useState } from "react";
import { Button, CircularProgress } from "@heroui/react";
import { api } from "~/trpc/react";

export function Clear() {
  const [isLoading, setIsLoading] = useState(false);
  const utils = api.useUtils();
  const clearDBMutation = api.location.clearDB.useMutation({
    onSuccess: async () => {
      await utils.location.invalidate();
      alert("Database cleared successfully.");
      setIsLoading(false);
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Button
        size="lg"
        color="danger"
        onPress={() => {
          const confirmed = window.confirm(
            "Are you sure you want to clear the database?",
          );
          if (!confirmed) return;
          setIsLoading(true);
          clearDBMutation.mutate();
        }}
      >
        Clear DB
      </Button>
      {isLoading && <CircularProgress size="lg" color="danger" />}
    </div>
  );
}
