import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPredictions, uploadPrediction } from "lib/api/predictions";

export function usePredictions() {
  return useQuery({
    queryKey: ['predictions'],
    queryFn: getPredictions,
  });
}

export function usePredictMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => uploadPrediction(file),
    onSuccess: () => {
      // Invalidate and refetch history when a new prediction is made
      queryClient.invalidateQueries({ queryKey: ['predictions'] });
    },
  });
}
