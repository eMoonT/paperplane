import { DataTable } from "@/components/data-table"
import { KeysColumn,columns } from "./columns"


interface KeysTableProps {
  data: KeysColumn[]
}

const KeysTable:React.FC<KeysTableProps> = ({data}) => {
  return (
    <DataTable columns={columns} data={data} searchKey="name" />
  )
}

export default KeysTable;