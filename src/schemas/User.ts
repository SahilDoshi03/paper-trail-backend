
import z from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.email().optional(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional()
});

export const PartialUserSchema = UserSchema.partial();

export type UserType = z.infer<typeof UserSchema>;
export type PartialUserType = z.infer<typeof PartialUserSchema>;
