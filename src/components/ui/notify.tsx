"use client";

import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

export function Notify({
  children,
  isSuccessDeletePost,
}: {
  children: ReactNode;
  isSuccessDeletePost: boolean;
}) {
  useEffect(() => {
    if (isSuccessDeletePost) {
      toast.success("投稿が削除されました。");
    }
  });

  return <>{children}</>;
}