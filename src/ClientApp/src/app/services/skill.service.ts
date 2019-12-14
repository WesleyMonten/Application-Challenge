import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { of } from 'rxjs';

@Injectable()
export class SkillService {

  skills: Array<Skill> = [
    { skillId: "1", name: ".NET", color: "#5C2D91" },
    { skillId: "2", name: "Angular", color: "#C3002F" },
    { skillId: "3", name: "Freelance", color: "#1DBF73" },
    { skillId: "4", name: "Java", color: "#E44D26" },
    { skillId: "5", name: "Internship", color: "#0074C1" },
  ]

  constructor() { }

  get() {
    return of(this.skills);
  }
}
