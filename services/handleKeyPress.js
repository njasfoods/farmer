export const handleKeyPress = (event,playerX, playerY, setPlayerX, setPlayerY, setImageAnimate, imageAnimate) => {
    let playerSpeed = 5
    // Example keypress handling
    switch (event.key) {
      case 'w':
       setPlayerY(playerY += playerSpeed);
       setPlayerImageSrc('/assets/playerUp.png')
       if(imageAnimate == 0){
        setImageAnimate(0.25)

        }
        else if(imageAnimate ==0.25){
            setImageAnimate(0.75)
        }
        else if(imageAnimate ==0.75){
            setImageAnimate(0.25)
        }
        else{
         setImageAnimate(0)
        }
        break;
      case 'a':
        setPlayerX(playerX += playerSpeed);
        setPlayerImageSrc('/assets/playerLeft.png')
        if(imageAnimate == 0){
            setImageAnimate(0.25)
 
            }
           
            else{
             setImageAnimate(0)
            }
        break;
      case 'd':
        setPlayerX(playerX -= playerSpeed);
        setPlayerImageSrc('/assets/playerRight.png')
        if(imageAnimate == 0){
            setImageAnimate(0.25)
            }
            else{
             setImageAnimate(0)
            }
        break;
      case 's':
        setPlayerY(playerY -= playerSpeed);
        setPlayerImageSrc('/assets/playerDown.png')
        if(imageAnimate == 0){
            setImageAnimate(0.25)
 
            }
            else if(imageAnimate ==0.25){
                setImageAnimate(0.75)
            }
            else if(imageAnimate ==0.75){
                setImageAnimate(0.25)
            }
            else{
             setImageAnimate(0)
            }
        break;
      default:
        break;
    }
  };