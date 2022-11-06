import 'antd/dist/antd.css';
import './App.css';
import  {useEffect, useState} from 'react';
import {Button,Image, Col, Row} from 'antd';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

function MemeList() {
  const [memes, setMeme] = useState([]);

  const { refetch } = useQuery(['list-meme'], async ()=>{
    let res = await axios.get('https://api.imgflip.com/get_memes')
    res = res.data.data.memes.map(element => element);
    const allMemes = [];
    let rowMeme = [];
    res.forEach((meme, index) => {
      if(index %5 ===0){
        allMemes.push(<Row className='row-img' key={index}>{rowMeme}</Row>)
        rowMeme = [];
      } else {
        rowMeme.push(
        <Col span={6} key={meme.id}>
          <Image.PreviewGroup>  
            <Image width={200} height={200} src={meme.url}/>
          </Image.PreviewGroup>
        </Col>)
      }
    });
    setMeme(allMemes);
    return res;
  },{
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  })  


  useEffect(()=> {
    showMeme()
  },[])

  const showMeme = async () => {
    let res = await axios.get('https://api.imgflip.com/get_memes')
    res = res.data.data.memes.map(element => element);
    const allMemes = [];
    let rowMeme = [];
    res.forEach((meme, index) => {
      if(index %5 ===0){
        allMemes.push(<Row className='row-img' key={index}>{rowMeme}</Row>)
        rowMeme = [];
      } else {
        rowMeme.push(
        <Col span={6} key={meme.id}>
          <Image.PreviewGroup>  
            <Image width={200} height={200} src={meme.url}/>
          </Image.PreviewGroup>
        </Col>)
      }
    });
    setMeme(allMemes);
    return res
  }

  return (  
      <div className="App">
        <Row>
          <Col span={24}>
            <Button onClick={showMeme}>
              Meme
            </Button>
          </Col>
        </Row>
            {memes}
      </div>
  );
}

export default MemeList;
