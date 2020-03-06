import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'
import { Table } from 'semantic-ui-react'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { BaseFileConnectors } from './../base-file.js'

class RawTableHeader extends React.Component {
  static propTypes = {
    select: PropTypes.func,
    fileKey: PropTypes.string,

    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    isSelected: PropTypes.func,

    browserProps: PropTypes.shape({
      createFiles: PropTypes.func,
      moveFolder: PropTypes.func,
      moveFile: PropTypes.func,
    }),
  }

  handleHeaderClick(event) {
    this.props.select(this.props.fileKey)
  }

  render() {
    return (
      <Table.Row>
        <Table.HeaderCell>File</Table.HeaderCell>
        <Table.HeaderCell>Size</Table.HeaderCell>
        <Table.HeaderCell>Last Modified</Table.HeaderCell>
      </Table.Row>
    )
  }
}

@DropTarget(
  ['file', 'folder', NativeTypes.FILE],
  BaseFileConnectors.targetSource,
  BaseFileConnectors.targetCollect,
)
class TableHeader extends RawTableHeader {}

export default TableHeader
export { RawTableHeader }
