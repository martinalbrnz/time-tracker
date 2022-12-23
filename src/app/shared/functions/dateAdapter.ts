export function extractDay(date: Date): string {
	return new Date(date).toISOString().split('T')[0]
}