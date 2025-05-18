import React from 'react'

const User = ({name,Email,course,Id,children}) => {
    
  return (
    <>
    <div><b>User</b></div>
    <div>name:{name}</div>
    <div>course:{course}</div>
    <div>Email:{Email}</div>
    <div>Id:{Id}</div>
    {children}
    
    </>
  )
}

export default User