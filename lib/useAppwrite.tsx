import { Alert } from "react-native";
import { useEffect, useState } from "react";

type AppwriteFunction<T> = () => Promise<T>;

interface UseAppwriteResult<T> {
  data: T | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

function useAppwrite<T>(fn: AppwriteFunction<T>): UseAppwriteResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = (): Promise<void> => fetchData();

  return { data, loading, refetch };
}

export default useAppwrite;
