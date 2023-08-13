import React from 'react';
import { useSelector } from 'react-redux';
import {FiCheck} from "react-icons/fi";
import {RiCheckboxCircleLine} from "react-icons/ri";

const Message = ({ currentFriend, messages,scrollRef }) => {
     const myInfo = useSelector(state => state.auth.myInfo)
     const monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];
    
     return (





          <div className='message-show'>


               {
                    messages && messages.length > 0 ? messages.map(m =>
                         m.senderId === myInfo.id ? <div  ref={scrollRef}className='my-message'>
                              <div className='image-message'>
                                   <div className='my-text'>
                                        <p className='message-text'> {m.message.text} {m.status==="seen"?<RiCheckboxCircleLine/>:<FiCheck/>} </p>
                                   </div>
                              </div>
                              <div className='time'>
                                 {(new Date(m.createdAt)).getDate()} {monthNames[(new Date(m.createdAt)).getMonth()].substring(0,3)} {(new Date(m.createdAt)).getFullYear()}
                                
                              </div>
                         </div> :
                              <div ref={scrollRef} className='fd-message'>
                                   <div className='image-message-time'>
                                        <img src={`./image/${currentFriend.image}`} alt='' />
                                        <div className='message-time'>
                                             <div className='fd-text'>
                                                  <p className='message-text'>{m.message.text}</p> 
                                             </div>
                                             <div className='time'>
                                                  3 Jan 2022
                                             </div>
                                        </div>
                                   </div>
                              </div>

                    ) : null
               }








          </div>
     )
};

export default Message;