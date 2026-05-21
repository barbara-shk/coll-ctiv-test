import "styled-components";
import type { AppTheme } from "./theme";

declare module "styled-components" {
  // Module augmentation needs the interface form even though it adds no own members.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
