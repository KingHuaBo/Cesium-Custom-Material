import * as Cesium from "cesium";
interface WaveGraphicsOption {
    radius: number,
    lng: number,
    lat: number,
    color?: any
}
const source = `uniform vec4 color;
                uniform float speed;
                uniform float count;
                uniform float gradient;
                czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                czm_material material = czm_getDefaultMaterial(materialInput);
                material.diffuse = 1.5 * color.rgb;
                vec2 st = materialInput.st;
                float dis = distance(st, vec2(0.5, 0.5));
                float per = fract(czm_frameNumber * speed / 1000.0);
                if(count == 1.0){
                    if(dis > per * 0.5){
                    discard;
                    }else {
                    material.alpha = color.a  * dis / per / 2.0;
                    }
                } else {
                    vec3 str = materialInput.str;
                    if(abs(str.z)  > 0.001){
                    discard;
                    }
                    if(dis > 0.5){
                    discard;
                    } else {
                    float perDis = 0.5 / count;
                    float disNum;
                    float bl = 0.0;
                    for(int i = 0; i <= 999; i++){
                        if(float(i) <= count){
                        disNum = perDis * float(i) - dis + per / count;
                        if(disNum > 0.0){
                            if(disNum < perDis){
                            bl = 1.0 - disNum / perDis;
                            }
                            else if(disNum - perDis < perDis){
                            bl = 1.0 - abs(1.0 - disNum / perDis);
                            }
                            material.alpha = pow(bl,(1.0 + 10.0 * (1.0 - gradient)));
                        }
                        }
                    }
                    }
                }
                return material;
            }`;
class waveGraphics extends Cesium.Primitive {
    constructor(options: WaveGraphicsOption) {
        super({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.CircleGeometry({
                    center: Cesium.Cartesian3.fromDegrees(options.lng, options.lat),
                    radius: options.radius
                }
                ),
                id: 'object returned when this instance is picked and to get/set per-instance attributes'
            }),
            appearance: new Cesium.MaterialAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: 'VtxfShader1',
                        uniforms: {
                            color: options.color ? options.color : Cesium.Color.YELLOW,
                            speed: 13.0,
                            count: 4,
                            gradient: 0.2,
                        },
                        source: source
                    },
                    translucent: false
                }),
                faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
                closed: true // 是否为封闭体，实际上执行的是是否进行背面裁剪
            }),
        });
    }


}
export default waveGraphics