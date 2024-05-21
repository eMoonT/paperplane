"use client";

import { getKey } from "@/actions/get-key";
import { useQuery } from "@tanstack/react-query";
import QRCode from "qrcode.react";
import { Clipboard, Download } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ParamData } from "@/types";
import { cn, copyToClipboard, downloadFile } from "@/lib/utils";
import Image from "next/image";

export const runtime = "edge";

const Show = ({ params }: { params: { key: string } }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  let { data } = useQuery({
    queryKey: ["key", params.key],
    queryFn: () => getKey(params.key),
  });

  data = data as unknown as ParamData;

  const handleCopy = () => {
    "clipboard" in navigator
      ? navigator.clipboard.writeText(data?.value!)
      : copyToClipboard(data?.value!);
    toast.success("复制成功");
  };

  return (
    <div className="h-screen xs:mt-0 mt-5 xs:px-0 px-6 bg-white flex justify-center items-center">
      <div>
        {loading ? (
          <div className="flex flex-col justify-center items-center bg-gray-50 xs:shadow-md shadow-lg rounded-md">
            <div className="max-w-screen-lg mx-auto p-4 space-y-5 xs:mt-0 mt-10">
              <div className="flex flex-col justify-center items-center">
                {data?.url ? (
                  <QRCode
                    value={data?.url}
                    size={300}
                    className="bg-gray-100 shadow-md rounded-md p-8"
                  ></QRCode>
                ) : null}
                <h1 className="flex items-start">
                  <div className="xs:text-md text-sm text-gray-400">
                    {data?.url ?? "没有分享链接"}
                  </div>
                </h1>
              </div>
              {data?.value ? (
                <div className="relative">
                  {data?.type === 1 ? (
                    <Download
                      size={20}
                      onClick={() => downloadFile(data?.value)}
                      className={cn(
                        "absolute xs:right-5 xs:top-5 right-3 top-3 text-gray-500 cursor-pointer z-10",
                        !loading ? "hidden" : ""
                      )}
                    />
                  ) : (
                    <Clipboard
                      size={18}
                      onClick={handleCopy}
                      className={cn(
                        "absolute xs:right-5 xs:top-5 right-3 top-3 text-gray-500 cursor-pointer z-10",
                        !loading ? "hidden" : ""
                      )}
                    />
                  )}
                  {data?.type === 1 &&
                  [
                    "jpeg",
                    "jpg",
                    "png",
                    "bmp",
                    "gif",
                    "tiff",
                    "svg",
                    "webp",
                  ].some((word) => data?.value.toLowerCase().includes(word)) ? (
                    <Image
                      src={data?.value}
                      alt={data.key}
                      sizes="100vw"
                      width={200}
                      height={400}
                      className="w-[300px] md:w-[400px] rounded-md"
                    />
                  ) : (
                    <div className="overflow-hidden flex justify-center items-center">
                      <pre className="relative overflow-auto border rounded-md bg-gray-150 p-4 w-[300px] xs:w-[400px] md:w-[500px] lg:w-full whitespace-pre-line">
                        <code className="xs:text-md text-xs xs:w-full xs:p-2 p-0">
                          {data?.value}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <span className="p-20 xs:text-sm text-xs">
                  暂时还没有数据写入
                </span>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Show;
