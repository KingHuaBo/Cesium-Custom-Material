<!--
 * @Author: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @Date: 2023-06-09 15:36:02
 * @LastEditors: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @LastEditTime: 2023-06-14 22:50:41
 * @FilePath: \cesium-vue3-typescript-static-webpack5\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @Date: 2023-06-09 15:36:02
 * @LastEditors: onway2000 8485249+onway2000@user.noreply.gitee.com
 * @LastEditTime: 2023-06-14 21:46:15
 * @FilePath: \cesium-vue3-typescript-static-webpack5\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts">
(window as any).CESIUM_BASE_URL = "/Cesium/";
import { defineComponent, version } from "vue";

import * as Cesium from "cesium";

import waveGraphics from './customPrimitives/waveGraphics'
import radarWaveGraphic from "./customEntitys/radarWaveGraphic";
import PolylineTrailGraphic from "./customEntitys/PolylineTrailGraphic";

export default defineComponent({
  name: "App",
  mounted() {
    var viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
      }),
      baseLayerPicker: false,
      geocoder: false
    });

    //通过primitive自定义
    viewer.scene.primitives.add(new waveGraphics({
      lng: 120,
      lat: 30,
      radius: 120000,
      color: Cesium.Color.RED
    }));

    //通过entity自定义
    const pEntity = new radarWaveGraphic({
      lng: 103,
      lat: 30,
      radius: 100000.0,
      color: Cesium.Color.RED
    })
    viewer.entities.add(pEntity);
    viewer.zoomTo(pEntity);

    const customEntity = new PolylineTrailGraphic({
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([116.438094, 39.939465, 0, 116.438094, 39.939465, 9000]),
      color: Cesium.Color.BLUE,
      width: 8
    })
    viewer.entities.add(customEntity);
    viewer.zoomTo(customEntity);
  }
});
</script>

<style lang="scss">
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
}

body {
  background-color: #709b90;
  font-family: Helvetica, Arial, sans-serif;
}

html,
body {
  margin: 0 auto;
}

#cesiumContainer {
  height: 100vh;

}
</style>
