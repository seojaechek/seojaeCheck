import { testApi } from "../libs/apis/testApi";
import { useQuery } from "@tanstack/react-query";

export const useTextApi = () => {
  return useQuery({ queryFn: () => testApi(), queryKey: ["test"] });
};