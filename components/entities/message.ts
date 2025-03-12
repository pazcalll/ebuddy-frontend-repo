import { z } from "zod";

const message = z.object({
  message: z.string(),
});

export type TMessage = z.infer<typeof message>;

export { message };
