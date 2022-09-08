import type { NextPage } from 'next'
import { useMemo } from 'react'
import { IDropDownSection, IDropDownMenuItem } from '../interfaces/IDropDownMenu'
import DropDown from './DropDown';

function generateOptionsMenu() {
  const edit: IDropDownMenuItem =
  {
    type: 'button',
    action: () => console.log("Edit function"),
    value: "Edit"
  }
  const duplicate: IDropDownMenuItem =
  {
    type: 'button',
    action: () => console.log("Duplicate function"),
    value: "Duplicate"
  }
  const mark: IDropDownMenuItem =
  {
    type: 'button',
    action: () => console.log("Mark function"),
    value: "Mark"
  };
  const deleteFunc: IDropDownMenuItem =
  {
    type: 'button',
    action: () => console.log("Delete function"),
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
const SingleListDropDownMenu: NextPage = () => {
  const optionsMenu = useMemo(() => {
    return generateOptionsMenu()
  }, [])
  return (<>
    <DropDown sections={optionsMenu} />
  </>)
}
export default SingleListDropDownMenu;
