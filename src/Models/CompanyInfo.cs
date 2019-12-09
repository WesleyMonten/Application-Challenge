namespace ApplicationChallenge.Models
{
    public class CompanyInfo
    {
        public User User { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }
        public (CompanyTag tag, float score)[] Tags { get; set; } // TODO: naam?
        public string Biography { get; set; }
        public StudentReview[] Reviews { get; set; }
    }
}