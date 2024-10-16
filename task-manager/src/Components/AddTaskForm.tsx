import React, {useState} from 'react';
import { AddTaskFormProps } from '../types';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()){
            onAdd(text);
            setText('');
            setError('');
        }
        else{
            setError('Task cannot be empty');
        }
    }


    return(
        <Box component="form" onSubmit={handleSubmit} sx = {{display:'flex', flexDirection:'column', marginBottom:2}}>
            <Box sx={{display: 'flex', marginBottom: 1}}>
                <TextField 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter Task"
                    sx={{margin:1}}
                    error={!!error}
                    helperText={error}        
                />
                <Button type='submit' variant='contained' color='primary'>
                    Add Task
                </Button>
            </Box>
            {error && (
                <Typography color='error' variant='body2'>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default AddTaskForm
