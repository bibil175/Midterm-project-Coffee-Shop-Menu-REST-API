const express = require('express');
const { requireAuth } = require('../middleware');
const router = express.Router();

// Data: array of objects (id + 4 field, ada number dan string)
let menus = [
  { id: 1, name: 'Espresso',      category: 'coffee', price: 18000, stock: 50 },
  { id: 2, name: 'Hazalnut Mocha', category: 'coffee', price: 25000, stock: 40 },
  { id: 3, name: 'Caffe Latte',   category: 'coffee', price: 27000, stock: 35 },
  { id: 4, name: 'Matcha Latte',  category: 'tea',    price: 28000, stock: 20 },
  { id: 5, name: 'Croissant',     category: 'snack',  price: 22000, stock: 15 },
];

// Penghitung id otomatis, id baru tidak diketik user
let nextId = 6;

// Helper: cari menu berdasarkan id, kalau tidak ada lempar error 404
const findMenu = (id) => {
  const menu = menus.find((m) => m.id === Number(id));
  if (!menu) {
    const err = new Error(`Menu dengan id ${id} tidak ditemukan`);
    err.status = 404;
    throw err;
  }
  return menu;
};

// GET /menus (tampilkan semua) dan POST /menus (tambah baru)
router.route('/')
  .get((req, res) => {
    res.json(menus);
  })
  .post((req, res) => {
    const { name, category, price, stock } = req.body || {};

    // Validasi 1: semua field wajib diisi
    if (!name || !category || price === undefined || stock === undefined) {
      return res.status(400).json({ error: 'name, category, price, stock wajib diisi' });
    }

    // Validasi 2: price dan stock harus angka
    if (typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ error: 'price dan stock harus berupa angka' });
    }

    // id dibuat otomatis, bukan diketik user
    const newMenu = { id: nextId++, name, category, price, stock };
    menus.push(newMenu);
    res.status(201).json(newMenu);
  });

router.get('/category{/:name}', (req, res) => {
  const { name } = req.params;
  if (!name) return res.json(menus); // tanpa value -> tampilkan semua
  res.json(menus.filter((m) => m.category.toLowerCase() === name.toLowerCase()));
});

router.route('/:id')

  .get(async (req, res) => {
    res.json(findMenu(req.params.id));
  })

  .put(async (req, res) => {
    const menu = findMenu(req.params.id);
    const { name, category, price, stock } = req.body || {};

    if (
      (price !== undefined && typeof price !== 'number') ||
      (stock !== undefined && typeof stock !== 'number')
    ) {
      return res.status(400).json({ error: 'price dan stock harus berupa angka' });
    }

    if (name !== undefined) menu.name = name;
    if (category !== undefined) menu.category = category;
    if (price !== undefined) menu.price = price;
    if (stock !== undefined) menu.stock = stock;

    res.json(menu);
  })

  .delete(requireAuth, async (req, res) => {
    const menu = findMenu(req.params.id);
    menus.splice(menus.indexOf(menu), 1);
    res.json({ message: 'Menu dihapus', deleted: menu });
  });

module.exports = router;