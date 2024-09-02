"use client";
import { useState, useEffect, useRef } from "react";

function Body({ url }) {
  const [iframeSrc, setIframeSrc] = useState("");
  const [prompt, setPrompt] = useState("tu tiên trung quốc");
  const [high, setHigh] = useState("500px");
  const [alertMessage, setAlertMessage] = useState("Click vào đây để Vietsub");
  const [alertType, setAlertType] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    }
  }, [url]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setHigh(event.target.value);
  };
  const handleTranslateClick = async () => {
    setAlertMessage("Loading...")
    console.log("Translate button clicked");

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab: true});
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL("image/png");

      // Chuyển đổi data URL thành Blob
      const res = await fetch(imageDataUrl);
      const imageBlob = await res.blob();

      const formData = new FormData();
      formData.append('image', imageBlob, 'screenshot.png');
      formData.append('prompt', prompt);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setAlertMessage(result.response);
        setAlertType("success");
      } else {
        setAlertMessage(result.message);
        setAlertType("error");
      }

      // Dừng tất cả các track của stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error("Error capturing and sending image:", error);
      setAlertMessage("Failed to capture or send image.");
      setAlertType("error");
    }
  };

  return (
    <div className="p-4">
      
      {iframeSrc && (
        
        <div className="myclass" ref={divRef}>


      
<div class="my-32"> 
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
            Mô tả thể loại và ngôn ngữ để AI chọn phong cách dịch
          </label>
        </div>

      </form>     
      <form className="max-w-sm mx-auto">
        <div className="relative z-0 w-64 mb-5 group">
          <input
            type="text"
            name="high"
            id="high"
            value={high}
            onChange={handleInputChange2}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="high"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Chiều cao khung truyện (đơn vị px)
          </label>
        </div>

        
      </form>
      </div>         

          <iframe
            src={iframeSrc}
            width="100%"
            height={high}
            style={{ border: "none" }}
            title="Embedded Content"
          />
          
          <div className="flex justify-center">
                {/* {alertMessage && (
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
          )} */}
           
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-32 mt-6"
              onClick={handleTranslateClick}
            >
              {alertMessage}
            </button>
            
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;