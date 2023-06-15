import * as Cesium from 'cesium'
export default class SpritelineMaterialProperty {
  name: string
  img: string
 
  definitionChanged = new Cesium.Event()
  isConstant = false
 
  constructor(name: string = 'spriteline1') {
    this.name = name
    this.img = '/api/textures/spriteline1.png'
    ;(Cesium.Material as any)._materialCache.addMaterial(
      'SpritelineMaterialProperty',
      {
        fabric: {
          type: 'SpritelineMaterialProperty',
          uniforms: {
            img: this.img
          },
          source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
          // 生成默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          vec2 st = materialInput.st;
          // 定义动画持续时间,从0到1
          float durationTime = 2.0;
          // 获取当前帧数,fract(x) 返回x的小数部分
          float time = fract(czm_frameNumber / (60.0 * durationTime));
          // 根据uv采样颜色
          vec4 color = texture2D(img,vec2(fract(st.s - time),st.t));
          material.alpha = color.a;
          material.diffuse = color.rgb;
          return material;
        }
        `
        }
      }
    )
  }
  getType(time?: Cesium.JulianDate) {
    return 'SpritelineMaterialProperty'
  }
  getValue(time: Cesium.JulianDate, result: { [key: string]: number }) {
    return result
  }
  equals(other: Cesium.Property): boolean {
    // 判断两个材质是否相等
    return (
      other instanceof SpritelineMaterialProperty && this.name === other.name
    )
  }
}