export type ProductCategory =
  | "formula"
  | "veiculos"
  | "eletricos"
  | "aeronaves"
  | "robotica"
  | "aeroespacial"
  | "vestuario"
  | "criativos";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  badge: string;
  price: number;
  priceLabel: string;
  image: string;
  short: string;
  features: string[];
  details: string[];
  highlight?: boolean;
};

export const products: Product[] = [
  {
    id: "formula-r1",
    name: "Fórmula MN R1 Pro",
    category: "formula",
    categoryLabel: "Fórmula",
    badge: "Projeto conceito",
    price: 189900,
    priceLabel: "Projeto sob orçamento",
    image: "/images/products/formula-r1-premium.png",
    short: "Monoposto conceitual com presença de pista, telemetria e linguagem premium.",
    features: ["Aerodinâmica", "Telemetria", "Performance"],
    details: [
      "Conceito visual para apresentações comerciais, estudos de engenharia e desenvolvimento de protótipos.",
      "Pode evoluir para especificação de chassi, ergonomia, suspensão, materiais e aquisição de dados.",
      "Ideal para páginas de venda, portfólio técnico e captação de parceiros.",
      "Uma versão física exige engenharia especializada, testes e validações." 
    ],
    highlight: true
  },
  {
    id: "kart-x1",
    name: "Kart Cross MN X1",
    category: "veiculos",
    categoryLabel: "Kart Cross",
    badge: "Off-road premium",
    price: 24990,
    priceLabel: "A partir de R$ 24.990",
    image: "/images/products/kart-cross-premium.png",
    short: "Veículo off-road com chassi tubular, visual agressivo e forte presença de marca.",
    features: ["Chassi tubular", "Off-road", "Customizável"],
    details: [
      "Conceito para lazer, exposição, marketing e desenvolvimento de produto.",
      "Pode receber diferentes conjuntos motrizes e configurações conforme escopo técnico.",
      "A apresentação premium ajuda a vender projetos e personalizações sob demanda.",
      "Construção física requer projeto, cálculo estrutural e seleção apropriada de componentes."
    ],
    highlight: true
  },
  {
    id: "moto-e1",
    name: "Moto Elétrica MN E1",
    category: "eletricos",
    categoryLabel: "Mobilidade elétrica",
    badge: "Mobilidade urbana",
    price: 18990,
    priceLabel: "A partir de R$ 18.990",
    image: "/images/products/moto-eletrica-premium.png",
    short: "Moto elétrica futurista para deslocamento urbano, branding e pesquisa de produto.",
    features: ["Motor elétrico", "Painel digital", "Design modular"],
    details: [
      "Conceito para mobilidade urbana e comunicação visual de alto valor.",
      "Pode apresentar soluções de bateria, controlador, recarga e manutenção modular.",
      "Adequado para campanhas, vitrines digitais e propostas de desenvolvimento.",
      "Uma versão comercial depende de homologação e especificação final."
    ],
    highlight: true
  },
  {
    id: "aviao-jet250",
    name: "Avião Executivo MN Jet 250",
    category: "aeronaves",
    categoryLabel: "Aviões",
    badge: "Conceito aeronáutico",
    price: 1249000,
    priceLabel: "Projeto sob orçamento",
    image: "/images/products/aviao-jet250-premium.png",
    short: "Jato executivo de estética sofisticada para projetos e comunicação de alto valor.",
    features: ["Cabine executiva", "Estudo de missão", "Visual premium"],
    details: [
      "Conceito para modelagem, apresentação e desenvolvimento preliminar.",
      "Pode abranger configuração externa, cabine, superfícies e estudo de missão.",
      "Ideal para páginas institucionais e propostas comerciais de alto padrão.",
      "Não representa uma aeronave certificada nem pronta para voo."
    ],
    highlight: true
  },
  {
    id: "helicoptero-h1",
    name: "Helicóptero MN H1",
    category: "aeronaves",
    categoryLabel: "Helicópteros",
    badge: "Mobilidade aérea",
    price: 2490000,
    priceLabel: "Projeto sob orçamento",
    image: "/images/products/helicoptero-premium.png",
    short: "Helicóptero conceitual com visual luxuoso e identidade técnica autoral.",
    features: ["Asa rotativa", "Cabine refinada", "Missão modular"],
    details: [
      "Peça visual para linhas premium de aeronaves e projetos conceituais.",
      "Pode representar observação, transporte, treinamento ou apoio técnico.",
      "Transmite tecnologia, robustez e sofisticação em uma única composição.",
      "Não é uma aeronave homologada ou certificada."
    ]
  },
  {
    id: "drone-explorer",
    name: "Drone MN Explorer",
    category: "aeronaves",
    categoryLabel: "Drone",
    badge: "Captura e inspeção",
    price: 7490,
    priceLabel: "A partir de R$ 7.490",
    image: "/images/products/drone-explorer-premium.png",
    short: "Drone premium para captura, inspeção e operações técnicas em ambientes controlados.",
    features: ["Câmera 4K", "GPS inteligente", "Dobrável"],
    details: [
      "Plataforma visual para venda de serviços de imagem e inspeção.",
      "Pode integrar câmera estabilizada, iluminação e proteção de hélices.",
      "Excelente para comunicação de precisão, mobilidade e inteligência.",
      "Operações devem seguir as regras aeronáuticas e de privacidade aplicáveis."
    ]
  },
  {
    id: "robo-clean",
    name: "Robô Autônomo MN Clean",
    category: "robotica",
    categoryLabel: "Robótica doméstica",
    badge: "Autônomo",
    price: 899,
    priceLabel: "A partir de R$ 899",
    image: "/images/products/robo-clean-premium.png",
    short: "Robô de limpeza com mapeamento, sensores e retorno automático à base.",
    features: ["Mapeamento", "Sensores", "Retorno à base"],
    details: [
      "Plataforma para limpeza programada e automação residencial.",
      "Pode utilizar sensores de distância, queda, colisão e navegação inteligente.",
      "Versões avançadas podem oferecer aplicativo, agendamento e zonas proibidas.",
      "Autonomia e desempenho variam conforme bateria, motores e sensores."
    ],
    highlight: true
  },
  {
    id: "cargo-amr",
    name: "Robô Logístico MN Cargo AMR",
    category: "robotica",
    categoryLabel: "Automação interna",
    badge: "Logística inteligente",
    price: 12900,
    priceLabel: "A partir de R$ 12.900",
    image: "/images/products/cargo-amr-premium.png",
    short: "AMR para transporte de caixas e materiais em depósitos, lojas e fábricas.",
    features: ["Navegação autônoma", "Carga modular", "Operação 24/7"],
    details: [
      "Projetado para deslocamentos internos repetitivos em áreas avaliadas.",
      "Pode usar LiDAR, câmera, marcadores ou fusão de sensores.",
      "A plataforma superior aceita caixas, bandejas e módulos específicos.",
      "Capacidade, velocidade e segurança dependem da configuração final."
    ],
    highlight: true
  },
  {
    id: "mn-launch",
    name: "MN Launch",
    category: "aeroespacial",
    categoryLabel: "Aeroespacial",
    badge: "Exploração",
    price: 4490,
    priceLabel: "A partir de R$ 4.490",
    image: "/images/products/mn-launch-premium.png",
    short: "Conceito visual de foguete para educação, divulgação e comunicação de inovação.",
    features: ["Missões educacionais", "Telemetria", "Impacto visual"],
    details: [
      "Imagem e produto conceitual para projetos educacionais e de branding.",
      "Pode representar kits didáticos, estruturas demonstrativas e eventos.",
      "Reforça o aspecto aspiracional da categoria aeroespacial.",
      "Atividades reais exigem engenharia, testes e autorizações."
    ],
    highlight: true
  },
  {
    id: "camiseta-signature",
    name: "Camiseta MN Animat Signature",
    category: "vestuario",
    categoryLabel: "Vestuário",
    badge: "Personalizável",
    price: 89.9,
    priceLabel: "R$ 89,90",
    image: "/images/products/camiseta-premium.png",
    short: "Camiseta premium para fortalecer a identidade da marca e equipes personalizadas.",
    features: ["Estampa premium", "Frente e costas", "Sob medida"],
    details: [
      "Peça pronta ou base para personalização no estúdio do site.",
      "Pode ser adaptada a equipes, eventos, lojas e empresas.",
      "Disponível em diferentes tamanhos, tecidos e técnicas de aplicação.",
      "O valor final varia por quantidade e acabamento."
    ]
  },
  {
    id: "polo-equipe",
    name: "Polo Profissional de Equipe",
    category: "vestuario",
    categoryLabel: "Uniformes",
    badge: "Empresas e equipes",
    price: 119.9,
    priceLabel: "A partir de R$ 119,90",
    image: "/images/products/polo.svg",
    short: "Camisa polo personalizada para atendimento, equipes técnicas e eventos.",
    features: ["Logo bordado", "Nome individual", "Lote corporativo"],
    details: [
      "Pode receber logos, patrocínios, nomes e cores personalizadas.",
      "Ideal para lojas, equipes, competições e representação institucional.",
      "Disponível em diferentes tecidos e combinações de cores.",
      "Preço varia conforme quantidade e técnica de aplicação."
    ]
  },
  {
    id: "moletom-orbita",
    name: "Moletom Órbita",
    category: "vestuario",
    categoryLabel: "Vestuário",
    badge: "Coleção espacial",
    price: 169.9,
    priceLabel: "R$ 169,90",
    image: "/images/products/moletom.svg",
    short: "Moletom com linguagem tecnológica para coleções de ciência e exploração.",
    features: ["Capuz", "Coleção temática", "Modelagem unissex"],
    details: [
      "Produto para coleções especiais, equipes e merchandising.",
      "Pode receber estampas em frente, costas e mangas.",
      "Bom complemento para ampliar o ticket médio da loja.",
      "Cores e tamanhos são definidos no pedido."
    ]
  },
  {
    id: "cubesat-mn1",
    name: "CubeSat Educacional MN-1",
    category: "aeroespacial",
    categoryLabel: "Aeroespacial",
    badge: "Educacional",
    price: 2490,
    priceLabel: "A partir de R$ 2.490",
    image: "/images/products/cubesat.svg",
    short: "Kit didático para ensinar arquitetura de pequenos satélites e subsistemas.",
    features: ["Estrutura modular", "Telemetria simulada", "Uso didático"],
    details: [
      "Voltado a escolas, equipes, oficinas e laboratórios makers.",
      "Permite estudar energia, comunicação, sensores e estrutura.",
      "Pode receber módulos e atividades didáticas personalizadas.",
      "Não é um satélite certificado para lançamento."
    ]
  },
  {
    id: "rover-atlas",
    name: "Rover Atlas Mini",
    category: "robotica",
    categoryLabel: "Robótica de exploração",
    badge: "Exploração",
    price: 3690,
    priceLabel: "A partir de R$ 3.690",
    image: "/images/products/rover.svg",
    short: "Rover compacto para ensino, sensores, navegação e experimentação.",
    features: ["6 rodas", "Sensores modulares", "Controle remoto"],
    details: [
      "Plataforma para experimentos de locomoção em terrenos leves.",
      "Pode receber câmera e sensores ambientais.",
      "Indicado para ensino de robótica, programação e integração.",
      "O desempenho depende dos módulos escolhidos."
    ]
  },
  {
    id: "chassi-kit",
    name: "Kit Estrutural para Kart Cross",
    category: "veiculos",
    categoryLabel: "Componentes",
    badge: "Sob orçamento",
    price: 3490,
    priceLabel: "A partir de R$ 3.490",
    image: "/images/products/chassi-kit.svg",
    short: "Conjunto conceitual de tubos e peças para organização de montagem estrutural.",
    features: ["Tubos cortados", "Projeto base", "Customizável"],
    details: [
      "Complemento técnico para projetos de kart cross.",
      "Pode compor kits, pacotes e propostas de fabricação.",
      "Permite identificação de peças e sequência de montagem.",
      "Exige validação técnica antes de execução real."
    ]
  },
  {
    id: "placa-led",
    name: "Placa LED Personalizada",
    category: "criativos",
    categoryLabel: "Produtos criativos",
    badge: "Sob medida",
    price: 249.9,
    priceLabel: "A partir de R$ 249,90",
    image: "/images/products/placa-led.svg",
    short: "Placa iluminada para estúdios, lojas, eventos e identidade de ambientes.",
    features: ["Acrílico", "LED", "Arte exclusiva"],
    details: [
      "Produzida com logotipo, nome, símbolo ou arte personalizada.",
      "Pode ser de parede, mesa ou instalação em painel.",
      "Tamanho, cor de luz e alimentação são definidos no orçamento.",
      "Possui grande apelo visual em vitrines digitais."
    ]
  },
  {
    id: "kit-adesivos",
    name: "Kit de Adesivos Temáticos",
    category: "criativos",
    categoryLabel: "Produtos criativos",
    badge: "Colecionável",
    price: 39.9,
    priceLabel: "R$ 39,90",
    image: "/images/products/adesivos.svg",
    short: "Adesivos autorais para notebooks, capacetes, ferramentas e brindes.",
    features: ["Recorte individual", "Arte autoral", "Laminação opcional"],
    details: [
      "Produto acessível para ampliar o mix da loja.",
      "Ideal para kits, brindes, merchandising e revenda.",
      "Pode receber coleções por temática.",
      "Quantidade e acabamento podem ser ajustados."
    ]
  }
];

export const categoryLabels: Record<"all" | ProductCategory, string> = {
  all: "Todos",
  formula: "Fórmula",
  veiculos: "Kart / Veículos",
  eletricos: "Elétricos",
  aeronaves: "Aeronaves",
  robotica: "Robótica",
  aeroespacial: "Aeroespacial",
  vestuario: "Vestuário",
  criativos: "Criativos"
};
