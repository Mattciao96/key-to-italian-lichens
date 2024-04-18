import * as z from "zod";

export const TraitSchema = z
  .object({
    4: z.optional(z.number()),
    45: z.optional(z.number()),
    53: z.optional(z.number()),
  })
  .refine(
    (data) => {
      if (data[53] && !data[45]) {
        return false;
      }

      return true;
    },
    {
      message: "How could you select that, is not possible!",
      path: [53],
    }
  );
