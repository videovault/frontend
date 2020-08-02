import React, { Component } from 'react'
import { withWidth, AppBar, Tabs, Tab } from '@material-ui/core'
import { withContext } from '../../context'

class Footer extends Component {
  onIndexSelect = (e, index) => {
    const { onCategorySelect, fields } = this.props
    onCategorySelect(index === 0 ? '' : fields[index - 1])
  }

  getIndex = () => {
    const { category, fields } = this.props
    return category
      ? fields.findIndex(group => group === category) + 1
      : 0
  }

  render() {
    const { width, fields } = this.props

    return (
      <AppBar position="static">
        <Tabs
          value={this.getIndex()}
          onChange={this.onIndexSelect}
          indicatorColor="secondary"
          textColor="secondary"
          centered={width !== 'xs'}
          scrollable={width === 'xs'}
        >
          <Tab label="All" />
          {fields.map(group => <Tab key={group} label={group} />)}
        </Tabs>
      </AppBar>
    )
  }
}

export default withContext(withWidth()(Footer))
