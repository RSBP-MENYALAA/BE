import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../model/AuthModel";
import { Request } from "express";

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['accessToken'];
  }
  return token;
}

const opt = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: process.env.JWT_SECRET as string,
};

const jwtStrategy = new Strategy(opt, async (payload, done) => {
    const userData = await UserRepository.findById(payload.userId);

    const user = {
      id: userData?.id,
      name: userData?.name,
    } as User;

    if (user) {
      return done(null, user);
    } 

    return done(null, false);
  },
)

export { jwtStrategy };

  