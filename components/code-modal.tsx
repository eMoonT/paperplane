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
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "bg-gray-900 bg-opacity-75" : "hidden"
      }`}
    >
      <div className="w-[480px] h-3/6 p-2 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center gap-y-8 fixed">
        <button onClick={onClose} className="absolute right-5 top-6">
          关闭
        </button>
        <h1>请输入取件码</h1>
        <input
          type="number"
          onChange={(e) => {
            setCodeInput(Number(e.target.value));
          }}
          value={codeInput === 0 ? "" : codeInput}
          className="h-[80px] w-[280px] text-5xl text-center outline-none border-b-2 text-blue-600 font-bold"
        />
        <button
          onClick={receive}
          className="relative inline-flex items-center justify-center w-[90px] h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default CodeModal;
