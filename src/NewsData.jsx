import React, { useContext, useEffect } from "react";
import axios from "axios";
import context from "./context";
import News from "./News";
import { Container } from "react-bootstrap";



export default function NewsData(props){
    const news = useContext(context);
    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        let promis = [
            'https://saurav.tech/NewsAPI/everything/bbc-news.json',
            'https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json',
            'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json',
            'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json',
            'https://saurav.tech/NewsAPI/top-headlines/category/science/in.json',
            'https://saurav.tech/NewsAPI/top-headlines/category/business/in.json'
        ];

        axios.all(promis.map((promise)=>axios.get(promise,{signal}))
        ).then(axios.spread((top,sports,technology,health,science,business) => {
            news.setTnews(top.data.articles);
            news.setSnews(sports.data.articles);
            news.setTechnews(technology.data.articles);  
            news.setHnews(health.data.articles);
            news.setScnews(science.data.articles);
            news.setBnews(business.data.articles);
        }))
        .catch(function(error){
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.log('Error:', error);
            }
        });
        return () => {
            controller.abort();
        };
    },[]);
    return (
        <>
            {props.children}
        </>
    );

}