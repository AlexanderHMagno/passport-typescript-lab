import express from "express";
import { ensureAdmin } from "../middleware/checkAuth";

const router = express.Router();

router.get("/", ensureAdmin, (req, res) => {
  //Get current sessions
  //@ts-ignore
  const currentSessions = Object.entries(req.sessionStore.sessions);

  //create sessionBody
  const sessionBody = {};

  currentSessions.forEach((element) => {
    //@ts-ignore
    sessionBody["" + element[0]] = JSON.parse(element[1]).passport?.user;
  });

  res.render("admin", {
    user: req.user,
    sessions: sessionBody,
  });
});

router.get("/admin/revoke/:data", ensureAdmin, (req, res) => {
  req.sessionStore.destroy(req.params.data);
  res.redirect("/admin");
});

export default router;
