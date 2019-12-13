using System;

namespace ApplicationChallenge.Models.API
{
    public class SuccessWrapper<T> : SuccessWrapper
    {
        public T Result { get; set; }
    }

    public abstract class SuccessWrapper
    {
        public bool Successful { get; set; }
        public string ErrorMessage { get; set; }

        public static SuccessWrapper<TRes> Success<TRes>(TRes obj) => new SuccessWrapper<TRes>
        {
            Successful = true,
            ErrorMessage = null,
            Result = obj,
        };
        
        public static SuccessWrapper<TRes> Error<TRes>(Exception e) => Error<TRes>(e.Message);

        public static SuccessWrapper<TRes> Error<TRes>(string message) => new SuccessWrapper<TRes>
        {
            Successful = false,
            ErrorMessage = message,
        };
    }
}