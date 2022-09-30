import type { NextPage } from 'next'
import { useMemo } from 'react'
import { IDropDownSection, IDropDownMenuItem } from '../interfaces/IDropDownMenu'
import DropDown from './DropDown';

interface props {

  handleEdit: () => void;
  handleDelete: () => void;
  handleMark: () => void;
  handleDuplicate: () => void;

}
const SingleListDropDownMenu: NextPage<props> = (props) => {
  const optionsMenu = useMemo(() => {
    function generateOptionsMenu() {
      const edit: IDropDownMenuItem =
      {
        type: 'button',
        action: props.handleEdit,
        value: "Edit"
      }
      const duplicate: IDropDownMenuItem =
      {
        type: 'button',
        action: props.handleDuplicate,
        value: "Duplicate"
      }
      const mark: IDropDownMenuItem =
      {
        type: 'button',
        action: props.handleMark,
        value: "Mark"
      };
      const deleteFunc: IDropDownMenuItem =
      {
        type: 'button',
        action: props.handleDelete,
        value: "Delete"
      };

      const list1: IDropDownMenuItem[] = [
       edit, duplicate
      ]
      const list2: IDropDownMenuItem[] = [
        mark, deleteFunc
      ]

      const section1: IDropDownSection = { menuItems: list1 };
      const section2: IDropDownSection = { menuItems: list2 };
      return [section1, section2]
    }
    return generateOptionsMenu()
  }, [props])
  return (<>
    <DropDown sections={optionsMenu} />
  </>)
}
export default SingleListDropDownMenu;
