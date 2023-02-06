import { notify } from './examples/notifier';

/* const fakeSentMessageSMS = (message: string): string => {
  return message.toLowerCase();
}; */

describe('Sent messages', () => {
  it('A sms message should be sent', () => {
    const message = 'Hello World';

    const fakeSentMessageSMS = jest.fn().mockReturnValue(message.toLowerCase());

    const result = notify(message, fakeSentMessageSMS);

    expect(result).toBe(message.toLowerCase());
    expect(fakeSentMessageSMS).toHaveBeenCalled();
    expect(fakeSentMessageSMS).toHaveBeenCalledTimes(1);
    expect(fakeSentMessageSMS).toHaveBeenCalledWith(message);
  });
});
