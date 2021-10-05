<template>
  <div id="EditorTool" class="hight_100">
    <div id="Stage" ref="ViewRef"></div>
    <FootUi
      @common="onCommon"
      :mode="original.mode"
      :step="original.step"
      :readOnly="original.readOnly"
    />
    <LayerUi
      class="right-top"
      :areas="areasRef"
      @common="onCommon"
      :readOnly="original.readOnly"
    />
    <TopUi
      id="TopUi"
      :save="!original.readOnly"
      :step="original.step"
      @ui="topUiHandler"
      >{{ info.name }}</TopUi
    >
    <DetailUi
      :type="original.selAeeaType"
      v-model:tag="scopeAreaData.tag"
      v-model:realWidth="scopeAreaData.realWidth"
      :realHeight="scopeAreaData.realHeight"
      @change-realHeight="changeAreaRealHeight"
      v-model:color="scopeAreaData.color"
      v-model:unit="scopeAreaData.unit"
      v-model:elevation="scopeAreaData.elevation"
      v-model:direction="scopeAreaData.direction"
      :scale="scopeAreaData.scale"
      :scopeAreaEditEnable="scopeArea?.editEnable"
      v-model:selectAreaTag="selectAreaData.tag"
      v-model:selectAreaColor="selectAreaData.color"
      v-model:spaceHeight="selectAreaData.spaceHeight"
      :selectAreaW="selectAreaData.realWidth"
      :selectAreaH="selectAreaData.realHeight"
      :selectRealOffsetX="selectAreaData.realOffsetX"
      :selectRealOffsetY="selectAreaData.realOffsetY"
      :selectEditEnable="selectAreaRef?.editEnable"
      :info="info"
      :readOnly="original.readOnly"
      @readMe="onReadMe"
    />
    <div class="help-bn bn" @pointerup.stop="original.helpDefault = true">
      <At2Icon type="help" width="24" height="24" />
    </div>
    <AltitudeMod v-if="readMeStore.mod == 'altitude'" @readMe="onReadMe" />
    <DirectionMod
      v-else-if="readMeStore.mod == 'direction'"
      @readMe="onReadMe"
    />
    <HeightMod v-else-if="readMeStore.mod == 'height'" @readMe="onReadMe" />
    <TeachingMod
      :helpDefault="original.helpDefault"
      @x="original.helpDefault = false"
      v-if="original.helpDefault"
    />
    <ExitDialig v-if="original.exitxitDialigShow" @event="exitDialigHandler"
      >確定離開?</ExitDialig
    >
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import { createViewPort } from './viewPortHandler'
import { postEvent, sdkListenerHandler } from './sdkMessageHandler'
import { areaLayerHandler } from './areaLayerHandler'
import scopeAreaHandler from './scopeAreaHandler'
import partAreaHandler from './partAreaHandler'
import metaHandler from './metaHandler'
import metaInSetHeadler from './metaInSetHeadler'
import FootUi from '@/components/editor/FootUi'
import LayerUi from '@/components/editor/LayerUi'
import DetailUi from '@/components/editor/DetailUi'
import TopUi from '@/components/editor/TopUi'
import TeachingMod from '@/components/editor/TeachingMod'
import AltitudeMod from '@/components/editor/readBd/AltitudeMod'
import DirectionMod from '@/components/editor/readBd/DirectionMod'
import HeightMod from '@/components/editor/readBd/HeightMod'
import ExitDialig from '@/components/ExitDialig'
import At2Icon from '~at2@/components/At2Icon'
import { numberToHex } from '@/tools/colorTools'
import { useUrlSearchParams } from '@vueuse/core'
export default {
  name: 'AppEditor',
  components: {
    FootUi,
    LayerUi,
    DetailUi,
    TopUi,
    ExitDialig,
    TeachingMod,
    AltitudeMod,
    DirectionMod,
    HeightMod,
    At2Icon,
  },
  setup() {
    const { lang, readOnly } = useUrlSearchParams() || {}
    const original = reactive({
      mode: 'sel',
      step: 1,
      selAeeaType: 0,
      readOnly: readOnly != undefined,
      lang,
      exitxitDialigShow: false,
      helpDefault:
        localStorage?.getItem('helpDefault') !== 'false' ? true : false,
    })

    const readMeStore = reactive({
      mod: null, //direction altitude height
    })

    const {
      scopeAreaData,
      scopeArea,
      changeAreaRealHeight,
    } = scopeAreaHandler() //處理 總區域 的變化
    const { selectAreaRef, selectAreaData } = partAreaHandler(scopeAreaData)
    const areasRef = ref([])
    const { ViewRef, viewportRef, create, info } = createViewPort(
      original.readOnly,
    )
    const { getAreaMeta } = metaHandler(viewportRef, scopeArea, scopeAreaData)
    const { setAreaMeta } = metaInSetHeadler(
      original,
      scopeAreaData,
      viewportRef,
    )
    const onCommon = ({ common, data }) => {
      // console.log('#onCommon', common, data)
      switch (common) {
        case 'sel':
          original.mode = 'sel'
          break
        case 'fit':
          viewportRef.value.zoomTofit(100 + 100, 360 + 100)
          break
        case 'zoom':
          viewportRef.value.zoom(data)
          break
        case 'mov':
          original.mode = 'mov'
          break
        case 'scope':
          original.mode = 'scope'
          viewportRef.value.drawMode = true
          break
        case 'area':
          original.mode = 'area'
          viewportRef.value.drawMode = true
          break
        case 'del':
          viewportRef.value.removeArea(data)
          break
        case 'lock':
          data.editEnable = !data.editEnable
          data.editEnable || (viewportRef.value.targetObj = null) //鎖定時
          data.editEnable && viewportRef.value.selectItem(data)
          break
        case 'select-area':
          original.mode = 'sel'
          viewportRef.value.selectItem(data)
          break
      }
      viewportRef.value.selectEnable = original.mode != 'mov'
    }

    onMounted(() => {
      localStorage.setItem('helpDefault', false)
      sdkListenerHandler({
        setting: setting => {
          //收到設定創建viewerPort
          scopeAreaData.color = numberToHex(setting.aeraSetting.lineColor)
          create(setting)
        },
        getAreaMeta,
        setAreaMeta,
      })
      postEvent('ready')
    })

    watch(viewportRef, () => {
      areaLayerHandler(viewportRef.value, areasRef)
      viewportRef.value.on('add-area', area => {
        switch (original.mode) {
          case 'scope':
            area.userData.isRoot = true
            scopeArea.value = area
            original.selAeeaType = 1
            break
          case 'area':
            original.mode = 'sel'
            area.tag || (area.tag = 'Area')
            original.selAeeaType = 2
            break
        }
        selectAreaRef.value = area
      })

      viewportRef.value.on('select', area => {
        if (area?.userData.isRoot) {
          selectAreaRef.value = null
          viewportRef.value.addChildAt(area.rectangle, 1) //選到root層，不上移 0層是底圖
          original.selAeeaType = 1
        } else if (area) {
          selectAreaRef.value = area
          original.selAeeaType = 2
        } else {
          original.selAeeaType = 0
          selectAreaRef.value = null
        }
      })
    })

    //選取區塊顯示策略
    watch(selectAreaRef, (val, old) => {
      val && (val.alpha = 0.6)
      old && (old.alpha = 0.3)
    })

    //選取全區時變色
    watch(
      () => original.selAeeaType,
      type => {
        scopeArea.value.alpha = type === 1 ? 0.1 : 0
      },
    )

    watch(scopeArea, () => {
      if (scopeArea.value) {
        original.step = 2
        original.mode = 'sel'
      }
    })

    const topUiHandler = event => {
      switch (event) {
        case 'save':
          getAreaMeta()
          break
        case 'exit':
          original.readOnly
            ? postEvent('exit')
            : (original.exitxitDialigShow = true)
          break
      }
    }

    const exitDialigHandler = event => {
      original.exitxitDialigShow = false
      switch (event) {
        case 'x':
          break
        case 'exit':
          postEvent('exit')
          break
      }
    }

    const onReadMe = type => {
      readMeStore.mod = type //direction altitude
    }
    return {
      info,
      readMeStore,
      ViewRef,
      onCommon,
      original,
      areasRef,
      scopeArea,
      scopeAreaData,
      selectAreaRef,
      selectAreaData,
      changeAreaRealHeight,
      topUiHandler,
      exitDialigHandler,
      onReadMe,
    }
  },
}
</script>

<style>
#EditorTool {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#Stage {
  position: absolute;
  top: 80px;
  bottom: 75px;
  left: 20px;
  right: 20px;
  border: 1px solid rgb(151, 151, 151);
  box-sizing: content-box;
}
#TopUi {
  position: absolute;
  left: 50%;
  top: 20px;
}
.help-bn {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>
