
import Canvas from '@/components/Canvas';
import { collisions } from '@/data/Collision';
import React from 'react'

const GameScreen = () => {

  return (
    <div className='bg-gray-800 p-8'>
    <Canvas width={1280} height={520} />
    </div>
  )
}

export default GameScreen