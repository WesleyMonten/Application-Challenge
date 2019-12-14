import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Skill } from '../models/skill.model';

@Injectable()
export class ApplicantService {

    skills1: Array<Skill> = [
        { skillId: "1", name: ".Net", color: "#5C2D91" },
        { skillId: "2", name: "Angular", color: "#C3002F" },
        { skillId: "3", name: "Freelance", color: "#1DBF73" },
    ]

    skills2: Array<Skill> = [
        { skillId: "4", name: "Java", color: "#E44D26" },
        { skillId: "5", name: "Internship", color: "#0074C1" },
    ]

    applicants: Array<Applicant> = [
        { applicantId: "2", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: false, skills: this.skills2 },
        { applicantId: "1", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: true, skills: this.skills1 },
        { applicantId: "3", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: true, skills: this.skills1 },
        { applicantId: "4", biography: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nesciunt magnam vel laborum architecto quae quod eligendi dolores? Expedita in assumenda saepe ratione porro harum vero voluptatum praesentium adipisci nisi.", available: false, skills: this.skills2 }
    ]

    constructor() { }

    getAll() {
        return of(this.applicants);
    }


    getApplicant(applicantId: string): Observable<Applicant> {
        return of(this.applicants.find(a => a.applicantId === applicantId));
    }

}
