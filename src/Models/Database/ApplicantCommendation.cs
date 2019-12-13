using System.ComponentModel;

namespace ApplicationChallenge.Models.Database
{
    public enum ApplicantCommendation
    {
        [Description("Works Hard")]
        WorksHard,
        [Description("Teamplayer")]
        TeamPlayer,
        [Description("Tactical Genius")]
        TechnicalGenius,
        [Description("High Quality Work")]
        HighQualityWork,
        [Description("Takes Initiative")]
        TakesInitiative,
    }
}