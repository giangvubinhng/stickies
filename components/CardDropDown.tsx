import type { NextPage } from 'next'
import { useMemo } from 'react'
import { IDropDownSection, IDropDownMenuItem } from '../interfaces/IDropDownMenu'
import DropDown from './DropDown';

interface props {

  handleAddTask: () => void;
  handleDeleteCard: () => void;

}
const CardDropDownMenu: NextPage<props> = (props) => {
  const optionsMenu = useMemo(() => {
    function generateOptionsMenu() {
      const edit: IDropDownMenuItem =
      {
        type: 'button',
        action: props.handleAddTask,
        value: "Edit"
      }
      const deleteFunc: IDropDownMenuItem =
      {
        type: 'button',
        action: props.handleDeleteCard,
        value: "Delete"
      };

      const list1: IDropDownMenuItem[] = [
       edit
      ]
      const list2: IDropDownMenuItem[] = [
        deleteFunc
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
export default CardDropDownMenu;
