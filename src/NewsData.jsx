import React, { useContext, useEffect } from "react";
import axios from "axios";
import context from "./context";
import News from "./News";
import { Container } from "react-bootstrap";



export default function NewsData(props){
    const news = useContext(context);
    useEffect(()=>{
        //fb87bd1bac0942fea345c8225cd0ad55
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
        // Promise.all(promis.map((prom)=>axios.get(prom,{signal}))
        // ).then((data)=> {
        //     console.log(data);
        //     console.log(data[0].data.results);
        //     news.setTnews(data[0].data.results);
        //     console.log(news.Tnews);
        //     // news.setTnews(top);
        //     // console.log(top);
        //     // console.log(sports);
        //     // // console.log(news.Tnews);
        //     // // news.setSnews(sports);
        //     // console.log(news.Snews);
        //     // news.setTechnews(technology);
        //     // console.log(news.Technews);
        //     // news.setWnews(world);
        //     // console.log(news.Wnews);
        //     // news.setEdnews(education);
        //     // console.log(news.Ednews);
        //     // news.setPnews(politics);
        //     // console.log(news.Pnews);
        //     // news.setBnews(business);
        //     // console.log(news.Bnews);
        //     // news.setCnews(crime);
        //     // console.log(news.Cnews);
        //     // news.setEnews(entertainment);
        //     // console.log(news.Enews);
        // })
        // .catch(function(error){
        //     if (error.name === 'AbortError') {
        //         console.log('Request aborted');
        //     } else {
        //         console.log('Error:', error);
        //     }
        // });

            // axios({
            //     method: "GET",
            //     url:`https://newsdata.io/api/1/news?apikey=pub_367340a2a3e775420498d8596f658144a308f&category=sports&language=en`
            // }).then(response => {
            //     news.setSnews(response.data.results);
            //     console.log(news.Snews);
            // })
            // .catch(function(error){

            // });
    },[]);
    return (
        <>
            {props.children}
        </>
    );


    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=technology&language=en`
    // }).then(response => {
    //     news.setTechnews(response.data.results);
    // })
    // .catch(function(error){

    // });
    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=world&language=en`
    // }).then(response => {
    //     news.setWnews(response.data.results);
    // })
    // .catch(function(error){

    // });
    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=education&language=en`
    // }).then(response => {
    //     news.setEdnews(response.data.results);
    // })
    // .catch(function(error){

    // });
    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=politics&language=en`
    // }).then(response => {
    //     news.setPnews(response.data.results);
    // })
    // .catch(function(error){

    // });
    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=business&language=en`
    // }).then(response => {
    //     news.setBnews(response.data.results);
    // })
    // .catch(function(error){

    // });
    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=crime&language=en`
    // }).then(response => {
    //     news.setCnews(response.data.results);
    // })
    // .catch(function(error){

    // });
    // axios({
    //     method: "GET",
    //     url:`https://newsdata.io/api/1/news?apikey=pub_365922e1a6631df7c4d314336e780e90c5213&category=entertainment&language=en`
    // }).then(response => {
    //     news.setEnews(response.data.results);
    // })
    // .catch(function(error){

    // });
}