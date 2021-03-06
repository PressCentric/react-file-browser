import React from 'react'
import Moment from 'moment'
import ClassNames from 'classnames'
import { DragSource, DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import BaseFile, { BaseFileConnectors } from './../base-file.js'
import { fileSize } from './utils.js'

import { Table } from 'semantic-ui-react'

class RawTableFile extends BaseFile {
  render() {
    const {
      isDragging, isDeleting, isRenaming, isOver, isSelected,
      action, url, browserProps, connectDragPreview,
      depth, size, modified,
    } = this.props

    const icon = browserProps.icons[this.getFileType()] || browserProps.icons.File
    const inAction = (isDragging || action)

    const ConfirmDeletionRenderer = browserProps.confirmDeletionRenderer

    let name
    if (!inAction && isDeleting && browserProps.selection.length === 1) {
      name = (
        <ConfirmDeletionRenderer
          handleDeleteSubmit={this.handleDeleteSubmit}
          handleFileClick={this.handleFileClick}
          url={url}
        >
          {icon}
          {this.getName()}
        </ConfirmDeletionRenderer>
      )
    } else if (!inAction && isRenaming) {
      name = (
        <form className="renaming" onSubmit={this.handleRenameSubmit}>
          {icon}
          <input
            type="text"
            value={this.state.newName}
            onChange={this.handleNewNameChange}
            onBlur={this.handleCancelEdit}
            autoFocus
          />
        </form>
      )
    } else {
      name = (
        <a
          href={url || '#'}
          download="download"
          onClick={this.handleFileClick}
        >
          {icon}
          {this.getName()}
        </a>
      )
    }

    // let draggable = (
    //   <div>
    //     {name}
    //   </div>
    // )
    // if (typeof browserProps.moveFile === 'function') {
    //   draggable = connectDragPreview(draggable)
    // }

    let row = (
      <Table.Row
        positive={isSelected}
        className={ClassNames('file', {
          pending: action,
          // dragging: isDragging,
          // dragover: isOver,
          selected: isSelected,
        })}
        onClick={this.handleItemClick}
        onDoubleClick={this.handleItemDoubleClick}
      >
        <Table.Cell className="name"><div style={{ paddingLeft: (depth * 20) + 'px' }}>{name}</div></Table.Cell>
        <Table.Cell className="size">{fileSize(size)}</Table.Cell>
        <Table.Cell className="modified">
          {typeof modified === 'undefined' ? '-' : Moment(modified, 'x').fromNow()}
        </Table.Cell>
      </Table.Row>
    )

    // return this.connectDND(row)
    return row
  }
}

@DragSource('file', BaseFileConnectors.dragSource, BaseFileConnectors.dragCollect)
@DropTarget(
  ['file', 'folder', NativeTypes.FILE],
  BaseFileConnectors.targetSource,
  BaseFileConnectors.targetCollect,
)
class TableFile extends RawTableFile {}

export default TableFile
export { RawTableFile }
