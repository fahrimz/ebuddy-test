import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

const Typography: React.FC<TypographyProps> = (props) => {
  return <MuiTypography {...props} />;
};

export default Typography;
