import React,{useState, useEffect} from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Subheader from "../components/subheader";
import Card from "../components/card";

import {ILanguage} from "../interfaces/language";
import {ICategory} from "../interfaces/category";


import {getLanCat, getCat} from "../services/categories";
import { useParams } from "react-router-dom";

const LanCat: React.FC = () => { 

    const [lc,setLc] = useState([]);
    const [Category, setCategory] = useState([]);

    const {id} = useParams();
    
    useEffect(()=>{
        if(id){
            getLanCat(id).then( lancat=>{                
                setLc(lancat.data);
            });
            getCat(id).then( cat=>{
                setCategory(cat.data);
            });
        }      
    },[id]);


    useEffect(() => {
        return () => {
          console.log("cleaned up");
        };
      }, []);

    return(
        <div>
            <Header></Header>
    
            <div className="container">
                {Category.map((category: ICategory)=>(
                    <Subheader title= {category.name} ></Subheader>
                ))};
                {lc.map((language: ILanguage,index) => (
                    <div className="row text-center">
                        <Card 
                        title={language.name} 
                        description={language.description} 
                        key={language._id} 
                        category={language.category[0].name}
                        LanguageId={language._id}
                        />
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </div>
    );

}

export default LanCat;