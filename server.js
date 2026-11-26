/* ==========================================================================
   DILENA RASA GAMANA: REVIEWS SERVER (Node.js + Express + MongoDB)
   - Serves the website AND the reviews API from one place.
   - Customers: GET /api/reviews (approved ones), POST /api/reviews
   - You (admin, needs the x-admin-key header = ADMIN_KEY in .env):
       GET    /api/admin/reviews           all reviews, including hidden ones
       PATCH  /api/admin/reviews/:id       body {"approved":true|false}
       DELETE /api/admin/reviews/:id
   ========================================================================== */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dilena';
const ADMIN_KEY = process.env.ADMIN_KEY || '';
// true  = new reviews show immediately.  false = you approve each review first.
const AUTO_APPROVE = (process.env.AUTO_APPROVE || 'true') === 'true';

const app = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json({ limit: '10kb' }));

/* ----- Database ----- */
const Review = mongoose.model('Review', new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 40 },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  comment:   { type: String, required: true, trim: true, maxlength: 300 },
  approved:  { type: Boolean, default: AUTO_APPROVE },
  createdAt: { type: Date, default: Date.now }
}));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });

/* ----- Simple spam limit: 5 reviews per hour per visitor ----- */
const hits = new Map();
setInterval(() => hits.clear(), 60 * 60 * 1000).unref();
const limit = (req, res, next) => {
  const n = (hits.get(req.ip) || 0) + 1;
  hits.set(req.ip, n);
  if (n > 5) return res.status(429).json({ error: 'Too many reviews, try again later' });
  next();
};

const publicView = r => ({ _id: r._id, name: r.name, rating: r.rating, comment: r.comment, approved: r.approved, createdAt: r.createdAt });

/* ----- Customer routes ----- */
app.get('/api/reviews', async (req, res) => {
  try {
    const list = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(100);
    res.json(list.map(publicView));
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

app.post('/api/reviews', limit, async (req, res) => {
  try {
    const { name, rating, comment, website } = req.body || {};
    if (website) return res.status(201).json({ approved: false });   // hidden spam-trap field was filled: pretend OK, save nothing
    const r = Number(rating);
    if (typeof name !== 'string' || typeof comment !== 'string' || !name.trim() || !comment.trim() || !Number.isInteger(r) || r < 1 || r > 5)
      return res.status(400).json({ error: 'Invalid review' });
    const doc = await Review.create({ name: name.trim().slice(0, 40), rating: r, comment: comment.trim().slice(0, 300) });
    res.status(201).json(publicView(doc));
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

/* ----- Admin routes (protected by ADMIN_KEY) ----- */
const admin = (req, res, next) => {
  if (!ADMIN_KEY || req.get('x-admin-key') !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
};
app.get('/api/admin/reviews', admin, async (req, res) => {
  res.json(await Review.find().sort({ createdAt: -1 }));
});
app.patch('/api/admin/reviews/:id', admin, async (req, res) => {
  try {
    const d = await Review.findByIdAndUpdate(req.params.id, { approved: !!req.body.approved }, { new: true });
    d ? res.json(d) : res.status(404).json({ error: 'Not found' });
  } catch (e) { res.status(400).json({ error: 'Bad id' }); }
});
app.delete('/api/admin/reviews/:id', admin, async (req, res) => {
  try {
    const d = await Review.findByIdAndDelete(req.params.id);
    d ? res.json({ ok: true }) : res.status(404).json({ error: 'Not found' });
  } catch (e) { res.status(400).json({ error: 'Bad id' }); }
});

/* ----- Website files (only these folders, so .env stays private) ----- */
['css', 'js', 'images', 'videos'].forEach(d => app.use('/' + d, express.static(path.join(__dirname, d))));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/stores.html', (req, res) => res.sendFile(path.join(__dirname, 'stores.html')));
app.get('/order.html', (req, res) => res.sendFile(path.join(__dirname, 'order.html')));

app.listen(PORT, () => console.log(`Website + API running at http://localhost:${PORT}`));