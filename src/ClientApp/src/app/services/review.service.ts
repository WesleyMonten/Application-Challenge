import { Injectable } from '@angular/core';
import { ApplicantReview } from '../models/applicant-review.model';
import { ApplicantCommendation } from '../models/applicant-commodation.model';
import { of } from 'rxjs';
import { CompanyReview } from '../models/company-review.model';
import { CompanyCommendation } from '../models/company-commendation.model';

@Injectable()
export class ReviewService {

  applicantCommandations1: Array<ApplicantCommendation> = [
    ApplicantCommendation.TakesInitiative,
    ApplicantCommendation.HighQualityWork
  ]

  applicantCommandations2: Array<ApplicantCommendation> = [
    ApplicantCommendation.Teamplayer,
    ApplicantCommendation.TechnicalGenius,
    ApplicantCommendation.Workshard
  ]

  companyCommandations1: Array<CompanyCommendation> = [
    CompanyCommendation.PleasantAtmosphere,
    CompanyCommendation.StressFreeEnvironment
  ]

  companyCommandations2: Array<CompanyCommendation> = [
    CompanyCommendation.GoodAccomodation
  ]

  applicantReviews: Array<ApplicantReview> = [
    { applicantReviewID: "1", reviewText: "Goede service geleverd, doet wat er van hem gevraagd wordt", companyID: "1", assignmentID: "1", applicantID: "1", commendations: this.applicantCommandations1 },
    { applicantReviewID: "2", reviewText: "Goede samenwerking met ons team, overschreed onze verwachtingen", companyID: "1", assignmentID: "2", applicantID: "2", commendations: this.applicantCommandations2 },
  ]

  companyReviews: Array<CompanyReview> = [
    { companyReviewID: "1", reviewText: "fijne sfeer, zeer hulpzaam wanneer het nodig is", companyID: "1", assignmentID: "1", applicantID: "1", commendations: this.companyCommandations1 },
    { companyReviewID: "2", reviewText: "Heb veel geleerd tijdens deze opdracht, zal zeker nog eens een opdracht willen doen voro dit bedrijf", companyID: "1", assignmentID: "2", applicantID: "2", commendations: this.companyCommandations2 },
  ]

  constructor() { }

  getAllApplicantReviews() {
    return of(this.applicantReviews);
  }

  getAllCompanytReviews() {
    return of(this.companyReviews);
  }


  getReviewsApplicant(applicantID: string) {
    return of(this.applicantReviews.filter(a => a.applicantID == applicantID));
  }
}
