using System;

namespace ApplicationChallenge.Models
{
    public class SuccessWrapper<T> : SuccessWrapper
    {
        public T Result { get; set; }
    }

    public class SuccessWrapper
    {
        public bool Successful { get; set; }
        public string ErrorMessage { get; set; }

        public static SuccessWrapper<TRes> Success<TRes>(TRes obj) => new SuccessWrapper<TRes>
        {
            Successful = true,
            ErrorMessage = null,
            Result = obj,
        };
        
        public static SuccessWrapper Error(Exception e) => Error(e.Message);

        public static SuccessWrapper Error(string message) => new SuccessWrapper
        {
            Successful = false,
            ErrorMessage = message,
        };
    }
}