import { Project } from "@shared/models/Project.model";
import { Role } from "@shared/models/Role.model";
import { User } from "@shared/models/User.model";

export const userMock: User[] = [
	{
		id: 1,
		name: 'Juan',
		email: 'juan@gmail.com',
		role: Role.Admin,
		password: 'password'
	},
	{
		id: 2,
		name: 'Ricardo',
		email: 'ricardo@gmail.com',
		role: Role.User,
		password: 'password'
	},
	{
		id: 3,
		name: 'Benedict',
		email: 'benedict@gmail.com',
		role: Role.User,
		password: 'password'
	},
	{
		id: 4,
		name: 'Sofía',
		email: 'sofia@gmail.com',
		role: Role.User,
		password: 'password'
	},
]

export const projectMock: Project[] = [
	{
		id: 1,
		title: 'App #1',
		description: 'The first app'
	},
	{
		id: 2,
		title: 'App #2',
		description: 'The second app'
	},
	{
		id: 3,
		title: 'App #3',
		description: 'The third app'
	},
	{
		id: 4,
		title: 'App #4',
		description: 'I don\'t really know which app is this'
	},
]
