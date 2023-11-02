import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import "dotenv/config";
import { findOrCreate } from "../../controllers/userController";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
  },

  async (
    req: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) => {
    if (profile) {
      let user = findOrCreate(
        profile.id,
        profile.displayName,
        `${profile.username}@fake.com`,
        profile.username
      );
      if (user) {
        done(null, user);
      } else {
        done({ message: "User not found" }, null);
      }
    } else {
      done(null, null);
    }
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
