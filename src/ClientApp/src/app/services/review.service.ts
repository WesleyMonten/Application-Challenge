import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Commendation} from "../models/commendation.model";
import {Assignment} from "../models/assignment.model";

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

  getAllApplicantReviews(): Observable<Review[]>{
    return this.http.get<Review[]>("/applicantreview/");
  }

  getAllCompanyReviews(): Observable<Review[]>{
    return this.http.get<Review[]>("/companyreview/");
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
    return this.http.post<Review>("/applicantreview/",review);
  }

  addCompanyReview(review: Review): Observable<Review> {
    return this.http.post<Review>("/companyreview/",review);
  }

  getApplicantReviews(applicantId: string): Observable<Review[]> {
    return this.http.get<Review[]>("/applicantreview/applicant" + applicantId);
  }

  getCompanyReviews(companyId: string): Observable<Review[]> {
    return this.http.get<Review[]>("/companyreview/company" + companyId);
  }

  deleteApplicantReview(reviewId: string): Observable<Review> {
    return this.http.delete<Review>("/applicantreview/" + reviewId);
  }


  deleteCompanyReview(reviewId: string): Observable<Review> {
    return this.http.delete<Review>("/companyreview/" + reviewId);
  }



}
