type FilterLabels = {
  clear: string;
  apply: string;
  coordinates: string;
  versionId: string;
  versionsSection: string;
  namedLocationIds: string;
  namedLocationsSection: string;
  mapNames: string;
  mapSection: string;
  topographyNames: string;
  topographySection: string;
  breakthroughIds: string;
  breakthroughsSection: string;
  altitude: string;
  concrete: string;
  water: string;
  metals: string;
  rareMetals: string;
  temperature: string;
  meteors: string;
  dustDevils: string;
  dustStorms: string;
  coldWaves: string;
  difficulty: string;
};

type SettingsLabels = {
  map: string;
  animation: string;
  language: string;
};

type TitleLabels = {
  filter: string;
  settings: string;
  list: string;
  details: string;
};

type ThreatLabels = {
  meteors: string;
  dustDevils: string;
  dustStorms: string;
  coldWaves: string;
};

type ResourceLabels = {
  concrete: string;
  water: string;
  metals: string;
  rareMetals: string;
};

type DetailsLabels = {
  unknownLocation: string;
  difficulty: string;
  altitude: string;
  temperature: string;
  topography: string;
  threats: string;
  resources: string;
  breakthroughs: string;
  threatList: ThreatLabels;
  resourceList: ResourceLabels;
};

export const topographyNames = [
  {
    language: "en",
    kv: [
      { key: "Relatively Flat", label: "Relatively Flat" },
      { key: "Steep", label: "Steep" },
      { key: "Rough", label: "Rough" },
      { key: "Mountainous", label: "Mountainous" },
    ],
  },
  {
    language: "br",
    kv: [
      { key: "Relatively Flat", label: "Relativamente plano" },
      { key: "Steep", label: "Pesado" },
      { key: "Rough", label: "Ruidoso" },
      { key: "Mountainous", label: "Montanhoso" },
    ],
  },
  {
    language: "fr",
    kv: [
      { key: "Relatively Flat", label: "Relativement plat" },
      { key: "Steep", label: "Profond" },
      { key: "Rough", label: "Rugueux" },
      { key: "Mountainous", label: "Montagneux" },
    ],
  },
  {
    language: "ge",
    kv: [
      { key: "Relatively Flat", label: "Relativ flach" },
      { key: "Steep", label: "Steif" },
      { key: "Rough", label: "Rutschig" },
      { key: "Mountainous", label: "Bergig" },
    ],
  },
  {
    language: "po",
    kv: [
      { key: "Relatively Flat", label: "Relativ flach" },
      { key: "Steep", label: "Steif" },
      { key: "Rough", label: "Rutschig" },
      { key: "Mountainous", label: "Bergig" },
    ],
  },
  {
    language: "ru",
    kv: [
      { key: "Relatively Flat", label: "Почти плоская" },
      { key: "Steep", label: "Резкая" },
      { key: "Rough", label: "Грубая" },
      { key: "Mountainous", label: "Горная" },
    ],
  },
  {
    language: "sc",
    kv: [
      { key: "Relatively Flat", label: "相对平坦" },
      { key: "Steep", label: "急剧" },
      { key: "Rough", label: "峭壁" },
      { key: "Mountainous", label: "山峦" },
    ],
  },
  {
    language: "sp",
    kv: [
      { key: "Relatively Flat", label: "Relativamente plana" },
      { key: "Steep", label: "Profundo" },
      { key: "Rough", label: "Ruidoso" },
      { key: "Mountainous", label: "Montañoso" },
    ],
  },
];

const languages = [
  { key: "en", label: "English" },
  { key: "br", label: "Português do Brasil" },
  { key: "fr", label: "Français" },
  { key: "ge", label: "Deutsch" },
  { key: "po", label: "Polski" },
  { key: "ru", label: "Русский" },
  { key: "sc", label: "简体中文" },
  { key: "sp", label: "Español" },
];

const titleLabels: { language: string; labels: TitleLabels }[] = [
  {
    language: "en",
    labels: {
      filter: "Filter",
      settings: "Settings",
      list: "List",
      details: "Details",
    },
  },
  {
    language: "br",
    labels: {
      filter: "Filtro",
      settings: "Configurações",
      list: "Lista",
      details: "Detalhes",
    },
  },
  {
    language: "fr",
    labels: {
      filter: "Filtre",
      settings: "Paramètres",
      list: "Liste",
      details: "Détails",
    },
  },
  {
    language: "ge",
    labels: {
      filter: "Filter",
      settings: "Einstellungen",
      list: "Liste",
      details: "Details",
    },
  },
  {
    language: "po",
    labels: {
      filter: "Filtr",
      settings: "Ustawienia",
      list: "Lista",
      details: "Szczegóły",
    },
  },
  {
    language: "ru",
    labels: {
      filter: "Фильтр",
      settings: "Настройки",
      list: "Список",
      details: "Детали",
    },
  },
  {
    language: "sc",
    labels: { filter: "筛选", settings: "设置", list: "列表", details: "详情" },
  },
  {
    language: "sp",
    labels: {
      filter: "Filtro",
      settings: "Configuración",
      list: "Lista",
      details: "Detalles",
    },
  },
];

const settingsLabels: { language: string; labels: SettingsLabels }[] = [
  {
    language: "en",
    labels: {
      map: "3D Map",
      animation: "Animation",
      language: "Language",
    },
  },
  {
    language: "br",
    labels: {
      map: "Mapa 3D",
      animation: "Animação",
      language: "Idioma",
    },
  },
  {
    language: "fr",
    labels: {
      map: "Carte 3D",
      animation: "Animation",
      language: "Langue",
    },
  },
  {
    language: "ge",
    labels: {
      map: "3D-Karte",
      animation: "Animation",
      language: "Sprache",
    },
  },
  {
    language: "po",
    labels: {
      map: "Mapa 3D",
      animation: "Animacja",
      language: "Język",
    },
  },
  {
    language: "ru",
    labels: {
      map: "3D Карта",
      animation: "Анимация",
      language: "Язык",
    },
  },
  {
    language: "sc",
    labels: { map: "地图", animation: "动画", language: "语言" },
  },
  {
    language: "sp",
    labels: {
      map: "Mapa 3D",
      animation: "Animación",
      language: "Idioma",
    },
  },
];

const threatsLabels: { language: string; labels: ThreatLabels }[] = [
  {
    language: "en",
    labels: {
      meteors: "Meteors",
      dustDevils: "Dust Devils",
      dustStorms: "Dust Storms",
      coldWaves: "Cold Waves",
    },
  },
  {
    language: "br",
    labels: {
      meteors: "Meteoros",
      dustDevils: "Pesadelos de Pó",
      dustStorms: "Tempestades de Pó",
      coldWaves: "Ondas frias",
    },
  },
  {
    language: "fr",
    labels: {
      meteors: "Météores",
      dustDevils: "Poussières de poussière",
      dustStorms: "Tempêtes de poussière",
      coldWaves: "Vagues de froid",
    },
  },
  {
    language: "ge",
    labels: {
      meteors: "Meteore",
      dustDevils: "Staub-Teufel",
      dustStorms: "Staub-Sturm",
      coldWaves: "Kälte-Wellen",
    },
  },
  {
    language: "po",
    labels: {
      meteors: "Meteory",
      dustDevils: "Pośpiech",
      dustStorms: "Burze pośpieszne",
      coldWaves: "Chłodne fale",
    },
  },
  {
    language: "ru",
    labels: {
      meteors: "Метеоры",
      dustDevils: "Пыльные дьяволы",
      dustStorms: "Пыльные бури",
      coldWaves: "Холодные волны",
    },
  },
  {
    language: "sc",
    labels: {
      meteors: "陨石",
      dustDevils: "尘埃头",
      dustStorms: "尘埃风暴",
      coldWaves: "冷气流",
    },
  },
  {
    language: "sp",
    labels: {
      meteors: "Meteoros",
      dustDevils: "Pozos de polvo",
      dustStorms: "Tormentas de polvo",
      coldWaves: "Ondas frías",
    },
  },
];

const resourcesLabels: { language: string; labels: ResourceLabels }[] = [
  {
    language: "en",
    labels: {
      concrete: "Concrete",
      water: "Water",
      metals: "Metals",
      rareMetals: "Rare Metals",
    },
  },
  {
    language: "br",
    labels: {
      concrete: "Beton",
      water: "Água",
      metals: "Metais",
      rareMetals: "Metais raros",
    },
  },
  {
    language: "fr",
    labels: {
      concrete: "Béton",
      water: "Eau",
      metals: "Métaux",
      rareMetals: "Métaux rares",
    },
  },
  {
    language: "ge",
    labels: {
      concrete: "Beton",
      water: "Wasser",
      metals: "Metalle",
      rareMetals: "Seltene Metalle",
    },
  },
  {
    language: "po",
    labels: {
      concrete: "Beton",
      water: "Woda",
      metals: "Metale",
      rareMetals: "Rare Metale",
    },
  },
  {
    language: "ru",
    labels: {
      concrete: "Бетон",
      water: "Вода",
      metals: "Металлы",
      rareMetals: "Редкие металлы",
    },
  },
  {
    language: "sc",
    labels: {
      concrete: "混凝土",
      water: "水",
      metals: "金属",
      rareMetals: "稀有金属",
    },
  },
  {
    language: "sp",
    labels: {
      concrete: "Hormigón",
      water: "Agua",
      metals: "Metales",
      rareMetals: "Metales raros",
    },
  },
];

const detailsLabels: { language: string; labels: DetailsLabels }[] = [
  {
    language: "en",
    labels: {
      unknownLocation: "Unknown Location",
      difficulty: "Difficulty",
      altitude: "Altitude",
      temperature: "Temperature",
      topography: "Topography",
      threats: "Threats",
      resources: "Resources",
      breakthroughs: "Breakthroughs",
      threatList: threatsLabels.find((l) => l.language === "en")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "en")!.labels,
    },
  },
  {
    language: "br",
    labels: {
      unknownLocation: "Localização desconhecida",
      difficulty: "Dificuldade",
      altitude: "Altitude",
      temperature: "Temperatura",
      topography: "Topografia",
      threats: "Ameaças",
      resources: "Recursos",
      breakthroughs: "Quebra-cabeça",
      threatList: threatsLabels.find((l) => l.language === "br")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "br")!.labels,
    },
  },
  {
    language: "fr",
    labels: {
      unknownLocation: "Localisation inconnue",
      difficulty: "Difficulté",
      altitude: "Altitude",
      temperature: "Température",
      topography: "Topographie",
      threats: "Menaces",
      resources: "Ressources",
      breakthroughs: "Breakthrough",
      threatList: threatsLabels.find((l) => l.language === "fr")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "fr")!.labels,
    },
  },
  {
    language: "ge",
    labels: {
      unknownLocation: "Unbekannte Standort",
      difficulty: "Schwierigkeit",
      altitude: "Höhe",
      temperature: "Temperatur",
      topography: "Topographie",
      threats: "Bedrohungen",
      resources: "Ressourcen",
      breakthroughs: "Breakthrough",
      threatList: threatsLabels.find((l) => l.language === "ge")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "ge")!.labels,
    },
  },
  {
    language: "po",
    labels: {
      unknownLocation: "Nieznana lokalizacja",
      difficulty: "Trudność",
      altitude: "Wysokość",
      temperature: "Temperatura",
      topography: "Topografia",
      threats: "Zagrody",
      resources: "Zasoby",
      breakthroughs: "Przejście",
      threatList: threatsLabels.find((l) => l.language === "po")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "po")!.labels,
    },
  },
  {
    language: "ru",
    labels: {
      unknownLocation: "Неизвестное местоположение",
      difficulty: "Сложность",
      altitude: "Высота",
      temperature: "Температура",
      topography: "Топография",
      threats: "Угрозы",
      resources: "Ресурсы",
      breakthroughs: "Прорывы",
      threatList: threatsLabels.find((l) => l.language === "ru")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "ru")!.labels,
    },
  },
  {
    language: "sc",
    labels: {
      unknownLocation: "未知地点",
      difficulty: "难度",
      altitude: "高度",
      temperature: "温度",
      topography: "地貌",
      threats: "威胁",
      resources: "资源",
      breakthroughs: "突破",
      threatList: threatsLabels.find((l) => l.language === "sc")!.labels,
      resourceList: resourcesLabels.find((l) => l.language === "sc")!.labels,
    },
  },
  {
    language: "sp",
    labels: {
      unknownLocation: "Localización desconocida",
      difficulty: "Dificultad",
      altitude: "Altitud",
      temperature: "Temperatura",
      topography: "Topografía",
      threats: "Amenazas",
      threatList: threatsLabels.find((l) => l.language === "sp")!.labels,
      resources: "Recursos",
      resourceList: resourcesLabels.find((l) => l.language === "sp")!.labels,
      breakthroughs: "Breakthrough",
    },
  },
];

const filterLabels: { language: string; labels: FilterLabels }[] = [
  {
    language: "en",
    labels: {
      clear: "Clear",
      apply: "Apply",
      coordinates: "Coordinates",
      versionId: "Version",
      versionsSection: "Versions",
      namedLocationIds: "Named Location",
      namedLocationsSection: "Named Locations",
      mapNames: "Map",
      mapSection: "Maps",
      topographyNames: "Topography",
      topographySection: "Topographies",
      breakthroughIds: "Breakthrough",
      breakthroughsSection: "Breakthroughs",
      altitude: "Altitude",
      concrete: "Concrete",
      water: "Water",
      metals: "Metals",
      rareMetals: "Rare Metals",
      temperature: "Temperature",
      meteors: "Meteors",
      dustDevils: "Dust Devils",
      dustStorms: "Dust Storms",
      coldWaves: "Cold Waves",
      difficulty: "Difficulty",
    },
  },
  {
    language: "br",
    labels: {
      clear: "Limpar",
      apply: "Aplicar",
      coordinates: "Coordenadas",
      versionId: "Versão",
      versionsSection: "Versões",
      namedLocationIds: "Localização",
      namedLocationsSection: "Localizações",
      mapNames: "Mapa",
      mapSection: "Mapas",
      topographyNames: "Topografia",
      topographySection: "Topografias",
      breakthroughIds: "Quebra-cabeça",
      breakthroughsSection: "Quebra-cabeças",
      altitude: "Altitude",
      concrete: "Concreto",
      water: "Água",
      metals: "Metais",
      rareMetals: "Metais raros",
      temperature: "Temperatura",
      meteors: "Meteoros",
      dustDevils: "Pesadelos de Pó",
      dustStorms: "Tempestades de Pó",
      coldWaves: "Ondas frias",
      difficulty: "Dificuldade",
    },
  },
  {
    language: "fr",
    labels: {
      clear: "Effacer",
      apply: "Appliquer",
      coordinates: "Coordonnées",
      versionId: "Version",
      versionsSection: "Versions",
      namedLocationIds: "Localisation",
      namedLocationsSection: "Localisations",
      mapNames: "Carte",
      mapSection: "Cartes",
      topographyNames: "Topographie",
      topographySection: "Topographies",
      breakthroughIds: "Breakthrough",
      breakthroughsSection: "Breakthroughs",
      altitude: "Altitude",
      concrete: "Béton",
      water: "Eau",
      metals: "Métaux",
      rareMetals: "Métaux rares",
      temperature: "Température",
      meteors: "Météores",
      dustDevils: "Poussières de poussière",
      dustStorms: "Tempêtes de poussière",
      coldWaves: "Vagues de froid",
      difficulty: "Difficulté",
    },
  },
  {
    language: "ge",
    labels: {
      clear: "Leeren",
      apply: "Anwenden",
      coordinates: "Koordinaten",
      versionId: "Version",
      versionsSection: "Versionen",
      namedLocationIds: "Lokalisierung",
      namedLocationsSection: "Lokalisierungen",
      mapNames: "Karte",
      mapSection: "Karten",
      topographyNames: "Topographie",
      topographySection: "Topographien",
      breakthroughIds: "Breakthrough",
      breakthroughsSection: "Breakthroughs",
      altitude: "Höhe",
      concrete: "Beton",
      water: "Wasser",
      metals: "Metalle",
      rareMetals: "Seltene Metalle",
      temperature: "Temperatur",
      meteors: "Meteore",
      dustDevils: "Staub-Teufel",
      dustStorms: "Staub-Sturm",
      coldWaves: "Kälte-Wellen",
      difficulty: "Schwierigkeit",
    },
  },
  {
    language: "po",
    labels: {
      clear: "Wyczyść",
      apply: "Zastosuj",
      coordinates: "Koordynaty",
      versionId: "Wersja",
      versionsSection: "Wersje",
      namedLocationIds: "Lokalizacja",
      namedLocationsSection: "Lokalizacje",
      mapNames: "Mapa",
      mapSection: "Mapy",
      topographyNames: "Topografia",
      topographySection: "Topografia",
      breakthroughIds: "Przejście",
      breakthroughsSection: "Przejście",
      altitude: "Wysokość",
      concrete: "Beton",
      water: "Woda",
      metals: "Metale",
      rareMetals: "Rare Metale",
      temperature: "Temperatura",
      meteors: "Meteory",
      dustDevils: "Pośpiech",
      dustStorms: "Burze pośpieszne",
      coldWaves: "Chłodne fale",
      difficulty: "Trudność",
    },
  },
  {
    language: "ru",
    labels: {
      clear: "Очистить",
      apply: "Применить",
      coordinates: "Координаты",
      versionId: "Версия",
      versionsSection: "Версии",
      namedLocationIds: "Названная локация",
      namedLocationsSection: "Названные локации",
      mapNames: "Карта",
      mapSection: "Карты",
      topographyNames: "Топография",
      topographySection: "Топографии",
      breakthroughIds: "Прорыв",
      breakthroughsSection: "Прорывы",
      altitude: "Высота",
      concrete: "Бетон",
      water: "Вода",
      metals: "Металлы",
      rareMetals: "Редкие металлы",
      temperature: "Температура",
      meteors: "Метеоры",
      dustDevils: "Пыльные дьяволы",
      dustStorms: "Пыльные бури",
      coldWaves: "Холодные волны",
      difficulty: "Сложность",
    },
  },
  {
    language: "sc",
    labels: {
      clear: "清除",
      apply: "应用",
      coordinates: "坐标",
      versionId: "版本",
      versionsSection: "版本",
      namedLocationIds: "命名位置",
      namedLocationsSection: "命名位置",
      mapNames: "地图",
      mapSection: "地图",
      topographyNames: "地貌",
      topographySection: "地貌",
      breakthroughIds: "突破",
      breakthroughsSection: "突破",
      altitude: "高度",
      concrete: "混凝土",
      water: "水",
      metals: "金属",
      rareMetals: "稀有金属",
      temperature: "温度",
      meteors: "陨石",
      dustDevils: "尘埃头",
      dustStorms: "尘埃风暴",
      coldWaves: "冷气流",
      difficulty: "难度",
    },
  },
  {
    language: "sp",
    labels: {
      clear: "Limpiar",
      apply: "Aplicar",
      coordinates: "Coordenadas",
      versionId: "Versión",
      versionsSection: "Versiones",
      namedLocationIds: "Localización",
      namedLocationsSection: "Localizaciones",
      mapNames: "Mapa",
      mapSection: "Mapas",
      topographyNames: "Topografía",
      topographySection: "Topografías",
      breakthroughIds: "Breakthrough",
      breakthroughsSection: "Breakthroughs",
      altitude: "Altitud",
      concrete: "Hormigón",
      water: "Agua",
      metals: "Metales",
      rareMetals: "Metales raros",
      temperature: "Temperatura",
      meteors: "Meteoros",
      dustDevils: "Pozos de polvo",
      dustStorms: "Tormentas de polvo",
      coldWaves: "Ondas frías",
      difficulty: "Dificultad",
    },
  },
];

export {
  languages,
  titleLabels,
  settingsLabels,
  threatsLabels,
  resourcesLabels,
  detailsLabels,
  filterLabels,
};
