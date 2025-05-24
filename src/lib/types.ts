export type ActionResultType =
  | { success: true }
  | { success: false; error: { type: string; message: string } }
