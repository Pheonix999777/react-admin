import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

export const CustomModal = ({
  isOpen,
  onClose,
  btnText1 = "Close",
  btnText2 = "Save",
  callback,
  children,
  title = "Modal Title"
} ) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            {btnText1}
          </Button>
          <Button variant='ghost' onClick={callback}>{btnText2}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
