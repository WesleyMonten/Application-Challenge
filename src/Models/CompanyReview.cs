namespace ApplicationChallenge.Models
{
    public class CompanyReview
    {
        public string ReviewText { get; set; }
        public (CompanyTag tag, float score)[] Tags { get; set; }
        public (string tag, float score)[] CustomTags { get; set; }
        public Assignment Assignment { get; set; }
    }
}