/**
 * Public surface of the Collctiv design system.
 *
 * Consumers should import from "@/components/ui" rather than reaching into
 * individual primitive files — that keeps the design-system contract in one
 * place and makes future re-organisations a single-file change.
 */

export { Button, IconButton } from "./Button";
export type { ButtonProps, IconButtonProps, ButtonVariant, ButtonSize, ButtonShape } from "./Button";

export { Field, TextInput, Select } from "./Field";
export type { TextInputProps, SelectProps } from "./Field";

export { Heading, Text, Label } from "./Text";
export type { HeadingProps, TextProps } from "./Text";

export { Surface, Card } from "./Surface";

export { Container, Stack, Row, Spacer, VisuallyHidden } from "./Layout";

export { Tile } from "./Tile";
export type { TileProps } from "./Tile";

export { Modal } from "./Modal";

export { Logo } from "./Logo";

export * from "./Icon";
