import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  receive: () => void;
  setCodeInput: (code: number) => void;
  codeInput: number;
}

const CodeModal: React.FC<CodeModalProps> = ({
  receive,
  setCodeInput,
  codeInput,
  isOpen,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "bg-gray-900 bg-opacity-75" : "hidden"
      }`}
    >
      <div className="xs:w-[480px] w-4/5 h-2/5 px-4 py-2 bg-white dark:bg-[rgba(30,30,30,1.5)] rounded-lg shadow-xl flex flex-col justify-center items-center gap-y-8 fixed">
        <X size={24} onClick={onClose} className="absolute right-5 top-4 text-gray-600 dark:text-gray-300 cursor-pointer"/>
        {/* <button onClick={onClose} className="absolute right-5 top-6 text-gray-600 dark:text-gray-300">
          关闭
        </button> */}
        <h1 className="text-gray-700 dark:text-gray-300 text-lg font-bold">请输入取件码</h1>
        <input
          type="number"
          ref={inputRef}
          onChange={(e) => {
            setCodeInput(Number(e.target.value));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              console.log("Escape")
              onClose();
            }
            if (e.key === "Enter") {
              receive();
            } 
          }}
          value={codeInput === 0 ? "" : codeInput}
          className="h-[80px] xs:w-[280px] w-[180px] text-5xl text-center outline-none border-b-2 bg-white dark:bg-[rgba(30,30,30,1.5)] focus:border-blue-500 text-blue-600 font-bold"
        />
        <button
          onClick={receive}
          className="relative inline-flex items-center justify-center w-[60px] xs:w-[90px] h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default CodeModal;
