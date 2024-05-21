import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { ArrowLeft, Download } from "lucide-react";
import { ParamData } from "@/types";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import Image from "next/image";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ParamData;
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
        <div className="xs:w-[480px] w-4/5 h-2/6 xs:h-2/5 px-4 py-2 bg-white dark:bg-[rgba(30,30,30,1.5)] rounded-lg shadow-xl flex flex-col justify-center items-center relative">
          {data?.type === 1 ? (
            <Download
              size={23}
              className="absolute flex right-3 top-3 cursor-pointer"
              onClick={() => downloadFile(data?.value)}
            />
          ) : null}
          <div className="py-5">
            <ArrowLeft
              size={23}
              onClick={onClose}
              className="absolute left-3 top-3 text-gray-600 dark:text-gray-300 cursor-pointer"
            />
          </div>
          {data?.type === 1 &&
          ["jpeg", "jpg", "png", "bmp", "gif", "tiff", "svg", "webp"].some(
            (word) => data?.value.toLowerCase().includes(word)
          ) ? (
            <Image src={data?.value} alt={data?.key} sizes="100vw" width={100} height={80} className="w-[85%] h-[75%] rounded-md"/>
          ) : (
            <CopyToClipboard text={data?.value} onCopy={handleCopy}>
              {/* <h1 className="text-4xl">{data?.value}</h1> */}
              {data?.value.length > 20 ? (
                <textarea
                  name="code"
                  id="code"
                  value={data.value}
                  rows={20}
                  readOnly
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      console.log("Esc");
                      onClose();
                    }
                  }}
                  className="w-full pt-4 pl-4 border-none rounded-md outline-none resize-none text-gray-700 dark:text-gray-100 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] cursor-pointer"
                ></textarea>
              ) : (
                <pre className="w-full text-lg flex items-center justify-center text-gray-700 dark:text-gray-100 overflow-hidden text-ellipsis cursor-pointer">
                  {data?.value}
                </pre>
              )}
            </CopyToClipboard>
          )}
          <p
            className="m-3 text-gray-400 cursor-pointer hover:underline hover:text-blue-300"
            onClick={() => {
              'clipboard' in navigator ? 
              navigator.clipboard.writeText(data?.value) : copyToClipboard(data?.value)
              toast.success("复制成功");
            }}
          >
            提取成功，点击复制{data?.type === 1 ? "链接" : "文本"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ContentModal;
