import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: number 
}

const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  code,
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
        <div className="w-[480px] h-3/6 p-2 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center fixed ">
          <button onClick={onClose} className="absolute left-4 top-6">{'< '}返回</button>
          <CopyToClipboard text={code.toString()} onCopy={handleCopy}>
            <h1 className="text-6xl text-black">{code}</h1>
          </CopyToClipboard>
          <p className="m-3">发送成功，点击保存提取码</p>
        </div>
      </div>
    </>
  );
};

export default LinkModal;
