"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Field,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@/components/ui";
import { AppleIcon, MailIcon } from "@/components/ui/Icon";

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`;

const Fine = styled(Text).attrs({ size: "xs", tone: "muted", align: "center" })`
  a,
  a:link,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    color: inherit;
    text-decoration: underline;
  }
`;

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

type Mode = "choose" | "email";

export function SignUpModal({ open, onClose }: SignUpModalProps) {
  const [mode, setMode] = useState<Mode>("choose");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setMode("choose");
    setSubmitted(false);
    setName("");
    setEmail("");
    onClose();
  };

  const handleEmailSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  let title: React.ReactNode = "Sign in to start collecting";
  let description: React.ReactNode = (
    <>You can either use your Apple account or your email address.</>
  );

  if (mode === "email") {
    title = "Sign up with email";
    description = "We'll send you a magic link to finish creating your pot.";
  }
  if (submitted) {
    title = "You're on the list 🎉";
    description = (
      <>
        We sent a confirmation link to <strong>{email}</strong>. Open it on this
        device to finish setting up your pot.
      </>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      description={description}
    >
      {submitted ? (
        <Button variant="secondary" fullWidth onClick={handleClose}>
          Back to pot
        </Button>
      ) : mode === "choose" ? (
        <Stack $gap={4}>
          <Field label="Country" htmlFor="signup-country">
            <Select id="signup-country" defaultValue="GB">
              <option value="GB">🇬🇧 United Kingdom</option>
              <option value="IE">🇮🇪 Ireland</option>
              <option value="US">🇺🇸 United States</option>
              <option value="DE">🇩🇪 Germany</option>
            </Select>
          </Field>
          <Divider />
          <Stack $gap={3}>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={<AppleIcon size={18} />}
            >
              Sign up with Apple
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={<MailIcon size={18} />}
              onClick={() => setMode("email")}
            >
              Sign up with Email
            </Button>
          </Stack>
          <Fine>
            By signing up you agree to our{" "}
            <a href="#terms">Terms &amp; Conditions</a> and have read and
            acknowledged our <a href="#privacy">Privacy Policy</a>.
          </Fine>
        </Stack>
      ) : (
        <Stack as="form" $gap={4} onSubmit={handleEmailSubmit} noValidate>
          <Field label="Full name" htmlFor="signup-name">
            <TextInput
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </Field>
          <Field label="Email" htmlFor="signup-email">
            <TextInput
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </Field>
          <Button type="submit" variant="secondary" size="lg" fullWidth>
            Continue
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMode("choose")}>
            Back to all sign up options
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
