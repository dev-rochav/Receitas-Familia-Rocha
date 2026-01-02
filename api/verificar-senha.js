export default function handler(req, res) {
  if (req.body.senha === process.env.FAMILY_PASSWORD) {
    return res.status(200).json({ ok: true });
  }
  res.status(401).json({ ok: false });
}
