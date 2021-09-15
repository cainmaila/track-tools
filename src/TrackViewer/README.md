# Track Viewer 定位路徑顯示

## IOS 接口

### 使用方式

請直接放入服務頁面網址，如下 dev 環境

> <https://dev.anchortools.anchortech.io/track/viewer.html>

### 初始化生命週期說明

1. 置入 web 服務網址
2. viewer.html 載入完成，送出`readyToSetting`事件，此事件相依於 `window.onload`，收到此事件後能使用 viewerSetting(樓層圖資設定) 命令

3. 建物素材載入完成，送出`resourcesLoaded`事件，之後可以接收輸入位置

### 事件接口

> Viewer 事件發送方法 `messageHandlers.TrackViewer`

規格如下

```json
{
  event, //事件名稱
  data //內容
}
```

- `readyToSetting` Viewer 準備完成，可接受圖面設定
- `resourcesLoaded` 樓層素材載入完成，可接受位置訊號
- `resHistory` 使用 generateHistory 命令要求返回的歷程記錄，格式請見 SA 文件 <http://confluence.anchortech.io/display/LEED/AnchorTrack+SA+-+Web>
- `error` 初始化解析錯誤的訊息

### Viewer 全域命令

> 以下命令均依附於 window 物件

#### viewerSetting

樓層圖資設定，參數結構如下

```javasctiopt
{
    floors: [
      {
        id: '1f', //樓層圖fileId
        img: './img/aaa.jpg', //靜態路徑位置
        offset: { x: 200, y: 90 }, //總區域左上角offset像素
        scale: 10, //比例尺
      },
    ],
  }
```

範例

```javasctiopt
window.viewerSetting('{"floors":[{"id":"1f","img":"./img/aaa.jpg","offset":{"x":200,"y":90},"scale":10}]}')
```

#### pushPoint

位置移動

範例

```javasctiopt
window.pushPoint("x,y,fileId") //fileId目前可省略
```

### suspend

暫停繪製
範例

```javasctiopt
window.suspend() //如需繼續，只要再次pushPoint即可
```

#### setMode

Viewer 顯示模式變換，兩種形式 `mone` 與 `lock`
範例

```javasctiopt
window.setMode("mone") //自由縮放，會縮小至看到全部
window.setMode("lock") //圖面1:1顯示，且每次pushPoint位置都會成為凸面中心點(追蹤模式)
```

#### generateHistory

要求取回目前的歷程，會收到 `resHistory` 事件
