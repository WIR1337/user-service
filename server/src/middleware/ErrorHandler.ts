import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { ClientError } from "../utils/ErrorGenerator.utils"
export const ErrorHandler = (err, req, res, next) => {
	if (err instanceof ClientError){
        return res.status(err.status).json({message: err.message, errors:err.errors})
    } else if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
        return res.status(401).json({message: err.message})
    }

    return res.status(500).json({message:'Internal Server Error'})
}