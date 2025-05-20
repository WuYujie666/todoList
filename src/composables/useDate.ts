import { computed } from 'vue'
export function useDate(date: Date | undefined) {
    const dateString = computed(() => {
        if (date && date instanceof Date) {
            return date.toISOString().split('T')[0]
        } else return '无截止日期'
    })

    //向外部暴露数据
    return { dateString }
}
