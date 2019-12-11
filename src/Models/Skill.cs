namespace ApplicationChallenge.Models
{
    /// <summary>
    /// A skill that can be shown by an <see cref="Applicant"/>
    /// </summary>
    public class Skill
    {
        public string Name { get; set; }
        
        /// <summary>
        /// Optional accent color
        /// </summary>
        public string Color { get; set; }
    }
}