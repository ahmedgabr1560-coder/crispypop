import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, MapPin, Clock, Flame, ArrowRight, Mouse } from 'lucide-react'

const MEALS = [
  { id: 1, code: '01', name: 'CRISPY CLASSIC', price: 10.90, badge: 'SIGNATURE BOX', desc: 'Our legendary double-battered chicken with original seasoning.', color: '#B81D1D', image: '🍗' },
  { id: 2, code: '02', name: 'FIRE CRUNCH', price: 11.90, badge: 'SPICY FAVORITE', desc: 'Nashville-inspired heat meets ultra-crispy coating.', color: '#9E1414', image: '🔥' },
  { id: 3, code: '03', name: 'GOLDEN STACK', price: 12.90, badge: 'HONEY MUSTARD', desc: 'Honey-mustard glaze over golden crispy layers.', color: '#E5A91A', image: '🍯' },
]

const MENU_ITEMS = [
  { id: 1, name: 'Family Bucket', desc: '12pc crispy chicken + 4 sides', price: 24.90, tag: 'FAN FAVORITE', kcal: 1450, cat: 'buckets', emoji: '🪣' },
  { id: 2, name: 'Spicy Box', desc: '4pc fire crunch + fries + dip', price: 14.90, tag: 'SPICY HIT', kcal: 980, cat: 'buckets', emoji: '📦' },
  { id: 3, name: 'Classic Sandwich', desc: 'Crispy thigh, pickles, house sauce', price: 9.49, tag: 'BEST SIDE', kcal: 620, cat: 'sandwiches', emoji: '🥪' },
  { id: 4, name: 'Tender Stack', desc: '6pc golden tenders + 2 dips', price: 11.90, tag: 'VALUE BOX', kcal: 740, cat: 'tenders', emoji: '🍗' },
  { id: 5, name: 'Loaded Fries', desc: 'Cheese, jalapeños, crispy bits', price: 5.90, tag: 'BEST SIDE', kcal: 480, cat: 'sides', emoji: '🍟' },
  { id: 6, name: 'Vanilla Shake', desc: 'Thick & creamy, house recipe', price: 4.50, tag: 'FAN FAVORITE', kcal: 390, cat: 'drinks', emoji: '🥤' },
]

const CATEGORIES = [
  { id: 'all', label: 'ALL ITEMS (6)' },
  { id: 'buckets', label: 'BUCKETS & BOXES' },
  { id: 'sandwiches', label: 'SANDWICHES & MORE' },
  { id: 'tenders', label: 'CHICKEN TENDERS' },
  { id: 'sides', label: 'SIDES & DIPS' },
  { id: 'drinks', label: 'SHAKES & DRINKS' },
]

const LOCATIONS = [
  { id: 1, name: 'London Soho', time: '~12 mins', hours: '11:00 – 23:00', address: '42 Wardour St' },
  { id: 2, name: 'Manchester', time: '~15 mins', hours: '11:00 – 22:30', address: '18 Market St' },
  { id: 3, name: 'Birmingham', time: '~10 mins', hours: '11:00 – 23:00', address: '7 Bull St' },
]

function Header({ cartCount, onOpenCart, scrolled }) {
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#121212]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <span className="text-xl">🍗</span>
          </div>
          <span className="font-anton text-2xl tracking-wider text-white">CRISPY<span className="text-yellow-400">POP</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['HOME', 'MEALS', 'MENU', 'LOCATIONS'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-semibold tracking-[0.2em] text-white/80 hover:text-yellow-400 transition-colors">{link}</a>
          ))}
        </nav>
        <button onClick={onOpenCart} className="relative flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-400/30">
          <ShoppingBag size={18} /> ORDER NOW
          {cartCount > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
    </motion.header>
  )
}

function Hero({ onClaim }) {
  const [phase, setPhase] = useState(0)
  const [landed, setLanded] = useState([])

  const pieces = [
    { id: 0, x: -55, rot: -28, delay: 0.00, size: 38 },
    { id: 1, x:  25, rot:  18, delay: 0.10, size: 42 },
    { id: 2, x: -25, rot: -12, delay: 0.20, size: 36 },
    { id: 3, x:  45, rot:  32, delay: 0.30, size: 40 },
    { id: 4, x:  -5, rot:  -6, delay: 0.40, size: 44 },
    { id: 5, x:  30, rot:  22, delay: 0.50, size: 38 },
    { id: 6, x: -40, rot: -20, delay: 0.60, size: 36 },
    { id: 7, x:  15, rot:  10, delay: 0.70, size: 42 },
    { id: 8, x: -15, rot: -15, delay: 0.80, size: 40 },
    { id: 9, x:  40, rot:  25, delay: 0.90, size: 38 },
  ]

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const onLand = (id) => setLanded(prev => prev.includes(id) ? prev : [...prev, id])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#8B1212] via-[#6B0F0F] to-[#3A0303]">
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
      {[...Array(14)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-amber-700/25" style={{ width: 2+(i%4), height: 2+(i%4), bottom: 16+(i*9)%50, left: `${8+(i*7)%85}%` }} />
      ))}

      <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 items-center pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <h1 className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-5">
            CRISP THAT<br /><span className="text-yellow-400">HITS HARDER.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-medium tracking-wide mb-8">SERIOUS CRUNCH. NO APOLOGIES.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onClaim} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full text-sm tracking-wider transition-all hover:scale-105 shadow-xl shadow-yellow-400/30">CLAIM YOUR BUCKET</button>
            <a href="#meals" className="bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wider hover:bg-white/20 transition-all">EXPLORE MEALS</a>
          </div>
        </motion.div>

        <div className="order-1 md:order-2 relative h-[440px] md:h-[540px] flex items-end justify-center">
          {phase >= 2 && pieces.map(p => (
            <motion.div
              key={p.id}
              className="absolute z-30 pointer-events-none select-none"
              style={{ left: '50%', fontSize: p.size, marginLeft: p.x }}
              initial={{ y: -300, opacity: 1, rotate: p.rot, scale: 1.15 }}
              animate={{ y: [-300, 150, 165, 155], opacity: [1, 1, 1, 0], rotate: [p.rot, p.rot+50, p.rot+15], scale: [1.15, 1, 0.85] }}
              transition={{ duration: 0.95, delay: p.delay, times: [0, 0.6, 0.8, 1], ease: [0.25, 0.8, 0.3, 1] }}
              onAnimationComplete={() => onLand(p.id)}
            >🍗</motion.div>
          ))}

          <motion.div
            className="relative z-20"
            initial={{ rotate: -16, y: 40, scale: 0.92 }}
            animate={phase >= 1 ? { rotate: 0, y: 0, scale: 1 } : { rotate: -16, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 80, damping: 13 }}
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-28 h-11 border-[5px] border-yellow-400 rounded-t-full bg-transparent z-10" />
            <div className="w-56 h-60 md:w-64 md:h-72 bg-gradient-to-b from-[#C41E1E] to-[#6B0E0E] rounded-b-[2.2rem] rounded-t-2xl border-[5px] border-yellow-400 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-10 bg-yellow-400 flex items-center justify-center z-10">
                <span className="font-anton text-[#6B0E0E] text-base tracking-[0.3em]">CRISPYPOP</span>
              </div>
              <div className="absolute inset-0 top-10 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
              <div className="absolute inset-x-4 top-14 bottom-4 flex flex-wrap content-start justify-center gap-0 pt-1 overflow-hidden">
                <AnimatePresence>
                  {landed.map(id => (
                    <motion.span key={id} className="text-[30px] md:text-[34px] leading-none" initial={{ scale: 0, y: -30 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 14 }}>🍗</motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <div className="absolute top-14 left-4 w-10 h-24 bg-white/10 rounded-full blur-md pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-7 bg-black/45 rounded-full blur-md" />
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
        <Mouse size={18} />
        <span className="text-[10px] tracking-[0.3em] font-semibold">SCROLL TO DROP</span>
      </motion.div>
    </section>
  )
}

function MealSelector({ onAdd }) {
  const [active, setActive] = useState(0)
  const meal = MEALS[active]
  return (
    <section id="meals" className="py-20 transition-colors duration-700" style={{ backgroundColor: meal.color }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h2 className="font-anton text-4xl md:text-5xl tracking-wide">INTERACTIVE MEAL SELECTOR</h2>
          <p className="text-white/60 text-sm tracking-widest uppercase">Click a meal to customize your box</p>
        </div>
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-3 flex flex-col gap-3">
            {MEALS.map((m, i) => (
              <button key={m.id} onClick={() => setActive(i)} className={`text-left p-4 rounded-2xl transition-all duration-300 border-2 ${active === i ? 'bg-white/20 border-white/40 scale-[1.02]' : 'bg-black/20 border-transparent hover:bg-black/30'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{m.image}</span>
                  <div>
                    <div className="text-xs text-white/50 font-mono">{m.code}</div>
                    <div className="font-oswald font-semibold text-lg">{m.name}</div>
                    <div className="text-yellow-300 font-bold">€{m.price.toFixed(2)}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            <motion.div key={meal.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="relative w-full max-w-sm aspect-square bg-black/30 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl group overflow-hidden">
              <span className="text-[120px] group-hover:scale-110 transition-transform duration-500">{meal.image}</span>
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">{meal.badge}</div>
            </motion.div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <motion.div key={meal.id + 'i'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-7xl font-anton text-white/20 mb-2">{meal.code}</div>
              <h3 className="font-anton text-4xl mb-3">{meal.name}</h3>
              <p className="text-white/70 mb-6 leading-relaxed">{meal.desc}</p>
              <div className="text-4xl font-bold text-yellow-300 mb-6">€{meal.price.toFixed(2)}</div>
              <button onClick={() => onAdd(meal)} className="bg-black hover:bg-black/80 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:gap-4 w-fit">ADD TO ORDER <ArrowRight size={18} /></button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="bg-[#141414] py-4 overflow-hidden border-y border-white/5">
      <div className="marquee-track">
        <span className="font-oswald text-2xl md:text-3xl tracking-wider text-white whitespace-nowrap px-4">CRISPY ON THE OUTSIDE ★ ACOUSTIC CRUNCH ★ CRISPY ON THE OUTSIDE ★ ACOUSTIC CRUNCH ★ CRISPY ON THE OUTSIDE ★ </span>
      </div>
      <div className="marquee-track-reverse mt-2">
        <span className="font-oswald text-2xl md:text-3xl tracking-wider text-yellow-400 whitespace-nowrap px-4">24HR BUTTERMILK BRINE ✦ SERIOUSLY GOOD INSIDE ✦ 24HR BUTTERMILK BRINE ✦ SERIOUSLY GOOD INSIDE ✦ </span>
      </div>
    </div>
  )
}

function MenuGrid({ onAdd }) {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.cat === filter)
  return (
    <section id="menu" className="py-20 bg-[#B81D1D]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-anton text-4xl md:text-6xl text-center mb-10 tracking-wide">BEST SELLERS & MENU</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${filter === c.id ? 'bg-white text-red-700' : 'bg-black/20 text-white hover:bg-black/30'}`}>{c.label}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1C0D0D] rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all group">
              <div className="relative h-40 bg-gradient-to-br from-red-950 to-black flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded">{item.tag}</span>
                <span className="absolute top-3 right-3 bg-black/60 text-white/70 text-[10px] px-2 py-1 rounded">{item.kcal} KCAL</span>
              </div>
              <div className="p-5">
                <h3 className="font-oswald text-xl mb-1">{item.name}</h3>
                <p className="text-white/50 text-sm mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">€{item.price.toFixed(2)}</span>
                  <button onClick={() => onAdd(item)} className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold px-4 py-2.5 rounded-full transition-all hover:scale-105">+ ADD TO ORDER</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [loc, setLoc] = useState(0)
  const location = LOCATIONS[loc]
  return (
    <footer id="locations" className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-oswald text-xl mb-4 tracking-wider">STORE LOCATOR</h3>
            <div className="flex gap-2 mb-4 flex-wrap">
              {LOCATIONS.map((l, i) => (
                <button key={l.id} onClick={() => setLoc(i)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${loc === i ? 'bg-yellow-400 text-black' : 'bg-white/10 hover:bg-white/15'}`}>{l.name}</button>
              ))}
            </div>
            <div className="space-y-2 text-white/60 text-sm">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-yellow-400" /> {location.address}</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-yellow-400" /> {location.hours}</div>
              <div className="flex items-center gap-2"><Flame size={14} className="text-yellow-400" /> Live prep: {location.time}</div>
            </div>
          </div>
          <div>
            <h3 className="font-oswald text-xl mb-4 tracking-wider">GET 15% OFF YOUR FIRST DROP</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-yellow-400/50" />
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-3 rounded-full text-sm">JOIN</button>
            </div>
          </div>
          <div className="md:text-right">
            <div className="font-anton text-3xl mb-2">CRISPY<span className="text-yellow-400">POP</span></div>
            <p className="text-white/40 text-sm">Serious crunch. No apologies.</p>
          </div>
        </div>
        <div className="text-center overflow-hidden">
          <div className="font-anton text-[12vw] leading-none text-white/[0.03] select-none tracking-tighter">CRISPYPOP</div>
        </div>
        <div className="text-center text-white/20 text-xs mt-6">© 2026 CRISPYPOP. All rights reserved.</div>
      </div>
    </footer>
  )
}

function CartDrawer({ open, onClose, cart, setCart }) {
  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  const updateQty = (idx, delta) => {
    setCart(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], qty: Math.max(0, (next[idx].qty || 1) + delta) }
      return next.filter(i => (i.qty || 1) > 0)
    })
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#141414] border-l border-white/10 flex flex-col" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-anton text-2xl">YOUR ORDER</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? <p className="text-white/40 text-center py-20">Your bag is empty</p> : cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 rounded-xl p-3">
                  <span className="text-3xl">{item.emoji || item.image || '🍗'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{item.name}</div>
                    <div className="text-yellow-400 text-sm">€{item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(idx, -1)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Minus size={14} /></button>
                    <span className="w-6 text-center font-bold">{item.qty || 1}</span>
                    <button onClick={() => updateQty(idx, 1)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-4">
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-yellow-400">€{total.toFixed(2)}</span></div>
                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-full">CHECKOUT — €{total.toFixed(2)}</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const addToCart = (item) => setCart(prev => [...prev, { ...item, qty: 1 }])
  const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0)
  return (
    <div className="min-h-screen bg-black text-white">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} scrolled={scrolled} />
      <Hero onClaim={() => addToCart(MEALS[0])} />
      <MealSelector onAdd={addToCart} />
      <Marquee />
      <MenuGrid onAdd={addToCart} />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
    </div>
  )
}
