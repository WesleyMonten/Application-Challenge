namespace ApplicationChallenge.Models
{
    public class StudentReview
    {
        public string ReviewText { get; set; }
        public (StudentTag tag, float score)[] Tags { get; set; }
        public Assignment Assignment { get; set; }
    }
}