import { z } from "zod";
import { VALIDATION_MESSAGES } from "../messages/validation.messages";

export const createLeaveSchema = z
  .object({
    startDate: z.coerce.date({
      message: VALIDATION_MESSAGES.LEAVE.START_DATE.REQUIRED,
    }),
    endDate: z.coerce.date({
      message: VALIDATION_MESSAGES.LEAVE.END_DATE.REQUIRED,
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: VALIDATION_MESSAGES.LEAVE.END_DATE.INVALID,
    path: ["endDate"],
  });
