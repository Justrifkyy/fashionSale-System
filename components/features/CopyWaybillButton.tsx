"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";

export function CopyWaybillButton({ waybill }: { waybill: string }) {
  const { showToast } = useStore();

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(waybill);
          showToast(idMessages.common.numberCopied, "success");
        } catch {
          showToast(idMessages.common.numberCopied, "success");
        }
      }}
    >
      <Copy className="h-4 w-4" aria-hidden="true" />
      <span>{idMessages.common.copyNumber}</span>
    </Button>
  );
}

