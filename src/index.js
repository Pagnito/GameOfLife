import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.css'
import Header from './components/header.js'
import TopBtnHeader from './components/TopButtonHeader'
import BtmBtnHeader from './components/bottomButtonHeader'
import GameBoard from './components/gameBoard'
import {cloneDeep} from 'lodash'

var yArr = []
var gridClone;


var mathRound10 = (num) => {
  if(num%10<5){
    return num-(num%10);
  } else if (num%10>=5){
    return num+(10-(num%10));
  }
}
var mathRound15 = (num) => {
  if(num%15<7){
    return num-(num%15);
  } else if (num%15>=7){
    return num+(15-(num%15));
  }
}
var mathRound5 = (num) => {
  if(num%5<2){
    return num-(num%5);
  } else if (num%5>=2){
    return num+(5-(num%5));
  }
}
class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        yCells:45,
        xCells:75,
        boardSize: 'medium',
        speed:100,
        gridModel: [],
        canvasHeight:300,
        canvasWidth:700,
        boardSizeChanged: false,
        cellsize: 10,
        cellsChanged:false,
        generation:0,
        gameStatus: 'notRunning',

      }

  }


  componentWillMount(){
      this.setUpLivelihood();

  }
  componentDidUpdate(){
    if(this.state.cellsChanged==true || this.state.boardSizeChanged==true){
      this.repopulate()
      this.setState({cellsChanged:false,
                     boardSizeChanged:false})
    }
  }

  setUpLivelihood = () => {

    var xArr=[]
    for(var k=0; k<=this.state.yCells; k++){
      for(var p=0; p<=this.state.xCells; p++){
        var deadOrAlive = Math.floor(Math.random()*(2-1+1))+1;
        xArr.push(deadOrAlive);
      }
        yArr.push(xArr);
        xArr=[]
    }
    this.setState({gridModel:yArr})
    //console.log(yArr)
}



   generation = () => {
    //console.log(this.state.gridModel)
    if(this.state.gameStatus=='notRunning'){
     window.startt =  setInterval(()=>{

    gridClone = _.cloneDeep(this.state.gridModel)
    var aliveNeighbors = 0;

    for(var g=0; g<=this.state.yCells; g++){
      for(var j=0; j<=this.state.xCells; j++){
          aliveNeighbors=0;

        if(j>0 && this.state.gridModel[g][j-1]==1){
          aliveNeighbors+=1;
        }
        if(j<this.state.xCells && this.state.gridModel[g][j+1]==1){
          aliveNeighbors+=1;
        }
        if(g>0 && this.state.gridModel[g-1][j]==1){
          aliveNeighbors+=1;
        }
        if(g<this.state.yCells && this.state.gridModel[g+1][j]==1){
          aliveNeighbors+=1;
        }
        if(g>0 && j>0 && this.state.gridModel[g-1][j-1]==1){
          aliveNeighbors+=1;
        }
        if(g>0 && j <this.state.xCells && this.state.gridModel[g-1][j+1]==1){
          aliveNeighbors+=1;
        }
        if(g<this.state.yCells && j<this.state.xCells && this.state.gridModel[g+1][j+1]==1){
          aliveNeighbors+=1;
        }
        if( j>0 && g<this.state.yCells && this.state.gridModel[g+1][j-1]==1){
          aliveNeighbors+=1;
          }
          //console.log(j+1+'is'+aliveNeighbors)

        var canvas = document.querySelector('#myCanvas')
        var ctx = canvas.getContext('2d')

        if(this.state.gridModel[g][j]==1 && aliveNeighbors<2){
            ctx.fillStyle='black';
            ctx.fillRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize)
            gridClone[g][j]=2;
        }
         else if(this.state.gridModel[g][j]==1 && aliveNeighbors>3){
            ctx.fillStyle='black';
            ctx.fillRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize)
            gridClone[g][j]=2;
        }
         else if(this.state.gridModel[g][j]==2 && aliveNeighbors==3){
            ctx.fillStyle='#D9EBBC'
            ctx.fillRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize)
            gridClone[g][j]=1;
        }

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.strokeRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize);
        }
      }
      this.setState({gridModel:gridClone,
                     generation:this.state.generation+=1})

    },this.state.speed)
   }
      this.setState({gameStatus:'running'})
  }

   pauseGame = () => {
    clearInterval(window.startt);
    this.setState({gameStatus:'notRunning'})
  }


  birthOrKillCell = (e) => {
    var xPos;
    if(this.state.cellsize==5) {
        xPos= mathRound5(e.clientX-e.target.getBoundingClientRect().left-this.state.cellsize/2)
      } else if(this.state.cellsize==10){
        xPos= mathRound10(e.clientX-e.target.getBoundingClientRect().left-this.state.cellsize/2)
      } else if(this.state.cellsize==15)  {
        xPos= mathRound15(e.clientX-e.target.getBoundingClientRect().left-this.state.cellsize/2)
      }

  var yPos;
  if(this.state.cellsize==5) {
      yPos= mathRound5(e.clientY-e.target.getBoundingClientRect().top-this.state.cellsize/2)
    } else if(this.state.cellsize==10){
      yPos= mathRound10(e.clientY-e.target.getBoundingClientRect().top-this.state.cellsize/2)
    } else if(this.state.cellsize==15)  {
      yPos= mathRound15(e.clientY-e.target.getBoundingClientRect().top-this.state.cellsize/2)
    }
    //var xPos=e.offsetX
    //var yPos=e.offsetY


    var indexY;
    if( this.state.cellsize==5 ){
      indexY = yPos/5;
    } else if(this.state.cellsize==10) {
      indexY = yPos/10;
    } else if(this.state.cellsize==15){
      indexY = yPos/15;
    }

    var indexX
    if( this.state.cellsize==5 ){
      indexX = xPos/5;
    } else if(this.state.cellsize==10) {
      indexX = xPos/10;
    } else if(this.state.cellsize==15){
      indexX = xPos/15;
    }

    var canvas = document.querySelector('#myCanvas')
    var ctx = canvas.getContext('2d')
    if(this.state.gridModel[indexY][indexX]==2){
      this.state.gridModel[indexY][indexX]=1
      ctx.fillStyle='#D9EBBC'
    } else {
      this.state.gridModel[indexY][indexX]=2
      ctx.fillStyle='black'
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillRect(xPos,yPos,this.state.cellsize,this.state.cellsize);
    ctx.strokeRect(xPos,yPos,this.state.cellsize,this.state.cellsize);

  }

  repopulate = () => {
    yArr=[]
    var xArr=[]
    for(var k=0; k<=this.state.yCells; k++){
      for(var p=0; p<=this.state.xCells; p++){
        var deadOrAlive = Math.floor(Math.random()*(2-1+1))+1;
        xArr.push(deadOrAlive);
      }
        yArr.push(xArr);
        xArr=[]
    }
    this.setState({gridModel:yArr})

    var canvas = document.querySelector('#myCanvas')
    var ctx = canvas.getContext('2d')

      for(var g=0; g<=this.state.yCells; g++){
        for(var j=0; j<=this.state.xCells; j++){

          if(yArr[g][j]==1){

            ctx.fillStyle='#D9EBBC';
          } else {
            ctx.fillStyle='black';
          }

          ctx.fillRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize)
          ctx.lineWidth = 1;
          ctx.strokeStyle = "black";
          ctx.strokeRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize);
          }
        }
  }
  adjustSpeedTo1X = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }

    btn.classList.add('activeBtn')
    this.setState({speed:150
                   })

  }
  adjustSpeedTo2X = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
    this.setState({speed:100
                  })

  }
  adjustSpeedTo3X = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
    this.setState({speed:50
                   })

  }

  clearGrid = () => {

    var canvas = document.querySelector('#myCanvas')
    var ctx = canvas.getContext('2d')
    for(var g=0; g<=this.state.yCells; g++){
      for(var j=0; j<=this.state.xCells; j++){
        ctx.fillStyle='black'
        ctx.fillRect(j*this.state.cellsize,g*this.state.cellsize,this.state.cellsize,this.state.cellsize);
        this.state.gridModel[g][j]=2;

      }
    }
    this.setState({generation:0})
  }

  cellSize5px = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
      var largeBoardX = 175;
      var largeBoardY=110;
      var mediumBoardX=145
      var mediumBoardY=85;
      var smallBoardX=119
      var smallBoardY=59
      if(this.state.boardSize=='large'){
      this.setState({yCells:largeBoardY,
                     xCells:largeBoardX,
                     cellsize: 5,
                     cellsChanged:true
                   })
        } else if(this.state.boardSize=='medium'){
          this.setState({yCells:mediumBoardY,
                         xCells:mediumBoardX,
                         cellsize: 5,
                         cellsChanged:true
                       })
        } else if(this.state.boardSize=='small'){
          this.setState({yCells:smallBoardY,
                         xCells:smallBoardX,
                         cellsize: 5,
                         cellsChanged:true
                       })
        }
  }
  cellSize10px = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
    var largeBoardX = 105;
    var largeBoardY=105;
    var mediumBoardX=75
    var mediumBoardY=45;
    var smallBoardX=59
    var smallBoardY=29
    if(this.state.boardSize=='large'){
    this.setState({yCells:largeBoardY,
                   xCells:largeBoardX,
                   cellsize: 10,
                   cellsChanged:true
                 })
      } else if(this.state.boardSize=='medium'){
        this.setState({yCells:mediumBoardY,
                       xCells:mediumBoardX,
                       cellsize: 10,
                       cellsChanged:true
                     })
      } else if(this.state.boardSize=='small'){
        this.setState({yCells:smallBoardY,
                       xCells:smallBoardX,
                       cellsize: 10,
                       cellsChanged:true
                     })
      }
  }
  cellSize15px = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
    var largeBoardX = 75;
    var largeBoardY=45;
    var mediumBoardX=55
    var mediumBoardY=35;
    var smallBoardX=40
    var smallBoardY=20
    if(this.state.boardSize=='large'){
    this.setState({yCells:largeBoardY,
                   xCells:largeBoardX,
                   cellsize: 15,
                   cellsChanged:true
                 })
      } else if(this.state.boardSize=='medium'){
        this.setState({yCells:mediumBoardY,
                       xCells:mediumBoardX,
                       cellsize: 15,
                       cellsChanged:true
                     })
      } else if(this.state.boardSize=='small'){
        this.setState({yCells:smallBoardY,
                       xCells:smallBoardX,
                       cellsize: 15,
                       cellsChanged:true
                     })
      }
  }

  boardSizeLarge = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
    var board = document.querySelector('.container');
    var canvas = document.querySelector('canvas')
    board.style.gridAutoRows = '100px 70px 550px 140px'
    board.style.gridTemplateColumns = '1fr 855px 1fr'
    if(this.state.cellsize==10){
        this.setState({yCells:65,
                       xCells:105,
                       boardSize: 'large',
                       boardSizeChanged:true
        })


      } else if(this.state.cellsize==5){
        this.setState({yCells:110,
                       xCells:175,
                       boardSize: 'large',
                       boardSizeChanged:true
        })

      } else if(this.state.cellsize==15){
        this.setState({yCells:45,
                       xCells:75,
                       boardSize: 'large',
                       boardSizeChanged:true
      })
    }
      canvas.width='854'
      canvas.height='550'
  }
  boardSizeMedium = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
    var board = document.querySelector('.container');
    var canvas = document.querySelector('canvas')
    board.style.gridAutoRows = '100px 70px 390px 140px'
    board.style.gridTemplateColumns = '1fr 693px 1fr'
    if(this.state.cellsize==10){
        this.setState({yCells:45,
                       xCells:75,
                       boardSize: 'medium',
                       boardSizeChanged:true
        })


      } else if(this.state.cellsize==5){
        this.setState({yCells:85,
                       xCells:145,
                       boardSize: 'medium',
                       boardSizeChanged:true
        })

      } else if(this.state.cellsize==15){
        this.setState({yCells:35,
                       xCells:55,
                       boardSize:'medium',
                       boardSizeChanged:true
      })
    }
      canvas.width='693'
      canvas.height='390'


  }
  boardSizeSmall = (e) => {
    var btn = e.target;
    var btnSibs=btn.parentNode.childNodes
    for(var i=0; i<btnSibs.length; i++){
      btnSibs[i].classList.remove('activeBtn')
    }
    btn.classList.add('activeBtn')
      var board = document.querySelector('.container');
      var canvas = document.querySelector('canvas')
      board.style.gridAutoRows = '100px 70px 300px 140px'
      board.style.gridTemplateColumns = '1fr 600px 1fr'
      if(this.state.cellsize==10){
          this.setState({yCells:29,
                         xCells:59,
                         boardSize:'small',
                         boardSizeChanged:true
          })


        } else if(this.state.cellsize==5){
          this.setState({yCells:58,
                         xCells:118,
                         boardSize:'small',
                         boardSizeChanged:true
          })

        } else if(this.state.cellsize==15){
          this.setState({yCells:20,
                         xCells:40,
                         boardSize:'small',
                         boardSizeChanged:true

        })
      }
        canvas.width='600'
        canvas.height='300'

  }
  render(){
    return(
      <div id="root">

        <div className="container">
          <Header />
          <TopBtnHeader
          clearGrid={this.clearGrid}
          pause={this.pauseGame}
          startt={this.generation}
          genNum={this.state.generation}
          repopulate={this.repopulate}
          />
          <GameBoard
          cellSize={this.state.cellsize}
          setUpLivelihood={this.setUpLivelihood}
          gridModel={this.state.gridModel}
          cellNum={this.state.cellNumber}
          xCells={this.state.xCells}
          yCells={this.state.yCells}
          birthOrKill={this.birthOrKillCell}
          />
          <BtmBtnHeader
          slow={this.adjustSpeedTo1X}
          medium={this.adjustSpeedTo2X}
          fast={this.adjustSpeedTo3X}
          cell5px={this.cellSize5px}
          cell10px={this.cellSize10px}
          cell15px={this.cellSize15px}
          boardSmall={this.boardSizeSmall}
          boardMedium={this.boardSizeMedium}
          boardLarge={this.boardSizeLarge}
           />
        </div>

      </div>
    )
  }

}
ReactDOM.render(<App />, document.getElementById('root'))
