import { Project } from "./Project.model"

export interface Hours {
	id?: number
	_id?: string
	project: Project
	initHour: Date
	endHour: Date
}