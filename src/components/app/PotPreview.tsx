"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Button,
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
  PaletteIcon,
} from "@/components/ui/Icon";
import { SignUpModal } from "@/components/site/SignUpModal";
import { PotFooter } from "@/components/site/PotFooter";

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const HeroPurple = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-align: center;
  padding: ${({ theme }) =>
    `${theme.space[4]} ${theme.space[5]} ${theme.space[16]}`};
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), 0 100%);

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) =>
      `${theme.space[5]} ${theme.space[5]} ${theme.space[16]}`};
  }
`;

const HeroTopBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-bottom: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${({ theme }) => theme.space[10]};
  }
`;

const BackSlot = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  button {
    color: ${({ theme }) => theme.colors.text.inverse};

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.12);
      color: ${({ theme }) => theme.colors.text.inverse};
    }
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

const BodyArea = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  padding-bottom: ${({ theme }) => theme.space[11]};
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

interface PotPreviewProps {
  potName: string;
}

export function PotPreview({ potName }: PotPreviewProps) {
  const router = useRouter();
  const [signUpOpen, setSignUpOpen] = useState(false);

  const interceptAction = () => setSignUpOpen(true);

  return (
    <Shell>
      <HeroPurple>
        <HeroTopBar>
          <BackSlot>
            <IconButton
              aria-label="Back to homepage"
              onClick={() => router.push("/")}
            >
              <ChevronLeftIcon size={24} />
            </IconButton>
          </BackSlot>
          <Logo variant="white" />
        </HeroTopBar>
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
                  icon={<InviteIcon src={opt.src} alt="" />}
                  label={opt.label}
                  onClick={interceptAction}
                />
              ))}
            </InviteGrid>
          </Stack>
        </InvitePanel>
      </BodyArea>

      <PotFooter />
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} />
    </Shell>
  );
}
