import React from 'react'

export const Friends = ({friend}) => {
  return (
    <div className='friend'>
        <div className="friend-image">
            <div className="image">
                <img src={`./image/${friend.image}`} alt="" />
            </div>
        </div>
        <div className="friend-name-seen">
            <div className="friend-name">
               <h4>{friend.userName}</h4>
                
            </div>
        </div>
        
    </div>
  )
}
