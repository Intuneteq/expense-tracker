export function getFormattedDate(date: Date) {
   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function getDateMinusDays(date: Date, days: 7) {
   return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
 }