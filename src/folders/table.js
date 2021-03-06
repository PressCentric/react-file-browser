import React from 'react'
import ClassNames from 'classnames'
// import { DragSource, DropTarget } from 'react-dnd'
// import { NativeTypes } from 'react-dnd-html5-backend'
import { Table } from 'semantic-ui-react'

import BaseFolder, { BaseFolderConnectors } from './../base-folder.js'
// import { BaseFileConnectors } from './../base-file.js'

class RawTableFolder extends BaseFolder {
  render() {
    const {
      isOpen, isDragging, isDeleting, isRenaming, isDraft, isOver, isSelected,
      action, url, browserProps, connectDragPreview, depth,
    } = this.props

    const icon = browserProps.icons[isOpen ? 'FolderOpen' : 'Folder']
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
    } else if ((!inAction && isRenaming) || isDraft) {
      name = (
        <div>
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
        </div>
      )
    } else {
      name = (
        <div>
          <a onClick={this.toggleFolder}>
            {icon}
            {this.getName()}
          </a>
        </div>
      )
    }

    return (
      <Table.Row
        positive={isSelected}
        className={ClassNames('folder', {
          pending: action,
          selected: isSelected,
        })}
        onClick={this.handleFolderClick}
        onDoubleClick={this.handleFolderDoubleClick}
      >
        <Table.Cell className="name"><div style={{ paddingLeft: (depth * 20) + 'px' }}>{name}</div></Table.Cell>
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
    )
  }
}

// @DragSource('folder', BaseFolderConnectors.dragSource, BaseFolderConnectors.dragCollect)
// @DropTarget(
//   ['file', 'folder', NativeTypes.FILE],
//   BaseFileConnectors.targetSource,
//   BaseFileConnectors.targetCollect,
// )
class TableFolder extends RawTableFolder {}

export default TableFolder
export { RawTableFolder }
