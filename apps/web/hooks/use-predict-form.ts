import { useCallback, useState } from "react"
import { usePredictMutation } from "./use-predictions"

export function usePredictForm() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const mutation = usePredictMutation()

  const handleFileDrop = useCallback(
    (selectedFile: File) => {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      mutation.reset()
    },
    [mutation]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileDrop(e.target.files[0])
      }
    },
    [handleFileDrop]
  )

  const handleClear = useCallback(() => {
    setFile(null)
    setPreview(null)
    mutation.reset()
  }, [mutation])

  const handlePredict = useCallback(() => {
    if (file) {
      mutation.mutate(file)
    }
  }, [file, mutation])

  return {
    file,
    preview,
    mutation,
    handleFileChange,
    handleFileDrop,
    handleClear,
    handlePredict,
  }
}
