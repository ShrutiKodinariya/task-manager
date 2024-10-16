import React, {useState} from 'react';
import { AddTaskFormProps } from '../types';
import { Box, Button, TextField, Typography, InputAdornment} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

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
        <Box sx={{marginTop:5}}>
            <Box sx={{
                display:'flex', 
                flexDirection:'column', 
                margin:1,
            
            }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontFamily: '"Roboto Slab", serif',
                        color: '#111',
                        fontSize:20 
                    }}
                >
                    Add your task here!
                </Typography>
            </Box>
        <Box component="form" onSubmit={handleSubmit} sx = {{display:'flex', flexDirection:'column', marginBottom:2}}>
            <Box sx={{display: 'flex', marginBottom: 1}}>
                <TextField 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter Task"
                    sx={{margin:1}}
                    error={!!error}
                    helperText={error}    
                    variant='standard' 
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EditNoteIcon />
                          </InputAdornment>
                        ),
                      }}   
                />
                <Button type='submit' sx={
                    {
                        background:'rgba(243, 218, 231, 0.8)',
                        fontSize:15,
                        color: 'black', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0 0px 8px 0 rgba(17, 2, 210, 0.19)' 
                        },
                        '&:active': {
                            boxShadow: '0 4px 8px 0 rgba(17, 2, 210, 0.19)',
                        },
                    }
                }>
                    Add
                </Button>
            </Box>
            {error && (
                <Typography color='error' variant='body2'>
                    {error}
                </Typography>
            )}
        </Box>
        </Box>
    );
};

export default AddTaskForm
