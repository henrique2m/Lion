import React, { Component } from 'react';
import { GuardSpinner } from "react-spinners-kit";
import api from "../../services/api";

import "./styles.css";


export default  class ColorKey extends Component{
    
    state = {
        news : [],
        newsInfo: {},
        page: 0,
        loading: true,
        display: 'show'
    };

    async componentDidMount(){
       
        if(this.state) {

            this.slide();
            this.clock();

            this.interval = setInterval(() => {
               
                this.slide();
                this.clock();

            }, 300000);

          }
  
    };

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.time);
      }


    loadNews = async (page = 0) => {
        const response = await api.get('/slide');
        console.log(response);
        const  data  = response.data[0].pages[page];
        const  newsInfo  = response.data[1].info;
        this.setState({news: data, newsInfo, page}); 
        this.setState({display: 'show'});
        console.log('show');
    };

    slide =  () =>{

        const { page,  newsInfo } = this.state;

        if(page === 0  || page !== newsInfo.newsNumberPage ){
            const pageNumber = page + 1;
             this.loadNews(pageNumber);
            
        }else{
            const pageNumber = 1;
             this.loadNews(pageNumber);
        } 

    }

     clock = () => { 
        this.time = setTimeout(() => {
            const { display } = this.state;
            if( display === 'show'){
              const  display = 'hide';
               this.setState({ display: display})
               console.log(display);
            }

           }, 60000);
     }
  
    render() {
        
        const { news, loading, display} = this.state;

        if(!news.length){
           return(
                <div className="main">
                    <div className="news-list">
                        <ul className="content-slide">
                            <div className="slide">
                                <div className="loading">
                                    <li>
                                        <GuardSpinner
                                            size={50}
                                            frontColor="#DA552f"
                                            backColor="#560150"
                                            loading={loading}
                                        /> 
                                    </li>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            );
        } else{

        return ( 
            <div className={"main "+ display} >
                <div className="news-list ">
                    <ul className="content-slide">
                        <div className="slide">
                        {news.map( data => (
                            <li key={data.id} className={data.theme }>
                                
                                <p className="title">{data.title}</p>
                                
                                <a href={data.link} target="self">
                                    <img src={data.thumbnail} alt={data.title} title={data.title}/>
                                </a>  
                                
                                <div className="footer">
                                   <div  className="contentTheme">
                                        <p className="cicle"></p>
                                        <p className="theme">{data.theme}</p>
                                        <p className="date">{data.date}</p>
                                    </div>        
                                </div>
                            </li>
                            )
                        )}
                        </div>
                    </ul>
                </div>
            </div>
        ) 
      }
    }
}