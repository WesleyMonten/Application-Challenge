namespace ApplicationChallenge.Models
{
    /// <summary>
    /// Class containing roles to be used for authorization
    /// </summary>
    public static class Roles
    {
        /// <summary>
        /// A normal user of the application, has limited access in some cases
        /// </summary>
        public const string User = "User";
        /// <summary>
        /// An administrator with all rights
        /// </summary>
        public const string Admin = "Admin";
    }
}