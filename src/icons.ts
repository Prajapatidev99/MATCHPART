import { Smartphone, Battery, Cpu, Square, Camera, HardDrive, Layers, Volume2 } from 'lucide-react';
import { PartCategory } from './data';
import React from 'react';

export const CategoryIconMap: Record<PartCategory, React.ElementType> = {
  combo: Smartphone,
  battery: Battery,
  cc_board: Cpu,
  frame: Square,
  camera_glass: Camera,
  back_cover: HardDrive, // representation
  oca_glass: Layers,
  speaker: Volume2,
  flex: Layers
};
