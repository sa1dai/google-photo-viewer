Live Demo: [https://google-photo-viewer.herokuapp.com](https://google-photo-viewer.herokuapp.com)

* React\Redux
* Тема bootstrap: [Cosmo](https://bootswatch.com/cosmo/)
* Приложение нормально отображается на всех разрешениях
* Спиннер: [https://loading.io](https://loading.io)
* Пагинация: [react-paginate](https://github.com/AdeleD/react-paginate)
* Попап с галереей изображений при клике на альбом: [react-images-viewer](https://github.com/guonanci/react-images-viewer)
* Для запросов к google photos api были использованы функции getAlbums, loadFromAlbum, libraryApiSearch из этого [файла](https://github.com/googlesamples/google-photos/blob/master/REST/PhotoFrame/app.js). Эти функции написаны для nodejs, я переписал их под фронт.

## Как запустить
1. Склонировать проект
2. В конфигурационном файле src/config.js заменить ADD YOUR CLIENT ID на корректный id из консоли разработчика google
3. npm install
4. npm start
