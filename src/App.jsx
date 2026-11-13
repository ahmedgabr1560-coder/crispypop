import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Plus, Minus, X, MapPin, Clock, 
  Flame, Check, ArrowRight, Mouse
} from 'lucide-react'

const MEALS = [
  {
    id: 1,
    code: '01',
    name: 'CRISPY CLASSIC',
    price: 10.90,
    badge: 'SIGNATURE BOX',
    desc: 'Our legendary double-battered chicken with original seasoning. Pure crunch, zero compromise.',
    color: '#B81D1D',
    image: '🍗'
  },
  {
    id: 2,
    code: '02',
    name: 'FIRE CRUNCH',
    price: 11.90,
    badge: 'SPICY FAVORITE',
    desc: 'Nashville-inspired heat meets ultra-crispy coating. For those who like it loud.',
    color: '#9E1414',
    image: '🔥'
  },
  {
    id: 3,
    code: '03',
    name: 'GOLDEN STACK',
    price: 12.90,
    badge: 'HONEY MUSTARD',
    desc: 'Honey-mustard glaze over golden crispy layers. Sweet heat, serious texture.',
    color: '#E5A91A',
    image: '🍯'
  }
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

const SPICE_LEVELS = ['Mild', 'Nashville Hot', 'Volcano']
const SAUCES = ['Garlic Mayo', 'Honey Mustard', 'Inferno BBQ']

function Header({ cartCount, onOpenCart, scrolled }) {
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#121212]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <span className="text-xl">🍗</span>
          </div>
          <span className="font-anton text-2xl tracking-wider text-white">
            CRISPY<span className="text-yellow-400">POP</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['HOME', 'MEALS', 'SIDES', 'MENU', 'INGREDIENTS', 'LOCATIONS'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs font-semibold tracking-[0.2em] text-white/80 hover:text-yellow-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-400/30"
        >
          <ShoppingBag size={18} />
          ORDER NOW
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
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

  const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} scrolled={scrolled} />
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#8B1212] to-[#4A0404]">
        <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 items-center pt-20">
          <div className="z-10">
            <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-4">
              CRISP THAT<br />
              <span className="text-yellow-400">HITS HARDER.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-medium tracking-wide mb-8">
              SERIOUS CRUNCH. NO APOLOGIES.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full text-sm tracking-wider transition-all hover:scale-105 shadow-xl shadow-yellow-400/25">
                CLAIM YOUR BUCKET
              </button>
              <a href="#meals" className="glass text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wider hover:bg-white/15 transition-all">
                EXPLORE MEALS
              </a>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] flex items-end justify-center">
            <div className="w-48 h-52 md:w-56 md:h-60 bg-gradient-to-b from-red-700 to-red-900 rounded-b-3xl rounded-t-lg border-4 border-yellow-500/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-yellow-500 flex items-center justify-center">
                <span className="font-anton text-red-900 text-sm tracking-widest">CRISPYPOP</span>
              </div>
              <div className="absolute inset-0 top-8 flex flex-wrap items-center justify-center gap-1 p-3 content-start pt-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="text-2xl">🍗</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="meals" className="py-20 bg-[#B81D1D]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-anton text-4xl md:text-5xl tracking-wide mb-12">INTERACTIVE MEAL SELECTOR</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MEALS.map(m => (
              <div key={m.id} className="bg-black/30 rounded-2xl p-6 border border-white/10">
                <span className="text-5xl">{m.image}</span>
                <div className="text-xs text-white/50 font-mono mt-2">{m.code}</div>
                <h3 className="font-oswald text-2xl mt-1">{m.name}</h3>
                <p className="text-white/60 text-sm mt-2">{m.desc}</p>
                <div className="text-2xl font-bold text-yellow-300 mt-4">€{m.price.toFixed(2)}</div>
                <button
                  onClick={() => setCart(prev => [...prev, {...m, qty: 1}])}
                  className="mt-4 bg-yellow-400 text-black font-bold px-6 py-3 rounded-full text-sm w-full hover:bg-yellow-300"
                >
                  ADD TO ORDER
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#141414] py-4 overflow-hidden">
        <div className="marquee-track">
          <span className="font-oswald text-2xl tracking-wider text-white whitespace-nowrap px-4">
            CRISPY ON THE OUTSIDE ★ ACOUSTIC CRUNCH ★ CRISPY ON THE OUTSIDE ★ CRISPY ON THE OUTSIDE ★ ACOUSTIC CRUNCH ★ 
          </span>
        </div>
      </div>

      <section id="menu" className="py-20 bg-[#B81D1D]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-anton text-4xl md:text-6xl text-center mb-10">BEST SELLERS & MENU</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENU_ITEMS.map(item => (
              <div key={item.id} className="bg-[#1C0D0D] rounded-2xl overflow-hidden border border-white/5">
                <div className="h-40 bg-gradient-to-br from-red-950 to-black flex items-center justify-center relative">
                  <span className="text-6xl">{item.emoji}</span>
                  <span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded">{item.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-oswald text-xl">{item.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-400">€{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => setCart(prev => [...prev, {...item, qty: 1}])}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold px-4 py-2.5 rounded-full"
                    >
                      + ADD TO ORDER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="locations" className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-anton text-3xl mb-2">CRISPY<span className="text-yellow-400">POP</span></div>
          <p className="text-white/40 text-sm mb-8">Serious crunch. No apologies.</p>
          <div className="font-anton text-[12vw] leading-none text-white/[0.03] select-none">CRISPYPOP</div>
          <div className="text-white/20 text-xs mt-6">© 2026 CRISPYPOP. All rights reserved.</div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#141414] border-l border-white/10 p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-anton text-2xl">YOUR ORDER</h3>
              <button onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>
            {cart.length === 0 ? (
              <p className="text-white/40 text-center py-20">Your bag is empty</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <span className="text-2xl">{item.emoji || item.image || '🍗'}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-yellow-400 text-sm">€{item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span className="text-yellow-400">€{cart.reduce((s,i) => s + i.price, 0).toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-full">CHECKOUT</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
