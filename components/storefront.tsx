"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Cpu,
  ExternalLink,
  Heart,
  Layers3,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Upload,
  X,
  Zap
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { categoryLabels, Product, ProductCategory, products } from "@/data/products";

type Filter = "all" | ProductCategory;

type Customization = {
  model?: string;
  size?: string;
  color?: string;
  text?: string;
  placement?: string;
  notes?: string;
};

type CartItem = Product & {
  key: string;
  quantity: number;
  customization?: Customization;
};

const highlights = products.filter((product) => product.highlight).slice(0, 6);

const universeCards: Array<{
  category: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
  className: string;
}> = [
  {
    category: "formula",
    title: "Fórmula",
    subtitle: "Performance, aerodinâmica e telemetria.",
    image: "/images/products/formula-r1-premium.png",
    className: "universe-card universe-card-wide"
  },
  {
    category: "veiculos",
    title: "Kart Cross",
    subtitle: "Off-road, chassi tubular e personalização.",
    image: "/images/products/kart-cross-premium.png",
    className: "universe-card"
  },
  {
    category: "aeronaves",
    title: "Aeronaves",
    subtitle: "Jatos, helicópteros e drones premium.",
    image: "/images/products/aviao-jet250-premium.png",
    className: "universe-card"
  },
  {
    category: "robotica",
    title: "Robótica",
    subtitle: "Automação residencial, industrial e logística.",
    image: "/images/products/cargo-amr-premium.png",
    className: "universe-card"
  },
  {
    category: "aeroespacial",
    title: "Aeroespacial",
    subtitle: "Exploração, educação e comunicação técnica.",
    image: "/images/products/mn-launch-premium.png",
    className: "universe-card"
  },
  {
    category: "vestuario",
    title: "Vestuário",
    subtitle: "Uniformes e peças personalizadas sob medida.",
    image: "/images/products/camiseta-premium.png",
    className: "universe-card"
  }
];

const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function Storefront() {
  const reducedMotion = useReducedMotion();
  const [activeHero, setActiveHero] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const savedCart = JSON.parse(
          localStorage.getItem("mnanimat-next-cart") ?? "[]"
        ) as CartItem[];
        const savedFavorites = JSON.parse(
          localStorage.getItem("mnanimat-next-favorites") ?? "[]"
        ) as string[];
        setCart(savedCart);
        setFavorites(savedFavorites);
      } catch {
        setCart([]);
        setFavorites([]);
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("mnanimat-next-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("mnanimat-next-favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (reducedMotion || highlights.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % highlights.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || selectedProduct || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, selectedProduct, menuOpen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleProducts = useMemo(() => {
    const query = normalize(search.trim());
    return products.filter((product) => {
      const categoryMatches = filter === "all" || product.category === filter;
      const searchable = normalize(
        [
          product.name,
          product.categoryLabel,
          product.short,
          ...product.features,
          ...product.details
        ].join(" ")
      );
      return categoryMatches && (!query || searchable.includes(query));
    });
  }, [filter, search]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const activeProduct = highlights[activeHero] ?? highlights[0];

  function selectCategory(category: Filter) {
    setFilter(category);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  function addToCart(product: Product, quantity = 1, customization?: Customization) {
    const key = customization ? `${product.id}-${Date.now()}` : product.id;
    setCart((current) => {
      if (!customization) {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
      }
      return [...current, { ...product, key, quantity, customization }];
    });
    setToast(`${product.name} foi adicionado ao carrinho.`);
  }

  function updateQuantity(key: string, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(key: string) {
    setCart((current) => current.filter((item) => item.key !== key));
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]
    );
  }

  async function copyOrderSummary() {
    if (!cart.length) {
      setToast("Adicione pelo menos um produto ao carrinho.");
      return;
    }
    const lines = cart.map(
      (item) => `- ${item.quantity}x ${item.name}: ${currency(item.price * item.quantity)}`
    );
    const summary = `PEDIDO MN ANIMAT\n\n${lines.join("\n")}\n\nTotal estimado: ${currency(
      cartTotal
    )}\n\nSolicito confirmação de escopo, prazo, frete e valor final.`;
    try {
      await navigator.clipboard.writeText(summary);
      setToast("Resumo do pedido copiado para WhatsApp ou e-mail.");
    } catch {
      setToast("Não foi possível copiar automaticamente.");
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <Header
          cartCount={cartCount}
          menuOpen={menuOpen}
          onMenu={() => setMenuOpen((value) => !value)}
          onCart={() => setCartOpen(true)}
        />

        <AnimatePresence>
          {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
        </AnimatePresence>

        <main>
          <Hero
            activeProduct={activeProduct}
            activeIndex={activeHero}
            onSelect={setActiveHero}
            onPrevious={() =>
              setActiveHero((current) => (current - 1 + highlights.length) % highlights.length)
            }
            onNext={() => setActiveHero((current) => (current + 1) % highlights.length)}
            onDetails={() => setSelectedProduct(activeProduct)}
          />

          <BrandRail />

          <UniverseSection onSelect={selectCategory} />

          <CatalogSection
            filter={filter}
            search={search}
            products={visibleProducts}
            favorites={favorites}
            onFilter={setFilter}
            onSearch={setSearch}
            onAdd={addToCart}
            onDetails={setSelectedProduct}
            onFavorite={toggleFavorite}
          />

          <PerformanceSection />

          <CustomizerSection onAdd={addToCart} />

          <ContactSection onToast={setToast} />
        </main>

        <Footer />

        <AnimatePresence>
          {cartOpen && (
            <CartDrawer
              cart={cart}
              total={cartTotal}
              onClose={() => setCartOpen(false)}
              onUpdate={updateQuantity}
              onRemove={removeFromCart}
              onCheckout={copyOrderSummary}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              favorite={favorites.includes(selectedProduct.id)}
              onClose={() => setSelectedProduct(null)}
              onAdd={(product) => addToCart(product)}
              onFavorite={() => toggleFavorite(selectedProduct.id)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              initial={{ opacity: 0, y: 30, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 20, x: "-50%" }}
            >
              <Check size={18} />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function Header({
  cartCount,
  menuOpen,
  onMenu,
  onCart
}: {
  cartCount: number;
  menuOpen: boolean;
  onMenu: () => void;
  onCart: () => void;
}) {
  return (
    <header className="site-header">
      <div className="announcement">
        <div className="container announcement-inner">
          <span>Produtos autorais • engenharia conceitual • personalização premium</span>
          <a href="https://mnanimat.xyz" target="_blank" rel="noreferrer">
            mnanimat.xyz <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="container navbar">
        <a className="brand" href="#inicio" aria-label="MN Animat — início">
          <Image
            src="/images/brand/logo.svg"
            alt="MN Animat"
            width={260}
            height={80}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#universos">Universos</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#studio">Studio</a>
          <a href="#projetos">Tecnologia</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="nav-actions">
          <a className="header-cta" href="#catalogo">
            Explorar <ArrowRight size={16} />
          </a>
          <button className="round-button" type="button" onClick={onCart} aria-label="Abrir carrinho">
            <ShoppingBag size={20} />
            <span>{cartCount}</span>
          </button>
          <button
            className="round-button menu-toggle"
            type="button"
            onClick={onMenu}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="mobile-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.nav
        className="mobile-menu"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        {[
          ["Início", "#inicio"],
          ["Universos", "#universos"],
          ["Catálogo", "#catalogo"],
          ["Studio", "#studio"],
          ["Tecnologia", "#projetos"],
          ["Contato", "#contato"]
        ].map(([label, href]) => (
          <a key={href} href={href} onClick={onClose}>
            {label} <ArrowRight size={18} />
          </a>
        ))}
      </motion.nav>
    </motion.div>
  );
}

function Hero({
  activeProduct,
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
  onDetails
}: {
  activeProduct: Product;
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onDetails: () => void;
}) {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="eyebrow">
            <Sparkles size={14} /> Marketplace criativo + engenharia
          </span>
          <h1>
            Tecnologia que <span>move o futuro.</span>
          </h1>
          <p>
            Uma experiência premium para vender conceitos, produtos sob demanda, soluções de
            mobilidade, robótica, aeroespacial e vestuário personalizado.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#catalogo">
              Conhecer produtos <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href="#studio">
              Personalizar vestuário
            </a>
          </div>

          <div className="trust-row">
            <span><ShieldCheck size={18} /> Compra orientada</span>
            <span><PackageCheck size={18} /> Projetos sob medida</span>
            <span><Zap size={18} /> Identidade premium</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-stage"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              className="hero-image-wrap"
              initial={{ opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                sizes="(max-width: 960px) 100vw, 58vw"
                priority
              />
              <div className="hero-image-overlay" />
            </motion.div>
          </AnimatePresence>

          <div className="hero-stage-content">
            <div className="hero-product-top">
              <span className="status-badge">Destaque MN</span>
              <span className="hero-index">0{activeIndex + 1} / 0{highlights.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProduct.id}-copy`}
                className="hero-product-copy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <span>{activeProduct.categoryLabel}</span>
                <h2>{activeProduct.name}</h2>
                <p>{activeProduct.short}</p>
                <div className="hero-product-meta">
                  <strong>{activeProduct.priceLabel}</strong>
                  <button type="button" onClick={onDetails}>
                    Ver detalhes <ArrowRight size={17} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="hero-controls">
              <button type="button" onClick={onPrevious} aria-label="Produto anterior">
                <ChevronLeft size={20} />
              </button>
              <div className="hero-dots">
                {highlights.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => onSelect(index)}
                    aria-label={`Abrir ${product.name}`}
                  />
                ))}
              </div>
              <button type="button" onClick={onNext} aria-label="Próximo produto">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrandRail() {
  const labels = [
    "FÓRMULA",
    "KART CROSS",
    "MOBILIDADE ELÉTRICA",
    "AVIÕES",
    "HELICÓPTEROS",
    "ROBÓTICA AUTÔNOMA",
    "AEROESPACIAL",
    "VESTUÁRIO"
  ];

  return (
    <div className="brand-rail" aria-label="Áreas da MN Animat">
      <div className="brand-rail-track">
        {[...labels, ...labels].map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delay: 0.08 }}
      >
        {description}
      </motion.p>
    </div>
  );
}

function UniverseSection({ onSelect }: { onSelect: (category: ProductCategory) => void }) {
  return (
    <section className="section container" id="universos">
      <SectionHeading
        eyebrow="Universos MN Animat"
        title="Uma marca. Múltiplos mercados de alto impacto."
        description="A identidade foi criada para unir tecnologia, engenharia, velocidade, exploração e personalização sem perder consistência visual."
      />

      <div className="universe-grid">
        {universeCards.map((card, index) => (
          <motion.button
            key={card.category}
            type="button"
            className={card.className}
            onClick={() => onSelect(card.category)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -6 }}
          >
            <Image src={card.image} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" />
            <div className="universe-overlay" />
            <div className="universe-content">
              <span>Explorar categoria</span>
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
              <ArrowRight size={20} />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function CatalogSection({
  filter,
  search,
  products: visibleProducts,
  favorites,
  onFilter,
  onSearch,
  onAdd,
  onDetails,
  onFavorite
}: {
  filter: Filter;
  search: string;
  products: Product[];
  favorites: string[];
  onFilter: (filter: Filter) => void;
  onSearch: (value: string) => void;
  onAdd: (product: Product) => void;
  onDetails: (product: Product) => void;
  onFavorite: (id: string) => void;
}) {
  const filters = Object.entries(categoryLabels) as Array<[Filter, string]>;

  return (
    <section className="section catalog-section" id="catalogo">
      <div className="container">
        <SectionHeading
          eyebrow="Catálogo premium"
          title="Produtos, conceitos e projetos apresentados para vender."
          description="Cada item combina uma imagem forte, explicação objetiva, recursos principais e ações claras para orçamento ou compra."
        />

        <div className="catalog-toolbar">
          <label className="search-control">
            <Search size={19} />
            <input
              type="search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Buscar Fórmula, jato, robô, camiseta..."
              aria-label="Buscar produtos"
            />
          </label>
          <span className="result-count">
            {visibleProducts.length} {visibleProducts.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        <div className="filter-row" role="tablist" aria-label="Categorias de produtos">
          {filters.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={filter === key ? "active" : ""}
              onClick={() => onFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div layout className="product-grid">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite={favorites.includes(product.id)}
                onAdd={() => onAdd(product)}
                onDetails={() => onDetails(product)}
                onFavorite={() => onFavorite(product.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {!visibleProducts.length && (
          <div className="empty-results">
            <Search size={34} />
            <h3>Nenhum produto encontrado</h3>
            <p>Tente outro termo ou volte para a categoria “Todos”.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  favorite,
  onAdd,
  onDetails,
  onFavorite
}: {
  product: Product;
  favorite: boolean;
  onAdd: () => void;
  onDetails: () => void;
  onFavorite: () => void;
}) {
  return (
    <motion.article
      layout
      className="product-card"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -7 }}
    >
      <div className="product-image">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 720px) 100vw, 33vw" />
        <div className="product-image-shade" />
        <span className="product-badge">{product.badge}</span>
        <button
          className={favorite ? "favorite-button active" : "favorite-button"}
          type="button"
          onClick={onFavorite}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
        <div className="product-image-footer">
          <span>{product.categoryLabel}</span>
          <strong>{product.priceLabel}</strong>
        </div>
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{product.short}</p>
        <div className="feature-chips">
          {product.features.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
        <div className="product-actions">
          <button className="button button-primary" type="button" onClick={onAdd}>
            Adicionar <Plus size={17} />
          </button>
          <button className="details-button" type="button" onClick={onDetails}>
            Detalhes <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function PerformanceSection() {
  const cards = [
    {
      icon: CircleGauge,
      title: "Performance visual",
      text: "Hero cinematográfico, cards com profundidade e microinterações que valorizam produtos premium."
    },
    {
      icon: Layers3,
      title: "Arquitetura moderna",
      text: "Next.js App Router, React, TypeScript, Tailwind CSS e Motion para uma base escalável."
    },
    {
      icon: Cpu,
      title: "Experiência inteligente",
      text: "Busca, filtros, favoritos, carrinho persistente, modal e personalizador em tempo real."
    },
    {
      icon: ShieldCheck,
      title: "Responsivo e acessível",
      text: "Layout adaptável, navegação por teclado e animações que respeitam redução de movimento."
    }
  ];

  return (
    <section className="section container" id="projetos">
      <SectionHeading
        eyebrow="Tecnologia aplicada"
        title="Uma base profissional para crescer além de uma página estática."
        description="A nova versão foi estruturada em componentes, tipos e dados reutilizáveis, facilitando futuras integrações com pagamentos, CMS e banco de dados."
      />

      <div className="performance-grid">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="performance-icon"><Icon size={24} /></div>
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function CustomizerSection({ onAdd }: { onAdd: (product: Product, quantity: number, customization: Customization) => void }) {
  const [model, setModel] = useState("Camiseta tradicional");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#101217");
  const [text, setText] = useState("MN ANIMAT");
  const [placement, setPlacement] = useState("Frente");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  const unitPrice = useMemo(() => {
    const modelPrice: Record<string, number> = {
      "Camiseta tradicional": 89.9,
      "Camiseta oversized": 99.9,
      "Camisa polo": 119.9,
      "Moletom com capuz": 169.9,
      "Uniforme esportivo": 109.9
    };
    const placementExtra: Record<string, number> = {
      Frente: 0,
      "Frente + costas": 18,
      "Frente + manga": 10,
      Completa: 28
    };
    let value = (modelPrice[model] ?? 89.9) + (placementExtra[placement] ?? 0);
    if (quantity >= 100) value *= 0.76;
    else if (quantity >= 30) value *= 0.84;
    else if (quantity >= 10) value *= 0.92;
    return value;
  }, [model, placement, quantity]);

  const totalPrice = unitPrice * quantity;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const customProduct: Product = {
      id: "custom-wear",
      name: `${model} personalizada`,
      category: "vestuario",
      categoryLabel: "Vestuário personalizado",
      badge: "Arte sob medida",
      price: unitPrice,
      priceLabel: currency(unitPrice),
      image: "/images/products/camiseta-premium.png",
      short: "Peça personalizada criada no MN Print Studio.",
      features: [size, placement, `${quantity} unidade${quantity > 1 ? "s" : ""}`],
      details: ["Produto personalizado conforme as escolhas realizadas no estúdio."]
    };
    onAdd(customProduct, quantity, { model, size, color, text, placement, notes });
  }

  return (
    <section className="section studio-section" id="studio">
      <div className="container">
        <SectionHeading
          eyebrow="MN Print Studio"
          title="O cliente personaliza a peça antes de solicitar o pedido."
          description="Modelo, cor, tamanho, texto, quantidade, aplicação e arte enviada aparecem em uma experiência visual responsiva."
        />

        <div className="studio-grid">
          <motion.div
            className="studio-intro"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="eyebrow">Crie do seu jeito</span>
            <h3>Vestuário que traduz a identidade da sua equipe ou empresa.</h3>
            <p>
              A prévia funciona diretamente no navegador e pode ser conectada futuramente a upload em nuvem, aprovação de arte e produção.
            </p>
            <ul>
              <li><Check size={17} /> Camiseta, oversized, polo, moletom e uniforme</li>
              <li><Check size={17} /> Cores e tamanhos variados</li>
              <li><Check size={17} /> Texto e upload de arte</li>
              <li><Check size={17} /> Desconto estimado por quantidade</li>
            </ul>
            <Image
              src="/images/products/camiseta-premium.png"
              alt="Camiseta premium MN Animat"
              width={720}
              height={720}
            />
          </motion.div>

          <motion.div
            className="studio-preview"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="preview-title">
              <span>Visualização</span>
              <strong>{model}</strong>
            </div>
            <div className="shirt-stage">
              <div className={`shirt-preview ${model.toLowerCase().replaceAll(" ", "-")}`} style={{ "--shirt-color": color } as React.CSSProperties}>
                <svg viewBox="0 0 520 520" aria-label="Prévia da peça">
                  <path className="shirt-main" d="M160 72 89 111 30 210l78 44 35-55v247h234V199l35 55 78-44-59-99-71-39c-18 35-47 52-80 52s-62-17-80-52Z" />
                  <path className="shirt-shade" d="M143 199v247h234V199l35 55 30-17-35-81-50-27c-22 23-50 35-77 35-28 0-55-12-77-35l-50 27-35 81 25 14 35-52Z" />
                </svg>
                <div className="shirt-art">
                  {uploadedImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={uploadedImage} alt="Arte enviada" />
                  ) : (
                    <span>{text || "SUA ARTE"}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="preview-summary">
              <span>Modelo <strong>{model}</strong></span>
              <span>Tamanho <strong>{size}</strong></span>
              <span>Aplicação <strong>{placement}</strong></span>
              <span>Quantidade <strong>{quantity}</strong></span>
            </div>
          </motion.div>

          <motion.form
            className="studio-form"
            onSubmit={submit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="form-row">
              <label>
                Modelo
                <select value={model} onChange={(event) => setModel(event.target.value)}>
                  <option>Camiseta tradicional</option>
                  <option>Camiseta oversized</option>
                  <option>Camisa polo</option>
                  <option>Moletom com capuz</option>
                  <option>Uniforme esportivo</option>
                </select>
              </label>
              <label>
                Tamanho
                <select value={size} onChange={(event) => setSize(event.target.value)}>
                  <option>PP</option><option>P</option><option>M</option><option>G</option><option>GG</option><option>XGG</option>
                </select>
              </label>
            </div>

            <fieldset>
              <legend>Cor principal</legend>
              <div className="color-list">
                {["#101217", "#ffffff", "#184f9b", "#70263a", "#166b45", "#ff6a00"].map((option) => (
                  <button
                    key={option}
                    className={color === option ? "active" : ""}
                    type="button"
                    style={{ backgroundColor: option }}
                    onClick={() => setColor(option)}
                    aria-label={`Escolher cor ${option}`}
                  />
                ))}
              </div>
            </fieldset>

            <label>
              Texto principal
              <input value={text} maxLength={24} onChange={(event) => setText(event.target.value)} />
            </label>

            <label className="upload-field">
              <Upload size={18} />
              <span>Enviar arte ou logotipo</span>
              <small>PNG, JPG, WEBP ou SVG • até 8 MB</small>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file || file.size > 8 * 1024 * 1024) return;
                  if (uploadedImage) URL.revokeObjectURL(uploadedImage);
                  setUploadedImage(URL.createObjectURL(file));
                }}
              />
            </label>

            <div className="form-row">
              <label>
                Quantidade
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                />
              </label>
              <label>
                Aplicação
                <select value={placement} onChange={(event) => setPlacement(event.target.value)}>
                  <option>Frente</option>
                  <option>Frente + costas</option>
                  <option>Frente + manga</option>
                  <option>Completa</option>
                </select>
              </label>
            </div>

            <label>
              Observações
              <textarea
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Informe nomes, patrocinadores, posição da arte e outros detalhes."
              />
            </label>

            <div className="custom-price">
              <div>
                <span>Estimativa inicial</span>
                <strong>{currency(totalPrice)}</strong>
              </div>
              <small>O valor final pode variar conforme tecido, técnica e complexidade.</small>
            </div>

            <button className="button button-primary full" type="submit">
              Adicionar personalização <ShoppingBag size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onToast }: { onToast: (message: string) => void }) {
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = `SOLICITAÇÃO MN ANIMAT\n\nNome: ${data.get("name")}\nE-mail: ${data.get("email")}\nAssunto: ${data.get("subject")}\nMensagem: ${data.get("message")}`;
    try {
      await navigator.clipboard.writeText(message);
      onToast("Solicitação preparada e copiada para envio.");
      form.reset();
    } catch {
      onToast("Solicitação preparada. Conecte um serviço de formulário para envio real.");
    }
  }

  return (
    <section className="section container" id="contato">
      <div className="contact-panel">
        <motion.div
          className="contact-copy"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="eyebrow">Orçamento e parceria</span>
          <h2>Transforme a vitrine em pedidos reais.</h2>
          <p>
            A estrutura já está pronta para receber integração com WhatsApp, gateway de pagamento, banco de dados, CMS e painel administrativo.
          </p>
          <div className="contact-benefits">
            <span><Check size={17} /> Produtos autorais e personalizados</span>
            <span><Check size={17} /> Atendimento para pessoas e empresas</span>
            <span><Check size={17} /> Projetos técnicos sob análise</span>
          </div>
          <div className="socials">
            <a href="#" aria-label="Instagram"><span aria-hidden="true">IG</span></a>
            <a href="#" aria-label="YouTube"><span aria-hidden="true">YT</span></a>
            <a href="#" aria-label="Facebook"><span aria-hidden="true">FB</span></a>
            <a href="#" aria-label="WhatsApp"><MessageCircle size={20} /></a>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={submit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="form-row">
            <label>
              Nome ou empresa
              <input name="name" required placeholder="Seu nome" />
            </label>
            <label>
              E-mail
              <input name="email" type="email" required placeholder="voce@empresa.com" />
            </label>
          </div>
          <label>
            Assunto
            <select name="subject">
              <option>Orçamento de produto</option>
              <option>Vestuário personalizado</option>
              <option>Projeto de robô autônomo</option>
              <option>Projeto Fórmula ou kart cross</option>
              <option>Aviões, helicópteros ou drones</option>
              <option>Projeto aeroespacial</option>
              <option>Parceria comercial</option>
            </select>
          </label>
          <label>
            Mensagem
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Descreva o produto, quantidade, função, prazo e faixa de orçamento."
            />
          </label>
          <button className="button button-primary full" type="submit">
            Preparar solicitação <ArrowRight size={18} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/brand/logo.svg" alt="MN Animat" width={260} height={80} />
          <p>
            Tecnologia, mobilidade, robótica, aeroespacial e personalização em uma experiência digital premium.
          </p>
        </div>
        <div>
          <strong>Navegação</strong>
          <a href="#universos">Universos</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#studio">Studio</a>
          <a href="#contato">Contato</a>
        </div>
        <div>
          <strong>Categorias</strong>
          <a href="#catalogo">Fórmula</a>
          <a href="#catalogo">Aeronaves</a>
          <a href="#catalogo">Robótica</a>
          <a href="#catalogo">Aeroespacial</a>
        </div>
        <div>
          <strong>Domínio</strong>
          <a href="https://mnanimat.xyz" target="_blank" rel="noreferrer">mnanimat.xyz</a>
          <span>GitHub + Vercel</span>
          <span>Next.js + React</span>
          <span>Tailwind + Motion</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MN Animat.</span>
        <span>
          Veículos, aeronaves e sistemas complexos são conceitos ou projetos sujeitos a engenharia,
          testes e regulamentação aplicável.
        </span>
      </div>
    </footer>
  );
}

function CartDrawer({
  cart,
  total,
  onClose,
  onUpdate,
  onRemove,
  onCheckout
}: {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onUpdate: (key: string, change: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}) {
  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        className="cart-drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <span>Seu pedido</span>
            <h2>Carrinho</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar carrinho"><X size={22} /></button>
        </div>

        <div className="drawer-items">
          {!cart.length ? (
            <div className="empty-cart">
              <ShoppingBag size={42} />
              <h3>Seu carrinho está vazio</h3>
              <p>Escolha um produto ou monte uma peça personalizada.</p>
            </div>
          ) : (
            cart.map((item) => (
              <article className="cart-item" key={item.key}>
                <Image src={item.image} alt={item.name} width={104} height={84} />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>{currency(item.price)}</span>
                  {item.customization && (
                    <small>{item.customization.size} • {item.customization.placement}</small>
                  )}
                  <div className="quantity-control">
                    <button type="button" onClick={() => onUpdate(item.key, -1)}><Minus size={15} /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onUpdate(item.key, 1)}><Plus size={15} /></button>
                  </div>
                </div>
                <button className="remove-button" type="button" onClick={() => onRemove(item.key)} aria-label={`Remover ${item.name}`}>
                  <Trash2 size={18} />
                </button>
              </article>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <div>
            <span>Total estimado</span>
            <strong>{currency(total)}</strong>
          </div>
          <button className="button button-primary full" type="button" onClick={onCheckout}>
            Gerar resumo do pedido <ArrowRight size={18} />
          </button>
          <small>O checkout real pode ser conectado a Mercado Pago, Stripe, Asaas ou PagBank.</small>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function ProductModal({
  product,
  favorite,
  onClose,
  onAdd,
  onFavorite
}: {
  product: Product;
  favorite: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onFavorite: () => void;
}) {
  return (
    <motion.div
      className="overlay modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="product-modal"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar detalhes"><X size={22} /></button>
        <div className="modal-image">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 52vw" />
          <div className="modal-image-shade" />
          <span>{product.badge}</span>
        </div>
        <div className="modal-content">
          <div className="modal-topline">
            <span>{product.categoryLabel}</span>
            <button className={favorite ? "active" : ""} type="button" onClick={onFavorite}>
              <Heart size={19} fill={favorite ? "currentColor" : "none"} /> Favoritar
            </button>
          </div>
          <h2>{product.name}</h2>
          <p className="modal-lead">{product.short}</p>
          <div className="feature-chips">
            {product.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
          <h3>Função e aplicação</h3>
          <ul>
            {product.details.map((detail) => (
              <li key={detail}><Check size={17} /> {detail}</li>
            ))}
          </ul>
          <div className="modal-purchase">
            <div>
              <span>Valor estimado</span>
              <strong>{product.priceLabel}</strong>
            </div>
            <button className="button button-primary" type="button" onClick={() => onAdd(product)}>
              Adicionar <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
