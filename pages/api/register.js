export default async function handle(req, res) {
  return res.status(403).json({
    error: true,
    message: 'Registration is currently closed.',
  });
}
