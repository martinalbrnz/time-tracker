import { Project } from "./Project.model"

export interface Hours {
	id: number
	project: Project
	initHour: Date
	endHour: Date
}