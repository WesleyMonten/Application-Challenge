import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Commendation} from "../models/commendation.model";

@Injectable()
export class ReviewService {

  applicantCommendations1: Array<Commendation> = [
    new Commendation("Takes Initiative", "takesInitiative"),
    new Commendation("High Quality Work", "highQualityWork"),
  ]

  applicantCommendations2: Array<Commendation> = [
    new Commendation("Team-Player", "TeamPlayer"),
    new Commendation("Technical Genius", "TechnicalGenius"),
    new Commendation("WorksHard", "WorksHard"),
  ]

  companyCommendations1: Array<Commendation> = [
    new Commendation("PleasantAtmosphere", "pleasantAtmosphere"),
    new Commendation("Stress-Free Environment", "stressFreeEnvironment"),
  ]

  companyCommendations2: Array<Commendation> = [
    new Commendation("Good Accommodation", "goodAccommodation"),
  ]

  applicantReviews: Array<Review> = [
    { isCompanyReview: false, reviewId: "1", reviewText: "Goede service geleverd, doet wat er van hem gevraagd wordt", companyId: "1", assignmentId: "1", applicantId: "1", commendations: this.applicantCommendations1 },
    { isCompanyReview: false, reviewId: "2", reviewText: "Goede samenwerking met ons team, overschreed onze verwachtingen", companyId: "1", assignmentId: "2", applicantId: "2", commendations: this.applicantCommendations2 },
  ]

  companyReviews: Array<Review> = [
    { isCompanyReview: true, reviewId: "1", reviewText: "fijne sfeer, zeer hulpzaam wanneer het nodig is", companyId: "1", assignmentId: "1", applicantId: "1", commendations: this.companyCommendations1 },
    { isCompanyReview: true, reviewId: "2", reviewText: "Heb veel geleerd tijdens deze opdracht, zal zeker nog eens een opdracht willen doen voro dit bedrijf", companyId: "1", assignmentId: "2", applicantId: "2", commendations: this.companyCommendations2 },
  ]

  constructor(private http: HttpClient) { }

  getAllApplicantReviews() {
    return of(this.applicantReviews);
  }

  getAllCompanyReviews() {
    return of(this.companyReviews);
  }

  getReview(id: string): Observable<Review> {
    // TODO
    return null;
  }

  changeReview(review: Review): Observable<Review> {
    // TODO
    return null;
  }

  addApplicantReview(review: Review): Observable<Review> {
    // TODO
    return null;
  }

  addCompanyReview(review: Review): Observable<Review> {
    // TODO
    return null;
  }

  getApplicantReviews(applicantId: string) {
    return of(this.applicantReviews.filter(a => a.applicantId == applicantId));
  }

  getCompanyReviews(companyId: string) {
    return of(this.companyReviews.filter(c => c.companyId == companyId));
  }

  deleteApplicantReview(reviewId: string): Observable<Review[]> {
    var review = this.applicantReviews.find(r => r.reviewId === reviewId);
    var index = this.applicantReviews.indexOf(review);
    return of(this.applicantReviews.splice(index, 1));
  }


  deleteCompanyReview(reviewId: string): Observable<Review[]> {
    var review = this.companyReviews.find(r => r.reviewId === reviewId);
    var index = this.companyReviews.indexOf(review);
    return of(this.companyReviews.splice(index, 1));
  }



}
