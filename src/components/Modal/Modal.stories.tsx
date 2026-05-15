import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import React, { useState } from 'react';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Showcase/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Header onClose={() => setOpen(false)}>Modal Title</Modal.Header>
          <Modal.Body>
            <p>This is the modal content. You can put anything here!</p>
            <p>Focus is trapped inside this modal while it is open.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const LargeContent: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Header onClose={() => setOpen(false)}>Scrolling Content</Modal.Header>
          <Modal.Body>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>Line {i + 1}: Some long content to test scrolling behavior within the modal body.</p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
