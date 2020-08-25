import { rule, shield, not } from "graphql-shield";
import { getUserFromToken } from "../utils/auth";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const authorization = ctx.req.headers["authorization"];

    if (!authorization) {
      return false;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return false;
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return false;
    }

    ctx.user = user;

    return true;
  }
);

export default shield(
  {
    Query: {
      user: isAuthenticated,
    },
  },
  { allowExternalErrors: true }
);
