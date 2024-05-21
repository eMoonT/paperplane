import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { ArrowLeft, Share2 } from "lucide-react";
import QRCode from "qrcode.react";
import { getKey } from "@/actions/get-key";
import Link from "next/link";
import { copyToClipboard } from "@/lib/utils";

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: number;
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, code }) => {
  const [isShare, setIsShare] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");

  const handleShare = async () => {
    const { url } = await getKey(String(code));
    setShareUrl(url!);
    setIsShare(!isShare);
  };

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
        <div className="xs:w-[480px] w-4/5 h-2/6 xs:h-2/5 px-2 py-4 bg-white dark:bg-[rgba(30,30,30,1.5)] rounded-lg shadow-xl flex flex-col justify-center items-center fixed ">
          <ArrowLeft
            size={23}
            onClick={onClose}
            className="absolute left-4 top-4 text-gray-600 dark:text-gray-300 cursor-pointer"
          />
          <Share2
            size={23}
            onClick={handleShare}
            className="absolute right-4 top-4 text-gray-600 dark:text-gray-300 cursor-pointer"
          />
          {!isShare ? (
            <div className="flex flex-col items-center justify-center space-y-5">
              <CopyToClipboard text={String(code)} onCopy={handleCopy}>
                <h1 className="text-6xl file items-center justify-center text-gray-700 dark:text-gray-100 cursor-pointer">
                  {code}
                </h1>
              </CopyToClipboard>
              <p
                className="m-3 text-gray-400 cursor-pointer xs:text-lg text-sm"
                onClick={() => {
                  "clipboard" in navigator
                    ? navigator.clipboard.writeText(String(code))
                    : copyToClipboard(String(code));
                  toast.success("复制成功");
                }}
              >
                发送成功，点击保存提取码
              </p>
            </div>
          ) : (
            <div>
              {!!shareUrl && (
                <div className="flex flex-col justify-center items-center space-y-0 xs:space-y-5">
                  <QRCode value={shareUrl} size={200} className="xs:p-0 p-8" />
                  <Link href={shareUrl} className="text-sm xs:text-xl">
                    {shareUrl}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkModal;
