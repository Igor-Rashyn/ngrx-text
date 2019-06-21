import { ProjectsState } from './projects.reducer';
import { Project } from './../../projects/project.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCurrentProject, selectAllProjects } from '..';
import {
  ProjectsLoad,
  ProjectSelect,
  ProjectCreate,
  ProjectUpdate,
  ProjectDelete
} from './projects.actions';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;

  constructor(private store: Store<ProjectsState>) {
    this.projects$ = store.pipe(select(selectAllProjects));
    this.currentProject$ = store.pipe(select(selectCurrentProject));
  }

  getProjects() {
    this.store.dispatch(new ProjectsLoad());
  }

  selectProject(projectId) {
    this.store.dispatch(new ProjectSelect(projectId));
  }

  createProject(project) {
    this.store.dispatch(new ProjectCreate(project));
  }

  updateProject(project) {
    this.store.dispatch(new ProjectUpdate(project));
  }

  deleteProject(project) {
    this.store.dispatch(new ProjectDelete(project.id));
  }
}
