import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const style = {
  color: '#777777',
  fontWeight: 400
}

class StyleSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'default'
    }
  }

  handleChange = (event, index, value) => {
    this.setState({value})
    this.props.currentVsActions.setCurrentVs(value)
  }

  render() {
    const styleNames = this.props.styles.keys()
    const items = []

    let count = 1
    for (let styleName of styleNames) {
      items.push(<MenuItem key={count} value={styleName} primaryText={styleName}/>)
      count++
    }

    return (
      <div>
        <SelectField
          labelStyle={style}
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Current Visual Style"
          floatingLabelStyle={{color: '#777777', fontWeight:300}}
        >
          {items}
        </SelectField>
      </div>
    )
  }
}

export default StyleSelector