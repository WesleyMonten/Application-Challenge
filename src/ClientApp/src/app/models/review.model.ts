import { ApplicantCommendation } from "./applicant-commodation.model";

export class Review {
    constructor(public applicantReviewId: string,
        public reviewText: string,
        public commendations: ApplicantCommendation[],
        public companyId: string,
        public assignmentId: string,
        public applicantId: string) { }
}
