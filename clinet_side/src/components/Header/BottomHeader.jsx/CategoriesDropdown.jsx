// import React, { Fragment } from "react";
// import { Menu, Transition, Popover } from "@headlessui/react";
// import { Link } from "react-router-dom";

// function CategoriesDropdown({ categories }) {
//   return (
//     <Menu
//       as="div"
//       className="relative inline-block text-left d-xl-block d-none"
//     >
//       <div>
//         <Menu.Button className="btn-category">
//           All Category <i className="fa fa-angle-down" />
//         </Menu.Button>
//       </div>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="dropdown-menu show absolute mt-2 w-56 origin-top-left bg-white shadow-lg">
//           {categories.map((cat) => (
//             <Menu.Item key={cat._id}>
//               {({ active }) => (
//                 <Popover className="relative">
//                   <Popover.Button
//                     className={`block w-full text-left px-4 py-2 ${
//                       active ? "bg-blue-500 text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {cat.name}
//                   </Popover.Button>
//                   {cat.sections.length > 0 && (
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-200"
//                       enterFrom="opacity-0 translate-y-1"
//                       enterTo="opacity-100 translate-y-0"
//                       leave="transition ease-in duration-150"
//                       leaveFrom="opacity-100 translate-y-0"
//                       leaveTo="opacity-0 translate-y-1"
//                     >
//                       <Popover.Panel className="absolute left-full top-0 ml-2 w-56 bg-white shadow-lg">
//                         <ul className="p-2">
//                           {cat.sections.map((section) => (
//                             <li key={section._id} className="py-1">
//                               <Link
//                                 to={`/section/${section._id}`}
//                                 className="block text-gray-700 hover:bg-gray-100 px-2"
//                               >
//                                 {section.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </Popover.Panel>
//                     </Transition>
//                   )}
//                 </Popover>
//               )}
//             </Menu.Item>
//           ))}
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }

// export default CategoriesDropdown;
