import { z } from "zod";
import { VALIDATION_CONFIG } from "../config/validation.config";
import { VALIDATION_MESSAGES } from "../messages/validation.messages";

const emailSchema = z
  .email({ message: VALIDATION_MESSAGES.AUTH.EMAIL.INVALID })
  .min(VALIDATION_CONFIG.AUTH.EMAIL.MIN_LENGTH, {
    message: VALIDATION_MESSAGES.AUTH.EMAIL.REQUIRED,
  })
  .max(VALIDATION_CONFIG.AUTH.EMAIL.MAX_LENGTH, {
    message: VALIDATION_MESSAGES.AUTH.EMAIL.MAX_LENGTH(
      VALIDATION_CONFIG.AUTH.EMAIL.MAX_LENGTH
    ),
  });

const nameSchema = z
  .string()
  .min(VALIDATION_CONFIG.AUTH.NAME.MIN_LENGTH, {
    message: VALIDATION_MESSAGES.AUTH.NAME.REQUIRED,
  })
  .max(VALIDATION_CONFIG.AUTH.NAME.MAX_LENGTH, {
    message: VALIDATION_MESSAGES.AUTH.NAME.MAX_LENGTH(
      VALIDATION_CONFIG.AUTH.NAME.MAX_LENGTH
    ),
  })
  .regex(VALIDATION_CONFIG.AUTH.NAME.REGEX, {
    message: VALIDATION_MESSAGES.AUTH.NAME.INVALID,
  });

const passwordSchema = z
  .string()
  .min(VALIDATION_CONFIG.AUTH.PASSWORD.MIN_LENGTH, {
    message: VALIDATION_MESSAGES.AUTH.PASSWORD.MIN_LENGTH(
      VALIDATION_CONFIG.AUTH.PASSWORD.MIN_LENGTH
    ),
  })
  .max(VALIDATION_CONFIG.AUTH.PASSWORD.MAX_LENGTH, {
    message: VALIDATION_MESSAGES.AUTH.PASSWORD.MAX_LENGTH(
      VALIDATION_CONFIG.AUTH.PASSWORD.MAX_LENGTH
    ),
  })
  .regex(VALIDATION_CONFIG.AUTH.PASSWORD.REGEX, {
    message: VALIDATION_MESSAGES.AUTH.PASSWORD.INVALID,
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});
