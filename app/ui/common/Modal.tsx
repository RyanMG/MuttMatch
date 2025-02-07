import MuiModal from '@mui/material/Modal';
import { ReactElement, JSXElementConstructor, ReactNode } from 'react';
import CloseIcon from '@ui/common/CloseIcon';

export default function Modal({
  open,
  closeModal,
  title = "",
  children
}: {
  open: boolean,
  closeModal: () => void,
  title?: string,
  children: ReactElement<unknown, string | JSXElementConstructor<any>>
}): ReactNode {
  return (
    <MuiModal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <section className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
        <div className="border border-orange-400 rounded-lg bg-white flex flex-col min-w-[50%] min-h-[100px]">
          <div className="flex flex-row items-center justify-between h-8 px-2 bg-orange-400 rounded-t-lg">
            <h1 className="text-white">{title}</h1>
            <CloseIcon onClick={closeModal} />
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </section>
    </MuiModal>
  )
}