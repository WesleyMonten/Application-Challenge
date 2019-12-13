export class Review {
    constructor(public companyReviewID: string, 
        public reviewText: string, 
        public commendations: [], 
        public companyID: string, 
        public assignmentID: string, 
        public applicantID: string) { }
}
