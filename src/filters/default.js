import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'semantic-ui-react'

class Filter extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    updateFilter: PropTypes.func,
  }

  handleFilterChange = (e) => {
    const newValue = e.target.value
    this.props.updateFilter(newValue)
  }

  render() {
    return (
      <Input
        fluid
        type="search"
        placeholder="Filter files"
        value={this.props.value}
        onChange={this.handleFilterChange}
      />
    )
  }
}

export default Filter
