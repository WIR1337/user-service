import { FC } from "react"
import { Action } from "../types/components"

const SocketMessges:FC<{socketMessages: Action[]}> = ({socketMessages}) => {
  return (
    <div>
      {socketMessages.map(msg => {
        return (
          <div>{JSON.stringify(msg)}</div>
        )
      })}
    </div>
  )
}

export default SocketMessges