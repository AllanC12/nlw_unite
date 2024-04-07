import { useState,useEffect, ChangeEvent } from "react";

import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import IconButton from "./IconButton";
import Table from "./table/Table";
import TableHeader from "./table/TableHeader";
import TableCell from "./table/TableCell";
import TableRow from "./table/TableRow";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
  id: number
  email: string
  name: string
  createdAt: string
  checkedInAt: string | null
}

const AttendeeList = () => {
  const [attendees,setAttendees] = useState<Attendee[]>([])
  const [total,setTotal] = useState<number>(0)
  const [page,setPage] = useState<number>(() => {
    const url = new URL(window.location.toString())
    if(url.searchParams.has('page')){
      return Number(url.searchParams.get('page'))
    }
    return 1
  })
  const [search,setSearch] = useState<string>(() => {
    const url = new URL(window.location.toString())
    if(url.searchParams.has('search')){
      return url.searchParams.get('search') ?? ''
    }
    return ''
  })
  const totalPages = Math.ceil(total  / 10)


  useEffect(() => {
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

    url.searchParams.set('pageIndex',String(page - 1))
    if(search.length > 0){
      url.searchParams.set('query',search)
    }

    fetch(url).then(response => response.json()).then((data) => {
      setAttendees(data.attendees)
      setTotal(data.total)
    })
  },[page, search]) 

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString())

    url.searchParams.set('page',String(page))

    window.history.pushState({},"",url)

    setPage(page)
  }

  const setCurrentSearch = (search: string) => {
    const url = new URL(window.location.toString())

    url.searchParams.set('search',search)

    window.history.pushState({},"",url)

    setSearch(search)
  }

  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  const goToPrevPage = () => {
    setCurrentPage(page - 1)
  }

  const goToNextPage = () => {
    setCurrentPage(page + 1)
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages)
  }
  const goToFirstPage = () => {
    setCurrentPage(1)
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-2 border w-72 border-white/10 bg-transparent rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            type="text"
            placeholder="Buscar participante..."
            onChange={onSearchInputChanged}
            value={search}
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        {attendees.map((attendee) => {
          return (
            <tbody key={attendee.id}>
              <TableRow className="border-b border-white/10">
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border-white/10"
                  />
                </TableCell>
                <TableCell>
                  {attendee.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {dayjs().to(attendee.createdAt)}
                </TableCell>
                <TableCell>
                  {attendee.checkedInAt === null
                   ? <span className='text-zinc-400'>Não fez check-in</span>
                   : dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell>
                  <IconButton
                    transparent
                    className="bg-black/20 border border-white/10 rounded-md p-1.5"
                  >
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </tbody>
          );
        })}

        <tfoot>
          <TableRow>
            <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell
              className="py-3 px-4 text-sm text-zinc-300 text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8">
                <span> Página {page} de {totalPages} </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1} className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPrevPage} disabled={page === 1}  className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages} className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages} className="bg-white/10 border border-white/10 rounded-md p-1.5">
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
};

export default AttendeeList;
