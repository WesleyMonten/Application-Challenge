namespace ApplicationChallenge.Models
{
    public class StudentInfo
    {
        public User User { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }
        public (StudentTag tag, float score)[] Skills { get; set; }
        public string Biography { get; set; }
        public StudentReview[] Reviews { get; set; }
        public bool Available { get; set; }
    }
}