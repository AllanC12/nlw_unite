import { useState,useEffect } from "react";

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

import { attendees } from "../data/attendee";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const AttendeeList = () => {

  const [page,setPage] = useState<number>(1)
  const totalPages = Math.ceil(attendees.length) / 10

  useEffect(() => {
    fetch('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
  },[page]) 

  const goToPrevPage = () => {
    setPage(page - 1)
  }

  const goToNextPage = () => {
    setPage(page + 1)
  }

  const goToLastPage = () => {
    setPage(totalPages)
  }
  const goToFirstPage = () => {
    setPage(1)
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-2 border w-72 border-white/10 bg-transparent rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            type="text"
            placeholder="Buscar participante..."
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
        {attendees.slice((page - 1) * 10 , page * 10).map((attendee) => {
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
                  {dayjs().to(attendee.checkIn)}
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
              Mostrando 10 de {attendees.length} itens
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
