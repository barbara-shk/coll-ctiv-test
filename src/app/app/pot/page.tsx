"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Text } from "@/components/ui";
import { usePot } from "@/context/PotContext";
import { PotPreview } from "@/components/app/PotPreview";

const LoadingShell = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.surface};
`;

export default function PotPage() {
  const router = useRouter();
  const { pot, hydrated } = usePot();

  useEffect(() => {
    if (hydrated && !pot) {
      router.replace("/");
    }
  }, [hydrated, pot, router]);

  if (!hydrated) {
    return (
      <LoadingShell aria-busy="true">
        <Text tone="muted">Loading your pot…</Text>
      </LoadingShell>
    );
  }

  if (!pot) {
    return (
      <LoadingShell>
        <Text tone="muted">Redirecting you to set up a pot…</Text>
      </LoadingShell>
    );
  }

  return <PotPreview potName={pot.name} />;
}
