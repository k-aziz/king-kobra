import { InfoResponse, GameState, MoveResponse, Game } from "./types"

export function info(): InfoResponse {
    console.log("INFO")
    const response: InfoResponse = {
        apiversion: "1",
        author: "Kash",
        color: "#fc0355",
        head: "all-seeing",
        tail: "mystic-moon",
    }
    return response
}

export function start(gameState: GameState): void {
    console.log(`${gameState.game.id} START`)
}

export function end(gameState: GameState): void {
    console.log(`${gameState.game.id} END\n`)
    console.log(`DEATH COORDS (${gameState.you.head.x}, ${gameState.you.head.y})`)

}

export function move(gameState: GameState): MoveResponse {
    let possibleMoves: { [key: string]: boolean } = {
        up: true,
        down: true,
        left: true,
        right: true
    }
    // console.log(`Initial moves ${JSON.stringify(possibleMoves)}`)


    // Step 0: Don't let your Battlesnake move back on it's own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    if (myNeck.x < myHead.x) {
      possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
      possibleMoves.right = false

    } else if (myNeck.y < myHead.y) {
      possibleMoves.down = false
      
    } else if (myNeck.y > myHead.y) {
      possibleMoves.up = false
    }

    // console.log(`Neck check ${JSON.stringify(possibleMoves)}`)

    // TODO: Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
    const boardWidth = gameState.board.width
    const boardHeight = gameState.board.height
    if (myHead.x === 0) {
      possibleMoves.left = false;
      // console.log(`Avoiding wall: LEFT`)
    } else if (myHead.x === (boardWidth - 1)) {
      possibleMoves.right = false
      // console.log(`Avoiding wall: RIGHT`)
    }
    if (myHead.y === 0) {
      possibleMoves.down = false;
      // console.log(`Avoiding wall: DOWN`)
    } else if (myHead.y === (boardHeight - 1)) {
      possibleMoves.up = false;
      // console.log(`Avoiding wall: UP`)
    }
    // console.log(`Wall check ${JSON.stringify(possibleMoves)}`)

    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    console.log(`HEAD - ${JSON.stringify({x: myHead.x, y: myHead.y})}`)
    let mybody = gameState.you.body
    for (let body_coord of mybody) {
      console.log(`BODY - ${JSON.stringify(body_coord)}`)

      if (myHead.x === body_coord.x && (myHead.y + 1) === body_coord.y) {
        possibleMoves.up = false;
        console.log(
          `Avoiding body: UP - \nbody coord: ${JSON.stringify(body_coord)}\n ${JSON.stringify(myHead)} - ${(myHead.x + 1, myHead.y)} ${(body_coord.x, body_coord.y)}`
        )
      }
      if (myHead.x === body_coord.x && (myHead.y - 1) === body_coord.y) {
        possibleMoves.down = false
        console.log(
          `Avoiding body: DOWN - \nbody coord: ${JSON.stringify(body_coord)}\n ${JSON.stringify(myHead)} - ${(myHead.x + 1, myHead.y)} ${(body_coord.x, body_coord.y)}`
        )
      }
      if (myHead.y === body_coord.y && (myHead.x + 1) === body_coord.x) {
        possibleMoves.right = false;
        console.log(
          `Avoiding body: RIGHT - \nbody coord: ${JSON.stringify(body_coord)}\n ${JSON.stringify(myHead)} - ${(myHead.x + 1, myHead.y)} ${(body_coord.x, body_coord.y)}`
        )
      }
      if (myHead.y  === body_coord.y && (myHead.x - 1) === body_coord.x) {
        possibleMoves.left = false;
        console.log(
          `Avoiding body: LEFT - \nbody coord: ${JSON.stringify(body_coord)}\n ${JSON.stringify(myHead)} - ${(myHead.x + 1, myHead.y)} ${(body_coord.x, body_coord.y)}`
        )
      }
    }

    console.log(`Body check ${JSON.stringify(possibleMoves)}`)
    console.log(`${JSON.stringify(myHead)}`)

    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.
    
    

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    const response: MoveResponse = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)

    if (response.move === undefined) {
          console.log(`${safeMoves}`)
    }
    
    return response
}
