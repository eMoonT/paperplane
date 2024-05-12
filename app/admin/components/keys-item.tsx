import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { KeysItemList } from "@/types";
import toast from "react-hot-toast";

interface KeysItemProps {
  data: KeysItemList[];
  deleteKey: (key: string) => void;
}

const KeysItem: React.FC<KeysItemProps> = ({ data, deleteKey }) => {

  return (
    <Table>
      {data.length === 0 && <TableCaption>暂时没有数据</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead className="">Key</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>过期时间</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-medium">{item.name}</TableCell>
            {item.metadata === undefined ? (
              <>
                <TableCell>null</TableCell>
                <TableCell>null</TableCell>
              </>
            ) : (
              <>
                <TableCell>
                  {item.metadata.content.length < 20 
                    ? <pre>{item.metadata.content}</pre>
                    : item.metadata.content.substring(0,20)+"..."}
                </TableCell>
                <TableCell>
                  {item.metadata.expireTime === undefined
                    ? "永久"
                    : item.metadata.expireTime}{" "}
                </TableCell>
              </>
            )}
            <TableCell className="text-right">
              {/* <Button size="icon" variant="default" className="outline-none">查看</Button> */}
              <Button onClick={() => deleteKey(item.name)} variant="destructive" size="sm" className="outline-none">
                删除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KeysItem;
