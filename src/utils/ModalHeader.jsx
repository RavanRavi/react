import React from 'react';
import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalHeader = ({ title, onClose }) => (
    <DialogTitle sx={{ textAlign: 'center' }}>
        {title}
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
            }}
        >
            <CloseIcon />
        </IconButton>
    </DialogTitle>
);

export default ModalHeader;
