import { Trash2, Send } from "lucide-react";
import type { UploadProps, UploadFile as UploadFileType } from "antd";
import { Upload } from "antd";
import { generateCode } from "@/actions/get-code";
import axios from "axios";
import LinkModal from "./link-modal";
import { useState } from "react";

const { Dragger } = Upload;
let code: number;

type newUploadFileType = UploadFileType & {
  isDownload?: boolean;
};

interface UploadFileProps {
  isUpload: boolean;
  expire: number;
}
export const UploadFile: React.FC<UploadFileProps> = ({ isUpload, expire }) => {
  const [fileList, setFileList] = useState<newUploadFileType[]>([]);
  // const [isDownload, setIsDownload] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/v1/upload",
    data: {expire: String(expire)},
    onChange(info) {
      let newFileList = [...info.fileList] as newUploadFileType[];
      newFileList = newFileList.slice(-5);

      newFileList = newFileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      setFileList(newFileList);
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: (
        <Send
          size={16}
          className="mt-2 dark: text-gray-500 hover:text-orange-400"
        />
      ),
      showRemoveIcon: true,
      removeIcon: (
        <Trash2
          size={16}
          className="mt-2 dark: text-gray-500 hover:text-red-800"
        />
      ),
    },
    async onDownload(file: newUploadFileType) {
      code = await generateCode();
      const url = file.response.url;

      const data = {
        code,
        text: url,
        expire,
        type: 1,
      };
      await axios.post(`/api/v1/${code}`, data);

      setIsOpen(!isOpen);
    },
    onDrop() {
      console.log("first");
    },
  };

  return (
    <div>
      <LinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} code={code} />
      <Dragger
        {...props}
        fileList={fileList}
        className={isUpload ? "" : "hidden"}
      >
        <p className="dark:text-gray-100 pl-7 xs:pl-0 h-[200px] w-[200px] xs:h-[200px] xs:w-[420px] flex items-center justify-center">
          点击或拖动文件至此处上传
        </p>
      </Dragger>
    </div>
  );
};
