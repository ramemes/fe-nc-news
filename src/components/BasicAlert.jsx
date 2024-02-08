import { useContext } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const BasicAlert = (props) => {
  const {severity, content} = props
  return (
    <Stack  spacing={2}>
      <Alert severity={severity}>{content}</Alert>
    </Stack>
  );
}

export default BasicAlert