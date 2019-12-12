import { ApplicantCommendation } from "./applicant-commodation.model";

export class ApplicantReview {
    constructor(public applicantReviewID: string, public reviewText: string, public commendations: ApplicantCommendation[], public companyID: string, public assignmentID: number, public applicantID: string) { }
}
