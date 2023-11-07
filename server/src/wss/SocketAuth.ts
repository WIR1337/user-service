import { NextFunction } from "express";
import { Socket } from "socket.io";
import { role } from "../types/user.js";
import JWT from "../utils/jwt.utils.js";
import { SocketError } from "./Errors.js";

export const validateRole = (requiredRole: role) => {
  return function (socket: Socket, next: NextFunction) {
    try {
      const { token } = socket.handshake.auth;

      if (!token) {
        throw SocketError.unAuth()
      }
      
      const { role } = JWT.getPayLoad(token);
      const UserHasPermission = role === requiredRole;

      if (!UserHasPermission) {
        throw SocketError.noPermission()
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
