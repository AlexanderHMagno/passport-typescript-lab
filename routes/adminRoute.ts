import express from "express";
import { ensureAdmin } from "../middleware/checkAuth";

const router = express.Router();

router.get("/", ensureAdmin, (req, res) => {
  if (req.sessionStore.all) {
    //create sessionBody
    const sessionBody: { [key: string]: any } = {};
    req.sessionStore.all((err, sessions) => {
      if (sessions) {
        const activeSessions = Array.from(Object.entries(sessions));
        activeSessions.forEach((element) => {
          const [keys, values] = element;
          sessionBody[keys] = values.passport?.user;
        });
      }

      return res.render("admin", {
        user: req.user,
        sessions: sessionBody,
      });
    });
  }
});

router.get("/revoke/:data", ensureAdmin, (req, res) => {
  req.sessionStore.destroy(req.params.data);
  res.redirect("/admin");
});

export default router;
