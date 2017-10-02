import React from 'react'
import '../styles/gameBoard.css'
import '../styles/topButtonHeader.css'



class gameBoard extends React.Component {

  componentDidMount() {
      this.createCanvas();
  }

  /*componentWillMount(){
      this.setUpLivelihood();
  }


  setUpLivelihood = () =>{

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

}*/
  createCanvas=()=> {
    var scale = this.props.cellSize;
    var canvas = document.querySelector('#myCanvas')
    var ctx = canvas.getContext('2d')

      for(var g=0; g<=this.props.yCells; g++){
        for(var j=0; j<=this.props.xCells; j++){

          if(this.props.gridModel[g][j]==1){

            ctx.fillStyle='#D9EBBC';
          } else {
            ctx.fillStyle='black';
          }

          ctx.fillRect(j*scale,g*scale,scale,scale)
          ctx.lineWidth = 1;
          ctx.strokeStyle = "black";
          ctx.strokeRect(j*scale,g*scale,scale,scale);
          }
        }
     }



  render(){
    return(
      <div id="gameBoard">
        <div id='cellBoard'>
          <canvas onClick = {this.props.birthOrKill} id="myCanvas" width={700} height={390} />
        </div>
      </div>
    )
  }
}
export default gameBoard
