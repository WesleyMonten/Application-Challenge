import {Commendation} from "./commendation.model";

export class Review {

  public reviewId: string;

  public reviewText: string;

  public commendations: Commendation[];

  public companyId: string;

  public assignmentId: string;

  public applicantId: string; // duplicaat?

  /**
   *  @description Is this review from a company about an applicant?
   *  @
   */
  public isCompanyReview: boolean;

  constructor(reviewId: string,
              reviewText: string,
              commendations: Commendation[],
              companyId: string,
              assignmentId: string,
              applicantId: string) {
    this.applicantId = applicantId;
    this.assignmentId = assignmentId;
    this.companyId = companyId;
    this.commendations = commendations;
    this.reviewText = reviewText;
    this.reviewId = reviewId;
  }
}
