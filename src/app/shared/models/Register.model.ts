import { Project } from "./Project.model"
import { User } from "./User.model"

export interface Register {
  _id: string
  user_id: string | User
  init_date: Date
  end_date: Date
  hours: number
  project: Project
}