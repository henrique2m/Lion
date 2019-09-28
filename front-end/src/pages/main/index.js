import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {GuardSpinner } from "react-spinners-kit";
import api from "../../services/api";

import "./styles.css";

import Header from '../../components/Header';


export default  class Main extends Component{
    
    state = {
        news : [],
        newsInfo: {},
        page: 1,
        loading: true,
    };

    componentDidMount(){
        this.loadNews();
    };

    loadNews = async (page = 1 ) => {
        const response = await api.get('/list');
        console.log(response);
        const  data  = response.data[0].pages[page];
        const  newsInfo  = response.data[1].info;

        this.setState({news: data, newsInfo, page}); 
    };

    prevPage = () =>{
        const { page } = this.state;
        if( page === 1) return;
        const pageNumber = page - 1;
        this.loadNews(pageNumber);
    };

    nextPage = () =>{
        const { page,  newsInfo } = this.state;
        if( page === newsInfo.newsNumberPage) return;
        const pageNumber = page + 1;
        this.loadNews(pageNumber);
    };

    
      

       
    render() {
        
        const { news, newsInfo, page, loading } = this.state;

        if(!news.length){
           return(
                <div className="main">
                <Header />
                    <div className="news-list">
                        <ul className="loading">
                            <li>
                                <GuardSpinner
                                    size={50}
                                    frontColor="#DA552f"
                                    backColor="#560150"
                                    loading={loading}
                                />
                                
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else{

        

        return ( 
            <div className="main">
             <Header />
                <div className="news-list">
                    <ul>
                        {news.map( data => (
                            <li key={data.id} className={data.theme}>
                                
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
                    </ul>
                </div>
                <div className="actions">
                    <button disabled={ page === 1} onClick={this.prevPage}>Anterior</button>
                    <div>{page +"/"+ newsInfo.newsNumberPage}</div>
                    <button disabled={ page === newsInfo.newsNumberPage } onClick={this.nextPage}>Próximo</button>
                </div>
                <div className="modeSlide">
                    <Link to="/slide"><button>Slide</button></Link>
                </div>
            </div>
        ) 
      }
    }
}