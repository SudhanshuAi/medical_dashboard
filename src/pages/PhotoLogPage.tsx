import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Dialog, DialogTitle, DialogContent, ImageList, ImageListItem, ImageListItemBar, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PhotoUploadForm } from '../components/PhotoUploadForm';
import { addPhotoLog, updatePhotoLog, deletePhotoLog } from '../features/photoLogsSlice';
import type { RootState } from '../store';
import type { NewPhotoLog, PhotoLog } from '../components/PhotoUploadForm';

const PhotoLogPage = () => {
    const dispatch = useDispatch();
    const { logs } = useSelector((state: RootState) => state.photoLogs);
    const devices = useSelector((state: RootState) => state.inventory.devices);
    const [open, setOpen] = useState(false);
    const [editingLog, setEditingLog] = useState<PhotoLog | null>(null);

    // Create a unique list of facilities from the devices
    const facilities = [...new Set(devices.map(d => d.facility))].map(f => ({ id: f, name: f }));

    const handleOpenForm = () => {
        setEditingLog(null);
        setOpen(true);
    };

    const handleCloseForm = () => {
        setOpen(false);
        setEditingLog(null);
    };

    const handleEdit = (log: PhotoLog) => {
        setEditingLog(log);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this photo?')) {
            dispatch(deletePhotoLog(id));
        }
    };

    const handleSubmit = (data: NewPhotoLog | { id: string; caption: string }) => {
        if ('id' in data && !('image' in data)) {
            dispatch(updatePhotoLog(data));
        } else {
            dispatch(addPhotoLog(data as NewPhotoLog));
        }
        handleCloseForm();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Photo Logs
                </Typography>
                <Button variant="contained" onClick={handleOpenForm}>
                    Upload Photo
                </Button>
            </Box>

            <Dialog open={open} onClose={handleCloseForm}>
                <DialogTitle>{editingLog ? 'Edit Photo Caption' : 'Upload New Photo'}</DialogTitle>
                <DialogContent>
                    <PhotoUploadForm
                        facilities={facilities}
                        onSubmit={handleSubmit}
                        initialData={editingLog}
                    />
                </DialogContent>
            </Dialog>

            {logs.length > 0 ? (
                <ImageList variant="masonry" cols={3} gap={8}>
                    {logs.map((log) => (
                        <ImageListItem key={log.id}>
                            <img
                                src={log.imageUrl}
                                alt={log.caption}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={log.caption}
                                subtitle={`Facility: ${log.facilityId}`}
                                actionIcon={
                                    <>
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`edit ${log.caption}`}
                                            onClick={() => handleEdit(log)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`delete ${log.caption}`}
                                            onClick={() => handleDelete(log.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <Typography>No photos uploaded yet. Click "Upload Photo" to add one.</Typography>
            )}
        </Box>
    );
};

export default PhotoLogPage;

