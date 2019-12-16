import { Skill } from "./skill.model";

export class Applicant {
    constructor(public biography: string, public available: boolean, public skills: Skill[]) { }
}
