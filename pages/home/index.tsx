import axios from "axios";
import { useEffect, useState } from "react";
import { hostUrl } from "../env";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function fetchMessage() {
      const {
        data: { message },
      } = await axios<{ message: string }>(`${hostUrl}/api/hello`, {
        method: "POST",
        data: {
          name: "John Doe",
        },
      });

      setMessage(message);
    }

    fetchMessage();
  }, []);

  return (
    <>
      <main>
        <div>{message}</div>
      </main>
    </>
  );
}
