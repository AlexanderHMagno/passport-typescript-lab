import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  //@ts-ignore
  console.log("session", req.session);
  //@ts-ignore
  console.log(req.session?.passport);

  res.render("login", {
    //@ts-ignore
    message: req.session.messages,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: "Couldn't find a user with this information",
  })
);

//Callback from Github
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
    successRedirect: "/dashboard",
    failureMessage: "It was not possible to log in",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

//Send request to GITHUB
router.get(
  "/github",
  forwardAuthenticated,
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
