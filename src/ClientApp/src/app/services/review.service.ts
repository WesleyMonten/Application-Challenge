import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Review } from '../models/review.model';
import { ApplicantCommendation } from '../models/applicant-commodation.model';
import { of, Observable } from 'rxjs';
import { CompanyReview } from '../models/company-review.model';
import { CompanyCommendation } from '../models/company-commendation.model';
import { ApplicantReview } from '../models/applicant-review.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {

  applicantCommandations1: Array<ApplicantCommendation> = [
    ApplicantCommendation.TakesInitiative,
    ApplicantCommendation.HighQualityWork
  ]

  applicantCommandations2: Array<ApplicantCommendation> = [
    ApplicantCommendation.TeamPlayer,
    ApplicantCommendation.TechnicalGenius,
    ApplicantCommendation.WorksHard
  ]

  companyCommandations1: Array<CompanyCommendation> = [
    CompanyCommendation.PleasantAtmosphere,
    CompanyCommendation.StressFreeEnvironment
  ]

  companyCommandations2: Array<CompanyCommendation> = [
    CompanyCommendation.GoodAccommodation
  ]

  applicantReviews: Array<ApplicantReview> = [
    { applicantReviewId: "1", reviewText: "Goede service geleverd, doet wat er van hem gevraagd wordt", companyId: "1", assignmentId: "1", applicantId: "1", commendations: this.applicantCommandations1 },
    { applicantReviewId: "2", reviewText: "Goede samenwerking met ons team, overschreed onze verwachtingen", companyId: "1", assignmentId: "2", applicantId: "2", commendations: this.applicantCommandations2 },
  ]

  companyReviews: Array<CompanyReview> = [
    { companyReviewId: "1", reviewText: "fijne sfeer, zeer hulpzaam wanneer het nodig is", companyId: "1", assignmentId: "1", applicantId: "1", commendations: this.companyCommandations1 },
    { companyReviewId: "2", reviewText: "Heb veel geleerd tijdens deze opdracht, zal zeker nog eens een opdracht willen doen voro dit bedrijf", companyId: "1", assignmentId: "2", applicantId: "2", commendations: this.companyCommandations2 },
  ]

  constructor(private http: HttpClient) { }

  getAllApplicantReviews() {
    return of(this.applicantReviews);
  }

  getAllCompanytReviews() {
    return of(this.companyReviews);
  }


  getApplicantReviews(applicantId: string) {
    return of(this.applicantReviews.filter(a => a.applicantId == applicantId));
  }

  getCompanyReviews(companyId: string) {
    return of(this.companyReviews.filter(c => c.companyId == companyId));
  }

  deleteApplicantReview(reviewId: string): Observable<ApplicantReview[]> {
    var review = this.applicantReviews.find(r => r.applicantReviewId === reviewId);
    var index = this.applicantReviews.indexOf(review);
    return of(this.applicantReviews.splice(index, 1));
  }


  deleteCompanyReview(reviewId: string): Observable<CompanyReview[]> {
    var review = this.companyReviews.find(r => r.companyReviewId === reviewId);
    var index = this.companyReviews.indexOf(review);
    return of(this.companyReviews.splice(index, 1));
  }



}
