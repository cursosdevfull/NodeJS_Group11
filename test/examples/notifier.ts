export const sentMessageSMS = (message: string): string => {
  return message.toUpperCase();
};

export const notify = (
  message: string,
  cb: (message: string) => string
): string => {
  return cb(message);
};
