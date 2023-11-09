import { FC } from "react"
import { ActionsWithPage, Setter } from "../types/components"
interface FilterProps{
  setCurrentPage: Setter<number>
  setUserId: Setter<number | undefined>
  setActions: Setter<ActionsWithPage[]>
}
const Filter:FC<FilterProps> = ({setCurrentPage,setUserId,setActions}) => {
  function handleFilter(user_id:string,page:number,setCurrentPage:Setter<number>, setUserId:Setter<number|undefined>){
    setActions([])
    setUserId(Number(user_id))
    setCurrentPage(1)
  }
  return (
    <div>
      <label htmlFor="filter">Find by User_ID: </label>
      <input
        id="filter"
        type="number"
        onChange={(e) =>
          handleFilter(e.target.value,1,setCurrentPage,setUserId)
        }
      />
    </div>
  )
}

export default Filter