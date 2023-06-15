import { Material, Color } from "cesium";
import * as Cesium from 'cesium'
interface WaveMaterialOption{
    color:string,
    duration:number
} 
const source = "czm_material czm_getMaterial(czm_materialInput materialInput)\n" +
    "{\n" +
    "czm_material material = czm_getDefaultMaterial(materialInput);\n" +
    "material.diffuse = 1.5 * color.rgb;\n" +
    "vec2 st = materialInput.st;\n" +
    "float dis = distance(st, vec2(0.5, 0.5));\n" +
    "float per = fract(time);\n" +
    "if(dis > per * 0.5){\n" +
    "material.alpha = 0.0;\n" +
    "discard;\n" +
    "}else {\n" +
    "material.alpha = color.a  * dis / per / 1.0;\n" +
    "}\n" +
    "return material;\n" +
    "}";
class WaveMaterial extends Material {
    private _color: string|undefined;
    private duration: number|undefined;
    private _time: number;

    constructor(waveMaterialOption?: WaveMaterialOption) {
        super();
        Cesium.WaveMaterialProperty = WaveMaterialProperty;
        Cesium.Material.WaveMaterialProperty = 'AnimationPoint';
        Cesium.Material.WaveMaterialPropertySource = source;
        Cesium.Material._materialCache.addMaterial(Cesium.Material.WaveMaterialPropertyType, {
            fabric: {
                type: Cesium.Material.WaveMaterialPropertyType,
                uniforms: {
                    color: new Cesium.Color(1.0, 0.0, 0.0, 1),
                    time: 0
                },
                source: Cesium.Material.WaveMaterialPropertySource
            },
            translucent: function (material) {
                return true;
            }
        })
        this._color = waveMaterialOption?.color;
        this.duration = waveMaterialOption?.duration;
        this._time = (new Date()).getTime();
    }

    public get isConstant(): Color {
        return this._color;
    }
    getType(): string {
        return "AnimationPoint";
    }
    getValue(time: any, result: any): any {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    }
    equals(other?: Cesium.Property): boolean {
        return (
            this === other ||
            (other instanceof WaveMaterial &&
                Cesium.Property.equals(this._color, other._color))
        );
    }

}
export default WaveMaterial