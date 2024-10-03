"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";

const NotificationListener = () => {
  //   const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log("connecting notification");
    toast.success("connecting notification");
    // Replace with the actual API key for the user
    const apiKey =
      "0e6e6ab348a018bed21c70c8aad9d61945121e8dd6cdb57a817ec42ed7911bcb";

    // Connect to the SSE endpoint
    const eventSource = new EventSource(
      `https://4d1f-2405-201-1007-fa8d-de8a-300e-f144-94a0.ngrok-free.app/api/notifications?api_key=${apiKey}`
    );
    toast.success(`connection successful ${eventSource.OPEN.toString()}`);
    console.log("connection successful");

    eventSource.onopen = (event) => {
      toast.success("connection success" + event.timeStamp.toString());
    };

    eventSource.onmessage = (event) => {
      console.log("Inside onMessage method");
      const data = JSON.parse(event.data);
      console.log(`Data success: ${data}`);
      //   setMessages(event.data);
      toast.success(`Success ${event.data}`);
    };

    eventSource.onerror = (event) => {
      console.log("Inside onMessage method");
      const data = JSON.stringify(event);
      console.log(`Data: ${data}`);
      toast.error(`failure ${data}`);
    };

    return () => {
      console.log("Closing");
      eventSource.close();
      console.log("Closed");
    };
  }, []);

  return null;
};

export default NotificationListener;
