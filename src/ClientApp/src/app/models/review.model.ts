import { ApplicantCommendation } from "./applicant-commodation.model";

export class Review {
    constructor(public applicantReviewID: string, 
        public reviewText: string, 
        public commendations: ApplicantCommendation[], 
        public companyID: string, 
        public assignmentID: string, 
        public applicantID: string) { }
}
