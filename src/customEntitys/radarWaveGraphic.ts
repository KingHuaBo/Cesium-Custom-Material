/*
 * @Author: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @Date: 2023-06-14 15:36:44
 * @LastEditors: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @LastEditTime: 2023-06-14 17:07:45
 * @FilePath: \cesium-vue3-typescript-static-webpack5\src\customEntitys\radarWaveGraphic.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as Cesium from 'cesium'
import { RadarWaveMaterialProperty } from "./RadarWaveMaterialProperty";
/**
 * Graphic的属性
 */
interface radarWaveGraphicProperty {
    color?: Cesium.Color,
    speed?: number,
    name?: string
    radius: number,
    lng: number,
    lat: number,
}
/**
 * 默认值
 */
const defaultOption: radarWaveGraphicProperty = {
    color: Cesium.Color.PINK,
    speed: 4.0,
    name: '雷达扫描波',
    radius: 100000.0,
    lng: 103,
    lat: 30
}
/**
 * 材质
 */

export default class radarWaveGraphic extends Cesium.Entity {
    constructor(options :radarWaveGraphicProperty) {
        const pMaterial = new RadarWaveMaterialProperty({
            color: options.color || Cesium.Color.BLUE,
            speed: options.speed || 4.0
        })

        super({
            position: Cesium.Cartesian3.fromDegrees(options.lng, options.lat),
            name: options.name,
            ellipse: {
                semiMinorAxis: options.radius,
                semiMajorAxis: options.radius,
                material: pMaterial
            },
        })
    }
}