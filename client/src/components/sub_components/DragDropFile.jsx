import React, { useRef, useEffect, useState } from 'react'

export default function DragDropFile(props) {
  // define the event listeners
  const [dragging, setDragging] = useState(false)
  const counter = useRef(0)
  const dragdrop_container = useRef(null)

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragIn = e => {
    e.preventDefault()
    e.stopPropagation()
    counter.current++
    e.dataTransfer.items && e.dataTransfer.items.length > 0
      ? setDragging(true)
      : setDragging(false)
  }
  const handleDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    counter.current--
    if (counter.current > 0) return
    setDragging(false)
  }
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files, 'filelist')
      props.handleFileChange(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
      counter.current = 0
    }
  }

  useEffect(() => {
    let div = dragdrop_container.current
    counter.current = 0
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
    return () => {
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop)
    }
  }, [])

  return (
    <div
      ref={dragdrop_container}
      className="dragdrop_container"
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {dragging && (
        <div
          style={{
            border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              left: 0,
              textAlign: 'center',
              color: 'grey',
              fontSize: 36,
            }}
          >
            <div></div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  )
}
