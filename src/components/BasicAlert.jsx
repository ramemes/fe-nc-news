import { useContext } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const BasicAlert = (props) => {
  const {severity, content} = props
  return (
    <div className="basic-alert">
    <Stack spacing={2}>
      <Alert severity={severity}>{content}</Alert>
    </Stack>
    </div>
  );
}

export default BasicAlert