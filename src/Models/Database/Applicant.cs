namespace ApplicationChallenge.Models.Database
{
    /// <summary>
    /// Optional part of <see cref="User"/>, only if they are an applicant.
    /// </summary>
    public class Applicant
    {
        /// <summary>
        /// Publicly shown information about the <see cref="Applicant"/>
        /// </summary>
        public string Biography { get; set; }
        /// <summary>
        /// Whether the <see cref="Applicant"/> is open/looking for jobs
        /// </summary>
        public bool Available { get; set; }
        /// <summary>
        /// This person's primary skills, to be displayed on their profile
        /// </summary>
        public Skill[] Skills { get; set; }
    }
}