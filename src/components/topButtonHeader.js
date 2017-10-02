
import React from 'react'
import '../styles/TopButtonHeader.css'

class TopBtnHeader extends React.Component {

  render(){
    return(

        <div id="topBtnHeader">
            <button onClick={this.props.startt} className="btn">Run</button>
            <button onClick={this.props.pause} className="btn">Pause</button>
            <button onClick={this.props.clearGrid} className="btn">Clear</button>
            <button onClick={this.props.repopulate}className="btn">Repopulate</button>

            <div className="gen">Generations:<span id="genNum"> {this.props.genNum}</span></div>
        </div>
      
    )
  }
}
export default TopBtnHeader
