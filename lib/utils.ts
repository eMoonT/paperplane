import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

// 模拟浏览器下载
export const downloadFile = (fileUrl: string) => {
  try {
    const fileName = fileUrl.split("/").pop() as string;
    let a = document.createElement("a");
    a.href = fileUrl + "?response-content-type=application/octet-stream";
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    toast.error("下载失败!");
  }
};

export const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    
    const selected =
        document.getSelection()!.rangeCount > 0 ? document.getSelection()?.getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (selected) {
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(selected);
    }
};