namespace ELTBackend.Constants
{
    public static class ValidationConstants
    {
        public static class User
        {
            public const int MaxNameLength = 100;
            public const string NameRegex = @"^[A-Z][a-z]*(?: [A-Z][a-z]*)*$";
            public const int MaxEmailLength = 254;
            public const int MaxRoleLength = 50;
        }

        public static class Leave
        {
            public const int MaxStatusLength = 50;
        }
    }
}
