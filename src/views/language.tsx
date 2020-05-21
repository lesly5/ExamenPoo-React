import React,{useState, useEffect} from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Subheader from "../components/subheader";
import Card from "../components/card";

import {ILanguage} from "../interfaces/language";

import {getLanguages} from "../services/languages";

const Language: React.FC = () => { 

    const [languages,setLanguages] = useState([]);
    const [update,setUpdate] = useState(true);

    useEffect(()=>{
        if(update){
            getLanguages().then( r=>{                
                setUpdate(false);
                setLanguages(r.data);
            });
        }      
    },[update]);

    useEffect(() => {
        return () => {
          console.log("cleaned up");
        };
      }, []);

    return(
        <div>
            <Header></Header>
            <div className="container">
                <Subheader title="Language Management" ></Subheader>
                <div className="row text-center">
                    <Card 
                        title="<New Language here>" 
                        description="Click the button to create a new language"
                        key="0" 
                        category=""
                        btn_label="New One"
                    />
                    {languages.map((lan: ILanguage,index) => (
                        <Card 
                            title={lan.name} 
                            description={lan.description} 
                            key={lan._id} 
                            category={lan.category[0].name}
                            LanguageId={lan._id}
                        />
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );

}

export default Language;