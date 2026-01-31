export const VALIDATION_MESSAGES = {
  AUTH: {
    EMAIL: {
      REQUIRED: "Email is required.",
      MAX_LENGTH: (maxLength) =>
        `Email must be at most ${maxLength} characters long.`,
      INVALID: "Invalid Email address.",
    },
    NAME: {
      REQUIRED: "Name is required.",
      MAX_LENGTH: (max) => `Name must be at most ${max} characters long.`,
      INVALID:
        "Name must start with a capital letter for each word and contain only lowercase letters after.",
    },
    PASSWORD: {
      MIN_LENGTH: (min) => `Password must be at least ${min} characters long.`,
      MAX_LENGTH: (max) => `Password must be at most ${max} characters long.`,
      INVALID:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
};
