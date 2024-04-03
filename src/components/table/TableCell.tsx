import { ComponentProps } from 'react'

interface TableCellProps extends ComponentProps<'td'>{}

const TableCell= (props: TableCellProps) => {
  return (
    <td {...props} className="py-3 px-4 text-sm text-zinc-300"/>
  )
}

export default TableCell