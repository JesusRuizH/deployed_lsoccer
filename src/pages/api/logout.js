import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000/login');
});
