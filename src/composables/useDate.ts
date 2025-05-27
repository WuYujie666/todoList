// composables/useDate.ts
export function useDate(date: Date | undefined) {
    if (date && date instanceof Date) {
        return {
            dateString: date.toISOString().split('T')[0],
        }
    } else {
        return {
            dateString: '无',
        }
    }
}
