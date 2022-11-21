import type { NextPage } from 'next';
import { Fragment } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Menu, Transition } from '@headlessui/react';
import { forwardRef } from 'react'
import {IDropDownSection as section} from '@/interfaces/IDropDownMenu'
import Link from 'next/link'

interface props {
  sections: section[];
}


const MenuLink = forwardRef((props: any, ref: any) => {
  let { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
})

MenuLink.displayName = "MenuLink";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const DropDown: NextPage<props> = ({ sections }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <AiFillCaretDown />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {sections ? sections.map((section, key) => {
            return (
              <div className="py-1" key={key}>
                {
                  section.menuItems.map((item, key) => {
                    if (item.type === "button") {
                      return (
                        <Menu.Item key={key}>
                          {({ active }) => (
                            <button
                              onClick={item.action}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm text-start w-full'
                              )}
                            >
                              {item.value}
                            </button>
                          )}
                        </Menu.Item>
                      )
                    }
                    if (item.type === "link") {
                      return (
                        <Menu.Item key={key}>
                          {({ active }) => (
                            <MenuLink
                              href={item.action}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm text-start w-full'
                              )}
                            >
                              {item.value}
                            </MenuLink>
                          )}
                        </Menu.Item>
                      )
                    }
                  })
                }

              </div>
            )
          }) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default DropDown;
