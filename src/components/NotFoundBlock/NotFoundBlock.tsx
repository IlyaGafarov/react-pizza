import React from 'react'
import cl from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={cl.root}>
      <h1>Ничего не найдено</h1>
    </div>
  )
}

export default NotFoundBlock
