import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { of } from 'rxjs';

@Injectable()
export class SkillService {

  skills: Array<Skill> = [
    { skillID: "1", name: ".NET", color: "#5C2D91" },
    { skillID: "2", name: "Angular", color: "#C3002F" },
    { skillID: "3", name: "Freelance", color: "#1DBF73" },
    { skillID: "4", name: "Java", color: "#E44D26" },
    { skillID: "5", name: "Internship", color: "#0074C1" },
  ]

  constructor() { }

  get() {
    return of(this.skills);
  }
}
