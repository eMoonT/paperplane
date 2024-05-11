import React, { useRef, useEffect, useState } from "react";

interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  clipboardData: string;
  setClipboardData: (data: string) => void;
  sendMessage: (expire: number) => void;
}

const BoardModal: React.FC<BoardModalProps> = ({
  isOpen,
  onClose,
  clipboardData,
  setClipboardData,
  sendMessage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [expire,setExpire] = useState<number>(7)

  useEffect(() => {
    textareaRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setExpire(7)
  },[onClose])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOpen ? "bg-gray-900 bg-opacity-75" : "hidden"
        }`}
      >
        <div className="xs:w-[480px] w-4/5 h-2/5 py-2 px-4 bg-white dark:bg-[rgba(30,30,30,1.5)] rounded-xl shadow-xl flex flex-col justify-center items-center fixed">
          {/* 模态框内容 */}
          <button
            onClick={onClose}
            className="absolute right-5 top-4 text-gray-600 dark:text-gray-300"
          >
            关闭
          </button>
          <h1 className="text-gray-700 dark:text-white py-2">发送文本</h1>
          <textarea
            name="t1"
            id="t1"
            ref={textareaRef}
            onChange={(e) => {
              setClipboardData(e.target.value);
            }}
            placeholder="请输入内容"
            value={clipboardData}
            className="h-[280px] w-full p-2 outline-none resize-none placeholder:text-sm bg-[rgba(0,0,0,0.05)] focus:bg-white  dark:bg-[rgba(255,255,255,0.05)] focus:border focus:border-blue-400 translate-x-1 dark:text-gray-100 rounded-lg"
          ></textarea>
          <div className="w-full py-3 flex justify-between">
            <span className="dark:text-gray-100 text-sm">
              过期时间(天)：
              <input type="number" className="h-10 w-[55px] p-2 text-md bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] dark:text-gray-100 rounded-sm outline-none border-b-2 border-b-blue-400" value={expire === 0 ? '': expire} onChange={(e) => setExpire(Number(e.target.value))} />
            </span>
            <button
              onClick={ () => {sendMessage(expire);setExpire(7)}}
              className="relative inline-flex items-center justify-center w-[60px] xs:w-[90px] h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardModal;
