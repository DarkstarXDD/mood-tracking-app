export type ActionResultType = Promise<
  | { success: true }
  | { success: false; error: { type: string; message: string } }
>

export type SVGIconNameType =
  | "icon-very-sad-white"
  | "icon-very-sad-color"
  | "icon-very-happy-white"
  | "icon-very-happy-color"
  | "icon-sad-white"
  | "icon-sad-color"
  | "icon-neutral-white"
  | "icon-neutral-color"
  | "icon-happy-white"
  | "icon-happy-color"
  | "icon-sleep"
  | "icon-reflection"
  | "avatar-placeholder"
  | "brand-logo"
