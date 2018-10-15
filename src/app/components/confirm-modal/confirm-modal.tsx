import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Button, ButtonProps, Modal, ModalProps } from 'semantic-ui-react'

interface ComponentProps {
  title: string;
  subtitle?: string;
  open: boolean;
  size?: 'fullscreen' | 'large' | 'mini' | 'small' | 'tiny';
  onClose: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void;
}

class ConfirmModal extends Component<ComponentProps> {

  public render(): ReactNode {
    const { open, size, title, subtitle, onClose, onClick } = this.props;

    return (
      <Modal size={size || 'mini'} open={open} onClose={onClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p>{subtitle}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative icon='delete' labelPosition='left' onClick={onClick}>No</Button>
          <Button positive icon='checkmark' labelPosition='right' onClick={onClick}>Yes</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export { ConfirmModal };
