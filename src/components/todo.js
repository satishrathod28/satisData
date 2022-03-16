import { FormControlUnstyledContext } from '@mui/base';
import React, { useEffect, useState } from 'react';
import '../css/index.css'; 

fetch("https://codetogo.io/api/users.xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    console.log(xml);
  })
  .catch(console.error);
  
const getLocalData = () =>{
    let list = localStorage.getItem('lists');
    if(list){
       return JSON.parse(localStorage.getItem('lists'))
    }
    else{
        return []
    }
    console.log(list);
}

const Todo = () =>{
     const [initial, setInitial] = useState('');
     const [updateData, setUpdateData] = useState(getLocalData());
     const [isId, setIsId]  = useState(null);
     const [isToggle, setIsToggle] = useState(true);
 
   
      const addData = () =>{
      if(initial == ""){
         alert("Please fill the Data");
      }
      
      else{
      const totalData = {id : new Date().getMilliseconds().toString(), name:initial}
      setUpdateData([...updateData,totalData ])

      setInitial('');
      }
        
     }
     const modifieData = () =>{
        setUpdateData(
            updateData.map((curr)=>{
                 if(curr.id === isId){
                     return {...curr, name:initial}
                 }
                 return curr
            })
        );
        setInitial('');
        setIsToggle(true);
     }
     const deleteData = (id)=>{
          const newData = updateData.filter((curr)=>{
                return id !== curr.id
          })
    setUpdateData(newData);
     }
     const editData =(id) =>{
        const newEditData = updateData.filter((curr)=>{
              if(id === curr.id) {
                  setInitial(curr.name)
              }
             
      } )
     setIsToggle(false)
      setIsId(id)
     }
   
    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(updateData))
    },[updateData]) 
    
   
return(
<>
<div className='mainDiv'>
<span><i className="fa fa-address-card" ></i></span>
<h2> Add your list here</h2>
<div className='inputData'>
<input type="text" name="list" id="list" className='mt15' value ={initial}
 onChange={(event)=> setInitial(event.target.value)}/>
 {
     isToggle ? <i className="fa fa-plus" onClick = {addData} title={`Add ${initial} `}></i>:
     <i className="fa fa-edit" onClick = {modifieData} title={`update ${initial} `}></i>
 }

</div>

<div className='datalist'>
{
    updateData.map((currElement)=>{
        return (
            <>
            <div className="well well-sm mt15 mb15 text-left mt15 mb15 relative strikeData" key={currElement.id}>{currElement.name}
             <i className="fa fa-file" onClick={() => editData(currElement.id)} title="Edit List"></i> 
                 < i className="fa fa-trash-o" onClick={() => deleteData(currElement.id)} title={`Remove ${currElement.name}`}></i> </div>
            </>
        )
    })
}
   
</div>


</div>

</>

)


}
export default Todo;