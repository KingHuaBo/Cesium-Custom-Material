/*
 * @Author: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @Date: 2023-06-12 21:03:25
 * @LastEditors: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @LastEditTime: 2023-06-15 09:29:44
 * @FilePath: \cesium-vue3-typescript-static-webpack5\src\customEntitys\RadarWaveMaterialProperty.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as Cesium from 'cesium'
export interface PMaterialGrass {
    color: Cesium.Color,
    speed: number
}
const defaultOption: PMaterialGrass = {
    color: Cesium.Color.PINK,
    speed: 4
}
const RadarWaveMaterialSource = `
uniform vec4 color;
uniform float speed;

#define PI 3.14159265359

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec2 pos = st - vec2(0.5);
  float time = czm_frameNumber * speed / 1000.0 ;
  float r = length(pos);
  float t = atan(pos.y, pos.x) - time * 2.5;
  float a = (atan(sin(t), cos(t)) + PI)/(2.0*PI);
  float ta = 0.5;
  float v = smoothstep(ta-0.05,ta+0.05,a) * smoothstep(ta+0.05,ta-0.05,a);
  vec3 flagColor = color.rgb * v;
  float blink = pow(sin(time*1.5)*0.5+0.5, 0.8);
  flagColor = color.rgb *  pow(a, 8.0*(.2+blink))*(sin(r*500.0)*.5+.5) ;
  flagColor = flagColor * pow(r, 0.4);
  material.alpha = length(flagColor) * 1.3;
  material.diffuse = flagColor * 3.0;
  return material;
}
`
//地面雷达波效果
export class RadarWaveMaterialProperty {
    _color: Cesium.Color;
    _speed: number;
    constructor(options = defaultOption) {
        Cesium.Material.RadarWaveType = 'RadarWave'
        Cesium.Material._materialCache.addMaterial(Cesium.Material.RadarWaveType, {
            fabric: {
                type: Cesium.Material.RadarWaveType,
                uniforms: {
                    color: options.color,
                    speed: options.speed,
                },
                source: RadarWaveMaterialSource,
            },
            translucent: function (material) {
                return true
            },
        })
        this._color = options.color;
        this._speed = options.speed;
    }

    get isConstant(): boolean {
        return false;
    }
    get definitionChanged() {
        return this._definitionChanged
    }

    getType(time: any): string {
        return Cesium.Material.RadarWaveType
    }

    getValue(time: any, result: any) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.speed = this._speed;
        result.color = this._color;
        return result;
    }
    
    equals(other: any) {
        return (
            this === other ||
            (other instanceof MaterialGrass &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed))
        )
    }
}