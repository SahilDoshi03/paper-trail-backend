
import z from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional()
});

export const PartialUserSchema = UserSchema.partial();

export type UserType = z.infer<typeof UserSchema>;
export type PartialUserType = z.infer<typeof PartialUserSchema>;
