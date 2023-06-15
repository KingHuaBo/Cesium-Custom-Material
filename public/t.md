export interface PMaterialGrass{

grassColor?: any,

dirtColor?: any,

patchiness?: number

}

对于绿地纹理我们叫 MaterialGrass

```javascript

import { MaterialProperty } from "./MaterialProperty";

const defaultOption: PMaterialGrass = {

grassColor: new Cesium.Color(0.25, 0.4, 0.1, 1.0),

dirtColor: new Cesium.Color(0.1, 0.1, 0.1, 1.0),

patchiness: 1.5

}

//草地效果

export class MaterialGrass extends MaterialProperty {

protected _getType(option: any): string {

return "MaterialGrass"

}

constructor(option = defaultOption) {

super(MaterialGrass.prototype, defaultOption, option);

}

protected _getTranslucent(material: any) {

var uniforms = material.uniforms

return uniforms.grassColor.alpha < 1.0 || uniforms.dirtColor.alpha < 1.0

}

protected getSource(option: any): string {

return `

uniform vec4 grassColor;

uniform vec4 dirtColor;

uniform float patchiness;

czm_material czm_getMaterial(czm_materialInput materialInput){

czm_material material = czm_getDefaultMaterial(materialInput);



vec2 st = materialInput.st;

float noise1 = (czm_snoise(st * patchiness * 1.0)) * 1.0;

float noise2 = (czm_snoise(st * patchiness * 2.0)) * 0.5;

float noise3 = (czm_snoise(st * patchiness * 4.0)) * 0.25;

float noise = sin(noise1 + noise2 + noise3) * 0.1;



vec4 color = mix(grassColor, dirtColor, noise);

作者：haibalai
链接：https://www.jianshu.com/p/0d82a969add8
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。