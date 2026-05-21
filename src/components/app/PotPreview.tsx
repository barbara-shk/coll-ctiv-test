"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Button,
  Container,
  Heading,
  IconButton,
  Logo,
  Stack,
  Surface,
  Text,
  Tile,
} from "@/components/ui";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  DotsIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PaletteIcon,
  QrIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/Icon";
import { SignUpModal } from "@/components/site/SignUpModal";
import { SiteFooter } from "@/components/site/SiteFooter";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};
  background: ${({ theme }) => theme.colors.surface};
`;

const BackSlot = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.space[3]};
  top: 50%;
  transform: translateY(-50%);
`;

const HeroPurple = styled.section`
  background: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-align: center;
  padding: ${({ theme }) =>
    `${theme.space[11]} ${theme.space[5]} ${theme.space[16]}`};
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), 0 100%);

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) =>
      `${theme.space[14]} ${theme.space[5]} ${theme.space[16]}`};
  }
`;

const PotTitle = styled(motion(Heading))`
  word-break: break-word;
`;

const Amount = styled(motion(Heading))`
  margin-top: ${({ theme }) => theme.space[3]};
`;

const ActionsCard = styled(Surface)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.raised};
  margin: -${({ theme }) => theme.space[11]} auto 0;
  width: min(100% - ${({ theme }) => theme.space[9]}, 660px);
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  ${({ theme }) => theme.media.md} {
    flex-wrap: nowrap;
  }
`;

const InvitePanel = styled(Surface)`
  margin: ${({ theme }) => theme.space[7]} auto 0;
  width: min(100% - ${({ theme }) => theme.space[9]}, 660px);
`;

const InviteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[3]};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const BodyArea = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  padding-bottom: ${({ theme }) => theme.space[11]};
`;

/* -------------------------------------------------------------------------- */
/* Invite tiles config — declarative                                          */
/* -------------------------------------------------------------------------- */

const INVITE_OPTIONS = [
  { id: "email", label: "Email", icon: <MailIcon size={22} /> },
  { id: "qr", label: "QR Code", icon: <QrIcon size={22} /> },
  { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon size={22} /> },
  { id: "facebook", label: "Facebook", icon: <FacebookIcon size={20} /> },
  { id: "instagram", label: "Instagram", icon: <InstagramIcon size={20} /> },
  { id: "x", label: "X", icon: <XIcon size={20} /> },
] as const;

/* -------------------------------------------------------------------------- */
/* PotPreview                                                                 */
/* -------------------------------------------------------------------------- */

interface PotPreviewProps {
  potName: string;
}

export function PotPreview({ potName }: PotPreviewProps) {
  const router = useRouter();
  const [signUpOpen, setSignUpOpen] = useState(false);

  const interceptAction = () => setSignUpOpen(true);

  return (
    <Shell>
      <TopBar>
        <BackSlot>
          <IconButton
            aria-label="Back to homepage"
            onClick={() => router.push("/")}
          >
            <ChevronLeftIcon size={24} />
          </IconButton>
        </BackSlot>
        <Logo />
      </TopBar>

      <HeroPurple>
        <PotTitle
          level={1}
          size="7xl"
          tone="inverse"
          align="center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {potName}
        </PotTitle>
        <Amount
          level={1}
          size="9xl"
          tone="inverse"
          align="center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        >
          £0.00
        </Amount>
      </HeroPurple>

      <BodyArea>
        <ActionsCard
          as="section"
          aria-label="Pot actions"
          $tone="default"
          $elevation="cardElevated"
          $radius="2xl"
          $pad={3}
          $bordered
          role="toolbar"
        >
          <Button
            variant="pink"
            leftIcon={<ArrowDownRightIcon size={16} />}
            onClick={interceptAction}
          >
            Collect Money
          </Button>
          <Button
            variant="teal"
            leftIcon={<ArrowUpRightIcon size={16} />}
            onClick={interceptAction}
          >
            Send Money
          </Button>
          <Button
            variant="outline"
            leftIcon={<PaletteIcon size={16} />}
            onClick={interceptAction}
          >
            Customise Pot
          </Button>
          <IconButton
            aria-label="More options"
            $variant="outline"
            $shape="rounded"
            onClick={interceptAction}
          >
            <DotsIcon size={18} />
          </IconButton>
        </ActionsCard>

        <InvitePanel
          as="section"
          $tone="tinted"
          $radius="2xl"
          $pad={5}
          aria-labelledby="invite-title"
        >
          <Stack $gap={4}>
            <Text id="invite-title" size="md" weight="bold">
              Invite people to pay
            </Text>
            <InviteGrid>
              {INVITE_OPTIONS.map((opt) => (
                <Tile
                  key={opt.id}
                  icon={opt.icon}
                  label={opt.label}
                  onClick={interceptAction}
                />
              ))}
            </InviteGrid>
          </Stack>
        </InvitePanel>
      </BodyArea>

      <SiteFooter />
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} />
    </Shell>
  );
}
