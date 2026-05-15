export type PartCategory = 'combo' | 'battery' | 'cc_board' | 'frame' | 'camera_glass' | 'back_cover' | 'oca_glass' | 'speaker' | 'flex';

export interface CompatibilityCluster {
  id: string;
  category: PartCategory;
  brand: string;
  baseModel: string;
  compatibleModels: string[];
  notes?: string;
  addedAt?: string;
}

export const compatibilityData: CompatibilityCluster[] = [
  // Combos
  { id: "c1", category: "combo", brand: "Realme", baseModel: "Realme 5", compatibleModels: ["Realme 5i", "Realme 5s", "Realme C3", "Narzo 10A"], addedAt: "2026-05-14", notes: "IPS LCD, 60Hz" },
  { id: "c2", category: "combo", brand: "Realme", baseModel: "Realme C11", compatibleModels: ["Realme C12", "Realme C15", "Poco C31", "Redmi 9 Activ"], addedAt: "2026-05-10" },
  { id: "c3", category: "combo", brand: "Xiaomi", baseModel: "Redmi Note 9 Pro", compatibleModels: ["Redmi Note 9 Pro Max", "Poco M2 Pro", "Redmi Note 9S"], addedAt: "2026-05-11", notes: "Punch hole display" },
  { id: "c4", category: "combo", brand: "Oppo", baseModel: "Oppo A3s", compatibleModels: ["Oppo A5", "Realme C1", "Realme 2"], addedAt: "2026-04-20" },
  { id: "c5", category: "combo", brand: "Vivo", baseModel: "Vivo Y11", compatibleModels: ["Vivo Y12", "Vivo Y15", "Vivo Y17"], addedAt: "2026-05-01" },
  { id: "c6", category: "combo", brand: "Xiaomi", baseModel: "Redmi 9A Combo", compatibleModels: ["Redmi 9C", "Poco C3", "Redmi 10A"], addedAt: "2026-05-15", notes: "IPS LCD" },
  
  // Batteries
  { id: "b1", category: "battery", brand: "Xiaomi", baseModel: "BN51 (Redmi 8)", compatibleModels: ["Redmi 8", "Redmi 8A", "Redmi 8A Dual"], addedAt: "2026-05-12", notes: "5000mAh" },
  { id: "b2", category: "battery", brand: "Realme", baseModel: "BLP729 (Realme 5)", compatibleModels: ["Realme 5", "Realme 5i", "Realme 5s", "Realme C3"], addedAt: "2026-05-13", notes: "5000mAh" },
  { id: "b3", category: "battery", brand: "Samsung", baseModel: "EB-BA505ABN (A50)", compatibleModels: ["Samsung A50", "Samsung A50s", "Samsung A30s"], addedAt: "2026-05-14" },
  { id: "b4", category: "battery", brand: "Xiaomi", baseModel: "BN56 (Redmi 9A)", compatibleModels: ["Redmi 9C", "Poco C3", "Redmi 10A"], addedAt: "2026-05-15", notes: "5000mAh" },

  // CC Boards
  { id: "cc1", category: "cc_board", brand: "Xiaomi", baseModel: "Redmi Note 8 CC Board", compatibleModels: ["Redmi Note 8", "Redmi Note 8T"], addedAt: "2026-05-09", notes: "Type-C, Mic included" },
  { id: "cc2", category: "cc_board", brand: "Vivo", baseModel: "Vivo Y20 CC Board", compatibleModels: ["Vivo Y20", "Vivo Y20i", "Vivo Y20s", "Vivo Y12s"], addedAt: "2026-05-08", notes: "Micro-USB" },
  { id: "cc3", category: "cc_board", brand: "Xiaomi", baseModel: "Redmi 9A CC Board", compatibleModels: ["Redmi 9A Sport"], addedAt: "2026-05-15", notes: "Micro-USB" },

  // Frames
  { id: "f1", category: "frame", brand: "Samsung", baseModel: "Samsung M31 Frame", compatibleModels: ["Samsung M31", "Samsung F41"], addedAt: "2026-05-05", notes: "Includes volume flex cutout" },
  { id: "f2", category: "frame", brand: "Xiaomi", baseModel: "Redmi 9A Middle Frame", compatibleModels: ["Redmi 9A Sport", "Redmi 9i"], addedAt: "2026-05-15" },

  // Speaker
  { id: "sp1", category: "speaker", brand: "Xiaomi", baseModel: "Redmi 9A Ringer/Speaker", compatibleModels: ["Redmi 9C", "Poco C3", "Redmi 10A"], addedAt: "2026-05-15" },

  // Flex
  { id: "fl1", category: "flex", brand: "Xiaomi", baseModel: "Redmi 9A Main Flex", compatibleModels: ["Redmi 9A Sport"], addedAt: "2026-05-15", notes: "Motherboard to CC Board" },
];

export const categoriesMap: Record<PartCategory, { label: string; icon: string; color: string }> = {
  combo: { label: "Display Combo", icon: "smartphone", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  battery: { label: "Battery", icon: "battery-charging", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  cc_board: { label: "CC Board", icon: "cpu", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  frame: { label: "Middle Frame", icon: "square", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  camera_glass: { label: "Camera Glass", icon: "camera", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  back_cover: { label: "Back Cover", icon: "shield", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  oca_glass: { label: "OCA / UV Glass", icon: "layers", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  speaker: { label: "Speaker", icon: "volume-2", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  flex: { label: "Flex Cable", icon: "layers", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
};

