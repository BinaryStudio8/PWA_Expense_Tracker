export interface Expense {
    id: string
    title: string
    amount: number
    date: string
    time: string
    description?: string
    location?: {
        latitude: number
        longitude: number
        address?: string
    }
}
