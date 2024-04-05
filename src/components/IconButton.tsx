import { ComponentProps } from "react"

import { twMerge } from "tailwind-merge"

interface Props extends ComponentProps<'button'>{
    transparent?: boolean
}

const IconButton = ({transparent,...props}: Props) => {
  return (
    <button {...props} 
    className={twMerge(
      "bg-black/20 border border-white/10 rounded-md p-1.5",
      transparent ? 'bg-black/20' : 'bg-black/10',
      props.disabled ? 'opacity-50' : null
    )}
    />
  )
}

export default IconButton