// components/NotificationSystem.jsx
import React from 'react';
import {
  Snackbar,
  Alert,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Error,
  Warning,
  Info
} from '@mui/icons-material';
import { NotificationContext } from '../contexts/NotificationContext';

const NotificationSystem = () => {
  const { notifications, removeNotification } = React.useContext(NotificationContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle />;
      case 'error':
        return <Error />;
      case 'warning':
        return <Warning />;
      case 'info':
      default:
        return <Info />;
    }
  };

  const getAlertSeverity = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const handleClose = (id, event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeNotification(id);
  };

  const handleActionClick = (id, action) => {
    if (action && action.onClick) {
      action.onClick();
    }
    removeNotification(id);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: theme.zIndex.snackbar,
        maxWidth: isMobile ? 'calc(100vw - 32px)' : '400px'
      }}
    >
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={notification.open}
          autoHideDuration={notification.duration}
          onClose={(event, reason) => handleClose(notification.id, event, reason)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          sx={{
            position: 'relative',
            marginBottom: 1,
            '& .MuiSnackbar-root': {
              position: 'static'
            }
          }}
          ClickAwayListenerProps={{
            mouseEvent: false,
            touchEvent: false,
          }}
        >
          <Alert
            severity={getAlertSeverity(notification.type)}
            icon={getAlertIcon(notification.type)}
            variant="filled"
            sx={{
              width: '100%',
              alignItems: 'flex-start',
              '& .MuiAlert-message': {
                flex: 1,
                padding: theme.spacing(0.5, 0)
              }
            }}
            action={
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                {notification.actions?.map((action, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    aria-label={action.label}
                    onClick={() => handleActionClick(notification.id, action)}
                    sx={{
                      color: 'inherit',
                      padding: theme.spacing(0.5)
                    }}
                  >
                    {action.icon}
                  </IconButton>
                ))}
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={() => removeNotification(notification.id)}
                  sx={{
                    color: 'inherit',
                    padding: theme.spacing(0.5)
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {notification.message}
            </Typography>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default NotificationSystem;