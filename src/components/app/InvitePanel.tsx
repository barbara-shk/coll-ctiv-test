"use client";

import styled from "styled-components";
import { Stack, Surface, Text, Tile } from "@/components/ui";

const PanelSurface = styled(Surface)`
  margin: ${({ theme }) => theme.space[7]} auto 0;
  width: min(100% - ${({ theme }) => theme.space[9]}, 660px);
  background: rgba(233, 232, 252, 0.4);
  border-radius: 10px;
`;

const InviteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[3]};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const InviteIcon = styled.img`
  width: 22px;
  height: 22px;
  display: block;
`;

const INVITE_OPTIONS = [
  { id: "email", label: "Email", src: "/assets/email.svg" },
  { id: "qr", label: "QR Code", src: "/assets/qr-code.svg" },
  { id: "whatsapp", label: "WhatsApp", src: "/assets/whatsapp.svg" },
  { id: "facebook", label: "Facebook", src: "/assets/facebook.svg" },
  { id: "instagram", label: "Instagram", src: "/assets/instagram.svg" },
  { id: "x", label: "X", src: "/assets/x.svg" },
] as const;

interface InvitePanelProps {
  onAction: () => void;
}

export function InvitePanel({ onAction }: InvitePanelProps) {
  return (
    <PanelSurface as="section" $pad={5} aria-labelledby="invite-title">
      <Stack $gap={4}>
        <Text id="invite-title" size="md" weight="bold">
          Invite people to pay
        </Text>
        <InviteGrid>
          {INVITE_OPTIONS.map((opt) => (
            <Tile
              key={opt.id}
              icon={<InviteIcon src={opt.src} alt="" />}
              label={opt.label}
              onClick={onAction}
            />
          ))}
        </InviteGrid>
      </Stack>
    </PanelSurface>
  );
}
