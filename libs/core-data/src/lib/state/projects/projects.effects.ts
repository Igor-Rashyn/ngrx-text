import {
  ProjectsActionTypes,
  ProjectsLoad,
  ProjectsLoaded,
  ProjectDeleted,
  ProjectDelete,
  ProjectUpdate,
  ProjectUpdated,
  ProjectCreate,
  ProjectCreated
} from './projects.actions';
import { ProjectsService } from './../../projects/projects.service';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Project } from '../../projects/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  @Effect() loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectsLoad),
    switchMap((action: ProjectsLoad) =>
      this.projectsService
        .all()
        .pipe(map((res: Project[]) => new ProjectsLoaded(res)))
    )
  );

  @Effect() deleteProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectDelete),
    switchMap((action: ProjectDelete) =>
      this.projectsService
        .delete(action.payload)
        .pipe(map((res: Project) => new ProjectDeleted(res)))
    )
  );

  @Effect() createProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectCreate),
    switchMap((action: ProjectCreate) =>
      this.projectsService
        .create(action.payload)
        .pipe(map((res: Project) => new ProjectCreated(res)))
    )
  );

  @Effect() updateProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.ProjectUpdate),
    switchMap((action: ProjectUpdate) =>
      this.projectsService
        .update(action.payload)
        .pipe(map((res: Project) => new ProjectUpdated(res)))
    )
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
