import { DataTable } from "@/components/data-table"
import { KeysColumn,columns } from "./columns"
import { newKeysItemList } from "@/types"


interface KeysTableProps {
  data: newKeysItemList[]
}

const KeysTable:React.FC<KeysTableProps> = ({data}) => {
  return (
    <DataTable columns={columns} data={data} searchKey="name" />
  )
}

export default KeysTable;