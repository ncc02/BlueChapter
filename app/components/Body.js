"use client";
import { useState, useEffect } from "react";

function Body({ url }) {
  const [iframeSrc, setIframeSrc] = useState("");
  const [prompt, setPrompt] = useState("tu tiên trung quốc");  
  
  // Set iframe source when URL changes
  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    }
  }, [url]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="p-4">
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
        <iframe
          src={iframeSrc}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          title="Embedded Content"
        />
      )}
      


    </div>
  );
}

export default Body;
