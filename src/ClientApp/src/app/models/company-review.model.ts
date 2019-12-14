import { CompanyCommendation } from "./company-commendation.model";

export class CompanyReview {
    constructor(public companyReviewId: string, public reviewText: string, public commendations: CompanyCommendation[], public companyId: string, public assignmentId: string, public applicantId: string) { }
}
