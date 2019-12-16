import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Commendation} from "../models/commendation.model";
import {Assignment} from "../models/assignment.model";

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient) { }

  getAllApplicantReviews(): Observable<Review[]>{
    return this.http.get<Review[]>("/applicantreview/");
  }

  getAllCompanyReviews(): Observable<Review[]>{
    return this.http.get<Review[]>("/companyreview/");
  }

  changeReview(review: Review): Observable<Review> {
    // TODO
    return null;
  }

  getApplicantReview(id: string): Observable<Review> {
    return this.http.get<Review>("/applicantreview/" + id);
  }

  getCompanyReview(id: string): Observable<Review> {
    return this.http.get<Review>("/companyreview/" + id);
  }

  addApplicantReview(review: Review): Observable<Review> {
    return this.http.post<Review>("/applicantreview/",review);
  }

  addCompanyReview(review: Review): Observable<Review> {
    return this.http.post<Review>("/companyreview/",review);
  }

  putCompanyReview(id: string, model: Review) {
    return this.http.put<Review>("/companyreview/" + id, model)
  }

  putApplicantReview(id: string, model: Review) {
    return this.http.put<Review>("/applicantreview/" + id, model)
  }

  getApplicantReviews(applicantId: string): Observable<Review[]> {
    return this.http.get<Review[]>("/applicantreview/applicant/" + applicantId);
  }

  getCompanyReviews(companyId: string): Observable<Review[]> {
    return this.http.get<Review[]>("/companyreview/company/" + companyId);
  }

  deleteApplicantReview(reviewId: string): Observable<Review> {
    return this.http.delete<Review>("/applicantreview/" + reviewId);
  }


  deleteCompanyReview(reviewId: string): Observable<Review> {
    return this.http.delete<Review>("/companyreview/" + reviewId);
  }
}
