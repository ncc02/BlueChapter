"use client";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

function Body({ url }) {
  const [iframeSrc, setIframeSrc] = useState("");
  const [prompt, setPrompt] = useState("tu tiên trung quốc");
  const [alertMessage, setAlertMessage] = useState(""); // For storing the alert message
  const [alertType, setAlertType] = useState(""); // For storing the alert type (e.g., "success", "error")

  // Set iframe source when URL changes
  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    }

    const handleDoubleClickOrCtrlLeft = (event) => {
      if (event.type === "dblclick" || (event.type === "keydown" && event.key === "Control" && event.location === 1)) {
        captureAndSendImage();
      }
    };

    window.addEventListener("dblclick", handleDoubleClickOrCtrlLeft);
    window.addEventListener("keydown", handleDoubleClickOrCtrlLeft);

    return () => {
      window.removeEventListener("dblclick", handleDoubleClickOrCtrlLeft);
      window.removeEventListener("keydown", handleDoubleClickOrCtrlLeft);
    };
  }, [url]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const captureAndSendImage = () => {
    const iframe = document.querySelector("iframe");

    if (iframe) {
      html2canvas(iframe.contentDocument.body).then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("image", blob, "screenshot.png");
          formData.append("prompt", prompt);

          fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              setAlertMessage(data);
              setAlertType("success");
              console.log("Success:", data);
            })
            .catch((error) => {
              setAlertMessage("Failed to upload image.");
              setAlertType("error");
              console.error("Error:", error);
            });
        });
      });
    }
  };

  return (
    <div className="p-4">
      {alertMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${
            alertType === "success"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
          role="alert"
        >
          {alertMessage}
        </div>
      )}
      <form className="max-w-sm mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="prompt"
            id="prompt"
            value={prompt}
            onChange={handleInputChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="prompt"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mô tả thể loại và ngôn ngữ
          </label>
        </div>
     
      </form>
      
      {iframeSrc && (
        <div>
        <iframe
          src={iframeSrc}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          title="Embedded Content"
        />
        <div class="flex justify-center">
           <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-2">Dịch</button>
        </div>
        </div>
        
      )}
        </div>
  );
}

export default Body;
