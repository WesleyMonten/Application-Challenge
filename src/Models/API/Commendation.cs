namespace ApplicationChallenge.Models.API
{
    public class Commendation
    {
        public Commendation(string imageName, string displayName)
        {
            ImageName = imageName;
            DisplayName = displayName;
        }

        public string DisplayName { get; set; }
        public string ImageName { get; set; }
    }
}