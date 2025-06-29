
import { useState,useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Popup } from '../components/ui/Contentmodel'
import { Deleteicon } from '../icons/Deleteicon'
import { Fileicon } from '../icons/Fileicon'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { Sidebar } from '../components/ui/Sidebar'
import axios from 'axios'
import { BACKEND_URL } from './Config'
import  {data} from 'react-router-dom'

function Dashboard() {
  const [modal, setModal] = useState(false)
  const [content, setContent] = useState<any[]>([]); 

  async function fetchcontent(){
    const token = localStorage.getItem("token");
     console.log("Token being sent:", token); 
    const response = await axios.get(BACKEND_URL + "/api/v1/content",{
      headers:{
        Authorization: token
      }
    })
    setContent(response.data.content)
  }
  useEffect(() =>{
      fetchcontent();
    },[])

  return (
   <>
   <Sidebar />
   <div className='ml-72 min-h-screen bg-[#eeeeef]'>
   <Popup
    open={modal}
    onclose={() => setModal(false)}
    onsubmit={(data) => {
    setContent((prevContent) => [...prevContent, data]);
    setModal(false); 
  }}
  />

   <div className='flex justify-end gap-3 pt-2 pr-2'>
    <Button onClick={() =>{setModal(true)}} varient='secondary' text='Add content' starticon={<Plusicon />}/>
    <Button varient='primary' text='share brain' starticon={<Shareicon />}/>
    </div>
    <div className='flex ml-4 gap-5 flex-wrap'>
          {content.map((item: any, index) => (
            <Card
              key={index}
              title={item.title}
              link={item.link}
              starticon={<Fileicon />}
              endIcon={<Deleteicon />}
            />
          ))}
        </div>
    </div>
   </>
  )
  }
export default Dashboard

