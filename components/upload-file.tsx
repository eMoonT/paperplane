import { Trash2, Send, CurlyBraces } from "lucide-react";
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
}

interface UploadFileProps {
  isUpload: boolean;
}
export const UploadFile: React.FC<UploadFileProps> = ({ isUpload }) => {
  const [fileList, setFileList] = useState<newUploadFileType[]>([]);
  // const [isDownload, setIsDownload] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/v1/upload",
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
      downloadIcon: <Send size={16} className="mt-2 hover:text-orange-400" />,
      showRemoveIcon: true,
      removeIcon: <Trash2 size={16} className="mt-2 hover:text-red-800" />,
    },
    async onDownload(file: newUploadFileType) {
      code = await generateCode();
      const url = file.response.url;

      const data = {
        code,
        text: url,
        expire: 7,
        type: 1,
      };
      await axios.post(`/api/v1/${code}`, data);

      // const newFileList: newUploadFileType[] = fileList.map((item)=>{
      //   item.uid === file.uid ? item.isDownload = false : null
      //   return item
      // })
      // setFileList(newFileList);
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
        <p className="dark:text-gray-100 h-[200px] w-[280px] xs:h-[200px] xs:w-[420px] flex items-center justify-center">
          点击或拖动文件至此处上传
        </p>
      </Dragger>
    </div>
  );
};
