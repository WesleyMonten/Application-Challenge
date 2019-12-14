import { AssignmentTopic } from "./assignment-topic.model";
import { AssignmentStage } from "./assignment-stage.model";

export class Assignment {
    constructor(public assignmentId: string, public title: string, public description: string, public location: string, public startTime: Date, public endTime: Date, public isInternship: boolean, public compensation: number, public stage: AssignmentStage, public topics: AssignmentTopic[], public applicationId: string, public companyId: string) { }
}
