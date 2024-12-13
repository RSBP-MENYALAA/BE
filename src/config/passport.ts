import passport from "passport";
import { jwtStrategy } from "../strategy/jwt-strategy";

passport.use('jwt', jwtStrategy);

export { passport };