import { CompanyCommendation } from "./company-commendation.model";

export class CompanyReview {
    constructor(public companyReviewID: string, public reviewText: string, public commendations: CompanyCommendation[], public companyID: string, public assignmentID: number, public applicantID: string) { }
}
