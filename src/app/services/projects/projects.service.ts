import { Injectable } from '@angular/core';
import { Project } from '@shared/models/Project.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects$ = new BehaviorSubject<Project[]>([])

  get projects(): Observable<Project[]> {
    return this.projects$.asObservable()
  }

  setProjects(projects: Project[]) {
    this.projects$.next(projects)
  }
}
