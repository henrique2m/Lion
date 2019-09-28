const loadNews = require('../functions/loadNews');

class News{

    constructor(urlBase,  number){
        this.urlBase = urlBase;
        this.number = number;
    }
    
    showMode(urlBase, number){
        const search = loadNews.load(urlBase, number); 
        return search;
    } 
}

module.exports =  new News();