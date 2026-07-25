/**
 * JavaScript Utility Helpers for Currency, Date, and Text Formatting
 */

/**
 * Formats numbers into Indian Rupee currency representations (e.g. ₹3.50 Cr, ₹50.00 Lakhs, ₹15,000)
 */
export const formatCurrency = (amount: number): string => {
  if (isNaN(amount)) return '₹0';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Formats ISO date strings into clean Indian Date representation (e.g. 24 Jul 2026)
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Truncates text cleanly with ellipses
 */
export const truncateText = (text: string, maxLength: number = 60): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
