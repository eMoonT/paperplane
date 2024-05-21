import { ColumnDef, FilterFn } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Checkbox } from "antd";
import Image from "next/image";

// import {
//   RankingInfo,
// } from '@tanstack/match-sorter-utils'

// declare module '@tanstack/react-table' {
//   //add fuzzy filter to the filterFns
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo
//   }
// }

export type KeysColumn = {
  name: string;
  content: string;
  expireTime: string;
  type?: number;
  id?: number;
};

export const columns: ColumnDef<KeysColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Key",
    // filterFn: 'includesString',
  },
  {
    accessorKey: "content",
    header: "Value",
    cell: ({ row }) =>
      row.original.type === 1 &&
      ["jpeg", "jpg", "png", "bmp", "gif", "tiff", "svg", "webp"].some((word) =>
        row.original.content.includes(word)
      ) ? (
        <Image src={row.original.content} alt={row.original.name} sizes="100vw" width={200} height={400} className="w-[200px] md:w-[400px] rounded-md" />
      ) : row.original.content.length > 25 ? (
        <pre className="w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px] overflow-hidden text-ellipsis">
          {row.original.content /*.substring(0, 100) + "..."*/}
        </pre>
      ) : (
        <pre className="w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px]">
          {row.original.content}
        </pre>
      ),
    // filterFn: 'includesString',
  },
  {
    accessorKey: "expireTime",
    header: "过期时间",
    enableSorting: true,
    cell: ({ row }) => <div className="min-w-[100px]">{ row.original.expireTime }</div>,
    sortingFn: (rowA, rowB) => {
      return (
        Number(new Date(rowA.getValue("expireTime"))) -
        Number(new Date(rowB.getValue("expireTime")))
      );
    },
    // filterFn: 'includesString',
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
