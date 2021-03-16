import React, { FC, memo } from 'react'

import style from './style.module.scss'

export interface IRenderFileProps {
  url?: string
  fileType?: 'image'
}

function getFileTypeFromUrl(url: string) {
  switch(url.split('.').pop()?.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'image'
  }
}

const RenderFile: FC<IRenderFileProps> = ({ url = '', fileType }) => {

  switch(fileType || getFileTypeFromUrl(url)) {
    case 'image':
      return <img className={style.renderImage} alt="preview" src={url} />
    default:
      return <div>{url}</div>
  }
}

export default memo(RenderFile)