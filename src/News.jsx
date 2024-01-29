import React, { useState } from 'react';
import './News.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import context from './context';
import { useContext, useEffect } from 'react';
import newsData from './NewsData';

function News() {
    const news = useContext(context);
    const [array,setArray] = useState();
    const [heading,setHeading] = useState();

    const newsHead = {
        top: "Top News",
        sports: "Sports News",
        technology: "Latest Tech News",
        health: "Health Updates",
        science: "Latest Updates in Science Field",
        business: "Business News",
        search: "Top Results"
    };
    const newsMap = {
        top: news.Tnews,
        sports: news.Snews,
        technology: news.Technews,
        health: news.Hnews,
        science: news.Scnews,
        business: news.Bnews,
        search: news.searchnews
    };
    useEffect(()=>{
        setArray(newsMap[news.linkClicked]);
        setHeading(newsHead[news.linkClicked]);
    },[news.Tnews]);
    useEffect(()=>{
        if(news.linkClicked === "search"){
            console.log("search news");
            console.log(news.searchnews);
            setArray(newsMap[news.linkClicked]);
            setHeading(newsHead[news.linkClicked]);
        }
    },[news.searchnews]);
    useEffect(() => {
        if (news.linkClicked) {
            setArray(newsMap[news.linkClicked]);
            setHeading(newsHead[news.linkClicked]);
            console.log(array);
        }
    }, [news.linkClicked]);

    
    const renderNewsCards = ()=>{    
        return (
            <>
                <h1>{heading}</h1>

                {array && array.length>0 && array.map(function(data){
                    if(data.author != null && data.urlToImage != null){
                        return(
                            <Row key={data.title}>
                                <Col>
                                    <Card className='cardDiv'>
                                        <Card.Img variant="top" src={data.urlToImage} />
                                        <Card.Body>
                                            <Card.Title>{data.title}</Card.Title>
                                            <Card.Text>
                                                {data.description}
                                            </Card.Text>
                                            <a href={data.url} target='_blank'>
                                                <Button className='cta' variant='custom'>  <span className="hover-underline-animation"> See more </span>
                                                    <svg
                                                        id="arrow-horizontal"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="10"
                                                        viewBox="0 0 46 16">
                                                        <path
                                                        id="Path_10"
                                                        data-name="Path 10"
                                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                                        transform="translate(30)"
                                                        ></path>
                                                    </svg>
                                                </Button>
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        );
                    }
                })}
            </>
        );
    }

    const renderSearchNewsCards = ()=>{    
        return (
            <>
                <h1>{heading}</h1>

                {array && array.length>0 && array.map(function(data){
                    if(data.image_url != null){
                        return(
                            <Row key={data.title}>
                                <Col>
                                    <Card className='cardDiv'>
                                        <Card.Img variant="top" src={data.image_url} />
                                        <Card.Body>
                                            <Card.Title>{data.title}</Card.Title>
                                            <Card.Text >
                                                <div dangerouslySetInnerHTML={{__html : data.description}}>
                                                </div>
                                            </Card.Text>
                                            <a href={data.link} target='_blank'>
                                                <Button className='cta' variant='custom'>  <span className="hover-underline-animation"> See more </span>
                                                    <svg
                                                        id="arrow-horizontal"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="10"
                                                        viewBox="0 0 46 16">
                                                        <path
                                                        id="Path_10"
                                                        data-name="Path 10"
                                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                                        transform="translate(30)"
                                                        ></path>
                                                    </svg>
                                                </Button>
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        );
                    }
                })}
            </>
        );
    }

    

    return <Container className="containerG">
            {
                news.linkClicked == "search" ?
                <>{renderSearchNewsCards()}</>:
                <>{renderNewsCards()}</>
            }
           </Container>;
}

export default News;