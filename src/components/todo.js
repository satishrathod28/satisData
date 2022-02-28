import ListAltIcon from '@mui/icons-material/ListAlt';
import React, { useState } from 'react';
import '../css/index.css'; 
const Todo = () =>{
     const [initial, setInitial] = useState('');
     const [updateData, setUpdateData] = useState([]);
     const addData = () =>{
      if(initial == ""){
         alert("Please fill the Data");
      }
      else{
        setUpdateData([...updateData, initial])
        setInitial([]);
      }
        
     }
     const deleteData = (id)=>{
          const newData = updateData.filter((curr, index)=>{
                return id !== index
          })
    setUpdateData(newData);
     }
return(
<>
<div className='mainDiv'>
<ListAltIcon />
<h1>Add your List Here</h1>
<div className='inputData'>
<input type="text" name="list" id="list" className='mt15' value ={initial}
 onChange={(event)=> setInitial(event.target.value)}/>
<i className="fa fa-plus" onClick = {addData}></i>
</div>

<div className='datalist'>
{
    updateData.map((currElement, index)=>{
        return (
            <>
             <div className='well well-sm mt15 mb15 text-left mt15 mb15 relative' key={index}>{currElement}<i className="fa fa-file">
                 </i> <i className="fa fa-trash-o" onClick={() => deleteData(index)}></i> </div>
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