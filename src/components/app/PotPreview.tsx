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
  Surface,
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
import { InvitePanel } from "./InvitePanel";

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

const BodyArea = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  padding-bottom: ${({ theme }) => theme.space[11]};
`;

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

        <InvitePanel onAction={interceptAction} />
      </BodyArea>

      <PotFooter />
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} />
    </Shell>
  );
}
