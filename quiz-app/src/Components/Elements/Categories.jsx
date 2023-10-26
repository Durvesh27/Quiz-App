import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './Elements.css'
import { useContext } from "react";
import { AuthContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";
import { Button ,Text} from "@chakra-ui/react";
const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [flag,setFlag]=useState(false)
  const {setQuestions}=useContext(AuthContext)
  const router=useNavigate()
  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(
        "http://localhost:8000/get-categories"
      );
      if (data.success) {  
setAllCategories(data.category)
      }else{
        alert(data.message)
      }
    }
    getAllCategories()
  }, []);

  return <div className="categories">
  {
    allCategories.map((item)=>(
    <div key={item._id} className="main-class">
    <Text fontSize='lg' fontWeight="medium" textAlign="center" mb={5} >{item?.category}</Text>
    <img src={item.categoryImg} className="cat-img" />
    <Button display="block" m="auto"  mt="5" onClick={()=>router(`/questions/${item.category}`)}>Start quiz</Button>
    </div>
    ))
  }
  <div className="logout">
  <Button colorScheme='whatsapp' variant='solid'>
  Logout
  </Button>
  </div>
  </div>;
};

export default Categories;
