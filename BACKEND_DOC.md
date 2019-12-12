# Backend documentation
see https://hackmd.io/sCh6dsBmR1-lEJuQ75U_IA

### geimplementeerd
- /assignment
    - / (GET/POST) (*)
    - /{id} (GET/PUT/DELETE) (1)
    - /open (GET) (*)
    - /company/{id} (GET) (*)
    - /company/{id}/open (GET) (*)
    - /company/{id}/closed (GET) (*)
    - /company/{id}/draft (GET) (*)
- /applicantreview
    - / (GET/POST) (*)
    - /{id} (GET/PUT/DELETE) (1)
    - /assignment/{id} (GET) (1)
    - /applicant/{id} (GET) (*)
    - /company/{id} (GET) (*)
- /companyreview
    - / (GET/POST) (*)
    - /{id} (GET/PUT/DELETE) (1)
    - /assignment/{id} (GET) (1)
    - /applicant/{id} (GET) (*)
    - /company/{id} (GET) (*)
- /application
    - / (GET/POST) (*)
    - /{id} (GET/PUT/DELETE) (1)
    - /assignment/{id} (*)
    - /applicant/{id} (*)
- /friendrequest
    - / (GET/POST) (*)
    - /{id} (GET/DELETE) (1)
    - /sender/{id} (GET) (*)
    - /receiver/{id} (GET) (*)
## Models
### User
- Id
- Nickname
- Email
- PasswordHash
- FirstName
- LastName 
- DateOfBirth
- LinkedInUrl
- isAdmin
- Applicant (> ApplicantModel)
- Company (> CompanyModel)
### Applicant
- Biography
- Available
- Skills[] 
- Friends[]
### FriendRequest
- Id
- Sender
- Receiver
### Company
- ContactEmail
- ContactPhoneNumber
- Biography
### Skill
- Name
- Color
### ApplicantReview
- Id
- ReviewText
- Commendations[]
- CompanyId
- AssignmentId
- ApplicantId
### CompanyReview
- Id
- ReviewTekst
- Commendations[]
- CompanyId
- AssignmentId
- ApplicantId
### Assignment
- Id
- Title
- Description
- Location
- StartTime
- EndTime
- IsInternship
- Compensation
- AssignmentStage
- Topics[] {Id, Name, Color}
- CompanyId
### Application
- Id
- Text
- AssignmentId
- ApplicantId
- Accepted
