import Context from "./context"
import { useState } from "react";

const NewsState = (props)=>{
    const [Tnews,setTnews] = useState();
    const [Snews,setSnews] = useState();
    const [Technews,setTechnews] = useState();
    const [Hnews,setHnews] = useState();
    const [Scnews,setScnews] = useState();
    const [Bnews,setBnews] = useState();
    const [searchnews,setSearchnews] = useState();
    const [linkClicked,setLinkClicked] = useState('top');
    return (
        <Context.Provider value={{
                                    Tnews,setTnews,Snews,setSnews,
                                    Technews,setTechnews,
                                    Hnews,setHnews,
                                    Scnews,setScnews,
                                    Bnews,setBnews,
                                    searchnews,setSearchnews,
                                    linkClicked,setLinkClicked                                
                                }}>
            {props.children}
        </Context.Provider>
    );
}



export default NewsState;   