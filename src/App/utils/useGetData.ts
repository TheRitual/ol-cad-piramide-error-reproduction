import { useEffect, useState } from "react";
import Metadata from "../types/metadata.type";

interface UseGetDataProps {
  url: string;
}

export type Status = "UNSET" | "PENDING" | "SUCCESS" | "FAILED";

export interface UseGetDataRetrun {
  status: Status;
}

const useGetData = ({ url }: UseGetDataProps) => {
  const [status, setStatus] = useState<Status>("UNSET");
  const [data, setData] = useState<Metadata>();

  useEffect(() => {
    setStatus("PENDING");
    fetch(url)
      .then((response) => response.json())
      .then((data: Metadata) => { setData(data); setStatus("SUCCESS") })
      .catch((error) => {
        setStatus("FAILED");
        console.error({ err: error });
      });
  }, [url]);

  return {
    status,
    data,
  }
}

export default useGetData;