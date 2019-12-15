import {Skill} from "./skill.model";

/**
 * @description Publicly accessible user info. Does not contain any private details such as email
 */
export class UserInfo {
  accountId: string;
  nickname: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  linkedInUrl: string;

  applicant: { skills: Skill[], available: boolean, biography: string };
  company: { name: string, biography: string };
}
