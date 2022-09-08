export interface IDropDownSection {
  menuItems: IDropDownMenuItem[];
}

// interface link {
//   href: string;
// }
// interface button {
//   function: (params: any) => any;
// }

export interface IDropDownMenuItem {
  type: string;
  action: any;
  value: string;
}
