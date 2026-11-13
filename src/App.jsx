import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, MapPin, Clock, Flame, ArrowRight, Mouse } from 'lucide-react'

const MEALS = [
  { id: 1, code: '01', name: 'CRISPY CLASSIC', price: 10.90, badge: 'SIGNATURE BOX', desc: 'Legendary double-battered chicken.', color: '#B81D1D', image: '🍗' },
  { id: 2, code: '02', name: 'FIRE CRUNCH', price: 11.90, badge: 'SPICY FAVORITE', desc: 'Nashville heat, ultra-crispy.', color: '#9E1414', image: '🔥' },
  { id: 3, code: '03', name: 'GOLDEN STACK', price: 12.90, badge: 'HONEY MUSTARD', desc: 'Honey-mustard glaze, golden layers.', color: '#E5A91A', image: '🍯' },
]
const MENU_ITEMS = [
  { id: 1, name: 'Family Bucket', desc: '12pc + 4 sides', price: 24.90, tag: 'FAN FAVORITE', kcal: 1450, cat: 'buckets', emoji: '🪣' },
  { id: 2, name: 'Spicy Box', desc: '4pc fire + fries', price: 14.90, tag: 'SPICY HIT', kcal: 980, cat: 'buckets', emoji: '📦' },
  { id: 3, name: 'Classic Sandwich', desc: 'Crispy thigh + sauce', price: 9.49, tag: 'BEST SIDE', kcal: 620, cat: 'sandwiches', emoji: '🥪' },
  { id: 4, name: 'Tender Stack', desc: '6pc tenders + dips', price: 11.90, tag: 'VALUE BOX', kcal: 740, cat: 'tenders', emoji: '🍗' },
  { id: 5, name: 'Loaded Fries', desc: 'Cheese + jalapeños', price: 5.90, tag: 'BEST SIDE', kcal: 480, cat: 'sides', emoji: '🍟' },
  { id: 6, name: 'Vanilla Shake', desc: 'Thick house recipe', price: 4.50, tag: 'FAN FAVORITE', kcal: 390, cat: 'drinks', emoji: '🥤' },
]
const CATEGORIES = [
  { id: 'all', label: 'ALL ITEMS (6)' }, { id: 'buckets', label: 'BUCKETS & BOXES' },
  { id: 'sandwiches', label: 'SANDWICHES' }, { id: 'tenders', label: 'TENDERS' },
  { id: 'sides', label: 'SIDES & DIPS' }, { id: 'drinks', label: 'SHAKES & DRINKS' },
]
const LOCATIONS = [
  { id: 1, name: 'London Soho', time: '~12 mins', hours: '11:00 – 23:00', address: '42 Wardour St' },
  { id: 2, name: 'Manchester', time: '~15 mins', hours: '11:00 – 22:30', address: '18 Market St' },
  { id: 3, name: 'Birmingham', time: '~10 mins', hours: '11:00 – 23:00', address: '7 Bull St' },
]

function Header({ cartCount, onOpenCart, scrolled }) {
  return (
    <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#121212]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`} initial={{ y: -100 }} animate={{ y: 0 }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30"><span className="text-xl">🍗</span></div>
          <span className="font-anton text-2xl tracking-wider text-white">CRISPY<span className="text-yellow-400">POP</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['HOME','MEALS','MENU','LOCATIONS'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-xs font-semibold tracking-[0.2em] text-white/80 hover:text-yellow-400">{l}</a>)}
        </nav>
        <button onClick={onOpenCart} className="relative flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-5 py-2.5 rounded-full hover:scale-105 shadow-lg shadow-yellow-400/30">
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
  const CHICKEN = 'https://cdn.rawpng.com/1096637670.webp'
  const pieces = [
    { id: 0, x: -65, rot: -28, d: 0.00, w: 88 },
    { id: 1, x:  28, rot:  18, d: 0.14, w: 96 },
    { id: 2, x: -30, rot: -14, d: 0.28, w: 82 },
    { id: 3, x:  50, rot:  32, d: 0.40, w: 90 },
    { id: 4, x:  -8, rot:  -6, d: 0.52, w: 100 },
    { id: 5, x:  38, rot:  22, d: 0.64, w: 86 },
    { id: 6, x: -48, rot: -20, d: 0.76, w: 92 },
    { id: 7, x:  12, rot:  10, d: 0.88, w: 94 },
  ]
  useEffect(() => {
    const a = setTimeout(() => setPhase(1), 500)
    const b = setTimeout(() => setPhase(2), 1300)
    const c = setTimeout(() => setPhase(3), 3100)
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c) }
  }, [])
  const onLand = id => setLanded(p => p.includes(id) ? p : [...p, id])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 80%, #A01A1A 0%, #6B0F0F 45%, #2A0404 100%)' }}>
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black/55 to-transparent" />
      {[...Array(16)].map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{ width: 2+(i%3), height: 2+(i%3), background: 'rgba(160,110,40,0.3)', bottom: 24+(i*9)%60, left: `${6+(i*5.8)%88}%` }} />
      ))}
      <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-6 items-center pt-24 pb-14 relative z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={phase >= 3 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }} className="order-2 md:order-1">
          <h1 className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.9] tracking-tight mb-5">
            CRISP THAT<br /><span className="text-yellow-400">HITS HARDER.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 font-medium tracking-wide mb-8">SERIOUS CRUNCH. NO APOLOGIES.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onClaim} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full text-sm tracking-wider hover:scale-105 shadow-xl shadow-yellow-400/25">CLAIM YOUR BUCKET</button>
            <a href="#meals" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wider hover:bg-white/20">EXPLORE MEALS</a>
          </div>
        </motion.div>

        <div className="order-1 md:order-2 relative h-[460px] md:h-[540px] flex items-end justify-center">
          {phase >= 2 && pieces.map(p => (
            <motion.img key={p.id} src={CHICKEN} alt="" className="absolute z-30 pointer-events-none select-none"
              style={{ left: '50%', width: p.w, marginLeft: p.x, filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.5))' }}
              initial={{ y: -300, opacity: 1, rotate: p.rot, scale: 1.1 }}
              animate={{ y: [-300, 125, 142, 135], opacity: [1,1,1,0], rotate: [p.rot, p.rot+48, p.rot+10], scale: [1.1,1,0.88] }}
              transition={{ duration: 0.95, delay: p.d, times: [0,0.6,0.8,1], ease: [0.22,0.8,0.3,1] }}
              onAnimationComplete={() => onLand(p.id)}
            />
          ))}

          <motion.div className="relative z-20" initial={{ rotate: -13, y: 32, scale: 0.93 }}
            animate={phase >= 1 ? { rotate: 0, y: 0, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 13 }}>
            <div className="relative" style={{ width: 230, height: 255 }}>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(168deg, #D02020 0%, #B01818 30%, #8A1212 65%, #5E0C0C 100%)',
                borderRadius: '6px 6px 38px 38px',
                clipPath: 'polygon(7% 0%, 93% 0%, 100% 100%, 0% 100%)',
                boxShadow: '0 28px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
              }} />
              <div className="absolute top-0 left-[3%] right-[3%] h-[16px] z-20" style={{
                background: 'linear-gradient(180deg, #F8F4EC, #EDE5D5)',
                borderRadius: '5px 5px 1px 1px',
                boxShadow: '0 2px 3px rgba(0,0,0,0.25)',
              }} />
              <div className="absolute top-[26%] inset-x-0 z-10 flex justify-center">
                <span className="font-anton text-[24px] tracking-[0.1em]" style={{ color: '#F0D060', textShadow: '0 2px 6px rgba(0,0,0,0.45)' }}>CRISPYPOP</span>
              </div>
              <div className="absolute left-[11%] right-[11%] top-[36%] bottom-[7%] z-10 overflow-hidden flex flex-wrap content-end justify-center">
                <AnimatePresence>
                  {landed.map(id => (
                    <motion.img key={id} src={CHICKEN} alt="" className="object-contain"
                      style={{ width: 68+(id%3)*10, margin: '-8px', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }}
                      initial={{ scale: 0, y: -35 }} animate={{ scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 15 }}
                    />
                  ))}
                </AnimatePresence>
              </div>
              <div className="absolute top-[14%] left-[9%] w-[16%] h-[48%] rounded-full pointer-events-none z-[5]"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.13), transparent)', filter: 'blur(5px)' }} />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-5" style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)', filter: 'blur(3px)' }} />
          </motion.div>
        </div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35" animate={{ y: [0,7,0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
        <Mouse size={18} /><span className="text-[10px] tracking-[0.3em] font-semibold">SCROLL TO DROP</span>
      </motion.div>
    </section>
  )
}

function MealSelector({ onAdd }) {
  const [active, setActive] = useState(0)
  const m = MEALS[active]
  return (
    <section id="meals" className="py-20 transition-colors duration-700" style={{ backgroundColor: m.color }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-anton text-4xl md:text-5xl mb-10">INTERACTIVE MEAL SELECTOR</h2>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-3 flex flex-col gap-3">
            {MEALS.map((meal, i) => (
              <button key={meal.id} onClick={() => setActive(i)} className={`text-left p-4 rounded-2xl border-2 transition-all ${active===i ? 'bg-white/20 border-white/40' : 'bg-black/20 border-transparent'}`}>
                <div className="flex items-center gap-3"><span className="text-3xl">{meal.image}</span>
                  <div><div className="text-xs text-white/50">{meal.code}</div><div className="font-oswald text-lg">{meal.name}</div><div className="text-yellow-300 font-bold">€{meal.price.toFixed(2)}</div></div>
                </div>
              </button>
            ))}
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            <motion.div key={m.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-sm aspect-square bg-black/30 rounded-3xl flex items-center justify-center border border-white/10">
              <span className="text-[110px]">{m.image}</span>
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">{m.badge}</div>
            </motion.div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="text-7xl font-anton text-white/20 mb-2">{m.code}</div>
            <h3 className="font-anton text-4xl mb-3">{m.name}</h3>
            <p className="text-white/70 mb-6">{m.desc}</p>
            <div className="text-4xl font-bold text-yellow-300 mb-6">€{m.price.toFixed(2)}</div>
            <button onClick={() => onAdd(m)} className="bg-black text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 w-fit">ADD TO ORDER <ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="bg-[#141414] py-4 overflow-hidden border-y border-white/5">
      <div className="marquee-track"><span className="font-oswald text-2xl md:text-3xl tracking-wider text-white whitespace-nowrap px-4">CRISPY ON THE OUTSIDE ★ ACOUSTIC CRUNCH ★ CRISPY ON THE OUTSIDE ★ ACOUSTIC CRUNCH ★ </span></div>
      <div className="marquee-track-reverse mt-2"><span className="font-oswald text-2xl md:text-3xl tracking-wider text-yellow-400 whitespace-nowrap px-4">24HR BUTTERMILK BRINE ✦ SERIOUSLY GOOD INSIDE ✦ 24HR BUTTERMILK BRINE ✦ </span></div>
    </div>
  )
}

function MenuGrid({ onAdd }) {
  const [filter, setFilter] = useState('all')
  const items = filter === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.cat === filter)
  return (
    <section id="menu" className="py-20 bg-[#B81D1D]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-anton text-4xl md:text-6xl text-center mb-10">BEST SELLERS & MENU</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(c => <button key={c.id} onClick={() => setFilter(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider ${filter===c.id ? 'bg-white text-red-700' : 'bg-black/20 text-white'}`}>{c.label}</button>)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-[#1C0D0D] rounded-2xl overflow-hidden border border-white/5 group">
              <div className="relative h-40 bg-gradient-to-br from-red-950 to-black flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded">{item.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-oswald text-xl mb-1">{item.name}</h3>
                <p className="text-white/50 text-sm mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">€{item.price.toFixed(2)}</span>
                  <button onClick={() => onAdd(item)} className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold px-4 py-2.5 rounded-full">+ ADD TO ORDER</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [loc, setLoc] = useState(0)
  const L = LOCATIONS[loc]
  return (
    <footer id="locations" className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-oswald text-xl mb-4 tracking-wider">STORE LOCATOR</h3>
            <div className="flex gap-2 mb-4 flex-wrap">{LOCATIONS.map((l,i) => <button key={l.id} onClick={() => setLoc(i)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${loc===i ? 'bg-yellow-400 text-black' : 'bg-white/10'}`}>{l.name}</button>)}</div>
            <div className="space-y-2 text-white/60 text-sm">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-yellow-400" />{L.address}</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-yellow-400" />{L.hours}</div>
              <div className="flex items-center gap-2"><Flame size={14} className="text-yellow-400" />Live prep: {L.time}</div>
            </div>
          </div>
          <div>
            <h3 className="font-oswald text-xl mb-4 tracking-wider">GET 15% OFF YOUR FIRST DROP</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-yellow-400/50" />
              <button className="bg-yellow-400 text-black font-bold px-5 py-3 rounded-full text-sm">JOIN</button>
            </div>
          </div>
          <div className="md:text-right"><div className="font-anton text-3xl mb-2">CRISPY<span className="text-yellow-400">POP</span></div><p className="text-white/40 text-sm">Serious crunch. No apologies.</p></div>
        </div>
        <div className="text-center"><div className="font-anton text-[12vw] leading-none text-white/[0.03] select-none">CRISPYPOP</div></div>
        <div className="text-center text-white/20 text-xs mt-6">© 2026 CRISPYPOP</div>
      </div>
    </footer>
  )
}

function CartDrawer({ open, onClose, cart, setCart }) {
  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  const upd = (idx, d) => setCart(prev => { const n=[...prev]; n[idx]={...n[idx], qty: Math.max(0,(n[idx].qty||1)+d)}; return n.filter(i=>(i.qty||1)>0) })
  return (
    <AnimatePresence>{open && (
      <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <motion.div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#141414] border-l border-white/10 flex flex-col" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
          <div className="p-5 border-b border-white/10 flex justify-between items-center"><h3 className="font-anton text-2xl">YOUR ORDER</h3><button onClick={onClose}><X size={20} /></button></div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? <p className="text-white/40 text-center py-20">Your bag is empty</p> : cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/5 rounded-xl p-3">
                <span className="text-3xl">{item.emoji || item.image || '🍗'}</span>
                <div className="flex-1"><div className="font-semibold text-sm">{item.name}</div><div className="text-yellow-400 text-sm">€{item.price.toFixed(2)}</div></div>
                <div className="flex items-center gap-2">
                  <button onClick={() => upd(idx,-1)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Minus size={14} /></button>
                  <span className="w-6 text-center font-bold">{item.qty||1}</span>
                  <button onClick={() => upd(idx,1)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Plus size={14} /></button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-yellow-400">€{total.toFixed(2)}</span></div>
            <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-full">CHECKOUT — €{total.toFixed(2)}</button>
          </div>}
        </motion.div>
      </motion.div>
    )}</AnimatePresence>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  const add = item => setCart(p => [...p, { ...item, qty: 1 }])
  const count = cart.reduce((s, i) => s + (i.qty || 1), 0)
  return (
    <div className="min-h-screen bg-black text-white">
      <Header cartCount={count} onOpenCart={() => setCartOpen(true)} scrolled={scrolled} />
      <Hero onClaim={() => add(MEALS[0])} />
      <MealSelector onAdd={add} />
      <Marquee />
      <MenuGrid onAdd={add} />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
    </div>
  )
}
