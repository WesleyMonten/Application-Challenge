using System;

namespace ApplicationChallenge.Models
{
    public class Assignment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public (StudentTag tag, float score) RequiredSkills { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double Compensation { get; set; }
    }
}