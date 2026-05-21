import type { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Text } from "@/components/ui";

const FaqLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.brand};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.brandStrong};
  }
`;

const FaqBulletList = styled.ul`
  margin: ${({ theme }) => theme.space[2]} 0 0;
  padding-left: ${({ theme }) => theme.space[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

function P({ children }: { children: ReactNode }) {
  return (
    <Text size="lg" tone="secondary" leading="body">
      {children}
    </Text>
  );
}

interface FaqItem {
  question: string;
  body: ReactNode;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much does it cost?",
    body: (
      <>
        <P>
          Collctiv is completely free to use! You can collect and withdraw
          funds for free 🙌.
        </P>
        <P>
          Since we do have costs to be able to exist, we&apos;ve created an
          exciting option for our amazing customers to contribute to the
          ongoing development of Collctiv. By giving you the option to tip,
          you become an essential part of our mission to help groups come
          together and do the things they love. When it&apos;s time to
          withdraw your funds, we believe in giving you control - if
          you&apos;d like to support us in our journey, you can opt-in to
          contribute 2% of your withdrawn amount to Collctiv. You can read
          more about our optional tips in our FAQ{" "}
          <FaqLink href="/faq">here</FaqLink>.
        </P>
      </>
    ),
  },
  {
    question: "How do I know my money is safe?",
    body: (
      <P>
        We take security very seriously and as such have designed the app with
        rigorous controls in place. We partner with third parties who
        specialise in providing security for different elements of the app. We
        use Nuvei and PayPoint Plc as globally-trusted and FCA-regulated
        payment processors and Persona to verify the identity of anyone
        collecting and withdrawing money from the Collctiv app. All of our
        payments are 3D secured by default, meaning that we ask your bank or
        card issuer to require you to authorise any payment you make into a
        Collctiv pot, if they have those controls in place.
      </P>
    ),
  },
  {
    question: "Who are Collctiv?",
    body: (
      <P>
        We&apos;re a friendly bunch based in the UK 🇬🇧 We&apos;re a FinTech
        company, which simply means we use state-of-the-art financial
        technology 🤓 to make it easier for you to split payments with your
        friends. More specifically, we make it easier for you to collect
        money upfront from your group, so you don&apos;t have to pay out for
        people, crossing your fingers 🤞 and hoping they pay you back. Our
        founders are Amy Whitell (CEO) and Pete Casson (CTO), who between
        them have over 40 years experience building technologies and
        businesses that have real impact on people&apos;s lives. More
        importantly, Pete (a Contributor) used to owe Amy (an Organiser)
        money all of the time. Nowadays he has no excuse, and everything is
        right with the world 😌
      </P>
    ),
  },
  {
    question: "How can I get help if I need it?",
    body: (
      <>
        <P>
          We like to think of ourselves as a helpful bunch. We&apos;ve built
          this app to help you collect money from your friends, and to help
          your friends to chip in to group gifts and activities more easily.
          And if you are having any issues at all, we&apos;d love to help! In
          fact, we relish the challenge 💪
        </P>
        <P>You can reach us via:</P>
        <FaqBulletList>
          <li>Email us: support at collctiv dot com</li>
          <li>
            <FaqLink href="/contact">Contact us form</FaqLink> on our site
          </li>
        </FaqBulletList>
      </>
    ),
  },
];
