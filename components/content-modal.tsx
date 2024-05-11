import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const handleCopy = () => {
    toast.success("复制成功");
  };
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isOpen ? "bg-gray-900 bg-opacity-75" : "hidden"
        }`}
      >
        <div className="xs:w-[480px] w-4/5 h-3/6 p-2 bg-white dark:bg-[rgba(30,30,30,1.5)] rounded-lg shadow-xl flex flex-col justify-center items-center fixed">
          <div className="py-5">
            <button
              onClick={onClose}
              className="absolute left-4 top-4 text-gray-600 dark:text-gray-300"
            >
              {`< `}返回
            </button>
          </div>
          <CopyToClipboard text={data?.value} onCopy={handleCopy}>
            {/* <h1 className="text-4xl">{data?.value}</h1> */}
            {String(data?.value).length > 50 ? (
              <textarea
                name="code"
                id="code"
                value={data?.value}
                rows={20}
                readOnly
                className="w-full pt-8 pl-4 border-none outline-none resize-none text-gray-700 dark:text-gray-100 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] cursor-pointer"
              ></textarea>
            ) : (
              <pre className="text-2xl text-gray-700 dark:text-gray-100">{data?.value}</pre>
            )}
          </CopyToClipboard>
          <p className="m-3 text-gray-400">提取成功，点击复制文字</p>
        </div>
      </div>
    </>
  );
};

export default ContentModal;
