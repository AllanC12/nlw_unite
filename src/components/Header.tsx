import React from 'react'
import nlwUniteIcon from '../assets/nlwUniteIcon.svg'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='flex items-center gap-5 py-2'>
        <img src={nlwUniteIcon} alt="icone" />
        
        <nav className='flex items-center gap-5'>
            <a href="" className="font-medium text-sm text-zinc-300">Eventos</a>
            <a href="" className="font-medium text-sm">Participantes</a>
        </nav>
    </div>
  )
}

export default Header