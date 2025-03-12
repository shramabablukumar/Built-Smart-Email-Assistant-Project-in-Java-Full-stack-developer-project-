import { useState } from 'react';
import './App.css';
import { Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from './../node_modules/axios/lib/axios';
import { typeOf } from './../node_modules/uri-js/dist/esnext/util';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async ()=>{
    setLoading(true);
    setError('');
    try{
      const response = await axios.post("http://localhost:8080/api/email/generate",{
        emailContent,
        tone

      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))


    }catch(error){

      setError('Failed to generate the email reply .please try gain')
      console.log(error);
    }finally{
      setLoading(false);
    }
  

  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant='h3' component='h1' gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label='Original Email Content'
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            label="Tone (Optional)"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>
        <Button
         variant='contained'
         onClick={handleSubmit}
         disabled={!emailContent || loading}
         fullWidth>

          {loading ? <CircularProgress size={24}/> : "Generate Reply"}
        </Button>
      </Box>
      {error && (
        <Typography color='error' sx={{mb:2}} >
         {error}
        </Typography>

      )}
      {generatedReply && (
        <Box sx={{mt: 3}}>
          <Typography variant='h6' gutterBottom>
            <generatedReply></generatedReply>
          </Typography>
          <TextField fullWidth
          multiline
          rows={6}
          variant='outlined'
          value ={generatedReply || ''}
          inputProps={{readOnly: true}}
       
          />
          <button className='CopyClipboard' variant="outlined" sx={{mt: 2}} onClick={()=> navigator.clipboard.writeText(generatedReply)}>
            Copy CopyClipboard
          </button>
        </Box>


      )}

    </Container>
  );
}

export default App;
