namespace ApplicationChallenge.Models.Database
{
    /// <summary>
    /// Optional part of <see cref="User"/>, only if they represent a company
    /// </summary>
    public class Company
    {
        /// <summary>
        /// The name of the <see cref="Company"/>
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Contact email of the <see cref="Company"/>, only to be used when <see cref="Assignment.Stage"/> is
        /// <see cref="AssignmentStage.Finished"/>
        /// </summary>
        public string ContactEmail { get; set; }
        /// <summary>
        /// Contact phone number of the <see cref="Company"/>, only to be used when <see cref="Assignment.Stage"/> is
        /// <see cref="AssignmentStage.Finished"/>
        /// </summary>
        public string ContactPhoneNumber { get; set; }
        /// <summary>
        /// Publicly shown information about the <see cref="Company"/>
        /// </summary>
        public string Biography { get; set; }
    }
}