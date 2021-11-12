import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle, Collapse } from '@mui/material'
import React from 'react'

export default function Alerts(props: any) {
  const { showError, setShowError } = props;

  return (
    <div>
      <Dialog
        open={showError}
        onClose={() => {
          setShowError(false);
        }}
      >
        <Collapse in={showError}>
          <Alert 
            severity="error"
            onClose={() => {
              setShowError(false);
            }}
          >
            <AlertTitle> Error </AlertTitle>
            Ocurrió un error en alguno de los datos
          </Alert>
        </Collapse>
      </Dialog>
    </div>
  )
}
