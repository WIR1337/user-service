import { FC } from "react"
import { Setter } from "../types/components"

interface PagesProps {
  currentPage:number
  totalPages: number
  setPage: Setter<number>
}

const Pages:FC<PagesProps> = ({currentPage,totalPages,setPage}) => {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setPage(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pages