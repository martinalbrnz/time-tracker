import { Role } from "@constants/roles"

export interface User {
	id: number
	name: string
	email: string
	role: Role
	password: string
}