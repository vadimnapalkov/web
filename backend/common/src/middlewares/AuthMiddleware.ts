import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@backend/gateway'

const bearerRegex = /^Bearer\s/

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    const auth = req.headers.authorization
    if (auth && bearerRegex.test(auth)) {
      const token = auth.replace(bearerRegex, '')
      try {
        const user = jwt.verify(token, JWT_SECRET)

        req.user = user
      } catch (err) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
      }
    }
    next()
  }
}
