import React, { useRef, useEffect, useState } from "react";
import { X, ArrowLeft, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadFile } from "./upload-file";


interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  clipboardData: string;
  setClipboardData: (data: string) => void;
  send: (expire: number) => void;
}

const BoardModal: React.FC<BoardModalProps> = ({
  isOpen,
  onClose,
  clipboardData,
  setClipboardData,
  send,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [expire, setExpire] = useState<number>(7);

  const [isUpload, setIsUpload] = useState<boolean>(false);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setExpire(7);
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOpen ? "bg-gray-900 bg-opacity-75" : "hidden"
        }`}
      >
        <div className="xs:w-[480px] w-4/5 h-auto py-2 px-4 bg-white dark:bg-[rgba(30,30,30,1.5)] rounded-xl shadow-xl flex flex-col justify-center items-center fixed">
          {/* 模态框内容 */}
          <X
            size={24}
            onClick={onClose}
            className="absolute right-5 top-4 text-gray-600 dark:text-gray-300 cursor-pointer"
          />
          <ArrowLeft
            size={24}
            onClick={() => setIsUpload(!isUpload)}
            className={cn(
              "absolute left-5 top-4 text-gray-600 dark:text-gray-300 cursor-pointer",
              isUpload ? "" : "hidden"
            )}
          />

          <h1 className="text-gray-700 dark:text-white py-2">
            {isUpload ? "上传文件" : "发送文本"}
          </h1>
          <textarea
            name="t1"
            id="t1"
            ref={textareaRef}
            onChange={(e) => {
              setClipboardData(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="请输入内容"
            value={clipboardData}
            className={cn(
              "h-[220px] w-full p-2 border-none outline-none resize-none placeholder:text-sm bg-[rgba(0,0,0,0.05)] focus:bg-white  dark:bg-[rgba(255,255,255,0.05)] focus:border focus:border-blue-400 translate-x-1 dark:text-gray-100 rounded-md",
              isUpload ? "hidden" : ""
            )}
          ></textarea>
          <div className="p-2 h-full">
            <UploadFile isUpload={isUpload} />
          </div>
          <div
            className={cn(
              "w-full space-x-1 xs:py-3 flex justify-between",
              isUpload ? "hidden" : ""
            )}
          >
            <span className="dark:text-gray-100 text-xs xs:text-sm">
              过期时间(天)：
              <input
                type="number"
                className="h-10 w-[30px] xs:w-[55px] p-2 text-md bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] dark:text-gray-100 rounded-sm outline-none border-b-2 border-b-blue-400"
                value={expire === 0 ? "" : expire}
                onChange={(e) => setExpire(Number(e.target.value))}
              />
            </span>
            <div className="flex justify-center items-center gap-4">
              <Upload
                onClick={() => setIsUpload(!isUpload)}
                size={40}
                className="text-blue-500 hover:bg-gray-300 dark:hover:bg-[rgba(255,255,255,0.05)] p-2 hover:rounded-md"
              />
              <button
                onClick={() => {
                  send(expire);
                  setExpire(7);
                }}
                className="relative inline-flex items-center justify-center w-[50px] xs:w-[90px] h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardModal;
