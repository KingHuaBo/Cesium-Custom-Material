import * as Cesium from 'cesium';
import { PolylineTrailMaterialProperty } from './PolylineTrailMaterialProperty';
import  texture  from "../assets/texture.png";
import { MaterialProperty } from 'cesium';

interface PolylineTrailProperty {
    positions: Cesium.Cartesian3[],
    width?: number
    color?: Cesium.Color
}
export default class PolylineTrailGraphic extends Cesium.Entity {
    constructor(options: PolylineTrailProperty) {
        const material = new PolylineTrailMaterialProperty({
            color: options.color|| Cesium.Color.fromCssColorString('#f00'),
            duration: 3000,
            trailImage: texture,
        })
        super({
            polyline: {
                positions: options.positions,
                width: options.width || 2,
                material: material as MaterialProperty,
            },
        })
    }
}