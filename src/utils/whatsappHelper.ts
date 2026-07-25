/**
 * JavaScript Helper for WhatsApp Link Construction
 */

export const generateWhatsAppUrl = (
  mobileNumber: string = '919884933079',
  messageText: string = ''
): string => {
  const cleanNumber = mobileNumber.replace(/[^0-9]/g, '');
  const formattedNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${formattedNumber}?text=${encodedText}`;
};

export const openWhatsAppChat = (
  mobileNumber: string = '919884933079',
  messageText: string = ''
): void => {
  const url = generateWhatsAppUrl(mobileNumber, messageText);
  window.open(url, '_blank');
};
