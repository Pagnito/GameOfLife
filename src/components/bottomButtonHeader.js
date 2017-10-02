import React from 'react'
import '../styles/bottomButtonHeader.css'

class BtmBtnHeader extends React.Component {

  render(){
    return(
      <div id="BtmBtnHeader">
        <div id="sizeBtns">
          <p className='evenOut'>Board Size</p>
          <button onClick={this.props.boardSmall} className="btn">Small</button>
          <button onClick={this.props.boardMedium} className="btn activeBtn">Medium</button>
          <button onClick={this.props.boardLarge} className="btn">Large</button>
        </div>
        <div id="speedBtns">
          <p className='evenOut'>Play Speed</p>
          <button onClick={this.props.slow} className="btn">Trump</button>
          <button onClick={this.props.medium} className="btn activeBtn">Obama</button>
          <button onClick={this.props.fast} className="btn">Bern</button>
        </div>
        <div id="cellSizeBtns">
          <p className='evenOut'>Cell Size</p>
          <button onClick={this.props.cell5px} className="btn">5px</button>
          <button onClick={this.props.cell10px} className="btn activeBtn">10px</button>
          <button onClick={this.props.cell15px} className="btn">15px</button>
        </div>
      </div>
    )
  }
}
export default BtmBtnHeader
