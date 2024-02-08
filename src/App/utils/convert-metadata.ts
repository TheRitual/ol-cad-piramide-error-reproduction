import Metadata from "../types/metadata.type";

interface ConvertMetadataProps {
  meta: Metadata;
}

interface ConvertMetadataReturn {
  extent: [number, number, number, number];
  maxX: number;
  maxY: number,
  minX: number;
  minY: number;
  origin: [number, number];
  resolutions: number[];
  maxResolution: number;
  minResolution: number;
  tileSize: [number, number];
  center: [number, number];
}

const convertMetadata = ({ meta }: ConvertMetadataProps): ConvertMetadataReturn => {
  const minX = meta.minX || 0;
  const maxX = meta.maxX || 0;
  const minY = meta.minY || 0;
  const maxY = meta.maxY || 0;
  const center = [Number(minX + maxX) / 2, Number(minY + maxY) / 2];
  return {
    extent: [minX, minY, maxX, maxY],
    maxX,
    maxY,
    minX,
    minY,
    origin: [minX, maxY],
    resolutions: meta.resolutions ?? [],
    maxResolution: Math.max(...meta.resolutions),
    minResolution: Math.min(...meta.resolutions),
    tileSize: [meta.tileSize ?? 512, meta.tileSize ?? 512],
    center: [center[0], center[1]],
  }
}

export default convertMetadata;