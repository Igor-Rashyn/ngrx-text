import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  Customer,
  Project,
  NotificationsService,
  CustomersService,
  ProjectsFacade
} from '@workshop/core-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(
    private customerService: CustomersService,
    private facade: ProjectsFacade,
    private ns: NotificationsService
  ) {
    this.projects$ = facade.projects$;
    this.currentProject$ = facade.currentProject$;
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.facade.selectProject(null);
  }

  selectProject(project) {
    this.facade.selectProject(project.id);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.facade.getProjects();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.facade.createProject(project);
    this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.facade.updateProject(project);
    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    this.facade.deleteProject(project);
    this.ns.emit('Project deleted!');
  }
}
