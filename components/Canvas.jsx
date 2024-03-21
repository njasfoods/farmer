'use client'
import { collisions } from '@/data/Collision';
import { useEffect, useRef, useState } from 'react';

const offset = {
    x: -525,
    y: -530
}
const threshold = 50; // Adjust the threshold as needed

// Calculate the distance between two points
const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};



const Canvas = ({ width, height }) => {
    const canvasRef = useRef(null);
    let [player, setPlayer] = useState({x:offset.x, y:offset.y})
    let [positions, setPositions] = useState([]);
    let [playerImageSrc, setPlayerImageSrc] = useState('/assets/playerDown.png')
    let [imageAnimate, setImageAnimate] = useState(0)
    let playerSpeed = 5
    let spriteWidth = 42

    const collisionsMap = [];
    for (let i = 0; i < collisions.length; i += 70) {
        collisionsMap.push(collisions.slice(i, 70 + i));
    }

     useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d');
        let animationFrameId;
        // Calculate the center of the canvas
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const findPositions = () => {
            const foundPositions = [];
            collisionsMap.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value === 109) {
                        foundPositions.push({ 
                            x:x* spriteWidth +player.x, 
                            y:y*spriteWidth+ player.y 
                        });
                    }
                });
            });
            return foundPositions;
        };
        setPositions(findPositions());
   
    // Function to handle each frame of the animation
    const render = () => { 
        const bg = new Image()
        const playerImage = new Image()
        bg.src = '/assets/farmer_game_map.png'
        playerImage.src =  playerImageSrc
        c.drawImage(bg, player.x ,player.y)
        positions.forEach((position) => {
                const { x, y } = position;
                c.fillStyle = 'red';
                c.fillRect(x, y, 48, 48);
            });
        c.drawImage(
            playerImage,
            playerImage.width *imageAnimate,
            0,
            playerImage.width/4,
            playerImage.height,
            canvasCenterX - playerImage.width/2 ,
            canvasCenterY- playerImage.height/2,
            playerImage.width/4,
            playerImage.height
            )
      
        animationFrameId = window.requestAnimationFrame(render);
   
        
    };

    render(); // Start the animation loop
      // Event listeners
    window.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleCanvasClick);

    // Clean-up function to stop the animation when the component unmounts
    return () => {
        window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  },[player.x, player.y, playerImageSrc, imageAnimate]);

  const handleKeyPress = (event) => {
    let newX = player.x ;
    let newY = player.y;
    let moveAllowed = true;
    const canvas = canvasRef.current;
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    // console.log("Player Position:", newX, newY);

    switch (event.key) {
        case 'w':
            newY += playerSpeed;
            setPlayerImageSrc('/assets/playerUp.png');
            setImageAnimate((prev) => (prev === 0 ? 0.25 : prev === 0.25 ? 0.75 : 0.25));
            break;
        case 'a':
            newX += playerSpeed;
            setPlayerImageSrc('/assets/playerLeft.png');
            setImageAnimate((prev) => (prev === 0 ? 0.25 : 0));
            break;
        case 'd':
            newX -= playerSpeed;
            setPlayerImageSrc('/assets/playerRight.png');
            setImageAnimate((prev) => (prev === 0 ? 0.25 : 0));
            break;
        case 's':
            newY -= playerSpeed;
            setPlayerImageSrc('/assets/playerDown.png');
            setImageAnimate((prev) => (prev === 0 ? 0.25 : prev === 0.25 ? 0.75 : 0.25));
            break;
        default:
            break;
    }
  // Check for collisions
  positions.forEach((position) => {
    const { x, y } = position;
    // Adjust collision detection considering player's position
    const playerXAdjusted = newX + 24; // Player width is 48, so its center is at x + 24
    const playerYAdjusted = newY + 24; // Player height is 48, so its center is at y + 24

    if (event.key === 'w' && newY <= y + 48 && newY + 48 >= y && playerXAdjusted + 48 >= x && playerXAdjusted <= x + 48) {
        moveAllowed = false;
    } else if (event.key === 'a' && newX <= x + 48 && newX + 48 >= x && playerYAdjusted + 48 >= y && playerYAdjusted <= y + 48) {
        moveAllowed = false;
    } else if (event.key === 'd' && newX <= x + 48 && newX + 48 >= x && playerYAdjusted + 48 >= y && playerYAdjusted <= y + 48) {
        moveAllowed = false;
    } else if (event.key === 's' && newY <= y + 48 && newY + 48 >= y && playerXAdjusted + 48 >= x && playerXAdjusted <= x + 48) {
        moveAllowed = false;
    }
});


  // Move the player if no collision detected
  if (moveAllowed) {
      setPlayer({ x: newX, y: newY });
  }
};

const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    console.log("Mouse Click Position:", mouseX, mouseY);

    // Iterate through collision positions and check if the click position overlaps with any of them
    positions.forEach((position) => {
        const { x, y } = position;
        if (mouseX >= x && mouseX <= x + 48 && mouseY >= y && mouseY <= y + 48) {
            console.log("find");
        }
    });
};



  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
