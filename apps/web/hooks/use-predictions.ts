import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPredictions, uploadPrediction } from "lib/api/predictions";
import { toast } from "sonner";

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
      queryClient.invalidateQueries({ queryKey: ['predictions'] });
      toast.success("Prediction complete! Results are ready.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to run prediction.");
    }
  });
}
