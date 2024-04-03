import { ComponentProps } from 'react'

interface TableHeadersProps extends ComponentProps<'th'>{}

const TableHeader = (props: TableHeadersProps) => {
  return (
    <th {...props} className="py-3 px-4 text-sm font-semibold text-left"/>
  )
}

export default TableHeader