"use server";

import { revalidateTag } from "next/cache";

export const InvalidateHomeData = async () => {
  revalidateTag("homeData");
};
