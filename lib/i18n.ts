import messages from "@/messages/id.json";

export type Messages = typeof messages;

export const idMessages: Messages = messages;

/**
 * Formats a simple template string from messages/id.json by replacing `{key}` tokens.
 */
export function formatMessage(
  template: string,
  values: Record<string, string | number>
): string {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{${key}}`, String(value));
  }, template);
}

