# Track Player 歷史紀錄播放顯示

## IOS 接口

### 使用方式

請直接放入服務頁面網址，如下 dev 環境

> <https://dev.anchortools.anchortech.io/track/player.html?lang=en>

lang 參數為語系

目前僅有 en(預設)，cn，ja，zh-TW

### 初始化生命週期說明

1. 置入 web 服務網址
2. viewer.html 載入完成，送出`readyToSetting`事件，此事件相依於 `window.onload`，收到此事件後能使用 viewerSetting(樓層圖資設定) 命令

3. 建物素材載入完成，送出`resourcesLoaded`事件，之後可以接收歷史紀錄資料

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
- `historyReady` 使用 setHistory 後完成紀錄設定後發送
- `error` 初始化解析錯誤的訊息

### Viewer 全域命令

> 以下命令均依附於 window 物件

#### viewerSetting

樓層圖資設定，參數結構如下(這裡跟 viewer 是一樣的)

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

#### setHistory

設定歷史紀錄，參數結構如下，目前跟是 api 中的 locations 部分

```javasctiopt
{
    locations: [
    {
        state: 0,
        pos: '1,1',
        fileId: '1f',
        date: 0,
    },
    {
        state: 0,
        pos: '1,20',
        fileId: '1f',
        date: 1000,
    },
    {
        state: 1,
        date: 1000,
    },
    {
        state: 0,
        pos: '20,20',
        fileId: '1f',
        date: 2000,
    },
    {
        state: 0,
        pos: '20,30',
        fileId: '1f',
        date: 3000,
    },
    ],
}
```

範例

```javasctiopt
window.setHistory('{"locations":[{"state":0,"pos":"1,1","fileId":"1f","date":0},{"state":0,"pos":"1,20","fileId":"1f","date":1000},{"state":1,"date":1000},{"state":0,"pos":"20,20","fileId":"1f","date":2000},{"state":0,"pos":"20,30","fileId":"1f","date":3000}]}')
```
