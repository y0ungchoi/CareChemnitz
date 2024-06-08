import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SlidePanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-solid border-2 border-indigo-600">
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>

      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
      <ul>
        <li>apple</li>
        <li>apple</li>
      </ul>
    </div>
  );
}
