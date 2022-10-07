import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLable() {
  const [lable, setLable] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  const storeData = async () => {
    const data = {
      lable,
      amount
    };

    const url = 'http://localhost:3500/addlable';

    let result = await axios.post(url, data);
    navigate('/');
  }

  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
       const url = "http://localhost:3500/upload/csv";
       const csvData = await axios.post(url, file ,  {
        headers: {
          'content-Type': 'multipart/form-data'
        }
      } )
       if (csvData.data.success) {
          navigate('/')
        }
    }

  }



  // const onload = (e)=>{
  //   console.warn("file data", e.target.result)
  //   const url = "http://localhost:3500/upload-csv";
  //   const formData = { file : e.target.result }
  //   return post(url, formData).then(response => console.warn("result", response))
  // }

  // let result = await axios.post(url);
  // console.log(result);
  // navigate('/');

  return (
    <>
      <div className='product'>
        Lable:
        <input placeholder='Enter the label name' value={lable} onChange={(e) => setLable(e.target.value)} className="inputBox" />
        Amount:
        <input placeholder='Enter the label amount' value={amount} onChange={(e) => setAmount(e.target.value)} className="inputBox" />
        <button onClick={storeData} className="appButton">Save</button>
      </div>
      <div>
        <form>
          <h1>Bulk Csv</h1>
          <div className="input-group">
            <label for='files'>Select files</label>
            {/* <input id='files' type="file" onChange = {(e)=>setCsvData({csv: e.target.files[0]})}/> */}
            <input type='file' accept='.csv' onChange={(e) => { setFile( [...e.target.files] ) }} required  />
          </div>
          <button className="submit-btn" onClick={(e) => { handleSubmit(e) }}>Upload</button>
        </form>
      </div>
    </>

  )
}

export default AddLable;
