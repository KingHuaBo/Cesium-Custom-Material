<!--
 * @Author: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @Date: 2023-06-09 15:36:01
 * @LastEditors: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @LastEditTime: 2023-06-15 10:56:33
 * @FilePath: \Cesium-Custom-Material\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Cesium-Custom-Material

# 简介
本项目是vue3的vue-cli构建的框架，使用的typescript开发，通过自定义材质，实现自定义特殊Marker。Cesium在场景中添加一个Marker可以用Entity或Primitive；针对这类，自定义材质需要不同的方式；项目中包含Primitive自定义材质和Entity自定义材质；

# 说明
使用vue3+ts开发，扩展通过类继承的方式扩展；
1. Primitive：waveGraphics继承Cesium.Primitive，在构造函数里通过super()里的geometryInstances、appearance自定义Primitive Marker；
2. Entity:以radarWaveGraphic为例，radarWaveGraphic继承Cesium.Entity,在radarWaveGraphic构造函数中通过material参数，传入自定义材质RadarWaveMaterialProperty的实例，RadarWaveMaterialProperty自定义材质需要重写isConstant、definitionChanged、getType、getValue、equals，同时在构造函数内，向Cesium.Material._materialCache内添加材质的GLSL及参数；
3. 思考：RadarWaveMaterialProperty是否可以通过继承Cesium.MaterialProperty方式扩展？还没有试过。。。

## 环境介绍
1. node版本 v14.18.1
2. npm版本 6.14.15
3. vue-cli 5.0.3
4. webpack 5.70.0
5. vue 3.2.13
6. cesium 1.91.0
7. 开发工具 vscode

## 还原安装依赖包
```
npm install
```

### 启动项目
```
npm run serve
```

### 发布打包项目
```
npm run build
```

### 能力有限，如有帮助，欢迎赏Issues or Star
