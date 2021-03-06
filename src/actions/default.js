import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popup } from 'semantic-ui-react'

const Actions = (props) => {
  const {
    selectedItems,
    isFolder,
    icons,
    nameFilter,

    canCreateFolder,
    onCreateFolder,

    canRenameFile,
    onRenameFile,

    canRenameFolder,
    onRenameFolder,

    canDeleteFile,
    onDeleteFile,

    canDeleteFolder,
    onDeleteFolder,

    canDownloadFile,
    onDownloadFile,

  } = props

  let actions = []

  if (selectedItems.length) {
    // Something is selected. Build custom actions depending on what it is.
    let selectedItemsAction = selectedItems.filter(item => item.action)
    if (selectedItemsAction.length === selectedItems.length && [... new Set(selectedItemsAction)].length === 1) {
      // Selected item has an active action against it. Disable all other actions.
      let actionText
      switch (selectedItemsAction[0].action) {
        case 'delete':
          actionText = 'Deleting ...'
          break

        case 'rename':
          actionText = 'Renaming ...'
          break

        default:
          actionText = 'Moving ...'
          break
      }

      actions = (
        // TODO: Enable plugging in custom spinner.
        <div className="item-actions">
          {icons.Loading} {actionText}
        </div>
      )
    } else {
      if (isFolder && canCreateFolder && !nameFilter) {
        actions.push(<Popup key={'add-sub-folder'} inverted content="Add Subfolder" trigger={<Button primary icon={'folder'} onClick={onCreateFolder} />} />)
      }

      let itemsWithoutKeyDerived = selectedItems.find(item => !item.keyDerived)
      if (!itemsWithoutKeyDerived && !isFolder && canRenameFile && selectedItems.length === 1) {
        actions.push(<Popup key={'rename-file'} inverted content="Rename" trigger={<Button primary icon={'pencil alternate'} onClick={onRenameFile} />} />)
        // actions.push(
        //   <li key="action-rename">
        //     <a
        //       onClick={onRenameFile}
        //       href="#"
        //       role="button"
        //     >
        //       {icons.Rename}
        //       &nbsp;Rename
        //     </a>
        //   </li>
        // )
      } else if (!itemsWithoutKeyDerived && isFolder && canRenameFolder) {
        actions.push(<Popup key={'rename-folder'} inverted content="Rename" trigger={<Button primary icon={'pencil alternate'} onClick={onRenameFolder} />} />)
        // actions.push(
        //   <li key="action-rename">
        //     <a
        //       onClick={onRenameFolder}
        //       href="#"
        //       role="button"
        //     >
        //       {icons.Rename}
        //       &nbsp;Rename
        //     </a>
        //   </li>
        // )
      }

      if (!itemsWithoutKeyDerived && !isFolder && canDeleteFile) {
        actions.push(<Popup key={'delete-file'} content="Delete" trigger={<Button color={'red'} icon={'trash'} onClick={onDeleteFile} />} />)
        // actions.push(
        //   <li key="action-delete">
        //     <a
        //       onClick={onDeleteFile}
        //       href="#"
        //       role="button"
        //     >
        //       {icons.Delete}
        //       &nbsp;Delete
        //     </a>
        //   </li>
        // )
      } else if (!itemsWithoutKeyDerived && isFolder && canDeleteFolder) {
        actions.push(<Popup key={'delete-folder'} content="Delete" trigger={<Button color={'red'} icon={'trash'} onClick={onDeleteFolder} />} />)
        // actions.push(
        //   <li key="action-delete">
        //     <a
        //       onClick={onDeleteFolder}
        //       href="#"
        //       role="button"
        //     >
        //       {icons.Delete}
        //       &nbsp;Delete
        //     </a>
        //   </li>
        // )
      }

      if (!isFolder && canDownloadFile) {
        actions.push(<Popup key={'download-folder'} content="Download" trigger={<Button icon={'download'} onClick={onDownloadFile} />} />)
        // actions.push(
        //   <li key="action-download">
        //     <a
        //       onClick={onDownloadFile}
        //       href="#"
        //       role="button"
        //     >
        //       {icons.Download}
        //       &nbsp;Download
        //     </a>
        //   </li>
        // )
      }

      // if (actions.length) {
      //   actions = (<ul className="item-actions">{actions}</ul>)
      // } else {
      //   actions = (<div className="item-actions">&nbsp;</div>)
      // }
    }
  } else {
    // Nothing selected: We're in the 'root' folder. Only allowed action is adding a folder.
    if (canCreateFolder && !nameFilter) {
      actions.push(<Popup key={'add-new-folder'} inverted content="Add new folder" trigger={<Button primary icon={'folder'} onClick={onCreateFolder} />} />)
    }

    // if (actions.length) {
    //   actions = (<ul className="item-actions">{actions}</ul>)
    // } else {
    //   actions = (<div className="item-actions">&nbsp;</div>)
    // }
  }

  return actions
}

Actions.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  isFolder: PropTypes.bool,
  icons: PropTypes.object,
  nameFilter: PropTypes.string,

  canCreateFolder: PropTypes.bool,
  onCreateFolder: PropTypes.func,

  canRenameFile: PropTypes.bool,
  onRenameFile: PropTypes.func,

  canRenameFolder: PropTypes.bool,
  onRenameFolder: PropTypes.func,

  canDeleteFile: PropTypes.bool,
  onDeleteFile: PropTypes.func,

  canDeleteFolder: PropTypes.bool,
  onDeleteFolder: PropTypes.func,

  canDownloadFile: PropTypes.bool,
  onDownloadFile: PropTypes.func,
}

Actions.defaultProps = {
  selectedItems: [],
  isFolder: false,
  icons: {},
  nameFilter: '',

  canCreateFolder: false,
  onCreateFolder: null,

  canRenameFile: false,
  onRenameFile: null,

  canRenameFolder: false,
  onRenameFolder: null,

  canDeleteFile: false,
  onDeleteFile: null,

  canDeleteFolder: false,
  onDeleteFolder: null,

  canDownloadFile: false,
  onDownloadFile: null,
}

export default Actions
