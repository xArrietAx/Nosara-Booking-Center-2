"use client";

import { Modal, ModalContent, ModalTrigger } from "../ui/Modal";

export function VideoModal() {
  return (
    <Modal>
      <ModalTrigger className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/45 cursor-pointer">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white lg:w-20 lg:h-20">
            <i className="icon-[fluent--play-28-filled] size-8 lg:size-10" />
          </div>
      </ModalTrigger>
      <ModalContent className="!bg-transparent">
        {({ close }) => (
          <div className="relative flex flex-col gap-2 w-full h-0 pb-[60%] xl:flex-row-reverse">
            <button className="absolute -top-10 right-0 z-10 text-white cursor-pointer lg:top-0 lg:-right-10" onClick={close} >
              <i className="icon-[heroicons-outline--x] size-7" />  
            </button>
            <iframe
              src="https://www.youtube.com/embed/Y3-JqSWlS2U?si=_Hv5HUTnIj5X1KGo"
              title="Playa Guiones, Nosara, Guanacaste. Costa Rica (4K)"
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
