"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useState } from "react";
import { MultipleDelete } from "@/actions/multiple-delete";
import { useRouter } from "next/navigation";
import { AlterModal } from "./alter-modal";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newKeysItemList } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value)

//   // Store the itemRank info
//   addMeta({
//     itemRank,
//   })

//   // Return if the item should be filtered in/out
//   return itemRank.passed
// }

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  // const storeMultipleDelete = useStoreKeys((state) => state.multipleDelete);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // filterFns: {
    //   fuzzy: fuzzyFilter
    // },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      rowSelection,
    },
    // enableGlobalFilter: true,
    // enableColumnFilters: true,
    // globalFilterFn: 'fuzzy',
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (ids: string[]) => MultipleDelete(ids),
    onSuccess: () => {
      toast.success("删除成功!");
      setOpen(false);
      // storeMultipleDelete(Object.keys(rowSelection));
      setRowSelection({});
      router.refresh();
      router.push(`/admin`);
    },
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["keys"] });
      const prevData = await queryClient.getQueryData(["keys"]);
      console.log(prevData)
      ids.forEach((id) => {
        console.log(id)
        queryClient.setQueryData(["keys"], (oldData: newKeysItemList[]) => {
          return oldData.filter((item: newKeysItemList) => item.id !== Number(id));
        });
      });
      return { prevData };
    },
    onError: (error, variables, context) => {
      console.error("mutate: ", error)
      queryClient.setQueryData(["keys"], context?.prevData);
    }
  });

  // const handlerAlldel = () => {
  //   MultipleDelete(Object.keys(rowSelection));
  //   storeMultipleDelete(Object.keys(rowSelection));
  //   setRowSelection({});
  //   setOpen(false);
  //   toast.success("删除成功");
  //   router.refresh();
  //   router.push(`/admin`);
  // };

  return (
    <div>
      <AlterModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={()=>mutate(Object.keys(rowSelection))}
      />
      <div className="w-full flex justify-between border shadow-sm rounded-md items-center p-4 mb-2">
        {/* <span className="text-sm xs:text-md">总数量：{data.length}</span> */}
        <Input
          placeholder="搜索"
          // value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          value={globalFilter ?? ""}
          onChange={(e) =>
            // table.getColumn(searchKey)?.setFilterValue(event.target.value)
            setGlobalFilter(e.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {
                            { asc: "️▲", desc: "️▼" }[
                              (header.column.getIsSorted() as string) ?? null
                            ]
                          }
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  没有数据.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          {Object.keys(rowSelection).length}/
          {table.getPreFilteredRowModel().rows.length} 行被选择
          <Button
            variant="destructive"
            size="sm"
            className="ml-5"
            onClick={() => setOpen(true)}
          >
            删除
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
