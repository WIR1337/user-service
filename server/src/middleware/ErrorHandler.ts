import { ClientError } from "../utils/ClientErrors"
export const ErrorHandler = (err, req, res, next) => {
	if (err instanceof ClientError){
        return res.status(err.status).json({message: err.message, errors:err.errors})
    }
    return res.status(500).json({message:'Internal Server Error'})
}