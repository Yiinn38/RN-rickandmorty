# Rick and Morty Explorer

Una aplicación mobile profesional que permite explorar el universo de Rick and Morty a través de una interfaz intuitiva y moderna. Busca personajes, descubre ubicaciones y explora episodios de la serie.

## Características

- **Búsqueda avanzada** de personajes por nombre, especie, estado y género
- **Exploración de ubicaciones** con información sobre residentes
- **Catálogo de episodios** con detalles del elenco
- **Interfaz moderna y responsive** con animaciones suaves
- **Datos en tiempo real** de la API oficial de Rick and Morty
- **Performance optimizado** con debounce en búsquedas

##  Estructura del Proyecto

```
app/
├── _layout.tsx                    # Configuración de routing principal
├── index.tsx                      # Punto de entrada
│
├── screens/
│   ├── ExplorerScreen.tsx        # Pantalla principal - lista y filtros
│   └── DetailModal.tsx            # Modal con detalles del item seleccionado
│
├── components/
│   ├── Header/
│   │   └── ExplorerHeader.tsx    # Encabezado con búsqueda y chips
│   │
│   ├── Cards/
│   │   ├── CharacterCard.tsx     # Card para personajes
│   │   ├── LocationCard.tsx      # Card para ubicaciones
│   │   └── EpisodeCard.tsx       # Card para episodios
│   │
│   ├── Details/
│   │   ├── CharacterDetail.tsx   # Detalle de personaje
│   │   ├── LocationDetail.tsx    # Detalle de ubicación
│   │   └── EpisodeDetail.tsx     # Detalle de episodio
│   │
│   └── Common/
│       ├── Badge.tsx             # Componente de etiqueta
│       ├── InfoTile.tsx          # Tarjeta de información
│       ├── InfoMini.tsx          # Información compacta
│       ├── ContextCard.tsx       # Tarjeta de contexto
│       ├── BottomTabs.tsx        # Navegación inferior
│       ├── FilterSheet.tsx       # Modal de filtros
│       └── LoadingScreen.tsx     # Pantalla de carga
│
├── hooks/
│   └── useRickAndMortyData.ts   # Custom hook - lógica de estado y API
│
├── services/
│   └── api.ts                    # Funciones de API centralizado
│
├── constants/
│   ├── config.ts                 # Configuración global y constantes
│   ├── colors.ts                 # Paleta de colores
│   ├── styles.ts                 # Estilos base y sombras
│   └── tabs.ts                   # Configuración de tabs
│
├── types/
│   └── index.ts                  # Interfaces y tipos TypeScript
│
└── utils/
    └── helpers.ts                # Funciones auxiliares
```

##  Instalación y Setup

### Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Expo CLI
- Android Studio / Xcode (opcional, para emulador)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-repositorio>
   cd RN-rickandmorty
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Verificar linting**
   ```bash
   npm run lint
   ```

4. **Iniciar la aplicación**
   ```bash
   npm start
   ```

## Ejecutar la Aplicación

### Desde Expo Go
```bash
npm start
# Escanear código QR con tu teléfono (Expo Go app)
```

### Android Emulator
```bash
npm run android
# o
npm start -- --android
```

### iOS Simulator
```bash
npm run ios
# o
npm start -- --ios
```

### Web
```bash
npm run web
# o
npm start -- --web
```

##  Arquitectura y Patrones

### Separación de Responsabilidades

| Módulo | Responsabilidad |
|--------|-----------------|
| **screens/** | Orquestación de componentes y lógica de navegación |
| **components/** | Componentes UI reutilizables y sin lógica de negocio |
| **hooks/** | Lógica compartida (estado, efectos, llamadas API) |
| **services/api.ts** | Todas las llamadas a API y manejo de errores |
| **constants/** | Valores globales, colores, configuración |
| **types/** | Definiciones de TypeScript |
| **utils/** | Funciones auxiliares y helpers |

### Flujo de Datos

```
User Input → Screen Component
    ↓
useRickAndMortyData Hook
    ↓
services/api.ts (fetch data)
    ↓
State Update → Re-render Components
    ↓
UI Update
```

##  Componentes Principales

### Screens

#### **ExplorerScreen**
Pantalla principal que maneja:
- Listado de items (personajes, ubicaciones, episodios)
- Cambio de tabs
- Búsqueda y filtros
- Abrir modal de detalles

#### **DetailModal**
Modal que muestra:
- Detalles completos del item seleccionado
- Información relacionada
- Personajes asociados (para ubicaciones/episodios)
- Episodios relacionados (para personajes)

### Cards

#### **CharacterCard**
```tsx
<CharacterCard 
  item={character} 
  onPress={() => setSelected(character)} 
/>
```
Muestra: imagen, nombre, ubicación, estado (vivo/muerto)

#### **LocationCard**
```tsx
<LocationCard 
  item={location} 
  onPress={() => setSelected(location)} 
/>
```
Muestra: nombre, tipo, dimensión

#### **EpisodeCard**
```tsx
<EpisodeCard 
  item={episode} 
  onPress={() => setSelected(episode)} 
/>
```
Muestra: código, nombre, fecha de aire, portal visual

### Common Components

#### **Badge**
```tsx
<Badge label="Human" active={true} />
```
Etiqueta con dos estados (activo/inactivo)

#### **InfoTile**
```tsx
<InfoTile 
  label="Origin" 
  value="Earth" 
  icon="planet-outline"
  onPress={() => {}} 
/>
```
Información interactiva con ícono

#### **ContextCard**
```tsx
<ContextCard 
  title="History" 
  icon="history"
  copy="Interdimensional telemetry..." 
/>
```
Tarjeta de contexto con descripción

#### **BottomTabs**
```tsx
<BottomTabs 
  activeTab={tab} 
  onChange={handleChangeTab} 
/>
```
Navegación inferior entre secciones

#### **FilterSheet**
```tsx
<FilterSheet 
  visible={filtersOpen}
  statusFilter={status}
  genderFilter={gender}
  onStatus={setStatus}
  onGender={setGender}
  onClose={() => setFiltersOpen(false)}
/>
```
Modal con filtros para personajes

##  Custom Hooks

### **useRickAndMortyData**

Hook personalizado que gestiona toda la lógica de la aplicación:

```tsx
const {
  tab,                    // Tab activo: 'characters' | 'locations' | 'episodes'
  setTab,                 // Cambiar tab
  characters,             // Array de personajes
  locations,              // Array de ubicaciones
  episodes,               // Array de episodios
  loading,                // Estado de carga
  query,                  // Texto de búsqueda
  setQuery,               // Actualizar búsqueda
  filter,                 // Filtro activo (especie, tipo, temporada)
  setFilter,              // Cambiar filtro
  statusFilter,           // Filtro de estado (vivo/muerto)
  setStatusFilter,        // Cambiar filtro de estado
  genderFilter,           // Filtro de género
  setGenderFilter,        // Cambiar filtro de género
  filteredCharacters,     // Personajes filtrados
  filteredLocations,      // Ubicaciones filtradas
  filteredEpisodes,       // Episodios filtrados
  data,                   // Data actual según tab
  changeTab,              // Función para cambiar tab y resetear filtros
} = useRickAndMortyData();
```

**Características:**
- Carga inicial de datos con Promise.allSettled
- Búsqueda con debounce (260ms)
- Filtrado local de datos
- Manejo de errores
- Cleanup de efectos

##  Servicios API

### **api.ts**

Funciones disponibles:

#### **fetchAll(endpoint)**
Obtiene todos los resultados paginados de un endpoint
```tsx
const locations = await fetchAll('location');
const episodes = await fetchAll('episode');
```

#### **fetchCharacters(name?, species?, status?, gender?)**
Búsqueda avanzada de personajes
```tsx
const results = await fetchCharacters('rick', 'Human', 'Alive');
```

#### **fetchLocations()**
Obtiene todas las ubicaciones
```tsx
const locations = await fetchLocations();
```

#### **fetchEpisodes()**
Obtiene todos los episodios
```tsx
const episodes = await fetchEpisodes();
```

#### **fetchInitialCharacters()**
Obtiene la primera página de personajes
```tsx
const response = await fetchInitialCharacters();
```

##  Constantes y Temas

### Colores (constants/colors.ts)

```tsx
const colors = {
  bg: '#f8f7f4',           // Fondo principal
  ink: '#121614',          // Texto principal
  muted: '#68766e',        // Texto secundario
  soft: '#efefec',         // Fondo suave
  glass: 'rgba(255,255,255,0.72)',  // Efecto vidrio
  green: '#2fd66b',        // Verde principal
  greenDeep: '#1b6f43',    // Verde oscuro
  greenDark: '#104c2b',    // Verde muy oscuro
  mint: '#def7e5',         // Mint
  line: '#e8e6e0',         // Líneas
};
```

### Configuración (constants/config.ts)

```tsx
export const API_BASE = 'https://rickandmortyapi.com/api';
export const SPECIES = ['All', 'Human', 'Alien', 'Mythological'];
export const LOCATIONS = ['All', 'Planet', 'Space Station', 'Microverse'];
export const SEASONS = ['All', 'S01', 'S02', 'S03', 'S04', 'S05'];
export const STATUS = ['All', 'Alive', 'Dead', 'Unknown'];
export const GENDERS = ['All', 'Female', 'Male', 'Genderless', 'Unknown'];
export const SEARCH_DELAY_MS = 260;
```

##  Tipos TypeScript

### Character
```tsx
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
}
```

### Location
```tsx
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}
```

### Episode
```tsx
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}
```

##  Linting y Calidad de Código

```bash
# Ejecutar ESLint
npm run lint

# El proyecto mantiene zero warnings
```

##  Recursos

- [API Rick and Morty](https://rickandmortyapi.com)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
