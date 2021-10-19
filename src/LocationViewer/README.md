# 定位點選取 Viewer

## IOS

### 使用方式

請直接放入服務頁面網址，如下 dev 環境

> <https://dev.anchortools.anchortech.io/track/location.html>

### 初始化生命週期說明

1. 置入 web 服務網址
2. viewer.html 載入完成，送出`readyToSetting`事件，此事件相依於 `window.onload`，收到此事件後能使用 viewerSetting(樓層圖資設定) 命令

3. 建物素材載入完成，送出`resourcesLoaded`事件，之後可以推送定位點
4. 使用 `addLocation` 方法新增定位點，每次新增一個，單執行續，這裡用迴圈不須擔心併發
5. 使用者點選某個點，會發出 `selectLocation` 事件，並帶上點的 `id`
6. 使用 `restPosition` 方法可以重置畫面位置

### 事件接口

> Viewer 事件發送方法 `messageHandlers.eventHandler`

規格如下

```json
{
  event, //事件名稱
  data //內容
}
```

- `readyToSetting` Viewer 準備完成，可接受圖面設定
- `resourcesLoaded` 樓層素材載入完成，可接受位置訊號
- `selectLocation` 選取一個點
- `error` 初始化解析錯誤的訊息

### Viewer 全域命令

> 以下命令均依附於 window 物件

#### viewerSetting

樓層圖資設定，參數結構如下(這裡跟 viewer 是一樣的)

```javasctiopt
{
    floor:
      {
        id: '1f', //樓層圖fileId
        img: './img/aaa.jpg', //靜態路徑位置
        offset: { x: 200, y: 90 }, //總區域左上角offset像素
        scale: 10, //比例尺
    },
    area:{
        pos_left_up: { x: 0, y: 0 }, //區域與offset的距離，單位m，基本上就是api回來的數值
        width: 10, //長寬一樣是單位m
        height: 10,
    }
  }
```

範例

```javasctiopt
window.viewerSetting('{"floor":{"id":"1f","img":"./img/aaa.jpg","offset":{"x":200,"y":90},"scale":10},"area":{"pos_left_up":{"x":10,"y":10},"width":10,"height":10}}')
```

#### addLocation

設定一個可選取的定位點

```javasctiopt
{
    x:10, //座標，概念跟定位一樣
    y:10,
    id:'一個字串' //點選後的事件tag
}
```

範例

```javasctiopt
window.addLocation('{"x":10,"y":20,"id":"223"}')
```

#### restPosition

重置回到初始視點
