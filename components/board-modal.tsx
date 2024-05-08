interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  clipboardData: string;
  setClipboardData: (data: string) => void;
  sendMessage: () => void;
}

const BoardModal: React.FC<BoardModalProps> = ({
  isOpen,
  onClose,
  clipboardData,
  setClipboardData,
  sendMessage,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOpen ? "bg-gray-900 bg-opacity-75" : "hidden"
        }`}
      >
        <div className="w-[480px] h-3/6 p-2 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center fixed">
          {/* 模态框内容 */}
          <button onClick={onClose} className="absolute right-5 top-6">
            关闭
          </button>
          <h1>发送文件</h1>
          <textarea
            name="t1"
            id="t1"
            onChange={(e) => {
              setClipboardData(e.target.value);
            }}
            value={clipboardData}
            className="h-4/5 w-full outline-none resize-none"
          ></textarea>
          <button
            onClick={sendMessage}
            className="relative inline-flex items-center justify-center w-[90px] h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            发送
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardModal;
