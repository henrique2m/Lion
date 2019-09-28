const News = require('../models/News');
const urlBase = 'https://www.contabeis.com.br/conteudo/noticias';

class NewsController {

async list(req, res){
    const list = await News.showMode(urlBase, 10);
    res.json(list);
 }

 async slide(req, res){
    const slide = await News.showMode(urlBase, 1);
    res.json(slide);
 }

}

module.exports =  new NewsController();