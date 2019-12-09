namespace ApplicationChallenge.Models
{
    public enum AssignmentStage
    {
        /// <summary>
        /// Still work-in-progress, can only be seen by creator
        /// </summary>
        Draft,
        /// <summary>
        /// Available for signup, appears in search results
        /// </summary>
        Open,
        /// <summary>
        /// No longer available for signup, not visible in search results
        /// </summary>
        Closed,
        /// <summary>
        /// Applicants have been chosen
        /// </summary>
        Finished,
        /// <summary>
        /// Assignment will not be finished, will notify applicants
        /// </summary>
        Cancelled,
    }
}