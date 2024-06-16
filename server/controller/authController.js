const authService = require("../services/auth-sevice.js");
class Authorisation {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const candidateData = await authService.login(email, password);
      console.log(candidateData);
      // res.cookie("refreshToken", candidateData.refreshToken, {
      //   path: "/",
      //   // secure: false, только для https
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   //sameSite: "lax",
      //});
      // res.setHeader("Set-Cookie", [
      //   `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${
      //     60 * 60
      //   }; Secure=false;`,
      //   `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
      //     60 * 60 * 24 * 7 * 2
      //   }; Secure=false;`,
      // ]);
      //return res.json({ candidateData, message: "вы вошли" });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new Authorisation();
