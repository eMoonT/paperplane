"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type KeysColumn = {
  name: string;
  content: string;
  expireTime: string;
  type?: number;
};

export const columns: ColumnDef<KeysColumn>[] = [
  {
    accessorKey: "name",
    header: "Key",
  },
  {
    accessorKey: "content",
    header: "Value",
    cell: ({ row }) =>
      row.original.type === 1 &&
      ["jpeg", "jpg", "png", "bmp", "gif", "tiff", "svg", "webp"].some((word) =>
        row.original.content.includes(word)
      ) ? (
        <img
          src={row.original.content}
          className="w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px] bg-cover bg-center"
        />
      ) : row.original.content.length > 100 ? (
        <pre className="w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px] overflow-hidden text-ellipsis">
          {row.original.content /*.substring(0, 100) + "..."*/}
        </pre>
      ) : (
        <pre className="w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px]">
          {row.original.content}
        </pre>
      ),
  },
  {
    accessorKey: "expireTime",
    header: "过期时间",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      return (
        Number(new Date(rowA.getValue("expireTime"))) -
        Number(new Date(rowB.getValue("expireTime")))
      );
    },
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
