import { Component, OnInit } from '@angular/core';

import { Task } from '../model/task.model';

import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  task: Task = new Task();
  selectedTask = new Task();
  tasks: Task[];

  constructor(private listService: ListService) { }

  listTasks() {
    this.listService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    }, err => { console.error(err) })
  }

  ngOnInit() {
    this.listTasks();
  }

  setSelectedTask(t: Task) {
    this.selectedTask = t;
  }

  createNewTask() {
    this.listService.createTask(this.task)
      .subscribe(() => { 
        this.task = new Task();
        this.listTasks();
       }, err => { console.error(err) })
  }

  updateTask() {
    this.listService.updateTask(this.selectedTask, this.selectedTask.id)
      .subscribe(() => {
        this.selectedTask = new Task();
        this.listTasks();
       }, err => { console.error(err) })
  }

  removeTask(id: number) {
    this.listService.deleteTask(id)
      .subscribe(() => { 
        this.listTasks();
       }, err => { console.error(err) })
  }
}
