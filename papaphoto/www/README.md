#発火のタイミングについて

1.pageinitによって現在地情報を取得 

2.終わり次第、MapionAPIを叩いて付近の名称と緯度経度を得る 

3.googe mapsAPIより現在地とAPIから得た情報のマーカーを表示する

```
 // マーカーを表示する
var marker = new google.maps.Marker({
   position: position,
	title: name,
});
marker.setMap(map);//実際にマップにマーカーを表示する
```