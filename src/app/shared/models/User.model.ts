import { Role } from "./Role.model"

export interface User {
	id: number
	name: string
	email: string
	role: Role
	password: string
}