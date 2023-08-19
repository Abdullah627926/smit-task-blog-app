import React from 'react'
import Mainlay from '../../layout/Mainlay'
import CreateBlog from './createblog'
import Allblogs from './allblogs'

const index = () => {
  return (
    <div>
      <Mainlay />
      <CreateBlog />
      <Allblogs />
    </div>
  )
}

export default index