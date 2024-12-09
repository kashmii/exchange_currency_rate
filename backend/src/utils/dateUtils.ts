export const isValidDateFormat = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    dateString === date.toISOString().split('T')[0]
  );
};

// 許容される日付の期間
//  - 1999-01-01 から 現在まで
export const isDateInRange = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date >= new Date('1999-01-01') && date <= new Date();
};
