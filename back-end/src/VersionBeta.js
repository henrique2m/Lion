/*const express = require('express');
const cors  = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
   

const selectors = ['tributario', 'economia', 'trabalhista', 'tecnologia', 'empresarial', 'contabel', 'carreira', 'societario'];
const urlBase = 'https://www.contabeis.com.br/conteudo/noticias';
const urlAssets = 'https://www.contabeis.com.br/';

let data = [];
let page = [];
let info = [];
let listPage = {};
let news = {};

constructor = () => {
    listPage  = {
        page,
    }
    news = {
        listPage,
        info,
    }
}

reset = () => {
    data.length = 0;
    page.length = 0;
    info.length = 0;
    listPage.length = 0;
    news.length = 0;
}

const app = express();

app.use(cors());

app.use(bodyParser.json());

loadnews = (urlBase, NumberMaxNewsPage ) => { 
  request(urlBase , (e, res, body) => {
      reset();
        if(e){
            console.log ("Erro: " + e );
            return;
        } 
        const $ =  cheerio.load(body);
            let id = 0;
            for(i=0; i < selectors.length; i++ ){
                $('section.materiasList article.editoria-'+ selectors[i]).each( function(){
                        const date = $(this).find('em.timestamp').text().trim();
                        const link = $(this).find('a').attr('href');
                        const thumbnail = $(this).find('img').attr('src');
                        const title =  $(this).find('p').text().trim();
                        data.push({
                            'id': id++,
                            'title': title,
                            'link' :  urlAssets+link,
                            'thumbnail':  urlAssets+thumbnail,
                            'theme': selectors[i],
                            'date': date,
                        });
                });

            }   
            let numberNews = data.length;
            let mod = numberNews % NumberMaxNewsPage;
            mod == 0 ? numberPages = Math.floor(numberNews / NumberMaxNewsPage) : numberPages = Math.floor(numberNews / NumberMaxNewsPage) + 1;
        
            for(i=1; i <= numberPages; i++){
                page[i]  = data.splice(0,  NumberMaxNewsPage);
            }

            info.push({
                'newsNumber': numberNews,
                'newslengthPage' :  NumberMaxNewsPage,
                'newsNumberPage' : numberPages,
            });

            constructor();
    });   
}

app.get('/lion', async (req, res) => {
    try{
        const teste = await loadnews(urlBase,  10);
        const teste2 = await news;
        teste;
        res.json(teste2);
    } catch(err){
        console.log(err);
    }
});

app.get('/slide', async (req, res) => {
    try{
        const teste3 = await loadnews(urlBase,  1);
        const teste4 = await news;
        teste3;
        res.json(teste4);
    } catch(err){
        console.log(err);
    }
});

app.listen(3333); */
