import { DataPersistence } from '@nrwl/nx';
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
import { map } from 'rxjs/operators';
import { Project } from '../../projects/project.model';
import { ProjectsState } from './projects.reducer';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  @Effect() loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.ProjectsLoad,
    {
      run: (action: ProjectsLoad, state: ProjectsState) => {
        return this.projectsService
          .all()
          .pipe(map((res: Project[]) => new ProjectsLoaded(res)));
      },
      onError: (action: ProjectsLoad, error) => {
        console.log('ERROR', error);
      }
    }
  );

  @Effect() updateProjects$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.ProjectUpdate,
    {
      run: (action: ProjectUpdate, state: ProjectsState) => {
        return this.projectsService
          .update(action.payload)
          .pipe(map((res: Project) => new ProjectUpdated(res)));
      },
      onError: (action: ProjectUpdate, error) => {
        console.log('ERROR', error);
      }
    }
  );

  @Effect() createProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.ProjectCreate,
    {
      run: (action: ProjectCreate, state: ProjectsState) => {
        return this.projectsService
          .create(action.payload)
          .pipe(map((res: Project) => new ProjectCreated(res)));
      },
      onError: (action: ProjectCreate, error) => {
        console.log('ERROR', error);
      }
    }
  );

  @Effect() deleteProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.ProjectDelete,
    {
      run: (action: ProjectDelete, state: ProjectsState) => {
        return this.projectsService
          .delete(action.payload)
          .pipe(map((res: Project) => new ProjectDeleted(res)));
      },
      onError: (action: ProjectDelete, error) => {
        console.log('ERROR', error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
