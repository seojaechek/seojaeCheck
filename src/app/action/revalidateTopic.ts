"use server";

import { revalidateTag } from "next/cache";

export const RevalidateTopic = async () => {
  await revalidateTag("topic");
};
