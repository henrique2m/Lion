const request = require('request-promise');
const cheerio = require('cheerio');
   
const selectors = ['tributario', 'economia', 'trabalhista', 'tecnologia', 'empresarial', 'contabel', 'carreira', 'societario'];
const urlAssets = 'https://www.contabeis.com.br/';


class LoadNews {

    constructor(urlBase, NumberMaxNewsPage){
        this.urlBase = urlBase;
        this.NumberMaxNewsPage = NumberMaxNewsPage;
    }

  async load(urlBase, NumberMaxNewsPage ){

        let id = 0;
        let datas  =  [];
        let page = [];

  const search = await request(urlBase , (e, res, body) => {

         if(e){
                console.log ("Erro: " + e );
                return;
            } 

            const $ =  cheerio.load(body);
            
            let i = 0;
          
            for(i; i <= selectors.length; i++ ){

                $('section.materiasList article.editoria-'+ selectors[i]).each( function(){
                        const date = $(this).find('em.timestamp').text().trim();
                        const link = $(this).find('a').attr('href');
                        const thumbnail = $(this).find('img').attr('src');
                        const title =  $(this).find('p').text().trim();
                        datas.push({
                            'id': id++,
                            'title': title,
                            'link' :  urlAssets+link,
                            'thumbnail':  urlAssets+thumbnail,
                            'theme': selectors[i],
                            'date': date,
                        });
                });

            }  

            let numberPages = 0; 
            let numberNews = datas.length;
            let mod = numberNews % NumberMaxNewsPage;

                            
            if(mod === 0) numberPages = Math.floor(numberNews / NumberMaxNewsPage);
            else numberPages = Math.floor(numberNews / NumberMaxNewsPage) + 1;
                    

            for(i=1; i <= numberPages; i++){
                page[i]  = datas.splice(0,  NumberMaxNewsPage);
            }

            datas.push({'pages': page});
            datas.push({'info' : {
                    'newsNumber' : numberNews, 
                    'newslengthPage' :  NumberMaxNewsPage,
                    'newsNumberPage' : numberPages
                }
            });
             return datas;
        });
       
        search;

        return datas;
        
      }

}

module.exports = new LoadNews();